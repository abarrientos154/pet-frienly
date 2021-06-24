<template>
  <div>
    <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-lg">
          <div class="q-mb-lg text-center text-h5 text-grey-8">Representante Legal</div>

          <div class="column items-center q-mb-lg">
            <q-avatar rounded style="height: 200px; width: 90%; border-radius: 25px;" class="bg-grey row justify-center">
              <q-img style="height: 100%;" :src="imgRepresentante != '' ? imgRepresentante : ''">
                <q-file borderless v-model="imgR" @input="representante_img()" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px"
                @blur="$v.imgR.$touch()">
                  <div class="absolute-center column items-center" style="width:100%">
                    <q-icon name="image" size="75px" color="white" />
                    <div :class="$v.imgR.$error ? 'text-negative text-subtitle2 text-center' : 'text-white text-subtitle2 text-center'"> IMG <br> Representante legal </div>
                  </div>
                </q-file>
              </q-img>
            </q-avatar>
          </div>

          <div class="q-mt-sm">
            Nombre
            <q-input filled v-model="form.name"  dense placeholder="Nombre del representante legal"
            error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
          </div>
          <div>
            Apellidos
            <q-input filled v-model="form.last_name"  dense placeholder="Coloca aambos apellidos"
            error-message="Este campo es requerido" :error="$v.form.last_name.$error" @blur="$v.form.last_name.$touch()"/>
          </div>
          <div>
            Fecha de Nacimiento
            <q-input type="date" filled v-model="form.birthday"  dense placeholder="Nombre del representante legal"
            error-message="Este campo es requerido" :error="$v.form.birthday.$error" @blur="$v.form.birthday.$touch()"/>
          </div>
          <div>
            Telefono de Contacto
            <q-input type="tel" filled v-model="form.phone"  dense placeholder="+5695331583"
            error-message="Este campo es requerido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>
          </div>
          <div>
            Correo de contacto
            <q-input filled v-model="form.email"  dense placeholder="micorreo@petfriendly.com"
            error-message="Este campo es requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"/>
          </div>
          <div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div>Contraseña</div>
                <q-input :type="ver ? 'text' : 'password'" v-model="password" placeholder="Contraseña" outlined dense
                filled error-message="Ingrese una contraseña válida, mínimo 6 caracteres" :error="$v.password.$error" @blur="$v.password.$touch()">
                  <template v-slot:append>
                    <q-icon :name="ver ? 'visibility_off' : 'visibility'" class="cursor-pointer q-pa-sm" color="primary" @click="ver = !ver" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div>Repite Contraseña</div>
                <q-input :type="ver ? 'text' : 'password'" v-model="repeatPassword" placeholder="Repita su Contraseña" outlined dense filled
                error-message="Las contraseñas deben ser iguales" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()"/>
              </div>
          </div>
          <div>
              <div class="text-caption q-mb-sm">Imágenes de documento de identificación</div>
              <div style="width: 50%;" class="q-mb-sm">
                <q-avatar rounded style="width: 100%;" class="bg-primary">
                  <q-file borderless :disable="identificacion.length < 2 ? false : true" v-model="imgI" class="button-camera" @input="identificacion_img()" accept=".jpg, image/*" style="width: 100%; height: 100%;"/>
                  <div class="absolute-center text-center text-white full-width text-subtitle1">Cargar imagen</div>
                </q-avatar>
              </div>
              <div class="row">
                <q-avatar class="q-mr-sm bg-grey col" rounded style="height: 50px;">
                  <q-img style="height: 100%;" :src="identificacion.length ? identificacion[0] : ''"/>
                  <div class="absolute-center text-center text-negative full-width text-subtitle1" v-if="$v.images_ident.$error">Imagen requerida</div>
                </q-avatar>
                <q-avatar class="bg-grey col" rounded style="height: 50px;">
                  <q-img style="height: 100%;" :src="identificacion.length > 1 ? identificacion[1] : ''"/>
                  <div class="absolute-center text-center text-negative full-width text-subtitle1" v-if="$v.images_ident.$error">Imagen requerida</div>
                </q-avatar>
              </div>
          </div>
          <div class="column items-center justify-center" style="padding-top: 20px">
            <q-checkbox v-model="terminos" size="xs" label="Acepto Terminos y condiciones de uso" />
          </div>
          <div class="row justify-center q-mt-lg">
            <q-btn no-caps rounded color="primary" label="Siguiente" class="q-py-xs" style="width: 90%;"
            @click="siguiente1()"/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="q-pa-lg">
          <div class="q-mb-lg text-center text-h5 text-grey-8">Datos de tienda</div>

          <div class="column items-center justify-center">
            <q-avatar rounded style="height: 150px; width: 150px" class="bg-grey row justify-center">
              <q-img style="height: 100%;" :src="imgPerfil != '' ? imgPerfil : ''">
                <q-file borderless v-model="imgP" @input="perfil_img()" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px"
                @blur="$v.imgP.$touch()">
                  <div class="absolute-center column items-center">
                    <q-icon name="cloud_upload" size="75px" color="white" />
                  </div>
                </q-file>
              </q-img>
            </q-avatar>
            <div :class="$v.imgP.$error ? 'text-negative text-center' : 'text-grey-8 text-center'">Carga tu foto de perfil</div>
          </div>

         <div class="q-mt-md">
           Nombre de tienda
           <q-input filled v-model="formTienda.name"  dense placeholder="Nombre comercial"
           error-message="Este campo es requerido" :error="$v.formTienda.name.$error" @blur="$v.formTienda.name.$touch()"/>
         </div>
         <div>
           Correo de contacto tienda
           <q-input filled v-model="formTienda.email"  dense placeholder="micorreo@petfriendly.com "
           error-message="Este campo es requerido" :error="$v.formTienda.email.$error" @blur="$v.formTienda.email.$touch()"/>
         </div>
         <div>
           Telefono de contacto tienda
           <q-input type="tel" filled v-model="formTienda.phone"  dense placeholder="+5695331583"
           error-message="Este campo es requerido" :error="$v.formTienda.phone.$error" @blur="$v.formTienda.phone.$touch()"/>
         </div>
         <div>
           Descripción
           <q-input type="textarea" filled v-model="formTienda.descripcion" placeholder="Descripción de la tienda"
           error-message="Este campo es requerido" :error="$v.formTienda.descripcion.$error" @blur="$v.formTienda.descripcion.$touch()"/>
         </div>
          <div class="row justify-center q-mt-lg">
            <q-btn no-caps rounded color="primary" label="Siguiente" class="q-py-xs" style="width: 90%;"
            @click="siguiente2()"/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="3" class="q-pa-none">
        <div class="q-pa-lg">
          <div class="q-mb-lg text-center text-h5 text-grey-8">Dirección del local</div>
          <div class="row justify-center">
            <q-img
              src="noimg.png"
              style="height: 40%; width: 90%;"
              >
            </q-img>
          </div>
          <div class="q-mt-md">
            País
            <q-select dense filled v-model="formTienda.pais_id" :options="paises" option-value="ciudades" option-label="name" label="Selecciona el país donde vas a trabajar"
            error-message="Este campo es requerido" :error="$v.formTienda.pais_id.$error" @blur="$v.formTienda.pais_id.$touch()"/>
          </div>
          <div>
            Ciudad
            <q-select dense filled v-model="formTienda.region_id" :options="paises" option-value="ciudades" option-label="name" label="Selecciona la región donde vas a trabajar"
            error-message="Este campo es requerido" :error="$v.formTienda.region_id.$error" @blur="$v.formTienda.region_id.$touch()"/>
          </div>
          <div>
            Dirección
            <q-input filled v-model="formTienda.direccion"  dense placeholder="Escriba la dirección fisica de la tienda"
            error-message="Este campo es requerido" :error="$v.formTienda.direccion.$error" @blur="$v.formTienda.direccion.$touch()"/>
          </div>
          <div class="col row">
            <div class="col-6">
              Horario de Apertura
            </div>
            <div class="col-6">
              <q-input type="time" filled v-model="formTienda.hora_inicio" dense
              error-message="Este campo es requerido" :error="$v.formTienda.hora_inicio.$error" @blur="$v.formTienda.hora_inicio.$touch()"/>
            </div>
          </div>
          <div class="col row">
            <div class="col-6">
              Horario de cierre
            </div>
            <div class="col-6">
              <q-input type="time" filled v-model="formTienda.hora_cierre" dense
              error-message="Este campo es requerido" :error="$v.formTienda.hora_cierre.$error" @blur="$v.formTienda.hora_cierre.$touch()"/>
            </div>
          </div>
          <div><q-checkbox v-model="formTienda.despachoReg" size="xs" label="Despachos a regiones"/></div>
          <div class="q-my-md"><q-checkbox v-model="formTienda.delivery" size="xs" label="Delivery"/></div>
          <div v-if="formTienda.delivery" class="col row q-ml-lg">
            <div class="col-6">Valor del delivery</div>
            <div class="col-6 q-mb-md">
              <q-input type="number" :disable="formTienda.deliveryGratis ? true : false" filled v-model="formTienda.deliveryValor" prefix="$" dense placeholder="1000"/>
            </div>
            <q-checkbox v-model="formTienda.deliveryGratis" size="xs" label="Delivery Gratis"/>
          </div>
          <div class="row justify-center q-mt-lg">
            <q-btn no-caps rounded color="primary" label="Siguiente" class="q-py-xs" style="width: 90%;"
            @click="finalizar()"/>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      imgR: null,
      imgI: null,
      imgP: null,
      terminos: false,
      ver: false,
      slide: 1,
      imgRepresentante: '',
      imgPerfil: '',
      password: '',
      repeatPassword: '',
      form: {},
      formTienda: {
        despachoReg: false,
        delivery: false,
        deliveryGratis: false
      },
      identificacion: [],
      paises: [],
      images_ident: []
    }
  },
  validations: {
    form: {
      name: { required },
      last_name: { required },
      birthday: { required },
      phone: { required },
      email: { required, email }
    },
    formTienda: {
      name: { required },
      email: { required, email },
      phone: { required },
      descripcion: { required },
      pais_id: { required },
      region_id: { required },
      direccion: { required },
      hora_inicio: { required },
      hora_cierre: { required }
    },
    imgR: { required },
    imgP: { required },
    images_ident: { required, minLength: minLength(2) },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs('password') }
  },
  methods: {
    siguiente1 () {
      this.$v.form.$touch()
      this.$v.imgR.$touch()
      this.$v.password.$touch()
      this.$v.repeatPassword.$touch()
      this.$v.images_ident.$touch()
      /* if (!this.$v.imgR.$error) */
      this.slide = 2
    },
    siguiente2 () {
      this.$v.imgP.$touch()
      this.$v.formTienda.name.$touch()
      this.$v.formTienda.email.$touch()
      this.$v.formTienda.phone.$touch()
      this.$v.formTienda.descripcion.$touch()
      /* if (!this.$v.imgR.$error) */
      this.slide = 3
    },
    finalizar () {
      this.$v.formTienda.pais_id.$touch()
      this.$v.formTienda.region_id.$touch()
      this.$v.formTienda.direccion.$touch()
      this.$v.formTienda.hora_inicio.$touch()
      this.$v.formTienda.hora_cierre.$touch()
    },
    representante_img () {
      var im = this.imgR
      this.imgRepresentante = URL.createObjectURL(im)
    },
    identificacion_img () {
      this.images_ident.push(this.imgI)
      this.identificacion.push(URL.createObjectURL(this.imgI))
      this.imgI = null
    },
    perfil_img () {
      var im = this.imgP
      this.imgPerfil = URL.createObjectURL(im)
    }
  }
}
</script>

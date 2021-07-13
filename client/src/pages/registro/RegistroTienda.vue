<template>
  <div>
    <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn flat round color="primary" icon="arrow_back" @click="$router.go(-1)"/>
          <div class="q-mb-lg text-center text-h5 text-grey-8">Datos del Aliado</div>

          <div class="column items-center q-mb-lg">
            <q-avatar rounded style="height: 200px; width: 90%; border-radius: 25px;" class="row justify-center">
              <q-img style="height:100%; width:100%" :src="imgRepresentante != '' ? imgRepresentante : 'noimg.png'">
                <q-file borderless v-model="imgR" @input="representante_img()" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px"
                @blur="$v.imgR.$touch()">
                  <div v-if="imgRepresentante != ''" class="absolute-center column items-center">
                    <q-icon name="cloud_upload" size="75px" color="white" />
                  </div>
                </q-file>
              </q-img>
            </q-avatar>
            <div :class="$v.imgR.$error ? 'text-negative text-subtitle2 text-center' : 'text-grey-8 text-subtitle2 text-center'"> IMG Representante legal </div>
          </div>

          <div class="q-mt-sm">
            Nombre
            <q-input filled v-model="form.name"  dense placeholder="Nombre del representante legal"
            error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
          </div>
          <div>
            Apellidos
            <q-input filled v-model="form.last_name"  dense placeholder="Coloca ambos apellidos"
            error-message="Este campo es requerido" :error="$v.form.last_name.$error" @blur="$v.form.last_name.$touch()"/>
          </div>
          <div>
            Fecha de Nacimiento
            <q-input filled readonly dense v-model="form.birthday" placeholder="dd/mm/aaaa" @click="$refs.qDateProxy.show()"
            error-message="Este campo es requerido" :error="$v.form.birthday.$error" @blur="$v.form.birthday.$touch()">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.birthday" mask="DD/MM/YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Cerrar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div>
            Telefono de Contacto
            <q-input type="tel" filled v-model="form.phone"  dense placeholder="+5695331583"
            error-message="Este campo es requerido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>
          </div>
          <div>
            Correo de contacto
            <q-input filled v-model="form.email"  dense placeholder="micorreo@email.com"
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
              <div class="row q-gutter-sm">
                <div class="col q-mb-sm">
                  <div>Documento frontal</div>
                  <q-avatar rounded style="width: 100%;" class="bg-primary">
                    <q-file borderless :disable="identificacion.length < 1 ? false : true" v-model="imgI" @input="identificacion_img()" accept=".jpg, image/*" style="width: 100%; height: 100%;">
                      <div class="absolute-center text-center text-white full-width text-subtitle1 bg-transparent">Cargar imagen</div>
                    </q-file>
                  </q-avatar>
                </div>
                <div class="col q-mb-sm">
                  <div>Documento reverso</div>
                  <q-avatar rounded style="width: 100%;" class="bg-primary">
                    <q-file borderless :disable="identificacion.length < 2 ? false : true" v-model="imgI" @input="identificacion_img()" accept=".jpg, image/*" style="width: 100%; height: 100%;">
                      <div class="absolute-center text-center text-white full-width text-subtitle1 bg-transparent">Cargar imagen</div>
                    </q-file>
                  </q-avatar>
                </div>
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
            <q-checkbox v-model="terminos" size="xs" :class="textColor" label="Acepto Terminos y condiciones de uso" @input="!terminos ? textColor = 'text-red' : textColor = 'text-black'" />
          </div>
          <div class="row justify-center q-mt-lg">
            <q-btn no-caps rounded color="primary" label="Siguiente" class="q-py-xs" style="width: 90%;"
            @click="siguiente(1)"/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn flat round color="primary" icon="arrow_back" @click="slide = 1"/>
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
           <q-input filled v-model="formTienda.email"  dense placeholder="micorreo@email.com"
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
            @click="siguiente(2)"/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="3" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn flat round color="primary" icon="arrow_back" @click="slide = 2"/>
          <div class="q-mb-lg text-center text-h5 text-grey-8">Dirección del local</div>
          <div class="row justify-center">
            <q-img
              :src="imgPerfil != '' ? imgPerfil : 'noimg.png'"
              style="height: 40%; width: 90%;"
              >
            </q-img>
          </div>
          <div class="q-mt-md">
            País
            <q-select filled dense color="black" v-model="pais" :options="paises" label="Selecciona el país donde vas a trabajar" map-options
              error-message="requerido" :error="$v.pais.$error" @blur="$v.pais.$touch()" @input="ciudades = pais.ciudades, ciudad = null, $v.ciudad.$reset()"
              option-label="name" >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey text-italic">No hay Resultados</q-item-section>
                  </q-item>
                </template>
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    v-on="scope.itemEvents"
                  >
                    <q-item-section>
                      <q-item-label v-html="scope.opt.name" />
                    </q-item-section>
                  </q-item>
                </template>
            </q-select>
          </div>
          <div>
            Ciudad
            <q-select filled dense color="black" v-model="ciudad" :options="ciudades" label="Selecciona la región donde vas a trabajar" map-options
              error-message="requerido" :error="$v.ciudad.$error" @blur="$v.ciudad.$touch()"
              option-label="name" >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey text-italic">Selecciona un país</q-item-section>
                  </q-item>
                </template>
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    v-on="scope.itemEvents"
                  >
                    <q-item-section>
                      <q-item-label v-html="scope.opt.name" />
                    </q-item-section>
                  </q-item>
                </template>
            </q-select>
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
              <q-input filled dense readonly v-model="formTienda.hora_inicio" placeholder="--:--" @click="$refs.qTimeProxy1.show()"
              error-message="Este campo es requerido" :error="$v.formTienda.hora_inicio.$error" @blur="$v.formTienda.hora_inicio.$touch()">
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy ref="qTimeProxy1" transition-show="scale" transition-hide="scale">
                      <q-time v-model="formTienda.hora_inicio">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Cerrar" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="col row">
            <div class="col-6">
              Horario de cierre
            </div>
            <div class="col-6">
              <q-input filled dense readonly v-model="formTienda.hora_cierre" placeholder="--:--" @click="$refs.qTimeProxy2.show()"
              error-message="Este campo es requerido" :error="$v.formTienda.hora_cierre.$error" @blur="$v.formTienda.hora_cierre.$touch()">
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy ref="qTimeProxy2" transition-show="scale" transition-hide="scale">
                      <q-time v-model="formTienda.hora_cierre">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Cerrar" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
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
            <q-btn no-caps rounded color="primary" label="Finalizar" class="q-py-xs" style="width: 90%;"
            @click="finalizar()"/>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      imgR: null,
      imgI: null,
      imgP: null,
      pais: null,
      ciudad: null,
      terminos: false,
      ver: false,
      slide: 1,
      textColor: 'text-black',
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
      ciudades: [],
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
      direccion: { required },
      hora_inicio: { required },
      hora_cierre: { required }
    },
    imgR: { required },
    imgP: { required },
    pais: { required },
    ciudad: { required },
    images_ident: { required, minLength: minLength(2) },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs('password') }
  },
  mounted () {
    this.getPaisesCiudades()
  },
  methods: {
    ...mapMutations('generals', ['login']),
    siguiente (val) {
      if (val === 1) {
        this.$v.form.$touch()
        this.$v.imgR.$touch()
        this.$v.password.$touch()
        this.$v.repeatPassword.$touch()
        this.$v.images_ident.$touch()
        if (!this.terminos) {
          this.textColor = 'text-red'
        }
        if (!this.$v.form.$error && !this.$v.imgR.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error && !this.$v.images_ident.$error && this.terminos) {
          this.slide = 2
        }
      } else {
        this.$v.imgP.$touch()
        this.$v.formTienda.name.$touch()
        this.$v.formTienda.email.$touch()
        this.$v.formTienda.phone.$touch()
        this.$v.formTienda.descripcion.$touch()
        if (!this.$v.imgP.$error && !this.$v.formTienda.name.$error && !this.$v.formTienda.email.$error && !this.$v.formTienda.phone.$error && !this.$v.formTienda.descripcion.$error) {
          this.slide = 3
        }
      }
    },
    finalizar () {
      this.$v.pais.$touch()
      this.$v.ciudad.$touch()
      this.$v.formTienda.direccion.$touch()
      this.$v.formTienda.hora_inicio.$touch()
      this.$v.formTienda.hora_cierre.$touch()
      if (!this.$v.pais.$error && !this.$v.ciudad.$error && !this.$v.formTienda.direccion.$error && !this.$v.formTienda.hora_inicio.$error && !this.$v.formTienda.hora_cierre.$error) {
        this.$q.loading.show({
          message: 'Registrando...'
        })
        this.formTienda.country_id = this.pais._id
        this.formTienda.city_id = this.ciudad._id
        this.form.password = this.password
        this.form.tienda = this.formTienda
        var formData = new FormData()
        for (let i = 0; i < this.images_ident.length; i++) {
          formData.append('IFiles' + i, this.images_ident[i])
        }
        formData.append('RFiles', this.imgR)
        formData.append('PFiles', this.imgP)
        formData.append('dat', JSON.stringify(this.form))
        this.$api.post('register_proveedor', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Ya formas parte de PetFriendly, Bienvenido',
              color: 'positive'
            })
            this.loguear()
            this.$q.loading.hide()
          } else {
            this.$q.loading.hide()
          }
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos requeridos',
          color: 'negative'
        })
      }
    },
    loguear () {
      this.$api.post('login', this.form).then(res => {
        if (res) { // Se debe ejecutar una mutacion que modifique el state con sessionInfo
          const user = res.TRI_SESSION_INFO.roles[0]
          if (user === 3) {
            this.login(res)
            this.$router.push('/servicios_productos')
          }
        } else {
          console.log('error de ususario')
          // this.loading = false
        }
      })
    },
    getPaisesCiudades () {
      this.$api.get('pais').then(res => {
        if (res) {
          this.paises = res
        }
      })
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

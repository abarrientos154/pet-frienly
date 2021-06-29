<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary row items-center" style="width:100%; height:60px">
        <div class="col-1">
        <q-btn flat round color="white" icon="arrow_back" @click="$router.go(-1)"/>
        </div>
        <div class="col-10 text-white text-subtitle1 text-center">Mi perfil</div>
    </q-header>

    <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-lg">
          <div class="q-mb-md text-center text-h5 text-grey-8 q-mt-xl">Representante Legal</div>

          <div class="column items-center q-mb-lg">
            <q-avatar rounded style="height: 200px; width: 90%; border-radius: 25px;" class="row justify-center">
              <q-img style="height:100%; width:100%" :src="imgRepresentante">
                <q-file borderless v-model="imgR" @input="representante_img()" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px">
                    <div class="absolute-center column items-center">
                        <q-icon name="cloud_upload" size="75px" color="white" />
                    </div>
                </q-file>
              </q-img>
            </q-avatar>
            <div class="text-grey-8 text-subtitle2 text-center"> IMG Representante legal </div>
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
            <q-input filled readonly v-model="form.email"  dense placeholder="micorreo@petfriendly.com"
            />
          </div>
          <div>
              <div class="text-caption q-my-md">Imágenes de documento de identificación</div>
              <div class="row">
                <q-avatar class="q-mr-sm bg-grey col" rounded style="height: 50px;">
                  <q-img style="height: 100%;" :src="form.images_ident ? baseuIdentidad + form.images_ident[0] : ''">
                    <q-file borderless v-model="imgI" @input="identificacion_img(0)" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px">
                    </q-file>
                  </q-img>
                </q-avatar>
                <q-avatar class="bg-grey col" rounded style="height: 50px;">
                  <q-img style="height: 100%;" :src="form.images_ident ? baseuIdentidad + form.images_ident[1] : 'noimg.png'">
                    <q-file borderless v-model="imgI" @input="identificacion_img(1)" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px">
                    </q-file>
                  </q-img>
                </q-avatar>
              </div>
          </div>
          <div class="row justify-center q-mt-lg">
            <q-btn no-caps rounded color="primary" label="Siguiente" class="q-py-xs" style="width: 90%;"
            @click="siguiente(1)"/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="q-pa-lg">
          <div class="q-mb-md text-center text-h5 text-grey-8 q-mt-xl">Datos de tienda</div>

          <div class="column items-center justify-center">
            <q-avatar rounded style="height: 150px; width: 150px" class="bg-grey row justify-center">
              <q-img style="height: 100%;" :src="imgPerfil">
                <q-file borderless v-model="imgP" @input="perfil_img()" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px"
                >
                  <div class="absolute-center column items-center">
                    <q-icon name="cloud_upload" size="75px" color="white" />
                  </div>
                </q-file>
              </q-img>
            </q-avatar>
          </div>

         <div class="q-mt-md">
           Nombre de tienda
           <q-input filled v-model="formTienda.name"  dense placeholder="Nombre comercial"
           error-message="Este campo es requerido" :error="$v.formTienda.name.$error" @blur="$v.formTienda.name.$touch()"/>
         </div>
         <div>
           Correo de contacto tienda
           <q-input filled readonly v-model="formTienda.email"  dense placeholder="micorreo@petfriendly.com "
           />
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
         <div class="row justify-center q-mt-sm">
            <q-btn no-caps flat color="white" text-color="grey-9" label="Atras" style="width: 90%;"
            @click="slide = 1"/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="3" class="q-pa-none">
        <div class="q-pa-lg">
          <div class="q-mb-md text-center text-h5 text-grey-8 q-mt-xl">Dirección del local</div>
          <div class="row justify-center">
            <q-img
              src="noimg.png"
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
            <q-btn no-caps rounded color="primary" label="Finalizar" class="q-py-xs" style="width: 90%;"
            @click="finalizar()"/>
          </div>
          <div class="row justify-center q-mt-sm">
            <q-btn no-caps flat color="white" text-color="grey-9" label="Atras" style="width: 90%;"
            @click="slide = 2"/>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-layout>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      imgR: null,
      imgI: null,
      imgP: null,
      pais: null,
      ciudad: null,
      slide: 1,
      baseuPerfil: '',
      baseuTienda: '',
      baseuIdentidad: '',
      imgRepresentante: '',
      imgPerfil: '',
      form: {},
      formTienda: {
        despachoReg: false,
        delivery: false,
        deliveryGratis: false
      },
      paises: [],
      ciudades: []
    }
  },
  validations: {
    form: {
      name: { required },
      last_name: { required },
      birthday: { required },
      phone: { required }
    },
    formTienda: {
      name: { required },
      phone: { required },
      descripcion: { required },
      direccion: { required },
      hora_inicio: { required },
      hora_cierre: { required }
    },
    pais: { required },
    ciudad: { required }
  },
  mounted () {
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuTienda = env.apiUrl + 'tienda_img/'
    this.baseuIdentidad = env.apiUrl + 'identificacion_img/'
    this.getUser()
    this.getPaisesCiudades()
  },
  methods: {
    async getUser () {
      await this.$api.get('user_logueado').then(res => {
        if (res) {
          this.form = res
          this.imgRepresentante = this.baseuPerfil + this.form._id
          this.formTienda = res.tienda
          this.imgPerfil = this.baseuTienda + this.form._id
          this.pais = this.formTienda.country
          this.ciudad = this.formTienda.city
          console.log('user', res)
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
    siguiente (val) {
      if (val === 1) {
        this.$v.form.$touch()
        if (!this.$v.form.$error) {
          this.slide = 2
        }
      } else {
        this.$v.formTienda.name.$touch()
        this.$v.formTienda.phone.$touch()
        this.$v.formTienda.descripcion.$touch()
        if (!this.$v.formTienda.name.$error && !this.$v.formTienda.phone.$error && !this.$v.formTienda.descripcion.$error) {
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
          message: 'Guardando...'
        })
        this.formTienda.country_id = this.pais._id
        this.formTienda.city_id = this.ciudad._id
        this.form.tienda = this.formTienda
        this.$api.post('edit_proveedor', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Datos guardados correctamente',
              color: 'positive'
            })
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
    async representante_img () {
      this.$q.loading.show()
      if (this.imgR) {
        var formData = new FormData()
        formData.append('files', this.imgR)
        await this.$api.post('perfil_imagen', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          if (res) {
            this.$q.notify({
              message: 'Foto actualizada',
              color: 'positive'
            })
            location.reload()
            this.$q.loading.hide()
          } else {
            this.$q.loading.hide()
          }
        })
      }
    },
    async identificacion_img (val) {
      this.$q.loading.show()
      if (this.imgI) {
        var formData = new FormData()
        formData.append('files', this.imgI)
        await this.$api.post('subir_img_identidad/' + val, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          if (res) {
            this.$q.notify({
              message: 'Foto actualizada',
              color: 'positive'
            })
            location.reload()
            this.$q.loading.hide()
          } else {
            this.$q.loading.hide()
          }
        })
      }
    },
    async perfil_img () {
      this.$q.loading.show()
      if (this.imgP) {
        var formData = new FormData()
        formData.append('files', this.imgP)
        await this.$api.post('subir_img_tienda_perfil', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          if (res) {
            this.$q.notify({
              message: 'Foto actualizada',
              color: 'positive'
            })
            location.reload()
            this.$q.loading.hide()
          } else {
            this.$q.loading.hide()
          }
        })
      }
    }
  }
}
</script>

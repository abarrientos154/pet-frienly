<template>
  <div>
    <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
      <!-- <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-lg">
          <div class="q-mb-lg text-center text-h5 text-grey-6">Representante Legal</div>

          <div class="column items-center q-mb-lg">
            <q-avatar rounded style="height: 200px; width: 200px; border-radius: 25px;" class="bg-secondary">
              <q-img style="height: 100%;" :src="representImg != '' ? representImg : ''">
                <q-file  borderless v-model="img" class="button-camera" @input="represent_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%;"/>
                <q-icon name="image" class="absolute-center" size="75px" color="white" />
              </q-img>
            </q-avatar>
          </div>

          <div class="q-mb-xl">
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-mb-md">
                <div class="text-caption">Nombre</div>
                <q-input filled v-model="form.name"  dense placeholder="Nombre del representante legal" error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-mb-md">
                <div class="text-caption">Apellidos</div>
                <q-input filled v-model="form.last_name"  dense placeholder="Coloca ambos apellidos"  error-message="Este campo es requerido" :error="$v.form.last_name.$error" @blur="$v.form.last_name.$touch()"/>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-mb-md">
                <div class="text-caption">Fecha de nacimiento</div>
                <q-input filled type="date" v-model="form.birth" dense error-message="Este campo es requerido" :error="$v.form.birth.$error" @blur="$v.form.birth.$touch()"/>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-mb-md">
                <div class="text-caption">Telefono de contacto</div>
                <q-input filled v-model="form.phone"  dense placeholder="+5695331583" error-message="Este campo es requerido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>
              </div>
            </div>
            <div class="q-mb-md">
              <div class="text-caption">Correo de contacto</div>
              <q-input filled v-model="form.email" readonly dense placeholder="micorreo@petfriendly.com" error-message="Este campo es requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"/>
            </div>
            <div>
              <div class="text-caption">Imágenes de documento de identificación</div>
              <div style="width: 50%;" class="q-pr-xs q-mb-sm">
                <q-avatar rounded style="height: 50px; width: 100%;" class="bg-primary">
                  <q-file  borderless :disable="IImg.length < 2 ? false : true" v-model="img" class="button-camera" @input="identificacion_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%;"/>
                  <div class="absolute-center text-center text-white full-width text-subtitle1">Cargar imagen</div>
                </q-avatar>
              </div>
              <div class="row">
                <q-avatar class="q-mr-sm bg-secondary col" rounded style="height: 50px;">
                  <q-img style="height: 100%;" :src="identificacionImg.length ? identificacionImg[0] : ''"/>
                </q-avatar>
                <q-avatar class="bg-secondary col" rounded style="height: 50px;">
                  <q-img style="height: 100%;" :src="identificacionImg.length > 1 ? identificacionImg[1] : ''"/>
                </q-avatar>
              </div>
            </div>
          </div>

          <div class="column items-center">
            <div class="column items-center q-mb-lg">
              <q-checkbox v-model="terminos" size="xs" label="Acepto Terminos y condiciones de uso" />
              <div class="text-negative" v-if="!terminos && aparecer"> Debe Aceptar los terminos </div>
            </div>
            <q-btn class="q-pa-sm" color="primary" label="Siguiente" style="width: 70%; border-radius: 4px" @click="siguiente()" no-caps/>
          </div>
        </div>
      </q-carousel-slide> -->

      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="q-pa-lg">
          <div class="q-mb-lg text-center text-h5 text-grey-6">Datos de espacios</div>

          <div class="column items-center q-mb-lg">
            <q-avatar rounded style="height: 150px; width: 200px;" class="bg-secondary q-mb-sm">
              <q-img style="height: 100%;" :src="perfilImg != '' ? perfilImg : ''">
                <q-file  borderless v-model="img" class="button-camera" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%;"/>
                <q-icon name="backup" class="absolute-center" size="50px" color="white" />
              </q-img>
            </q-avatar>
            <div>Carga tu foto de perfil</div>
          </div>

          <div class="q-mb-lg">
            <div class="q-mb-md">
              <div class="text-caption">Nombre de espacios</div>
              <q-input  v-model="formMySpace.name" placeholder="Nombré comercial" outlined dense filled error-message="Este campo es requerido" :error="$v.formMySpace.name.$error" @blur="$v.formMySpace.name.$touch()"/>
            </div>
            <div class="q-mb-md">
              <div class="text-caption">Correo de contacto tienda</div>
              <q-input  v-model="formMySpace.email" placeholder="micorreo@petfriendly.com" outlined dense filled error-message="Este campo es requerido" :error="$v.formMySpace.email.$error" @blur="$v.formMySpace.email.$touch()"/>
            </div>
            <div class="q-mb-md">
              <div class="text-caption">Telefono de contacto tienda</div>
              <q-input  v-model="formMySpace.phone" placeholder="+5695331583" outlined dense filled error-message="Este campo es requerido" :error="$v.formMySpace.name.$phone" @blur="$v.formMySpace.phone.$touch()"/>
            </div>
            <div>
              <div class="text-caption">Descripción</div>
              <q-input filled outlined placeholder="Mi espacio es..." v-model="formMySpace.description" type="textarea" error-message="Este campo es requerido" :error="$v.formMySpace.description.$error" @blur="$v.formMySpace.description.$touch()"/>
            </div>
          </div>

          <div class="column items-center">
            <q-btn rounded class="q-pa-sm" color="primary" label="Siguiente" style="width: 70%;" @click="siguiente()" no-caps/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="3" class="q-pa-none">
        <div class="q-pa-lg">
          <div class="q-mb-lg text-center text-h5 text-grey-6">Datos de espacios</div>

          <q-avatar rounded style="height: 250px; width: 100%;" class="bg-secondary q-mb-sm">
            <q-img style="height: 100%;" :src="perfilImg != '' ? perfilImg : ''">
              <q-icon name="image" class="absolute-center" size="50px" color="white" />
            </q-img>
          </q-avatar>

          <div>
            <div class="q-mb-md">
              <div class="text-caption">País</div>
              <q-select outlined dense filled placeholder="Selecciona el país donde vas a trabajar" v-model="selectPais" :options="paises" @input="formMySpace.pais_id = selectPais[0].pais_id" option-value="ciudades" option-label="name" emit-value map-options error-message="Este campo es requerido" :error="$v.formMySpace.pais_id.$error" @blur="$v.formMySpace.pais_id.$touch()"/>
            </div>
            <div class="q-mb-md">
              <div class="text-caption">Ciudad</div>
              <q-select outlined dense filled placeholder="Seleccione la región a la que pertenece" v-model="formMySpace.ciudad_id" :options="selectPais" option-value="_id" option-label="name" emit-value map-options error-message="Este campo es requerido" :error="$v.formMySpace.ciudad_id.$error" @blur="$v.formMySpace.ciudad_id.$touch()"/>
            </div>
            <div class="q-mb-md">
              <div class="text-caption">Dirección</div>
              <q-input  v-model="formMySpace.direction" placeholder="Escriba la direccion fisica del espacio" outlined dense filled error-message="Este campo es requerido" :error="$v.formMySpace.direction.$error" @blur="$v.formMySpace.direction.$touch()"/>
            </div>
          </div>

          <div>
            <div class="row items-center q-mb-md">
              <div class="text-subtitle1 col">Horario de apertura</div>
              <div class="col column">
                <q-input type="time" filled v-model="formMySpace.hora_inicio" dense error-message="Este campo es requerido" :error="$v.formMySpace.hora_inicio.$error" @blur="$v.formMySpace.hora_inicio.$touch()"/>
              </div>
            </div>
            <div class="row items-center q-mb-md">
              <div class="text-subtitle1 col">Horario de cierre</div>
              <div class="col column">
                <q-input type="time" filled v-model="formMySpace.hora_cierre" dense error-message="Este campo es requerido" :error="$v.formMySpace.hora_cierre.$error" @blur="$v.formMySpace.hora_cierre.$touch()"/>
              </div>
            </div>
          </div>

          <div class="column items-center">
            <q-btn rounded class="q-pa-sm" color="primary" label="Actualizar" @click="modificarPerfil()" style="width: 70%;" no-caps/>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      baseuIdentif: '',
      baseuEspacio: '',
      slide: 2,
      form: {},
      formMySpace: {},
      paisUser: null,
      cityUser: null,
      representImg: '',
      RLImg: {},
      identificacionImg: [],
      IImg: [],
      idt: 0,
      perfilImg: '',
      PImg: {},
      paises: [],
      selectPais: [],
      img: null,
      terminos: false,
      aparecer: false,
      ver: false
    }
  },
  validations: {
    /* form: {
      name: { required },
      last_name: { required },
      birth: { required },
      phone: { required },
      email: { required, email }
    }, */
    formMySpace: {
      name: { required },
      email: { required, email },
      phone: { required },
      description: { required },
      pais_id: { required },
      ciudad_id: { required },
      direction: { required },
      hora_inicio: { required },
      hora_cierre: { required }
    }
  },
  mounted () {
    this.getUser()
    this.getPaises()
  },
  methods: {
    getUser () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.form = res
          this.formMySpace = this.form.my_space
          this.baseu = env.apiUrl + 'perfil_img/'
          this.baseuIdentif = env.apiUrl + 'identificacion_img/'
          this.baseuEspacio = env.apiUrl + 'espacio_img/'
          // console.log(this.form)
          console.log(this.formMySpace)
          this.representImg = this.baseu + this.form._id
          this.identificacionImg.push(this.baseuIdentif + this.form.identificationFiles[0])
          this.identificacionImg.push(this.baseuIdentif + this.form.identificationFiles[1])
          this.perfilImg = this.baseuEspacio + this.form.spaceFile.name
          this.terminos = true
        }
      })
    },
    getPaises () {
      this.$api.get('pais').then(res => {
        if (res) {
          this.paises = res
          this.paisUser = this.paises.filter(v => v._id === this.formMySpace.pais_id)
          this.selectPais = this.paisUser[0].ciudades
          this.cityUser = this.selectPais.filter(v => v._id === this.formMySpace.ciudad_id)
          console.log(this.paisUser)
          console.log(this.cityUser)
          console.log(this.paises)
        }
      })
    },
    siguiente () {
      if (this.slide === 1) {
        /* this.$v.form.$touch()
        if (!this.$v.form.$error && this.terminos) {
          this.slide = 2
        } else {
          this.$q.notify({
            message: 'Debe ingresar todos los datos correspondientes para continuar',
            color: 'negative'
          })
          this.aparecer = true
        } */
      } else if (this.slide === 2) {
        this.$v.formMySpace.name.$touch()
        this.$v.formMySpace.email.$touch()
        this.$v.formMySpace.phone.$touch()
        this.$v.formMySpace.description.$touch()
        if (!this.$v.formMySpace.name.$error && !this.$v.formMySpace.email.$error && !this.$v.formMySpace.phone.$error && !this.$v.formMySpace.description.$error) {
          this.slide = 3
        } else {
          this.$q.notify({
            message: 'Debe ingresar todos los datos correspondientes para continuar',
            color: 'negative'
          })
        }
      }
    },
    represent_img () {
      /* this.RLImg = this.img
      this.representImg = URL.createObjectURL(this.img)
      this.img = null
      this.form.RLImg = this.RLImg */
    },
    perfil_img () {
      this.PImg = this.img
      this.perfilImg = URL.createObjectURL(this.img)
      this.img = null
      this.form.PImg = this.PImg
    },
    identificacion_img () {
      /* this.IImg[this.idt] = this.img
      this.identificacionImg[this.idt] = URL.createObjectURL(this.img)
      this.img = null
      this.form.IImg = this.IImg
      if (this.idt === 1) {
        this.idt = 0
      } else {
        this.idt++
      } */
    },
    modificarPerfil () {
      // this.$v.form.$touch()
      this.$v.formMySpace.$touch()
      if (!this.$v.formMySpace.$error) {
        this.$q.loading.show({
          message: 'Actualizando...'
        })
        this.form.my_space = this.formMySpace
        console.log(this.form)
        var formData = new FormData()
        // var files = []
        var files2 = []
        // files[0] = this.RLImg
        files2[0] = this.PImg
        /* for (let i = 0; i < this.IImg.length; i++) {
          formData.append('IFiles' + i, this.IImg[i])
        } */
        // formData.append('RLFiles', files[0])
        formData.append('PFiles', files2[0])
        formData.append('dat', JSON.stringify(this.form))
        this.$api.post('update_hospedador', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Tu perfil a sido actualizado correctamente',
              color: 'positive'
            })
            this.$router.push('/inicio_hospedador')
          }
          this.$q.loading.hide()
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
        // this.aparecer = true
      }
    }
  }
}
</script>

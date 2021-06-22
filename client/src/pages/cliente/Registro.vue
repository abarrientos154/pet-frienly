<template>
  <div>
    <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-lg">
        <q-btn flat rounded color="primary" icon="arrow_back" @click="$router.go(-1)"/>
          <div class="column items-center justify-center q-mb-md" style="padding-top: 20px">
            <q-checkbox v-model="terms" size="xs" label="">
              <div class="text-caption">Acepto Terminos y condiciones de uso</div>
            </q-checkbox>
            <div class="text-negative text-h7" v-if="!terms && appear"> Debe Aceptar los terminos </div>
          </div>
          <div class="row justify-center">
            <q-avatar size="200px">
              <img :src="perfilFile ? imgPerfil : 'noimg.png'" style="width: 150%">
                <q-file borderless v-model="perfilFile" class="absolute-center button-subir" @input="changeProfile()" accept=".jpg, image/*" style="z-index:1">
                  <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
                </q-file>
            </q-avatar>
          </div>
          <div class="text-h4" color="black" style="text-align: center">¿Eres fanatico de las mascotas?</div>
         <div class="q-mx-xl">
           <div style="text-align: left; padding-top: 20px">
             <div class="text-caption q-ml-md">Nombre de Usuario</div>
             <q-input filled v-model="form.name" dense placeholder="Nombre de usuario" error-message="Requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
           </div>
           <div style="text-align: left; padding-top: 20px">
             <div class="text-caption q-ml-md">Correo Electrónico</div>
             <q-input filled v-model="form.email"  dense placeholder="Correo Electrónico" error-message="Requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"/>
           </div>
           <div style="text-align: left; padding-top: 20px">
             <div class="text-caption q-ml-md">Número de Teléfono</div>
             <q-input filled v-model="form.phone"  dense placeholder="+34543234" error-message="Requerido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>
           </div>
           <div style="text-align: left; padding-top: 20px">
             <div class="text-caption q-ml-md">Contraseña</div>
             <q-input :type="isPwd ? 'password' : 'text'" dense v-model="password" filled
                  error-message="ingrese una contraseña valida, minimo 6 caracteres" :error="$v.password.$error" @blur="$v.password.$touch()">
                </q-input>
           </div>
           <div style="text-align: left; padding-top: 20px">
             <div class="text-caption q-ml-md">Repite contraseña</div>
                <q-input :type="isPwd ? 'password' : 'text'" dense v-model="repeatPassword" filled
                  error-message="ingrese una contraseña valida, minimo 6 caracteres" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()">
                </q-input>
           </div>
         </div>
          <q-btn color="primary" label="Siguiente" style="width: 100%; margin-top: 20px; border-radius: 10px" @click="next()" class="q-py-sm"/>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn flat rounded color="primary" icon="arrow_back" @click="slide = 1"/>
          <div class="text-h4" color="black" style="text-align: center">Información de despacho</div>
         <q-card style="height: 150px" class="q-mx-xl q-my-xl bg-primary"></q-card>
         <div class="q-mx-xl">
           <div style="text-align: left; padding-top: 20px">
             <div class="text-caption q-ml-md">Pais</div>
             <q-select outlined dense filled v-model="formTwo.country_id" :options="countries" option-value="_id" option-label="name" emit-value map-options error-message="Este campo es requerido" :error="$v.formTwo.country_id.$error" @blur="$v.formTwo.country_id.$touch()" @input="getCitiesById(formTwo.country_id)" label="Escoja un pais">
             </q-select>
           </div>
           <div style="text-align: left; padding-top: 20px">
             <div class="text-caption q-ml-md">Ciudad</div>
             <q-select outlined dense filled v-model="formTwo.city_id" :options="cities" option-value="_id" option-label="name" emit-value map-options error-message="Este campo es requerido" :error="$v.formTwo.city_id.$error" @blur="$v.formTwo.city_id.$touch()" label="Escoja una ciudad">
            </q-select>
           </div>
           <div style="text-align: left; padding-top: 20px">
             <div class="text-caption q-ml-md">Dirección</div>
             <q-input type="tel" filled v-model="formTwo.address"  dense placeholder="Ingrese su dirección" error-message="Requerido" :error="$v.formTwo.address.$error" @blur="$v.formTwo.address.$touch()"/>
           </div>
         </div>
          <q-btn color="primary" label="Siguiente" style="width: 100%; margin-top: 20px; border-radius: 10px" @click="nextTwo()" class="q-py-sm"/>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn flat rounded color="primary" icon="arrow_back" @click="slide=2"/>
          <q-card style="height: 150px" class="q-mx-xl q-my-xl bg-primary"></q-card>
          <div class="text-h4" color="black" style="text-align: center">Cuentanos de tu mascota</div>
         <div style="text-align: left; padding-top: 20px">
          Fotos de tu mascota
          <div class="text-subtitle2">Puede cargar hasta 3 fotos</div>
          <div class="row justify-around q-my-md">
            <q-avatar square size="80px">
              <img :src="files[0] ? petImg[0] : 'petnoimg.png'" style="width: 150%">
                <q-file borderless v-model="files[0]" class="absolute-center button-subir" @input="changePetFile(0)" accept=".jpg, image/*" style="z-index:1">
                  <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
                </q-file>
            </q-avatar>
            <q-avatar square size="80px">
              <img :src="files[1] ? petImg[1] : 'petnoimg.png'" style="width: 150%">
                <q-file borderless v-model="files[1]" class="absolute-center button-subir" @input="changePetFile(1)" accept=".jpg, image/*" style="z-index:1">
                  <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
                </q-file>
            </q-avatar>
            <q-avatar square size="80px">
              <img :src="files[2] ? petImg[2] : 'petnoimg.png'" style="width: 150%">
                <q-file borderless v-model="files[2]" class="absolute-center button-subir" @input="changePetFile(2)" accept=".jpg, image/*" style="z-index:1">
                  <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
                </q-file>
            </q-avatar>
          </div>
         </div>
         <div style="text-align: left; padding-top: 20px">
           Nombre de mascota
           <q-input filled v-model="formThree.name"  dense placeholder="Nombre Mascota" error-message="Requerido" :error="$v.formThree.name.$error" @blur="$v.formThree.name.$touch()"/>
         </div>
         <div style="text-align: left; padding-top: 20px">
           ¿Qué tipo de mascota tienes?
           <q-input filled v-model="formThree.type"  dense placeholder="Escoja un tipo" error-message="Requerido" :error="$v.formThree.type.$error" @blur="$v.formThree.type.$touch()"/>
         </div>
         <div style="text-align: left; padding-top: 20px">
           Raza
           <q-input type="tel" filled v-model="formThree.race"  dense placeholder="Escoja una raza" error-message="Requerido" :error="$v.formThree.race.$error" @blur="$v.formThree.race.$touch()"/>
         </div>
         <div style="text-align: left; padding-top: 20px">
           Tamaño
           <q-input type="tel" filled v-model="formThree.size"  dense placeholder="indique el tamaño" error-message="Requerido" :error="$v.formThree.size.$error" @blur="$v.formThree.size.$touch()"/>
         </div>
         <div style="text-align: left; padding-top: 20px; width: 100%;">
           Descripción
           <q-input type="textarea" filled v-model="formThree.description" error-message="Requerido" :error="$v.formThree.description.$error" @blur="$v.formThree.description.$touch()"/>
         </div>
         <q-btn color="primary" label="Siguiente" style="width: 100%; margin-top: 20px; border-radius: 10px" @click="finish()"/>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="4" class="q-pa-none" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4" color="white">¡Tu mascota ha sido</div>
          <div class="text-h4" color="white">creada con exito!</div>
        </div>
        <div class="absolute-bottom custom-captionTwo row justify-center">
          <q-btn class="q-mx-xl" color="primary" label="Ir al Inicio" style="width: 100%; margin-top: 20px; border-radius: 10px" to="/inicio_cliente"/>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import { required, sameAs, maxLength, minLength, email } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      slide: 2,
      form: {},
      formTwo: {},
      formThree: {},
      files: [null, null, null],
      petImg: [null, null, null],
      perfilFile: null,
      imgPerfil: '',
      countries: [],
      cities: [],
      terms: false,
      isPwd: true,
      password: '',
      repeatPassword: '',
      appear: false,
      formLogin: null
    }
  },
  validations: {
    form: {
      name: { required },
      email: { required, email },
      phone: { required }
    },
    formTwo: {
      country_id: { required },
      city_id: { required },
      address: { required }
    },
    formThree: {
      name: { required },
      type: { required },
      race: { required },
      size: { required },
      description: { required }
    },
    repeatPassword: { sameAsPassword: sameAs('password') },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) },
    perfilFile: { required }
  },
  mounted () {
    this.getCountries()
  },
  methods: {
    ...mapMutations('generals', ['login']),
    next () {
      this.$v.form.$touch()
      this.$v.repeatPassword.$touch()
      this.$v.password.$touch()
      this.$v.perfilFile.$touch()
      if (!this.terms) {
        this.appear = true
      }
      if (!this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error && !this.$v.perfilFile.$error && this.terms) {
        this.form.password = this.password
        this.slide = 2
      } else {
        this.$q.notify({
          message: 'Debes ingresar todos los datos requeridos',
          color: 'negative'
        })
      }
    },
    nextTwo () {
      this.$v.formTwo.$touch()
      if (!this.$v.formTwo.$error) {
        this.form = { ...this.form, ...this.formTwo }
        console.log('this.form :>> ', this.form)
        this.formLogin = {
          email: this.form.email,
          password: this.form.password
        }
        this.slide = 3
      } else {
        this.$q.notify({
          message: 'Debes ingresar todos los datos requeridos',
          color: 'negative'
        })
      }
    },
    async finish () {
      this.$q.loading.show()
      this.$v.formThree.$touch()
      if (!this.$v.formThree.$error) {
        console.log('this.form :>> ', this.form)
        await this.saveUser()
        await this.$api.post('login', this.formLogin).then(res => {
          if (res) {
            this.user = res.TRI_SESSION_INFO
            console.log('user', this.user)

            this.login(res)
          }
        })
        await this.savePet()
        this.$q.loading.hide()
        this.slide = 4
      } else {
        this.$q.notify({
          message: 'Debes ingresar todos los datos requeridos',
          color: 'negative'
        })
        this.$q.loading.hide()
      }
    },
    async savePet () {
      const formDataTwo = new FormData()
      if (this.files) {
        this.formThree.cantidadArchivos = this.files.length
        for (let i = 0; i < this.files.length; i++) {
          formDataTwo.append('album' + i, this.files[i])
        }
      } else {
        this.form.cantidadArchivos = 0
      }
      formDataTwo.append('dat', JSON.stringify(this.formThree))
      await this.$api.post('mascota', formDataTwo, {
        headers: {
          'Content-Type': undefined
        }
      }).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Tu mascota ya forma parte de PeT, Bienvenido',
            color: 'positive'
          })
        }
      })
    },
    async saveUser () {
      const formData = new FormData()
      const files = []
      files[0] = this.perfilFile
      formData.append('perfilFile', files[0])
      formData.append('dat', JSON.stringify(this.form))
      await this.$api.post('register_client', formData, {
        headers: {
          'Content-Type': undefined
        }
      }).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Ya formas parte de PeT, Bienvenido',
            color: 'positive'
          })
        }
      })
    },
    async getCountries () {
      await this.$api.get('pais').then(res => {
        if (res) {
          this.countries = res
          console.log('countries :>> ', this.countries)
        }
      })
    },
    async getCitiesById (id) {
      await this.$api.get('cityByCountry/' + id).then(res => {
        if (res) {
          this.cities = res
          console.log('cities :>> ', this.cities)
        }
      })
    },
    changeProfile () {
      if (this.perfilFile) { this.imgPerfil = URL.createObjectURL(this.perfilFile) }
    },
    changePetFile (ind) {
      if (this.files[ind]) { this.petImg[ind] = URL.createObjectURL(this.files[ind]) }
    }
  }
}
</script>
<style scoped lang="scss">
.button-subir {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: #0016b0;
  background-color: $primary;
  border-radius: 30px;
  border: 1px solid #7e7e7e;
  height:40px;
  width: 40px;
}
.custom-caption {
  text-align: left;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 10px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
  margin-bottom: 40%;
}
.custom-captionTwo {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
  }
</style>

<template>
  <div>
    <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-lg">
        <q-btn flat rounded color="primary" icon="arrow_back" @click="$router.go(-1)"/>
          <div class="row justify-center">
            <q-avatar size="200px" class="bg-grey row justify-center">
              <q-img :src="perfilFile ? imgPerfil : ''" style="height: 100%">
                <q-file borderless v-model="perfilFile" @input="changeProfile()" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px">
                  <q-icon name="photo_camera" class="absolute-center" size="50px" color="white" />
                </q-file>
              </q-img>
            </q-avatar>
          </div>
          <div class="text-center text-h5 text-grey-8">¿Eres fanatico de las mascotas?</div>
         <div class="q-mx-lg">
          <div class="q-mt-sm">
            Nombre de Usuario
            <q-input filled v-model="form.name"  dense placeholder="Nombre de usuario"
            error-message="Requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
          </div>
          <div>
            Número de Teléfono
            <q-input filled v-model="form.phone"  dense placeholder="+5695331583"
            error-message="Requerido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>
          </div>
          <div>
            Correo Electrónico
            <q-input filled v-model="form.email"  dense placeholder="Correo Electrónico"
            error-message="Requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"/>
          </div>
           <div>
             <div>Contraseña</div>
             <q-input :type="isPwd ? 'password' : 'text'" v-model="password" placeholder="Contraseña" dense
                filled error-message="Ingrese una contraseña válida, mínimo 6 caracteres" :error="$v.password.$error" @blur="$v.password.$touch()">
                  <template v-slot:append>
                    <q-icon :name="!isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
                  </template>
                </q-input>
           </div>
           <div>
             <div>Repite contraseña</div>
                <q-input :type="isPwd ? 'password' : 'text'" dense v-model="repeatPassword" filled
                  error-message="Las contraseñas deben ser iguales" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()">
                </q-input>
           </div>
         </div>
         <div class="column items-center justify-center q-mb-md">
            <q-checkbox v-model="terms" size="xs" label="">
              <div>Acepto Terminos y condiciones de uso</div>
            </q-checkbox>
            <div class="text-negative text-h7" v-if="!terms && appear"> Debe Aceptar los terminos </div>
          </div>
         <div class="column items-center">
           <q-btn rounded class="q-pa-sm" color="primary" label="Siguiente" style="width: 70%;" @click="next()"/>
         </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn flat rounded color="primary" icon="arrow_back" @click="slide = 1"/>
          <div class="text-center text-h5 text-grey-8 q-mb-xs">Información de despacho</div>
          <div class="row justify-center q-px-lg">
            <q-avatar rounded style="height: 250px; width: 100%;" class="bg-grey q-mb-sm">
              <q-img style="height: 100%;" :src="perfilFile ? imgPerfil : ''">
              </q-img>
            </q-avatar>
          </div>

         <div class="q-mx-lg">
           <div>
              <div class="text-caption">País</div>
              <q-select outlined dense filled placeholder="Escoja un pais" v-model="country" :options="countries" @input="cities = country.ciudades, city = null" option-label="name" map-options
              error-message="Este campo es requerido" :error="$v.country.$error" @blur="$v.country.$touch()">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey text-italic">No hay Resultados</q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div>
              <div class="text-caption">Ciudad</div>
              <q-select outlined dense filled placeholder="Escoja una ciudad" v-model="city" :options="cities" option-label="name" map-options
              error-message="Este campo es requerido" :error="$v.city.$error" @blur="$v.city.$touch()">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey text-italic">Selecciona un país</q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
           <div>
             <div>Dirección</div>
             <q-input type="tel" filled v-model="formTwo.address"  dense placeholder="Ingrese su dirección" error-message="Requerido" :error="$v.formTwo.address.$error" @blur="$v.formTwo.address.$touch()"/>
           </div>
         </div>
         <div class="column items-center">
           <q-btn rounded class="q-pa-sm" color="primary" label="Siguiente" style="width: 70%;" @click="nextTwo()"/>
         </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="3" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn flat rounded color="primary" icon="arrow_back" @click="slide=2"/>
          <q-card style="height: 150px" class="q-mx-xl q-my-xl bg-grey">
            <q-img style="height: 100%;" :src="files[0] ? petImg[0] : ''">
            </q-img>
          </q-card>
          <div class="text-center text-h5 text-grey-8">Cuentanos de tu <br> mascota</div>
         <div style="text-align: left; padding-top: 20px">
          <div class="text-subtitle2 q-ml-md">Fotos de tu mascota</div>
          <div class="text-overline q-ml-md">Puede cargar hasta 3 fotos</div>
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
         <div>
           <div>Nombre de mascota</div>
           <div class="text-overline q-ml-md">Solo 25 caracteres</div>
           <q-input filled v-model="formThree.name"  dense error-message="Requerido" :error="$v.formThree.name.$error" @blur="$v.formThree.name.$touch()"/>
         </div>
         <div>
           <div>Edad</div>
           <div class="text-overline q-ml-md">¿Cuántos años tiene tu mascota?</div>
           <q-input type="number" min="0" filled v-model.number="formThree.age"  dense error-message="Requerido" :error="$v.formThree.age.$error" @blur="$v.formThree.age.$touch()"/>
         </div>
         <div>
           <div>Fecha de nacimiento</div>
           <div class="text-overline q-ml-md">¿Cuándo nacio tu mascota?</div>
           <q-input filled readonly dense v-model="formThree.birthdate" placeholder="dd/mm/aaaa" @click="$refs.qDateProxy.show()"
            error-message="Este campo es requerido" :error="$v.formThree.birthdate.$error" @blur="$v.formThree.birthdate.$touch()">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="formThree.birthdate" mask="DD/MM/YYYY">
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
           <div>¿Qué tipo de mascota tienes?</div>
           <div class="text-overline q-ml-md">Selecciona el tipo de mascota</div>
           <q-select filled v-model="formThree.type"  dense placeholder="Escoja un tipo" error-message="Requerido" :error="$v.formThree.type.$error" @blur="$v.formThree.type.$touch()" option-value="name" option-label="name" emit-value map-options :options="petType" @input="getSize(formThree.type)">
          </q-select>
         </div>
         <div>
           <div>Raza</div>
           <div class="text-overline q-ml-md">¿Qué raza es tu mascota?</div>
           <q-input type="tel" filled v-model="formThree.race"  dense placeholder="Escoja una raza" error-message="Requerido" :error="$v.formThree.race.$error" @blur="$v.formThree.race.$touch()"/>
         </div>
         <div>
           <div>Tamaño</div>
           <div class="text-overline q-ml-md">Tamaño de tu mascota</div>
           <q-select filled v-model="formThree.size"  dense placeholder="indique el tamaño" error-message="Requerido" :error="$v.formThree.size.$error" @blur="$v.formThree.size.$touch()" option-value="name" option-label="name" emit-value map-options :options="sizes">
          </q-select>
         </div>
         <div>
           <div>Descripción</div>
           <div class="text-overline q-ml-md">Hasta 100 caracteres</div>
           <q-input type="textarea" filled v-model="formThree.description" error-message="Requerido" :error="$v.formThree.description.$error" @blur="$v.formThree.description.$touch()"/>
         </div>
         <div class="column items-center">
           <q-btn rounded class="q-pa-sm" color="primary" label="Siguiente" style="width: 70%;" @click="finish()"/>
         </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="4" class="q-pa-none" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4" color="white">¡Tu mascota ha sido</div>
          <div class="text-h4" color="white">creada con exito!</div>
        </div>
        <div class="absolute-bottom custom-captionTwo row justify-center">
          <q-btn no-caps rounded class="q-mx-xl q-py-sm" color="primary" label="Ir al Inicio" style="width: 100%;" to="/inicio_cliente"/>
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
      terms: false,
      isPwd: true,
      appear: false,
      formLogin: null,
      country: null,
      city: null,
      slide: 1,
      password: '',
      repeatPassword: '',
      imgPerfil: '',
      form: {},
      formTwo: {},
      formThree: {},
      files: [null, null, null],
      petImg: [null, null, null],
      perfilFile: null,
      countries: [],
      cities: [],
      sizeDog: [
        { name: 'Pequeño', value: 1 },
        { name: 'Mediano', value: 2 },
        { name: 'Intermedio', value: 3 },
        { name: 'Grande', value: 4 }
      ],
      sizeCat: [
        { name: 'Pequeño', value: 1 },
        { name: 'Grande', value: 4 }
      ],
      petType: [
        { name: 'Perro', value: 1 },
        { name: 'Gato', value: 2 }
      ],
      sizes: []
    }
  },
  validations: {
    form: {
      name: { required },
      email: { required, email },
      phone: { required }
    },
    formTwo: {
      address: { required }
    },
    country: { required },
    city: { required },
    formThree: {
      name: { required, maxLength: maxLength(25) },
      age: { required },
      birthdate: { required },
      type: { required },
      race: { required },
      size: { required },
      description: { required, maxLength: maxLength(100) }
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
    getSize (value) {
      if (value === 'Perro') {
        this.sizes = [...this.sizeDog]
      } else if (value === 'Gato') {
        this.sizes = [...this.sizeCat]
      }
    },
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
      this.$v.country.$touch()
      this.$v.city.$touch()
      if (!this.$v.formTwo.$error && !this.$v.country.$error && !this.$v.city.$error) {
        this.formTwo.country_id = this.country._id
        this.formTwo.city_id = this.city._id
        this.form = { ...this.form, ...this.formTwo }
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
        await this.saveUser()
        await this.$api.post('login', this.formLogin).then(res => {
          if (res) {
            this.user = res.TRI_SESSION_INFO

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
          /* this.$q.notify({
            message: 'Tu mascota ya forma parte de PeT, Bienvenido',
            color: 'positive'
          }) */
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

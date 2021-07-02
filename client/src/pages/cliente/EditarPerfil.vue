<template>
  <div>
    <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-lg">
        <q-btn flat rounded color="primary" icon="arrow_back" @click="$router.go(-1)"/>
          <div class="text-center text-h5 text-grey-8">Editar Perfil</div>
          <div class="row justify-center">
            <q-avatar size="200px" class="bg-grey row justify-center">
              <q-img :src="perfilFile ? imgPerfil : ''" style="height: 100%">
                <q-file borderless v-model="perfilFile" @input="changeProfile(perfilFile)" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px">
                  <q-icon name="photo_camera" class="absolute-center" size="50px" color="white" />
                </q-file>
              </q-img>
            </q-avatar>
          </div>
         <div class="q-mx-xl">
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
         </div>
          <q-btn color="primary" label="Siguiente" style="width: 100%; margin-top: 20px; border-radius: 10px" @click="next()" class="q-py-sm"/>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn flat rounded color="primary" icon="arrow_back" @click="slide = 1"/>
          <div class="text-center text-h5 text-grey-8">Información de despacho</div>
         <q-card style="height: 150px" class="q-mx-xl q-my-xl bg-primary"></q-card>
         <div class="q-mx-xl">
           <div class="q-mb-md">
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
            <div class="q-mb-md">
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
          <q-btn color="primary" label="Siguiente" style="width: 100%; margin-top: 20px; border-radius: 10px" @click="nextTwo()" class="q-py-sm"/>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import env from '../../env'
import { required, email } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      formLogin: null,
      country: null,
      city: null,
      slide: 1,
      imgPerfil: '',
      form: {},
      formTwo: {},
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
    perfilFile: { required }
  },
  mounted () {
    this.getCountries()
    this.getUser()
  },
  methods: {
    ...mapMutations('generals', ['login']),
    async getUser () {
      await this.$api.get('clientById/' + this.$route.params.id).then(res => {
        if (res) {
          this.imgPerfil = env.apiUrl + 'perfil_img/' + res._id
          this.perfilFile = 1
          this.form.name = res.name
          this.form.email = res.email
          this.form.phone = res.phone
          this.formTwo.address = res.address
          this.country = res.country
          this.city = res.city
          console.log('res :>> ', this.imgPerfil)
        }
      })
    },
    getSize (value) {
      if (value === 'Perro') {
        this.sizes = [...this.sizeDog]
      } else if (value === 'Gato') {
        this.sizes = [...this.sizeCat]
      }
    },
    next () {
      this.$v.form.$touch()
      this.$v.perfilFile.$touch()
      if (!this.$v.form.$error && !this.$v.perfilFile.$error) {
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
          console.log(this.countries)
        }
      })
    },
    changeProfile (file) {
      if (file) {
        this.imgPerfil = URL.createObjectURL(file)
      }
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

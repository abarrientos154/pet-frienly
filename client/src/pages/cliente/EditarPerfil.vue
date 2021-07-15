<template>
  <div>
    <q-header elevated class="bg-primary row items-center" style="width:100%; height:60px">
        <div class="col-1">
        <q-btn flat round color="white" icon="arrow_back" @click="$router.go(-1)"/>
        </div>
        <div class="col-10 text-white text-subtitle1 text-center">Mi perfil</div>
    </q-header>

    <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-md">
          <div class="row justify-center">
            <q-avatar size="200px" class="row justify-center">
              <q-img :src="imgPerfil" style="height: 100%">
                <q-file borderless v-model="perfilFile" @input="changeProfile()" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px">
                  <q-icon name="photo_camera" class="absolute-center" size="50px" color="white" />
                </q-file>
              </q-img>
            </q-avatar>
          </div>
         <div class="q-mx-xl">
          <div class="q-mt-md">
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
            <q-input filled readonly v-model="form.email"  dense placeholder="Correo Electrónico"
            error-message="Requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"/>
          </div>
         </div>
         <div class="row justify-center q-mt-lg">
           <q-btn rounded no-caps color="primary" label="Siguiente" style="width: 90%;" @click="next()" class="q-py-xs"/>
         </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="q-pa-md">
          <div class="text-center text-h5 text-grey-8 q-mb-xs">Información de despacho</div>
          <div class="row justify-center q-px-lg">
            <q-avatar rounded style="height: 250px; width: 100%;" class="bg-grey q-mb-sm">
              <q-img style="height: 100%;" :src="imgPerfil">
              </q-img>
            </q-avatar>
          </div>
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
         <div class="row justify-center q-mt-lg">
            <q-btn no-caps rounded color="primary" label="Finalizar" class="q-py-xs" style="width: 90%;"
            @click="finish()"/>
          </div>
         <div class="row justify-center q-mt-sm">
            <q-btn no-caps flat color="white" text-color="grey-9" label="Atras" style="width: 90%;"
            @click="slide = 1"/>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import env from '../../env'
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      country: null,
      city: null,
      perfilFile: null,
      slide: 1,
      imgPerfil: '',
      form: {},
      formTwo: {},
      countries: [],
      cities: []
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
    async getUser () {
      await this.$api.get('clientById/' + this.$route.params.id).then(res => {
        if (res) {
          this.imgPerfil = env.apiUrl + 'perfil_img/' + res._id
          this.form.name = res.name
          this.form.email = res.email
          this.form.phone = res.phone
          this.formTwo.address = res.address
          this.country = res.country
          this.city = res.city
        }
      })
    },
    next () {
      this.$v.form.$touch()
      this.$v.perfilFile.$touch()
      if (!this.$v.form.$error) {
        this.slide = 2
      } else {
        this.$q.notify({
          message: 'Debes ingresar todos los datos requeridos',
          color: 'negative'
        })
      }
    },
    finish () {
      this.$v.formTwo.$touch()
      this.$v.country.$touch()
      this.$v.city.$touch()
      if (!this.$v.formTwo.$error && !this.$v.country.$error && !this.$v.city.$error) {
        this.formTwo.country_id = this.country._id
        this.formTwo.city_id = this.city._id
        this.form = { ...this.form, ...this.formTwo }
        this.updateUser()
        this.$router.push('/inicio')
      } else {
        this.$q.notify({
          message: 'Debes ingresar todos los datos requeridos',
          color: 'negative'
        })
      }
    },
    async updateUser () {
      this.$q.loading.show({
        message: 'Guardando...'
      })
      await this.$api.post('update_client', this.form).then(res => {
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
    },
    async getCountries () {
      await this.$api.get('pais').then(res => {
        if (res) {
          this.countries = res
        }
      })
    },
    async changeProfile () {
      this.$q.loading.show()
      if (this.perfilFile) {
        var formData = new FormData()
        formData.append('files', this.perfilFile)
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

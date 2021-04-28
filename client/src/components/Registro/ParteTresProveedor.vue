<template>
  <div>
    <div class="column items-center justify-center">
      <q-avatar size="150px">
        <img :src="imgPerfil ? imgPerfil : 'noimg.png'">
        <q-file borderless v-model="perfilFile" class="absolute-center button-subir" @input="test" accept=".jpg, image/*" style="z-index:1">
          <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
        </q-file>
      </q-avatar>
      <div class="text-negative text-h7" v-if="$v.perfilFile.$error"> La imagen es Requerida </div>
    </div>
    <q-card v-if="imgTienda.length > 0" class="q-pa-md bg-white full-width">
      <q-scroll-area horizontal style="height: 110px; width:100%">
        <div class="row no-wrap" style="width: 100%">
          <div v-ripple v-for="(item, index) in imgTienda" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index">
            <q-img :src="imgTienda.length > 0 ? imgTienda[index] : 'favicon.ico'" spinner-color="white" style="height: 100px; width: 100px" />
          </div>
        </div>
      </q-scroll-area>
    </q-card>
    <div class="column items-center text-center justify-center">
      <div class="q-pa-sm q-mb-sm text-black text-h5"> Registro de tienda</div>
    </div>
    <div class="row q-pa-sm">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div class="q-pl-lg text-black text-caption"> Correo electronico</div>
          <q-input v-model="form.email" type="email" label="Correo electronico" outlined filled
            dense error-message="Ingrese un email válido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()">
            <template v-slot:before>
              <q-icon name="email" color="primary" />
            </template>
          </q-input>
      </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div class="q-pl-lg text-black text-caption"> Contraseña</div>
            <q-input  v-model="password" label="Contraseña" outlined dense filled
              error-message="Ingrese una contraseña válida, mínimo 6 caracteres" :error="$v.password.$error" @blur="$v.password.$touch()">
              <template v-slot:before>
                <q-icon name="vpn_key" color="primary" />
              </template>
            </q-input>
        </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="q-pl-lg q-pa-sm text-black text-caption"> Repite Contraseña</div>
              <q-input v-model="repeatPassword" label="Repita su Contraseña" outlined
                dense filled error-message="Las contraseñas deben ser iguales" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()">
                <template v-slot:before>
                  <q-icon name="vpn_key" color="primary" />
                </template>
              </q-input>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="q-pl-lg text-black text-caption"> Ingrese sus Imagenes Aqui</div>
            <q-file max-files="5" style="width: 100%" @input="tienda" filled accept=".jpg, image/*" multiple append v-model="tiendaFiles" outlined label="Imagenes permitidas (5)">
              <template v-slot:before>
              <q-icon name="attachment" color="primary" @click="tiendaFiles = [], imgTienda = []" class="cursor-pointer" />
              </template>

              <template v-slot:append>
              <q-icon name="close" color="negative" @click="tiendaFiles = [], imgTienda = []" class="cursor-pointer" />
              </template>
            </q-file>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="q-pl-lg text-black text-caption"> Nombre de la tienda</div>
            <q-input v-model="form.name" outlined filled
              dense error-message="Ingrese un nombre válido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()">
              <template v-slot:before>
                <q-icon name="person" color="primary" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="q-pl-lg text-black text-caption"> Numero indentificador de la empresa</div>
            <q-input v-model="form.dni" outlined filled
              dense error-message="Ingrese un dni válido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()">
              <template v-slot:before>
                <q-icon name="payment" color="primary" />
              </template>
            </q-input>
          </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md">
        <div class="q-pl-lg text-black text-caption"> País</div>
        <q-select outlined dense filled v-model="selectPais" :options="paises" option-value="ciudades" option-label="pais" emit-value map-options>
          <template v-slot:before>
            <q-icon name="public" color="primary" />
          </template>
        </q-select>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md">
        <div class="q-pl-lg text-black text-caption"> Ciudad</div>
        <q-select outlined dense filled v-model="form.ciudad_id" :options="selectPais" option-value="_id" option-label="ciudad" emit-value map-options>
          <template v-slot:before>
            <q-icon name="location_city" color="primary" />
          </template>
        </q-select>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div class="q-pl-lg text-black text-caption"> servicios de la Tienda</div>
          <q-select
            outlined
            filled
            option-value="id"
            option-label="name"
            v-model="servicios2"
            :options="servicios"
            label="Selecciona las servicios"
            multiple
            emit-value
            map-options
            error-message="Ingrese las servicios de la empresa"
            :error="$v.servicios2.$error" @blur="$v.servicios2.$touch()"
        >
          <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
            <q-item
              v-bind="itemProps"
              v-on="itemEvents"
            >
              <q-item-section>
                <q-item-label v-html="opt.name" ></q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-checkbox :value="selected" @input="toggleOption(opt)" />
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:before>
            <q-icon name="design_services" color="primary" />
          </template>
          </q-select>
      </div>

      <div class="full-width q-mb-xl">
        <google-map :center="center" :zoom="10" @getBounds="getBounds" @newPlace="handleNewPlace" :withoutDirection="false" />
      </div>
      <div class="column items-center justify-center full-width">
        <q-checkbox v-model="terminos" size="xs" label="Acepto Terminos y condiciones de uso" />
        <div class="text-negative text-h7" v-if="!terminos && aparecer"> Debe Aceptar los terminos </div>
      </div>
    </div>
      <div class="column items-center justify-center">
        <!-- <q-btn @click="panel.panel = 'parte_uno'" color="primary" push label="Atras" flat/> -->
        <q-space />
        <q-btn @click="registrarse()" color="primary" rounded push label="Siguiente" glossy style="width:70%;height:40px"/>
    </div>
  </div>
</template>

<script>
import GoogleMap from '../GoogleMap.vue'
import { mapMutations } from 'vuex'
import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  components: {
    GoogleMap
  },
  props: ['form', 'panel'],
  data () {
    return {
      type: 1,
      center: { lat: -33.4504117, lng: -70.6707553 },
      perfilFile: null,
      tiendaFiles: [],
      imgTienda: [],
      servicios: [],
      servicios2: [],
      imgPerfil: '',
      baseu: '',
      repeatPassword: '',
      password: '',
      show: false,
      terminos: false,
      aparecer: false,
      mostrar: false,
      paises: [],
      selectPais: []
    }
  },
  validations () {
    return {
      form: {
        dni: { required },
        name: { required },
        pais_id: { required },
        ciudad_id: { required },
        email: { required, email }
      },
      perfilFile: { required },
      servicios2: { required },
      repeatPassword: { sameAsPassword: sameAs('password') },
      password: { required, maxLength: maxLength(256), minLength: minLength(6) }
    }
  },
  mounted () {
    this.getPaises()
    this.obtenerDatos()
    this.baseu = env.apiUrl
  },
  methods: {
    ...mapMutations('generals', ['login']),
    tienda () {
      var img = ''
      var cc = {}
      if (this.tiendaFiles.length > 0) {
        cc = this.tiendaFiles[this.tiendaFiles.length - 1]
        img = URL.createObjectURL(cc)
        this.imgTienda.push(img)
        this.mostrar = true
      }
    },
    test () {
      if (this.perfilFile) { this.imgPerfil = URL.createObjectURL(this.perfilFile) }
    },
    obtenerDatos () {
      this.$api.get('servicios').then(res => {
        if (res) {
          this.servicios = res
          console.log(this.servicios, 'miraaaaaaaaaaaaaaaaa')
        }
      })
    },
    async registrarse () {
      this.$v.$touch()
      this.$v.servicios2.$touch()
      this.form.servicios = this.servicios2
      this.form.pais_id = this.selectPais[0].pais_id
      console.log(this.$v.form.$error, this.$v.password.$error, this.$v.repeatPassword.$error, this.$v.perfilFile.$error, this.terminos)
      if (!this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error && !this.$v.perfilFile.$error && this.terminos && !this.$v.servicios2.$error) {
        this.form.password = this.password
        this.form.cantidadArchivos = this.tiendaFiles.length
        console.log(this.form, 'form')
        var formData = new FormData()
        var files = []
        files[0] = this.perfilFile
        for (let i = 0; i < this.tiendaFiles.length; i++) {
          formData.append('tiendaFiles_' + i, this.tiendaFiles[i])
        }
        formData.append('perfilFile', files[0])
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('register_proveedor', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Ya formas parte de PeT, Bienvenido',
              color: 'positive'
            })
            this.loguear()
          }
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
        this.aparecer = true
      }
    },
    getBounds (bounds, center) {
      console.log(center, 'center')
    },
    handleNewPlace (place, coordinates) {
      console.log('handleNewPlace', coordinates, place, this.form, 'from')
      this.form.ubicacion = coordinates
      this.form.place = place
    },
    loguear () {
      this.$api.post('login', this.form).then(res => {
        if (res) { // Se debe ejecutar una mutacion que modifique el state con sessionInfo
          const client = res.TRI_SESSION_INFO.roles.find(value => value === 2)
          if (!client) {
            this.login(res)
            this.$router.push('/inicio_proveedor')
          } else {
            this.login(res)
            this.$router.push('/inicio_cliente')
          }
        } else {
          console.log('error de ususario')
          // this.loading = false
        }
        this.$q.loading.hide()
      })
    },
    savePais (pais) {
      console.log(pais)
      this.form.pais = pais
    },
    getPaises () {
      this.$api.get('pais').then(res => {
        if (res) {
          this.paises = res
        }
      })
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
</style>

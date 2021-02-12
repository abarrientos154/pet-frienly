<template>
   <div class="column">
    <div class="row q-pa-sm">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.full_name" label="Nombre" outlined dense
          error-message="Ingrese su nombre"
          :error="$v.form.full_name.$error" @blur="$v.form.full_name.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.last_name" label="Apellido" outlined dense
          error-message="Ingrese su nombre"
          :error="$v.form.last_name.$error" @blur="$v.form.last_name.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-select v-model="form.country" label="País" outlined dense :options="['Colombia', 'Chile']" error-message="Ingrese su País" :error="$v.form.country.$error" @blur="$v.form.country.$touch()" />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.direccion" label="Dirección" outlined dense
          error-message="Ingrese su Dirección"
          :error="$v.form.direccion.$error" @blur="$v.form.direccion.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input :disable="form.country ? false : true" v-model="form.run_dni" :label="form.country === 'Chile' ? 'Ingrese RUN' : form.country === 'Colombia' ? 'Ingrese DNI' : 'Debes seleccionar un país'" outlined dense
          error-message="Ingrese RUN O DNI"
          :error="$v.form.run_dni.$error" @blur="$v.form.run_dni.$touch()"
        />
      </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <q-input v-model="form.phone" type="tel" label="Telefono" outlined dense
            error-message="Ingrese el número de su Teléfono"
            :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()" />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <q-file bottom-slots accept=".jpg, image/*" v-model="perfilFile" hint="Foto de Perfil" outlined label="" @input="test"
              error-message="Debes subir una foto de perfil"
              :error="$v.perfilFile.$error" @blur="$v.perfilFile.$touch()">
              <template v-slot:prepend>
                <q-avatar>
                  <img  :src="imgPerfil ? imgPerfil : 'favicon.ico'">
                </q-avatar>
              </template>
              <template v-slot:append>
                <q-icon name="close" color="negative" @click.stop="perfilFile = null" class="cursor-pointer" />
              </template>
            </q-file>
          </div>
    </div>
    <div class="row">
      <q-btn @click="panel.panel = 'parte_dos'" color="primary" push label="Atras" flat/>
      <q-space />
      <q-btn @click="next()" color="primary" push label="Guardar" glossy/>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  props: ['form', 'panel'],
  data () {
    return {
      perfilFile: null,
      imgPerfil: '',
      baseu: ''
    }
  },
  validations () {
    return {
      form: {
        full_name: { required, maxLength: maxLength(40) },
        last_name: { required },
        country: { required },
        direccion: { required },
        run_dni: { required },
        phone: { required }
      },
      perfilFile: { required }
    }
  },
  mounted () {
    this.baseu = env.apiUrl
  },
  methods: {
    ...mapMutations('generals', ['login']),
    test () {
      if (this.perfilFile) { this.imgPerfil = URL.createObjectURL(this.perfilFile) }
    },
    async next () {
      this.$v.form.$touch()
      this.$v.perfilFile.$touch()
      if (!this.$v.form.$error && !this.$v.perfilFile.$error) {
        this.form.enable = true
        var formData = new FormData()
        formData.append('perfilFile', this.perfilFile)
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('register', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Ya formas parte de Trillos, Bienvenido',
              color: 'positive'
            })
            this.loguear()
          }
        })
      }
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
    }
  }
}
</script>

<style>

</style>>

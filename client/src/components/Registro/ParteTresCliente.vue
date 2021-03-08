<template>
  <div class="column">
    <div class="row q-pa-md justify-center items-center no-box-shadow">
        <div class="column items-center justify-center">
            <q-avatar size="150px">
              <img :src="imgPerfil ? imgPerfil : 'noimg.png'">
              <q-file borderless v-model="perfilFile" class="absolute-center button-camera" @input="test" accept=".jpg, image/*" style="z-index:1">
                <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
              </q-file>
            </q-avatar>
            <div class="text-negative text-h7" v-if="$v.perfilFile.$error"> La imagen es Requerida </div>
        </div>
        <div class="column items-center text-center justify-center">
          <div class="text-black text-h5"> ¿Eres fanatico de las mascotas?</div>
        </div>

        <div class="q-mr-md q-mb-sm q-ml-md">
          <div class="q-pl-lg text-black text-h7"> Correo electronico</div>
            <q-input v-model="form.email" type="email" label="Correo electronico" outlined filled
              dense error-message="Ingrese un email válido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()">
              <template v-slot:before>
                <q-icon name="email" color="primary" />
              </template>
            </q-input>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="q-pl-lg text-black text-h7"> Fecha de Nacimiento</div>
                <q-input v-model="form.fechaNac" filled  outlined dense
                  error-message="Ingrese su Fecha de Nacimiento" type="date"
                  :error="$v.form.fechaNac.$error" @blur="$v.form.fechaNac.$touch()">
                  <template v-slot:before>
                    <q-icon name="calendar_today" color="primary" />
                  </template>
                </q-input>
              </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <div class="q-pl-lg text-black text-h7"> Contraseña</div>
                    <q-input  v-model="password"
                        label="Contraseña"
                        outlined
                        dense
                        filled
                        error-message="Ingrese una contraseña válida, mínimo 6 caracteres"
                        :error="$v.password.$error"
                        @blur="$v.password.$touch()">
                        <template v-slot:before>
                          <q-icon name="vpn_key" color="primary" />
                        </template>
                    </q-input>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <div class="q-pl-lg q-pa-sm text-black text-h7"> Retite Contraseña</div>
                    <q-input v-model="repeatPassword" label="Repita su Contraseña" outlined
                      dense filled error-message="Las contraseñas deben ser iguales" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()">
                      <template v-slot:before>
                        <q-icon name="vpn_key" color="primary" />
                      </template>
                    </q-input>
                  <div class="column items-center justify-center">
                    <q-checkbox v-model="terminos" size="xs" label="Acepto Terminos y condiciones de uso" />
                    <div class="text-negative text-h7" v-if="!terminos && aparecer"> Debe Aceptar los terminos </div>
                  </div>
                </div>
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
import { mapMutations } from 'vuex'
import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  props: ['form', 'panel'],
  data () {
    return {
      perfilFile: null,
      imgPerfil: '',
      baseu: '',
      repeatPassword: '',
      password: '',
      show: false,
      terminos: false,
      aparecer: false
    }
  },
  validations () {
    return {
      form: {
        fechaNac: { required },
        email: { required, email }
      },
      perfilFile: { required },
      repeatPassword: { sameAsPassword: sameAs('password') },
      password: { required, maxLength: maxLength(256), minLength: minLength(6) }
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
    async registrarse () {
      console.log(this.form, 'form')
      this.$v.$touch()
      if (!this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error && !this.$v.perfilFile.$error && !this.terminos) {
        this.form.password = this.password
        var formData = new FormData()
        var files = []
        files[0] = this.perfilFile
        formData.append('perfilFile', files[0])
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('register', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Ya formas parte de PeT, Bienvenido',
              color: 'positive'
            })
            //  this.loguear()
          }
        })
      } else {
        this.aparecer = true
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

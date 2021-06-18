<template>
<div>
  <div class="column justify-center items-center q-mt-xl bg-white no-box-shadow">
          <div class="row q-pa-md justify-center items-center no-box-shadow">
            <div class="column no-box-shadow">
              <div class="row justify-center">
                <q-avatar size="150px">
                  <img src="https://cdn.quasar.dev/app-icons/icon-128x128.png" />
                </q-avatar>
              </div>
              <div class="column items-center justify-center text-black text-h6"> Bienvenido de vuelta!</div>
              <div class="col-xs-12 col-sm-6 q-ma-sm col-md-6 col-lg-6">
                <div class="q-pl-xl q-mb-sm text-black text-h7"> Correo electronico</div>
                <q-input type="email" v-model="form.email" placeholder="Correo electronico" autofocus filled :error="$v.form.email.$error" error-message="Este campo es requerido" @blur="$v.form.email.$touch()" >
                  <template v-slot:before>
                    <q-icon name="email" color= "primary" />
                  </template>
                </q-input>
                  <div class="q-pl-xl q-mb-sm text-black text-h7"> Contraseña</div>
                  <q-input :type="isPwd ? 'password' : 'text'" v-model="form.password" placeholder="Contraseña" filled :error="$v.form.password.$error" error-message="Este campo es requerido" @blur="$v.form.password.$touch()" >
                    <template v-slot:before>
                    <q-icon name="vpn_key" color= "primary" />
                  </template>
                  </q-input>
              </div>
              <div class="row justify-center">
                <div class="text-h9 text-primary" style="cursor:pointer">¿Olvidaste tu contraseña?</div>
              </div>
              <div class="col-xs-12 col-sm-6 q-ma-sm col-md-6 col-lg-6">
                <q-btn
                  rounded
                  class="full-width"
                  color="primary"
                  :loading="loading"
                  @click="onSubmit()"
                >Iniciar sesion
                  <template v-slot:loading>
                    <q-spinner-hourglass class="on-center" />
                    Loading...
                  </template>
                </q-btn>
              </div>
              <div class="row justify-center">
                <div class="row">
                  <div class="text-black text-h9">Aun no tienes cuenta?</div>
                  <div class="text-primary q-ml-sm text-bold text-h9" style="cursor:pointer" @click="$router.push('/tipo_usuario')">Registrate.</div>
                </div>
               </div>
              <div class="colunm justify-center q-pa-sm">
                <p align="center" style="cursor:pointer"><a class="text-bold text-grey">O registrate con algunas de tus redes sociales</a></p>
                <div class="row justify-between q-mr-xl q-ml-xl q-mt-sm q-mb-sm">
                  <q-btn  round color="white" style="width: 40px; height: 40px">
                    <img src="icons/Iconos_Redes.png" style="width: 20px; height: 20px"/>
                  </q-btn>
                  <q-btn  round color="indigo-10" style="width: 40px; height: 40px">
                    <img src="icons/Iconos_Redes_1.png" style="width: 20px; height: 20px"/>
                  </q-btn>
                  <q-btn  round color="white" style="width: 40px; height: 40px">
                    <img src="icons/Iconos_Redes_3.png" style="width: 20px; height: 20px"/>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      isPwd: true,
      loading: false,
      user: {}
    }
  },
  validations: {
    form: {
      email: { required },
      password: { required }
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    ...mapActions('generals', ['saveUser']),
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.loading = true
        this.$q.loading.show({
          message: 'Iniciando sesión'
        })
        this.$api.post('login', this.form).then(res => {
          if (res) {
            this.user = res.TRI_SESSION_INFO
            console.log('user', this.user)

            this.login(res)
            if (this.user.roles[0] === 1) {
              this.$router.push('/inicio_administrador')
            } else if (this.user.roles[0] === 2) {
              this.$router.push('/inicio_cliente')
            } else if (this.user.roles[0] === 3) {
              this.$router.push('/inicio_proveedor')
            } else if (this.user.roles[0] === 4) {
              this.$router.push('/home_hospedador')
            }
          } else {
            console.log('error de ususario')
            this.loading = false
            this.$q.loading.hide()
          }
          this.$q.loading.hide()
          this.loading = false
        })
      }
    }
  }
}
</script>

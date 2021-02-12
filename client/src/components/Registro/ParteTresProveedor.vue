<template>
   <div class="column">
    <div class="row q-pa-sm">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.full_name" label="Nombre de la Empresa" outlined dense
          error-message="Ingrese Nombre de la empresa, maximo de caracteres es de 40"
          :error="$v.form.full_name.$error" @blur="$v.form.full_name.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-select v-model="form.country" label="País" outlined dense :options="['Colombia', 'Chile']" error-message="Ingrese País de la empresa" :error="$v.form.country.$error" @blur="$v.form.country.$touch()" />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.direccion" label="Dirección" outlined dense
          error-message="Ingrese Dirección de la empresa"
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
            error-message="Ingrese Teléfono de la empresa"
            :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()" />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <q-file bottom-slots accept=".jpg, image/*" v-model="perfilFile" outlined label="Foto perfil de la tienda" @input="test"
              error-message="Ingrese una foto de perfil para su tienda"
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
        <q-card style="width: 100%" class="shadow-11 q-mt-sm">
          <q-card-section>
            <div>Agrega fotos de la tienda</div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 row justify-between">
            <div class="col-10">
                <q-file max-files="5" style="width: 100%" @input="tienda" accept=".jpg, image/*" multiple append v-model="tiendaFiles" hint="Pueden ser hasta 5 fotos" outlined label="CLICK AQUÍ">
                </q-file>
            </div>
            <div class="col-2 row justify-center">
              <q-icon size="md" name="close" color="negative" @click="tiendaFiles = [], imgTienda = []" class="cursor-pointer" />
            </div>
          </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row justify-around">
            <div v-if="!imgTienda.length" class="text-subtitle2 text-grey text-center">No hay fotos de la tienda</div>
            <div v-else v-ripple v-for="(item, index) in imgTienda" :key="index" class="col-5 q-pa-sm">
              <q-img
                :src="imgTienda.length > 0 ? imgTienda[index] : 'favicon.ico'"
                style="width:120px"
              />
            </div>
          </q-card-section>
        </q-card>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mt-md">
          <q-select
            outlined
            v-model="dias"
            :options="options_dias"
            label="Días laborables"
            multiple
            emit-value
            map-options
            error-message="Ingrese los días laborables de la empresa"
            :error="$v.dias.$error" @blur="$v.dias.$touch()"
        >
          <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
            <q-item
              v-bind="itemProps"
              v-on="itemEvents"
            >
              <q-item-section>
                <q-item-label v-html="opt.label" ></q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-checkbox :value="selected" @input="toggleOption(opt)" />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
        <div class="text-subtitle2 q-mt-sm">Horario</div>
        <div class="q-gutter-sm row justify-between">
          <q-input label="Hora de inicio" class="col-5" v-model="form.hora_inicio" mask="time" :rules="['time']"
            error-message="Ingrese la hora de inicio laboral"
            :error="$v.form.hora_inicio.$error" @blur="$v.form.hora_inicio.$touch()" >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="form.hora_inicio">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input label="Hora de cierre" class="col-5" v-model="form.hora_fin" mask="time" :rules="['time']"
            error-message="Ingrese la hora de cierre laboral"
            :error="$v.form.hora_fin.$error" @blur="$v.form.hora_fin.$touch()">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="form.hora_fin">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
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
      dias: [],
      tiendaFiles: [],
      imgPerfil: '',
      imgTienda: [],
      baseu: '',
      options_dias: [
        {
          label: 'Lunes',
          value: 1
        },
        {
          label: 'Martes',
          value: 2
        },
        {
          label: 'Miércoles',
          value: 3
        },
        {
          label: 'Jueves',
          value: 4
        },
        {
          label: 'Viernes',
          value: 5
        },
        {
          label: 'Sábado',
          value: 6
        },
        {
          label: 'Domingo',
          value: 0
        }
      ]
    }
  },
  validations () {
    return {
      form: {
        full_name: { required, maxLength: maxLength(40) },
        country: { required },
        direccion: { required },
        run_dni: { required },
        phone: { required },
        hora_inicio: { required },
        hora_fin: { required }
      },
      dias: { required },
      perfilFile: { required }
    }
  },
  mounted () {
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
      }
    },
    test () {
      if (this.perfilFile) { this.imgPerfil = URL.createObjectURL(this.perfilFile) }
    },
    async next () {
      this.form.dias = this.dias
      this.$v.form.$touch()
      this.$v.dias.$touch()
      this.$v.perfilFile.$touch()
      if (!this.$v.form.$error && !this.$v.dias.$error && !this.$v.perfilFile.$error) {
        if (this.tiendaFiles.length > 0) {
          var formData = new FormData()
          formData.append('perfilFile', this.perfilFile)
          this.form.cantidadArchivos = this.tiendaFiles.length
          this.form.status = 0
          this.form.enable = true
          for (let i = 0; i < this.tiendaFiles.length; i++) {
            formData.append('tiendaFiles_' + i, this.tiendaFiles[i])
          }
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
        } else {
          this.$q.dialog({
            message: 'Debes subir fotos de la tienda.',
            persistent: true
          }).onOk(() => {
          })
        }
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

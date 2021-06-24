<template>
  <div class="window-height">
    <div class="column items-center">
      <div class="q-my-lg text-center text-h5 text-grey-8">Selección tus servicios</div>

      <div class="column items-center q-mb-lg" style="width:100%">
        <q-avatar rounded style="height: 200px; width: 80%; border-radius: 25px;" class="row justify-center">
          <q-img style="height: 100%; width: 100%" :src="imgServicio != '' ? imgServicio : 'noimg.png'">
            <q-file borderless v-model="img" @input="servicio_img()" accept=".jpg, image/*" style="width: 100%; height: 100%; font-size: 0px"
            @blur="$v.img.$touch()">
              <div class="absolute-center column items-center" style="width:100%">
                <q-icon name="image" size="75px" color="white" />
              </div>
            </q-file>
          </q-img>
        </q-avatar>
        <div v-if="$v.img.$error" class="text-negative text-subtitle2 text-center"> Carga una foto </div>
      </div>

      <div style="width: 80%">
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-px-xs">
            <div class="q-mb-xs text-black text-caption">¿Qué servicio quieres ofrecer?</div>
            <q-select borderless dense color="black" v-model="form.servicio" :options="servicios" label="Selecciona el servicio que deseas ofrecer" map-options
              error-message="requerido" :error="$v.form.servicio.$error" @blur="$v.form.servicio.$touch()"
              option-label="name" >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey text-italic">No hay Resultados</q-item-section>
                  </q-item>
                </template>
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    v-on="scope.itemEvents"
                  >
                    <q-item-section>
                      <q-item-label v-html="scope.opt.name" />
                    </q-item-section>
                  </q-item>
                </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-px-xs">
            <div class="q-mb-xs text-black text-caption">¿Quién podra adquirir estos servicios?</div>
            <q-input filled v-model.number="form.destinatario" type="number" dense
            :error="$v.form.destinatario.$error" error-message="Este campo es requerido"  @blur="$v.form.destinatario.$touch()" lazy-rules :rules="[ val => val > 0 && val <= 1000 ]"/>
          </div>
          <div class="col-12 q-px-xs">
            <div class="q-mb-xs text-black text-caption">Descripción del servicio que vas a ofrecer</div>
            <q-input filled outlined v-model="form.description" type="textarea"
            :error="$v.form.description.$error" error-message="Este campo es requerido"  @blur="$v.form.description.$touch()"/>
          </div>
          <div class="col-12 q-px-xs row justify-between">
            <div class="col-6 text-black text-caption">Valor por hora</div>
            <q-input class="col-6" prefix="$" filled color="primary" v-model.number="form.price" type="number" dense
            :error="$v.form.price.$error" error-message="Este campo es requerido"  @blur="$v.form.price.$touch()" :rules="[val => val > 0]" min="0"/>
          </div>
        </div>
        <div>
          <!-- <div class="col q-mb-md q-px-xs">
            <div class="q-mb-xs text-black text-caption">Tipos de habitaciones</div>
            <q-select dense outlined filled option-value="_id" option-label="name" v-model="tiposHabtSelect" :options="tiposHabt" multiple emit-value map-options>
              <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                <q-item v-bind="itemProps" v-on="itemEvents">
                  <q-item-section>
                    <q-item-label v-html="opt.name" ></q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-checkbox :value="selected" @input="toggleOption(opt)" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div> -->
        </div>
      </div>
      <div class="row justify-center q-ma-md" style="width: 70%">
        <q-btn class="q-py-xs" color="primary" rounded :label="edit ? 'Actualizar' : 'Guardar'" @click="!edit ? agregar() : actualizar()" style="width: 100%" no-caps/>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      img: null,
      edit: false,
      imgServicio: '',
      id: '',
      user: {},
      form: {},
      servicios: []
    }
  },
  validations: {
    form: {
      servicio: { required },
      destinatario: { required },
      description: { required },
      price: { required }
    },
    img: { required }
  },
  mounted () {
    this.baseu = env.apiUrl + 'hospedajes_img'
    if (this.$route.params.id) {
      this.edit = true
      this.id = this.$route.params.id
      this.$api.get('hospedaje/' + this.id).then(res => {
        if (res) {
          this.form = res
        }
      }).catch(error => {
        console.log(error)
      })
    }
    this.getServicios()
  },
  methods: {
    getServicios () {
      this.$api.get('servicios').then(res => {
        if (res) {
          this.servicios = res
        }
      })
    },
    servicio_img () {
      var im = this.img
      this.imgServicio = URL.createObjectURL(im)
    },
    async agregar () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Agregando servicio, por favor espere'
        })
        var formData = new FormData()
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('hospedaje', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.notify({
            message: 'Servicio agregado con éxito',
            color: 'primary'
          })
          this.$q.loading.hide()
          // this.$router.push('/hospedajes')
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos requeridos',
          color: 'negative'
        })
      }
    },
    async actualizar () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Actualizando servicio, por favor espere...'
        })
        var formData = new FormData()
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.put('hospedaje/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.notify({
            message: 'Servicio actualizado con éxito',
            color: 'primary'
          })
          this.$q.loading.hide()
          // this.$router.push('/hospedajes')
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos requeridos',
          color: 'negative'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.button-camera {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: white;
  height:40px;
  width:40px
}
.seleccionado {
  border-radius: 5px;
  background: $grey-5;
}
.dimension {
  min-width: 200px;
}
</style>

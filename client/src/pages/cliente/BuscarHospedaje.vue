<template>
    <div class="bg-primary q-pt-xl">
      <q-card class="q-pa-xs q-pa-sm column" style="width: 100%; height: 100%; border-top-left-radius: 25px; border-top-right-radius: 25px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px">
        <div class="q-my-lg">Busquemos donde alojara a su mascota</div>
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md">
            <div class="q-mb-sm text-black">Ciudad</div>
            <q-select dense filled v-model="form.ciudad_id" :options="ciudades" option-value="_id" option-label="ciudad" emit-value map-options>
              <template v-slot:prepend>
                <q-icon color="primary" name="location_on" />
              </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md">
            <div class="q-mb-sm text-black">Fecha</div>
            <q-input dense filled @click="ingresarFecha()" v-model="form.fecha">
              <template v-slot:prepend>
                <q-icon color="primary" name="calendar_today" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="q-mb-sm text-black">Cantidad de mascotas</div>
            <q-input filled v-model.number="form.pet_num" type="number" dense lazy-rules :rules="[ val => val > 0 && val <= 20 ]">
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md">
            <div class="q-mb-sm text-black">Tipo de habitacion</div>
            <q-select dense filled v-model="form.habt_type" :options="tiposHabt" option-value="_id" option-label="name" emit-value map-options>
              <template v-slot:prepend>
                <q-icon color="primary" name="star" />
              </template>
            </q-select>
          </div>
        </div>
        <q-btn dense class="q-mb-sm bg-primary text-white" style="width: 100%" @click="buscar()">Buscar</q-btn>
        <div class="full-width q-mb-xl">
          <mapa :center="center"/>
        </div>
      </q-card>

      <q-dialog v-model="fch">
        <q-card>
          <div class="q-pa-md">
            <q-date v-model="fecha" range />
          </div>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="OK" color="primary" @click="agregarFecha()" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
</template>

<script>
import Mapa from '../../components/Mapa.vue'
export default {
  components: {
    Mapa
  },
  data () {
    return {
      center: { lat: -33.4504117, lng: -70.6707553 },
      form: {},
      fecha: { from: '2020/07/08', to: '2020/07/17' },
      fch: false,
      ciudades: [],
      tiposHabt: [],
      hospedajes: []
    }
  },
  mounted () {
    this.getCiudades()
    this.getTiposHabt()
  },
  methods: {
    buscar () {
      console.log(this.form)
      this.$api.post('hospedaje_filtrado', this.form).then(res => {
        if (res) {
          this.hospedajes = res
          console.log(this.hospedajes)
        }
      })
    },
    getCiudades () {
      this.$api.get('ciudades').then(res => {
        if (res) {
          this.ciudades = res
        }
      })
    },
    getTiposHabt () {
      this.$api.get('habitacion_type').then(res => {
        if (res) {
          this.tiposHabt = res
        }
      })
    },
    ingresarFecha () {
      this.fch = true
    },
    agregarFecha () {
      this.form.fecha = this.fecha.from + ' - ' + this.fecha.to
      console.log(this.form.fecha)
    }
  }
}
</script>

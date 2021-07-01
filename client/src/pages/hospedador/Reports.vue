<template>
  <div class="q-pa-lg">
    <q-header elevated class="bg-primary row justify-center items-center" style="width:100%; height:60px">
      <div class="text-white text-subtitle1 text-center">Estadísticas y reportes</div>
    </q-header>

    <q-card class="q-mb-xl bg-primary" style="width: 100%; height: 150px; border-radius: 12px;">
      <div class="absolute-bottom full-width text-white column items-end q-pa-md">
        <div class="text-h6">Ventas del día</div>
        <div class="text-h4">${{ventas}}</div>
      </div>
    </q-card>

    <div class="q-mb-xl shadow-4" style="width: 100%;">
      <div class="text-h6 text-center q-mb-md text-white bg-primary q-pa-xs">Reporte semanal</div>
      <div class="row q-mb-sm">
        <div class="col-12 q-px-sm">
          <div class="text-caption">Selecciona la semana</div>
        </div>
        <q-input class="col q-mx-sm" filled readonly dense v-model="formTex"  placeholder="Inicio - Término" @click="$refs.qDateProxy1.show()">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy1" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form" range
                  @input="selecFecha()">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup @click="selecFecha()" label="Aceptar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
      </div>
      <div class="column items-center">
        <q-btn :disable="formTex === '' ? true : false" label="Buscar" color="primary" style="width: 40%;" no-caps
        @click="getReport('Semanal', form)"/>
      </div>

      <div>
        <GChart v-if="verEstadistica1" type="LineChart" :data="chartData1" :options="chartOptions"/>
      </div>
    </div>

    <div class="q-mb-xl shadow-4" style="width: 100%;">
      <div class="text-h6 text-center q-mb-md text-white bg-primary q-pa-xs">Reporte mensual</div>
      <div class="row q-px-sm">
        <div class="col2 text-caption">Selecciona <br/>el mes</div>
        <q-input filled readonly dense v-model="mensual" class="col q-mx-md" placeholder="Mes" mask="##" @click="$refs.qDateProxy3.show()">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy3" transition-show="scale" transition-hide="scale">
                <q-date v-model="mensual" mask="MM" minimal emit-immediately default-view="Months"
                @input="$refs.qDateProxy3.hide()">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Cerrar" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-btn :disable="!mensual ? true : false" class="col2" label="Buscar" color="primary" no-caps
        @click="getReport('Mensual', mensual)"/>
      </div>

      <div>
        <GChart v-if="verEstadistica2" type="LineChart" :data="chartData2" :options="chartOptions"/>
      </div>
    </div>

    <div class="q-mb-xl shadow-4" style="width: 100%;">
      <div class="text-h6 text-center q-mb-md text-white bg-primary q-pa-xs">Reporte anual</div>
      <div class="row q-px-sm">
        <div class="col2 text-caption">Selecciona <br/>el año</div>
        <q-input filled readonly dense v-model="anual" class="col q-mx-md" placeholder="Año" mask="####" @click="$refs.qDateProxy4.show()">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy4" transition-show="scale" transition-hide="scale">
                <q-date v-model="anual" mask="YYYY" minimal emit-immediately default-view="Years"
                @input="$refs.qDateProxy4.hide()">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Cerrar" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-btn :disable="!anual ? true : false" class="col2" label="Buscar" color="primary" no-caps
        @click="getReport('Anual', anual)"/>
      </div>

      <div>
        <GChart v-if="verEstadistica3" type="LineChart" :data="chartData3" :options="chartOptions"/>
      </div>
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import moment from 'moment'
export default {
  components: {
    GChart
  },
  data () {
    return {
      verEstadistica1: false,
      verEstadistica2: false,
      verEstadistica3: false,
      mensual: null,
      anual: null,
      ventas: 0,
      formTex: '',
      form: {
        from: moment().subtract(6, 'days').format('YYYY/MM/DD'),
        to: moment().format('YYYY/MM/DD')
      },
      chartOptions: {
        legend: 'none',
        chartArea: { left: 40, right: 20, top: 15, width: '100%', height: '80%' },
        colors: ['#8b4513']
      },
      chartData1: [
        ['Gün', 'Monto']
      ],
      chartData2: [
        ['Gün', 'Monto']
      ],
      chartData3: [
        ['Gün', 'Monto']
      ]
    }
  },
  mounted () {
    this.getVentas()
  },
  methods: {
    async getVentas () {
      await this.$api.get('ventas_diarias').then(v => {
        if (v) {
          this.ventas = v
        }
      })
    },
    getReport (val, fecha) {
      this.$q.loading.show({
        message: 'Construyendo datos'
      })
      this.$api.post('estadistica', { modelo: 'Reserva', campo: 'total', type: val, fecha: fecha }).then(res => {
        if (res) {
          if (val === 'Semanal') {
            this.chartData1 = res
            this.verEstadistica1 = true
          } else if (val === 'Mensual') {
            this.chartData2 = res
            this.verEstadistica2 = true
          } else {
            this.chartData3 = res
            this.verEstadistica3 = true
          }
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    selecFecha () {
      var resta = moment(this.form.to).diff(moment(this.form.from), 'days')
      if (resta !== 6) {
        this.$q.dialog({
          title: 'Atención',
          message: 'Debes seleccionar el rango de una semana (7 días)',
          cancel: false,
          persistent: true
        }).onOk(() => {
          this.formTex = ''
          this.form = {
            from: moment().subtract(6, 'days').format('YYYY/MM/DD'),
            to: moment().format('YYYY/MM/DD')
          }
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        })
      } else {
        this.formTex = this.form.from + ' - ' + this.form.to
      }
    }
  }
}
</script>

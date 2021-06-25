<template>
  <div class="q-pa-lg">
    <q-header elevated class="bg-primary row justify-center items-center full-width" style="height: 60px">
      <div class="text-white text-h6 text-center">Estadisticas y reportes</div>
    </q-header>
    <q-card class="q-mb-xl bg-primary" style="width: 100%; height: 150px; border-radius: 12px;">
      <div class="absolute-bottom full-width text-white column items-end q-pa-md">
        <div class="text-h6">Ventas del dia</div>
        <div class="text-h4">$1.000</div>
      </div>
    </q-card>
    <div class="q-mb-xl shadow-4" style="width: 100%;">
      <div class="text-h6 text-center q-mb-md text-white bg-primary q-pa-xs">Reporte semanal</div>
      <div class="row q-mb-sm">
        <div class="col q-px-sm">
          <div class="text-center text-caption">Fecha de inicio</div>
          <q-input class="text-caption" filled type="date" v-model="fecha1" dense/>
        </div>
        <div class="col q-px-sm">
          <div class="text-center text-caption">Fecha de termino</div>
          <q-input class="text-caption" filled type="date" v-model="fecha2" dense/>
        </div>
      </div>
      <div class="column items-center">
        <q-btn label="Buscar" color="primary" style="width: 40%;" no-caps/>
      </div>
      <div>
        <GChart type="LineChart" :data="chartData" :options="chartOptions"/>
      </div>
    </div>
    <div class="q-mb-xl shadow-4" style="width: 100%;">
      <div class="text-h6 text-center q-mb-md text-white bg-primary q-pa-xs">Reporte mensual</div>
      <div class="row q-px-sm">
        <div class="col2 text-caption">Selecciona <br/>el mes</div>
        <q-select outlined dense filled class="col q-mx-md" placeholder="Mes" v-model="mes" :options="['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']"/>
        <q-btn class="col2" label="Buscar" color="primary" no-caps/>
      </div>
      <div>
        <GChart type="LineChart" :data="chartData2" :options="chartOptions"/>
      </div>
    </div>
    <div class="q-mb-xl shadow-4" style="width: 100%;">
      <div class="text-h6 text-center q-mb-md text-white bg-primary q-pa-xs">Reporte anual</div>
      <div class="row q-px-sm">
        <div class="col2 text-caption">Selecciona <br/>el año</div>
        <q-select outlined dense filled class="col q-mx-md" placeholder="Mes" v-model="año" :options="['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021']"/>
        <q-btn class="col2" label="Buscar" color="primary" no-caps/>
      </div>
      <div>
        <GChart type="LineChart" :data="chartData3" :options="chartOptions"/>
      </div>
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
  components: {
    GChart
  },
  data () {
    return {
      fecha1: '',
      fecha2: '',
      mes: '',
      año: '',
      chartData: [
        ['Gün', 'Monto'],
        ['Lun', 70],
        ['Mar', 550],
        ['Mie', 300],
        ['Jue', 725],
        ['Vie', 40],
        ['Sab', 380],
        ['Dom', 575]
      ],
      chartData2: [
        ['Gün', 'Monto'],
        ['Semana 1', 70],
        ['Semana 2', 375],
        ['Semana 3', 185],
        ['Semana 4', 800]
      ],
      chartData3: [
        ['Gün', 'Monto'],
        ['Ene', 70],
        ['Feb', 550],
        ['Mar', 300],
        ['Abr', 725],
        ['May', 40],
        ['Jun', 380],
        ['Jul', 575]
      ],
      chartOptions: {
        legend: 'none',
        chartArea: { left: 40, right: 20, top: 15, width: '100%', height: '80%' },
        colors: ['#8b4513']
      }
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

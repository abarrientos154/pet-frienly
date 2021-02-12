<template>
  <div>
    <div class="row estilo-titulos q-mt-lg q-ml-sm q-mb-sm q-pl-sm">
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <div class="text-bold q-ml-sm">ENCUENTRA POR CATEGORÍA</div>
    </div>
   <botones-header/>
   <div class="q-mt-lg text-center q-pa-md text-weight-bolder bg-secondary text-black q-ma-md" style="border-radius:12px">BIENVENIDO PROVEEDOR</div>
    <div class="row estilo-titulos q-mt-lg q-ml-sm q-mb-sm q-pl-sm">
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <div class="text-bold q-ml-sm">SOLICITUDES</div>
   </div>
   <listado-de-sugerencia v-if="data.length" :data="data" :direccion="true" ruta="proveedor"/>
    <q-card v-else class="shadow-11 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Sin solicitudes disponibles...</div>
    </q-card>
  </div>
</template>

<script>
import BotonesHeader from '../../components/BotonesHeader.vue'
import ListadoDeSugerencia from '../../components/ListadoDeSugerencia.vue'
export default {
  components: {
    BotonesHeader,
    ListadoDeSugerencia
  },
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    this.getSolicitudes()
  },
  methods: {
    getSolicitudes () {
      this.$api.get('user_info').then(res => {
        if (res.status === 0) {
          this.data = {}
          this.$q.dialog({
            title: 'Atención',
            message: 'Para cotizar y ver solicitudes de clientes debes esperar por la autorización del administrador.',
            cancel: false,
            persistent: true
          }).onOk(() => {
            // Ok
          }).onCancel(() => {
            // cancel
          })
        } else if (res.status === 2) {
          this.data = {}
          this.$q.dialog({
            title: 'Atención',
            message: 'Tu cuenta ha sido rechazada. Debes modificar tu información de usuario y esperar por respuesta del administrador.',
            cancel: false,
            persistent: true
          }).onOk(() => {
            // Ok
          }).onCancel(() => {
            // cancel
          })
        } else {
          this.$api.get('necesidad').then(v => {
            if (v) {
              this.data = v
            }
          })
        }
      })
    }
  }
}
</script>

<style>
.estilo-titulos {
  background-color: #fff599;
  width: 250px;
  border-radius: 12px
}

</style>>

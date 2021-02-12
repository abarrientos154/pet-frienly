<template>
  <div>
    <div class="row estilo-titulos q-mt-lg q-ml-sm q-mb-sm q-pl-sm">
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <div class="text-bold q-ml-sm">ENCUENTRA POR CATEGORÍA</div>
    </div>
   <botones-header/>
   <div class="q-mt-lg text-center q-pa-md text-weight-bolder bg-secondary text-black q-ma-md" style="border-radius:12px">BIENVENIDO CLIENTE</div>
   <div class="row estilo-titulos q-mt-lg q-ml-sm q-mb-md q-pl-sm">
      <q-icon class="q-mt-xs" name="favorite" style="font-size: 0.7em"/>
      <q-icon class="q-mt-xs" name="favorite" style="font-size: 0.7em"/>
      <q-icon class="q-mt-xs" name="favorite" style="font-size: 0.7em"/>
      <div class="text-bold q-ml-sm">MIS FAVORITOS</div>
    </div>
    <listado-de-favoritos v-if="dataFav.length" :dataFav="dataFav"/>
    <q-card v-else class="shadow-11 q-my-sm q-mx-md q-pa-xs">
      <div class="text-center text-subtitle1">Añade una Tienda a tus favoritos...</div>
    </q-card>
   <div class="row estilo-titulos q-mt-lg q-ml-sm q-mb-md q-pl-sm">
      <q-icon class="q-mt-xs" name="star" style="font-size: 0.9em"/>
      <q-icon class="q-mt-xs" name="star" style="font-size: 0.9em"/>
      <q-icon class="q-mt-xs" name="star" style="font-size: 0.9em"/>
      <div class="text-bold q-ml-sm">MAS POPULARES</div>
    </div>
    <listado-mas-populares/>
    <div class="row estilo-titulos q-mt-lg q-ml-sm q-mb-sm q-pl-sm">
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <div class="text-bold q-ml-sm">PRODUCTOS</div>
   </div>
    <listado-de-sugerencia v-if="data.length" :data="data" :direccion="false" ruta="cliente" />
    <q-card v-else class="shadow-11 q-my-sm q-mx-md q-pa-sm">
      <div class="text-center text-subtitle1">Sin productos disponibles...</div>
    </q-card>
  </div>
</template>

<script>
import BotonesHeader from '../../components/BotonesHeader.vue'
import ListadoDeFavoritos from '../../components/ListadoDeFavoritos.vue'
import ListadoDeSugerencia from '../../components/ListadoDeSugerencia.vue'
import ListadoMasPopulares from '../../components/ListadoMasPopulares.vue'
export default {
  components: {
    BotonesHeader,
    ListadoDeSugerencia,
    ListadoMasPopulares,
    ListadoDeFavoritos
  },
  data () {
    return {
      data: [],
      dataFav: []
    }
  },
  mounted () {
    this.cargarProductos()
    this.tiendasFavoritas()
  },
  methods: {
    cargarProductos () {
      this.$api.get('producto').then(res => {
        this.data = res
      })
    },
    tiendasFavoritas () {
      this.$api.get('mis_favoritos').then(res => {
        if (res) {
          this.dataFav = res
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

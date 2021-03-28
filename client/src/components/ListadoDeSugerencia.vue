<template>
  <div>
    <q-list class="row justify-center" v-if="data.length > 0">
      <q-card class="q-mx-md q-mb-md shadow-10 col no-wrap bg-secondary" v-for="(item, index) in data" :key="index" v-ripple style="border-radius: 15px; max-width: 300px; min-width: 200px;">
        <div class="row justify-between">
          <div class="col-4">
            <q-img :src="baseu + item.images[0]" style="height: 125px; border-radius: 15px"/>
          </div>
          <div class="col-6 q-py-sm justify-center column">
            <q-scroll-area class="q-ml-sm" horizontal style="height: 25px; width:100%">
              <div class="text-subtitle2 text-weight-bolder">{{item.name}}</div>
            </q-scroll-area>
            <q-scroll-area class="q-ml-sm" style="height: 40px; width: 80%">
              <div>{{item.descripcion}}</div>
            </q-scroll-area>
            <div class="q-ml-sm text-weight-bolder">Cantidad: {{item.cantidad}}</div>
            <div class="q-ml-sm text-weight-bolder">Precio: {{item.precio}}$</div>
          </div>
          <div class="col-2 column justify-center">
            <q-btn round flat icon="keyboard_arrow_right" color="primary" @click="$router.push('/descripcionproducto/'+item._id)"/>
          </div>
        </div>
      </q-card>
    </q-list>
    <q-card v-else class="shadow-2 q-ma-sm q-pa-md bg-secondary" style="border-radius: 15px;">
      <div class="text-center text-subtitle1">Actualmente sin productos...</div>
    </q-card>
  </div>
</template>

<script>
import env from '../env'
export default {
  props: ['data', 'ruta', 'direccion'],
  data () {
    return {
      baseu: ''
    }
  },
  mounted () {
    console.log(this.data)
    if (this.ruta === 'cliente' || this.ruta === 'tienda') {
      this.baseu = env.apiUrl + 'productos_img/'
    }
  },
  methods: {
  }
}
</script>

<style>

</style>

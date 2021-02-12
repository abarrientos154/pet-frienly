<template>
  <div class="row q-gutter-md q-ma-sm">
    <q-card v-for="(img, index) in data" class="shadow-13 bg-secondary q-mt-lg" style="border-radius:12px;width: 150px" :key="index" @click="(ruta === 'cliente') || (ruta === 'tienda') ? $router.push('/descripcionproducto/' + img._id) : $router.push('/descripcionsolicitud/' + img._id)">
      <q-img :src="img.fileName ? baseu + '/' + img.fileName : img.images ? baseu + '/' + img.images[0] : 'noimgpro.png'" spinner-color="white" style="height: 190px; width: 150px" >
        <div v-if="direccion" class="row absolute-bottom" style="width:100%">
          <q-icon class="col-1" name="room" color="blak" style="font-size: 1.5rem;"/>
          <div class="q-pl-sm q-pt-xs text-caption">{{img.direccion}}</div>
        </div>
      </q-img>
      <q-scroll-area horizontal style="height: 25px" class="q-ma-xs" >
      <div class="text-subtitle1 text-center">{{img.name}}</div>
      </q-scroll-area>
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
    if (this.ruta === 'cliente' || this.ruta === 'tienda') {
      this.baseu = env.apiUrl + '/productos_img'
    } else {
      this.baseu = env.apiUrl + '/necesidad_img'
    }
  },
  methods: {
  }
}
</script>

<style>

</style>

<template>
<q-scroll-area v-if="dataFav.length" horizontal style="height: 160px" class="q-ma-sm" >
  <div class="row no-wrap">
   <q-card @click="$router.push('/tienda/' + img.datos_tienda._id)" v-for="(img, index) in dataFav" class="shadow-3 bg-secondary q-ml-md" style="border-radius:12px; width: 110px" :key="index">
    <q-img class="q-mr-sm" :src="baseu + img.datos_tienda._id" spinner-color="white" style="height: 120px; width: 110px" >
      <div class="row absolute-bottom" style="width:100%">
        <q-icon class="col-1" name="room" color="blak" style="font-size: 1.5rem;"/>
        <div class="q-pl-sm q-pt-xs text-caption">{{img.datos_tienda.direccion}}</div>
      </div>
    </q-img>
    <q-scroll-area horizontal style="height: 25px" class="q-ma-xs" >
    <div class="text-subtitle1 text-center">{{img.datos_tienda.full_name}}</div>
    </q-scroll-area>
  </q-card>
  </div>
  </q-scroll-area>
</template>

<script>
import env from '../env'
export default {
  props: ['dataFav'],
  data () {
    return {
      baseu: ''
    }
  },
  mounted () {
    this.baseu = env.apiUrl + '/perfil_img/perfil'
  },
  methods: {
  }
}
</script>

<style>

</style>

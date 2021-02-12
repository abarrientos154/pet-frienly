<template>
<q-scroll-area v-if="data.length" horizontal style="height: 160px" class="q-ma-sm" >
  <div class="row no-wrap">
   <q-card @click="$router.push('/tienda/' + img._id)" v-for="(img, index) in data" class="shadow-3 bg-secondary q-ml-md" style="border-radius:12px; width: 110px" :key="index">
    <q-img class="q-mr-sm" :src="baseu + img._id" spinner-color="white" style="height: 120px; width: 110px" >
      <div class="row absolute-bottom" style="width:100%">
        <q-icon class="col-1" name="room" color="blak" style="font-size: 1.5rem;"/>
        <div class="q-pl-sm q-pt-xs text-caption">{{img.direccion}}</div>
      </div>
    </q-img>
    <q-scroll-area horizontal style="height: 25px" class="q-ma-xs" >
    <div class="text-subtitle1 text-center">{{img.full_name}}</div>
    </q-scroll-area>
  </q-card>
  </div>
  </q-scroll-area>
</template>

<script>
import env from '../env'
export default {
  data () {
    return {
      data: [],
      baseu: ''
    }
  },
  mounted () {
    this.tiendasPopulares()
  },
  methods: {
    tiendasPopulares () {
      this.$api.get('mas_populares').then(res => {
        if (res) {
          this.data = res
          this.baseu = env.apiUrl + '/perfil_img/perfil'
        }
      })
    }
  }
}
</script>

<style>

</style>

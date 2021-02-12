<template>
  <div>
    <div class="row q-ma-md">
      <q-icon :name="categoria.icons" color="primary" style="font-size: 2.5em;" />
      <div class="text-h6 q-ml-md">{{categoria.name}}</div>
    </div>
    <q-separator />
    <div class="row q-gutter-md q-ma-sm" v-if="data.length > 0">
      <q-card v-for="(item, index) in data" class="shadow-3 bg-secondary q-mt-lg" style="border-radius:12px;width: 150px" :key="index" @click="rol === 2 ? $router.push('/descripcionproducto/' + item._id) : $router.push('/descripcionsolicitud/' + item._id)">
        <q-img :src="item.fileName ? baseu + item.fileName : item.images ? baseu + item.images[0] : 'noimgpro.png'" spinner-color="white" style="height: 190px; width: 150px" />
        <div class="text-subtitle1 text-center">{{item.name}}</div>
      </q-card>
    </div>
    <div v-else>
      <div class="absolute-center text-center row justify-center">
        <div class="text-h6">{{rol === 2 ? 'Sin productos ' : 'Sin socilitudes '}} para esta categoria</div>
        <q-btn class="q-mt-md" size="lg" color="primary" flat icon="arrow_back" label="volver" @click="$router.go(-1)" />
      </div>
    </div>
  </div>
</template>

<script>
import env from '../env'
export default {
  data () {
    return {
      id: this.$route.params.id,
      rol: 0,
      ruta: '',
      categoria: {},
      data: [],
      baseu: '',
      ver: true
    }
  },
  mounted () {
    this.cargar()
  },
  methods: {
    cargar () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
          if (this.rol === 2) {
            this.ruta = 'producto_filtrado'
            this.baseu = env.apiUrl + '/productos_img/'
          } else {
            this.ruta = 'necesidad_by_categoria_id'
            this.baseu = env.apiUrl + '/necesidad_img/'
            if (v.status === 0 || v.status === 2) {
              this.ver = false
            }
          }
          if (this.ver) {
            this.$api.get(`${this.ruta}/${this.id}`).then(res => {
              this.data = res
            })
          }
          this.$api.get('categoria').then(v => {
            if (v) {
              this.categoria = v.find(x => x._id === this.id)
            }
          })
        }
      })
    }
  }
}
</script>

<style>

</style>

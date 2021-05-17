<template>
  <div>
    <q-list class="row" v-if="data.length > 0">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" v-for="(item, index) in data" :key="index">
        <q-card class="bg-orange-2 shadow-10 q-mx-xs q-mb-md" style="border-radius: 15px;">
          <div class="row justify-between">
            <div class="col-4" @click="$router.push('/descripcionproducto/'+item._id)">
              <q-img :src="baseu + item.images[0]" style="height: 120px; border-radius: 15px"/>
            </div>
            <div class="col-6 q-py-sm justify-center column" @click="$router.push('/descripcionproducto/'+item._id)">
              <div class="text-weight-bolder text-primary q-ml-sm" style="font-size: 18px">{{item.name}}</div>
              <div class="q-ml-sm">Cantidad: {{item.cantidad}}</div>
              <div class="q-ml-sm">Precio: {{item.precio}}$</div>
            </div>
            <div class="col-2 column justify-center">
              <!-- <q-btn round flat :icon="item.llevar ? 'dangerous' : 'add_shopping_cart'" :color="item.llevar ? 'red' : 'primary'" @click="llevarProd(index)"/> -->
            </div>
          </div>
        </q-card>
      </div>
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
      baseu: '',
      productosSelec: []
    }
  },
  mounted () {
    if (this.ruta === 'cliente' || this.ruta === 'tienda') {
      this.baseu = env.apiUrl + 'productos_img/'
    }
  },
  methods: {
    llevarProd (ind) {
      if (this.data[ind].llevar) {
        this.data[ind].llevar = !this.data[ind].llevar
        if (this.data[ind].llevar === true) {
          this.data[ind].llevarCant = 1
          this.data[ind].cantidad = this.data[ind].cantidad - this.data[ind].llevarCant
        } else {
          this.data[ind].llevarCant = 0
          this.data[ind].cantidad = this.data[ind].cantidad + 1
        }
        this.productosSelec = this.data.filter(v => v.llevar)
        this.$emit('llevarProductos', this.productosSelec)
      } else {
        this.data[ind].llevar = true
        this.data[ind].llevarCant = 1
        this.data[ind].cantidad = this.data[ind].cantidad - this.data[ind].llevarCant
        this.productosSelec = this.data.filter(v => v.llevar)
        this.$emit('llevarProductos', this.productosSelec)
      }
    }
  }
}
</script>

<style>

</style>

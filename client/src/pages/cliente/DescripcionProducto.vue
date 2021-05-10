<template>
  <div class="column justify-between">
    <div class="q-pa-md row">
      <div class="q-mr-md col-2 column items-center">
        <q-avatar rounded v-for="(img, index) in form.images" :key="index" class="q-mb-sm" @click="mostrarimg(index)" style="height: 75px; width: 100%; border-radius: 15px;">
          <q-img style="height: 100%;" :src="imgProd + img.src"/>
        </q-avatar>
      </div>

      <div class="col column items-center">
        <q-avatar rounded style="height: 350px; width: 100%; border-radius: 15px;" class="q-mb-md">
          <q-img style="height: 100%;" :src="imgProd + form.images[selecImg].src"/>
        </q-avatar>

        <div class="column full-width">
          <div class="q-mb-sm row justify-between items-center">
            <div class="text-h6">{{form.name}}</div>
            <q-btn round flat dense class="q-mr-xs" color="primary" icon="store" style="height: 30px;width:30px" @click="rol === 2 ? $router.push('/tienda/' + infoProv._id) : $router.push('/descripcionusuario/' + infoProv._id)"/>
          </div>
          <div class="text-grey q-mb-lg">Disponible - {{form.cantidad}} Unidades</div>
          <div class="row q-mb-lg">
            <div class="text-h4 text-primary">$ {{form.precio}}</div>
          </div>
          <div class="text-grey q-mb-lg">{{form.descripcion}}</div>
          <!-- <div class="row justify-center">
            <div class="q-mr-xs text-h6 q-pr-sm">Cantidad</div>
            <div class="q-mr-xs">
              <q-input v-model.number="cantidad" borderless class="q-pr-sm" type="number" dense style="width: 50px" min="0"/>
            </div>
            <div class="q-pr-xs">
              <q-btn round flat dense class="q-mr-xs" color="primary" icon="add" style="height: 30px;width:30px" @click="cantidad++"/>
              <q-btn round flat dense class="q-mr-xs" color="primary" icon="remove" style="height: 30px;width:30px" @click="cantidad--"/>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- <div class="row justify-center q-ma-md">
      <q-btn class="full-width" color="primary" text-color="white" rounded label="Agregar al carro" @click="agregar()" no-caps/>
    </div> -->
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      id: this.$route.params.id,
      rol: 0,
      form: {},
      cantidad: 1,
      infoProv: {},
      imgProd: '',
      imgProv: '',
      selecImg: 0
    }
  },
  mounted () {
    this.cargarProducto()
  },
  methods: {
    cargarProducto () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.rol = res.roles[0]
        }
      })
      this.$api.get('producto/' + this.id).then(res => {
        if (res) {
          this.form = res
          this.imgProd = env.apiUrl + 'productos_img/'
          if (this.form) {
            console.log(this.form)
            this.$api.get('user_by_id/' + this.form.proveedor_id).then(v => {
              this.infoProv = v
              this.imgProv = env.apiUrl + 'perfil_img/'
            })
          }
        }
      })
    },
    mostrarimg (ind) {
      this.selecImg = ind
    }
  }
}
</script>

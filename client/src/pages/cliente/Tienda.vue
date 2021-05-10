<template>
  <div>
    <div v-if="carro == false" class="column justify-between">
      <div class="q-pa-md row">
        <div class="q-mr-md col-2 column items-center">
          <q-avatar rounded class="q-mb-sm" v-for="(img, index) in data.tiendaFiles" :key="index" @click="mostrarimg(index)" style="height: 75px; width: 100%; border-radius: 15px;">
            <q-img style="height: 100%;" :src="baseuTienda + img"/>
          </q-avatar>
        </div>

        <div class="col column items-center">
          <q-avatar rounded style="height: 350px; width: 100%; border-radius: 15px;" class="q-mb-md" @click="perfilimg = true">
            <q-img style="height: 100%;" :src="perfilimg ? baseu + perfile : baseuTienda + data.tiendaFiles[selecimg]"/>
          </q-avatar>

          <div class="full-width column items-center">
            <div class="text-h5 text-center">{{data.name}}</div>
            <div class="items-center row text-grey-8">
              <q-icon class="col-1" name="email" />
              <div class="text-subtitle2 col" style="font-size: 12px">{{data.email}}</div>
            </div>
            <div class="items-center row text-grey-8">
              <q-icon class="col-1" name="payment" />
              <div class="text-subtitle2 col" style="font-size: 12px">{{data.dni}}</div>
            </div>
            <div class="items-center row text-grey-8 q-mb-md">
              <q-icon class="col-1" name="room" />
              <div class="text-subtitle2 col" style="font-size: 12px">{{data.place}}</div>
            </div>

            <div v-if="data.roles" class="full-width">
              <div class="text-subtitle1 text-center">{{rol === 3 ? 'Mis Productos' : ''}}</div>
              <listado-de-sugerencia :data="misDatos" :direccion="false" :ruta="data.roles[0] !== 3 ? 'proveedor' : 'cliente'" @llevarProductos="productos = $event" class="q-mt-xs"/>
            </div>
          </div>
        </div>
      </div>
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h6">Advertencia!</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            Antes de salir de la tienda o recargar la página, debe efectuar la compra de los productos seleccionados. De lo contrario, la lista de productos se renovará y se perderán los datos ingresados.
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-page-sticky position="bottom-left">
        <q-btn round class="q-ma-md" icon="shopping_cart" color="primary" size="20px" @click="carrocompras()">
          <q-badge v-if="productos.length > 0" color="red" :label="productos.length" floating/>
        </q-btn>
      </q-page-sticky>
    </div>

    <div v-else>
      <div v-if="productos.length > 0">
        <div>
          <q-list class="column items-center q-pa-md">
            <div v-for="(item, index) in productos" :key="index" class="row justify-between full-width q-mb-md no-wrap">
              <div class="row no-wrap">
                <div class="row no-wrap">
                  <div>
                    <q-checkbox size="45px" v-model="item.llevar" @input="calcular()" style="margin-top: -11px;"/>
                  </div>
                  <q-avatar rounded class="bg-secondary" style="height: 100px; width: 75px;">
                    <q-img style="height: 100%;" :src="baseuProd + item.images[0]"/>
                  </q-avatar>
                </div>
                <div class="column justify-between q-px-sm">
                  <div>
                    <div>{{item.name}}</div>
                    <div class="text-grey">{{data.name}}</div>
                  </div>
                  <div class="text-primary text-subtitle1">${{item.precio}}</div>
                </div>
              </div>

              <div class="column justify-between items-end">
                <q-btn round flat dense class="on-right" color="secondary" icon="delete" @click="quitarProd(item, index)" size="20px"/>
                <div class="row items-center q-mr-sm no-wrap">
                  <q-btn dense :color="item.llevarCant == 1 ? 'secondary' : 'primary'" icon="remove" style="height: 30px;width:30px" @click="item.llevarCant > 1 ? restar(item) : ''"/>
                  <div class="text-primary q-mx-sm">{{item.llevarCant}}</div>
                  <q-btn dense :color="item.cantidad > 0 ? 'primary' : 'secondary'" icon="add" style="height: 30px;width:30px" @click="item.cantidad > 0 ? aumentar(item) : ''"/>
                </div>
              </div>
            </div>
          </q-list>
          <div style="height: 250px"></div>
        </div>
        <div class="q-pa-md absolute-bottom">
          <div class="row items-center justify-between q-mb-lg">
            <div class="text-grey">Cantidad de articulos</div>
            <div>{{articulos}}</div>
          </div>
          <div class="row items-center justify-between q-mb-lg">
            <div class="text-grey">Valor</div>
            <div>${{valor}}</div>
          </div>
          <div class="row items-center justify-between q-mb-lg">
            <div class="text-grey">Comisión PetFrienly</div>
            <div>${{comision}}</div>
          </div>
          <div class="row items-center justify-between q-mb-sm">
            <div class="text-grey">Precio total</div>
            <div class="text-primary text-h6">${{total}}</div>
          </div>
          <div class="row justify-center">
            <q-btn class="full-width q-pa-sm" color="primary" text-color="white" label="Confirmar la compra" @click="carro = !carro" no-caps/>
          </div>
        </div>
      </div>
      <div v-else class="absolute-center text-center text-h6 text-primary" style="width: 100%;">Carro de compras vacio...</div>
    </div>
  </div>
</template>

<script>
import ListadoDeSugerencia from '../../components/ListadoDeSugerencia.vue'
import env from '../../env'
export default {
  components: { ListadoDeSugerencia },
  data () {
    return {
      id: this.$route.params.id,
      baseu: '',
      baseuTienda: '',
      baseuProd: '',
      perfile: '',
      rol: null,
      today: null,
      now: null,
      data: {},
      misDatos: [],
      img: '',
      estado: false,
      dialogStado: false,
      ratingPerfil: 0,
      perfilimg: true,
      selecimg: 0,
      carro: false,
      productos: [],
      cantidad: 1,
      seleccionado: true,
      articulos: 0,
      valor: 0,
      comision: 0,
      total: 0,
      alert: true
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    verImg (img) {
      this.baseu = env.apiUrl + 'tienda_img/'
      this.perfile = img
    },
    getInfo () {
      this.$api.get('user_by_id/' + this.id).then(v => {
        this.data = v
        console.log(this.data)
        this.rol = v.roles[0]
        this.perfile = this.id
        this.baseu = env.apiUrl + 'perfil_img/'
        this.baseuTienda = env.apiUrl + 'tienda_img/'
        if (this.rol === 3) {
          this.getProduct()
        }
      })
    },
    getProduct () {
      this.$api.get('producto_by_proveedor/' + this.id).then(v => {
        if (v) {
          this.misDatos = v
          this.baseuProd = env.apiUrl + 'productos_img/'
        }
      })
    },
    mostrarimg (ind) {
      this.perfilimg = false
      this.selecimg = ind
    },
    carrocompras () {
      this.carro = !this.carro
      this.calcular()
    },
    quitarProd (itm, ind) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro que deseas quitar este producto del carro?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        itm.llevar = false
        itm.cantidad = itm.cantidad + itm.llevarCant
        this.productos.splice(ind, 1)
        this.calcular()
      }).onCancel(() => {
        // cancel
      })
    },
    aumentar (itm) {
      itm.llevarCant++
      itm.cantidad--
      this.calcular()
    },
    restar (itm) {
      itm.llevarCant--
      itm.cantidad++
      this.calcular()
    },
    calcular () {
      this.articulos = 0
      this.valor = 0
      this.comision = 0
      this.total = 0
      this.checProd = this.productos.filter(v => v.llevar)
      for (const i of this.checProd) {
        this.articulos = this.articulos + i.llevarCant
        for (let j = 0; j < i.llevarCant; j++) {
          this.total = this.total + i.precio
          this.comision = (this.total * 5) / 100
          this.valor = this.total - this.comision
        }
      }
    }
  }
}
</script>

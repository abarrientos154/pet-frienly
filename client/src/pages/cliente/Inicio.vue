<template>
  <div style="max-width: 100%">
    <div class="q-mt-md q-mx-sm text-h5">Bienvenido Usuario</div>
    <div class="q-mb-md q-mx-sm text-secondary text-weight-bolder">El amor es una palabra de cuatro patas</div>
    <div class="row q-mx-sm q-mb-sm">
      <q-input dense class="shadow-4 col q-mr-sm" standout="bg-primary text-white" type="text" label="Que necesitas?" style="border-radius: 10px">
        <template v-slot:prepend>
          <q-icon name="search"/>
        </template>
      </q-input>
      <q-btn dense flat icon="apartment" color="primary" @click="$router.push('/buscar_hospedaje')"/>
    </div>
    <div class="q-mb-md q-mx-sm text-h5">Catalogo de productos</div>
    <q-scroll-area horizontal class="q-mb-md" :thumb-style="thumbStyle" style="height: 48px;" ref="first">
      <q-tabs v-model="tabCat" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab v-for="index in 10" :key="index" label="Categoria" no-caps/>
      </q-tabs>
    </q-scroll-area>
    <div class="q-mb-xs q-mx-sm">Ultimos Productos agregados</div>
    <q-scroll-area horizontal class="q-mx-sm q-mb-md" :thumb-style="thumbStyle" style="height: 330px;" ref="first">
      <div class="row no-wrap" style="width: 100%">
        <q-card class="q-mt-sm q-mx-sm bordes shadow-11" v-for="(item, index) in productos" :key="index" v-ripple style="width: 200px; height: 300px;">
          <q-card-section style="height: 65%;">
            <q-img class="absolute-center" :src="imgProducto + item.images[0]" style="width: 90%; height: 90%;"/>
          </q-card-section>
          <q-separator />
          <q-card-section class="bg-orange-2" style="height: 35%;">
            <div>
              <q-scroll-area horizontal style="height: 23px; width:100%">
                <div class="text-subtitle2 text-weight-bolder" style="font-size: 13px">{{item.name}}</div>
              </q-scroll-area>
              <div class="items-center row text-grey">
                <q-icon class="col-1" name="place" />
                <div class="text-subtitle2 col" style="font-size: 12px">{{item.datos_proveedor.place}}</div>
              </div>
            </div>
            <div class="items-center row justify-between">
              <div class="row">
                <q-icon size="20px" name="star" color="secondary" v-for="(i, index) in 5" :key="index"/>
              </div>
              <q-btn round icon="keyboard_arrow_right" text-color="primary" color="white" size="10px" @click="$router.push('/descripcionproducto/'+item._id)"/>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
    <div class="q-mb-md q-mx-sm text-h5">Nuestras tiendas</div>
    <q-scroll-area horizontal class="q-mb-md" :thumb-style="thumbStyle" style="height: 48px;" ref="first">
      <q-tabs v-model="tabSer" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab v-for="index in 10" :key="index" label="Servicio" no-caps/>
      </q-tabs>
    </q-scroll-area>
    <div class="q-mb-xs q-mx-sm">Tiendas mejores calificadas</div>
    <q-scroll-area horizontal class="q-mx-sm q-mb-md" :thumb-style="thumbStyle" style="height: 330px;" ref="first">
      <div class="row no-wrap" style="width: 100%">
        <q-card class="q-mt-sm q-mx-sm bordes shadow-11" v-for="(item, index) in tiendas" :key="index" v-ripple style="width: 200px; height: 300px;">
          <q-card-section style="height: 65%;">
            <q-img class="absolute-center" :src="imgTienda + item._id" style="width: 90%; height: 90%;"/>
          </q-card-section>
          <q-separator />
          <q-card-section class="bg-orange-2" style="height: 35%;">
            <div>
              <q-scroll-area horizontal style="height: 23px; width:100%">
                <div class="text-subtitle2 text-weight-bolder" style="font-size: 13px">{{item.name}}</div>
              </q-scroll-area>
              <div class="items-center row text-grey">
                <q-icon class="col-1" name="place" />
                <div class="text-subtitle2 col" style="font-size: 12px">{{item.paisUser.pais}}, {{item.ciudadUser.ciudad}}</div>
              </div>
            </div>
            <div class="items-center row justify-between">
              <div class="row">
                <q-icon size="20px" name="star" color="secondary" v-for="(i, index) in 5" :key="index"/>
              </div>
              <q-btn round icon="keyboard_arrow_right" text-color="primary" color="white" size="10px" @click="$router.push('/tienda/'+item._id)"/>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
    <div class="q-mx-sm text-h5">Alojamientos</div>
    <div class="q-mb-md q-mx-sm">Alojamientos mejor catificados</div>
    <q-list class="q-mb-xl row justify-center" style="width: 100%; height: auto;">
      <q-card v-for="(hospedaje, index) in hospedajes" :key="index" class="q-mb-md q-mx-sm col no-wrap shadow-11" style="min-width: 300px; max-width: 375px; border-radius: 12px;">
        <q-img @click="seeAccommodation(hospedaje._id)" :src="hospedaje.images[0] ? urlHospedaje + '/' + hospedaje.images[0] : 'noimgpro.png'" style="height: 175px;">
          <q-btn position="top-left" round icon="favorite" color="primary" size="10px" class="q-mt-sm q-ml-sm"/>
        </q-img>
        <q-separator />
        <q-card-section class="row justify-between">
          <div>
            <div class="text-subtitle2" style="font-size: 13px">{{hospedaje.name}}</div>
            <div class="items-center row text-grey">
                <q-icon name="place" />
                <div class="text-subtitle2" style="font-size: 12px">{{hospedaje.datos_proveedor.place}}</div>
            </div>
          </div>
          <q-btn no-caps flat dense class="bg-primary text-white" style="width: 100px; border-radius: 10px">${{hospedaje.price}} / noche</q-btn>
        </q-card-section>
      </q-card>
    </q-list>
    <div class="column items-center" style="height: 250px;">
      <div class="text-weight-bolder" style="font-size: 15px">Suscribete a nuestro boletín</div>
      <div style="font-size: 11px">Recibe las mejores ofertas de todos</div>
      <div  class="q-mb-md" style="font-size: 11px">nuestros proveedores</div>
      <q-input outlined label="Tu correo aquí" color-label="secondary">
        <template v-slot:prepend>
          <q-icon name="mail_outline"/>
        </template>
        <template v-slot:append class="bg-secondary">
          <q-btn flat dense icon="send" class="bg-primary" text-color="white" style="height: 100%; width: 50px; margin-right: -12px"/>
        </template>
      </q-input>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round icon="shopping_bag" color="primary" size="20px">
        <q-badge color="red" label="2" floating/>
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import env from '../../env'
export default {
  components: {
  },
  data () {
    return {
      place: [],
      imgTienda: '',
      imgProducto: '',
      tabCat: 'mails',
      tabSer: 'mails',
      tiendas: [],
      productos: [],
      hospedajes: [],
      urlHospedaje: '',
      thumbStyle: {
        borderRadius: '5px',
        backgroundColor: 'gray',
        opacity: 0.25
      }
    }
  },
  mounted () {
    this.getTiendas()
    this.getProductos()
    this.urlHospedaje = env.apiUrl + 'hospedajes_img'
    this.obtener_hospedajes()
  },
  methods: {
    seeAccommodation (id) {
      this.$router.push('/descripcionalojamiento/' + id)
    },
    getTiendas () {
      this.$api.post('user_by_rol', { rol: [3] }).then(res => {
        this.imgTienda = env.apiUrl + 'perfil_img/'
        if (res) {
          this.tiendas = res
          console.log(this.tiendas)
        }
      })
    },
    getProductos () {
      this.$api.get('producto').then(res => {
        this.imgProducto = env.apiUrl + 'productos_img/'
        if (res) {
          this.productos = res
          console.log(this.productos)
        }
      })
    },
    obtener_hospedajes () {
      this.$api.get('hospedaje').then(res => {
        if (res) {
          this.hospedajes = res
          console.log(this.hospedajes)
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.bordes
  border-top-left-radius: 0px
  border-top-right-radius: 30px
  border-bottom-left-radius: 30px
  border-bottom-right-radius: 30px
</style>

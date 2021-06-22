<template>
  <div style="max-width: 100%">
    <q-card style="height: 400px; width: 100%;" class="bg-primary">
    </q-card>
    <div class="q-mx-xl">
      <div class="q-mt-md q-mx-sm text-h5">Bienvenido Usuario</div>
      <div class="q-mb-md q-mx-sm text-weight-bolder">El amor es una palabra de cuatro patas</div>
      <div class="q-mb-md q-mx-sm text-weight-bolder">¿Qué es lo que buscas?
      <div class="text-overline">Selecciona Hospedaje o Tienda</div>
      <div class="row q-mx-sm q-mb-sm">
        <q-select outlined dense filled v-model="search.service" :options="services" option-value="value" option-label="name" emit-value map-options class="shadow-4 col q-mr-sm">
        </q-select>
      </div>
      </div>
      <div class="q-mb-md q-mx-sm text-weight-bolder">¿Para quién lo buscas?
      <div class="text-overline">Selecciona perro gato o ambos</div>
      <div class="row q-mx-sm q-mb-sm">
        <q-select outlined dense filled v-model="search.petType" :options="petType" option-value="value" option-label="name" emit-value map-options class="shadow-4 col q-mr-sm">
        </q-select>
      </div>
      </div>
      <div class="q-mb-md q-mx-sm text-weight-bolder">¿Donde estas buscando?
      <div class="text-overline">Selecciona tu ciudad</div>
      <div class="row q-mx-sm q-mb-sm">
        <q-select outlined dense filled v-model="search.city" :options="cities" option-value="_id" option-label="name" emit-value map-options class="shadow-4 col q-mr-sm">
        </q-select>
      </div>
      </div>
      <div class="row justify-center q-my-lg">
        <q-btn color="primary" label="Buscar" style="width: 70%; heigth 40px; border-radius: 10px"/>
      </div>
    </div>
    <!-- <div class="row q-mx-sm q-mb-sm">
      <q-input dense borderless class="shadow-4 col q-mr-sm" type="text" label="¿Qué es lo que buscas?" style="border-radius: 10px">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn dense flat icon="apartment" color="primary" @click="$router.push('/buscar_hospedaje')"/>
    </div> -->
    <div class="q-mb-md q-mx-sm text-h5">Ultimas tiendas añadidas</div>
    <q-scroll-area
        horizontal
        style="height: 330px;"
      >
        <div class="row no-wrap q-py-md q-px-md q-gutter-md">
          <q-card style="border-radius: 24px; width:230px" clickable v-ripple v-for="(card, index) in 10" :key="index">
            <q-card style="height: 280px; width: 100%" class="bg-primary">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md"/>
            </q-card>
          </q-card>
        </div>
      </q-scroll-area>
    <!-- <q-scroll-area horizontal class="q-mb-md" :thumb-style="thumbStyle" style="height: 48px;" ref="first">
      <q-tabs v-model="tabCat" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab v-for="index in 10" :key="index" label="Categoria" no-caps/>
      </q-tabs>
    </q-scroll-area> -->
    <q-card style="height: 250px" class="q-mx-md q-my-md bg-primary"></q-card>
    <!-- <div class="q-mb-md q-mx-sm text-h5">Nuestras tiendas</div>
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
              <q-rating max="5" size="20px" v-model="rating" color="primary" disable icon="star_border" icon-selected="star" icon-half="star_half" no-dimming />
              <q-btn round @click="$router.push('/descripcionproducto/' + item._id)" icon="keyboard_arrow_right" text-color="primary" color="white" size="10px"/>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area> -->
    <div class="q-mb-md q-mx-sm text-h5">Nuestras tiendas</div>
    <q-scroll-area horizontal class="q-mb-md" :thumb-style="thumbStyle" style="height: 48px;" ref="first">
      <q-tabs v-model="tabSer" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab v-for="(item, index) in servicios" :key="index" :label="item.name" no-caps/>
      </q-tabs>
    </q-scroll-area>
    <div class="row">
      <div class="row justify-center q-py-sm q-px-sm q-gutter-sm" style="width:100%">
          <q-card style="border-radius: 24px; width:40%" clickable v-ripple v-for="(card, index) in 6" :key="index">
            <q-card style="height: 280px; width: 100%" class="bg-primary">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md"/>
            </q-card>
            <div class="q-ml-md">
              <div class="text-subtitle2 q-mb-xs q-mx-sm">Nombre tienda</div>
              <div class="row">
                <q-icon name="place" />
                <div class="text-subtitle2 q-mb-xs q-mx-sm">Ciudad / Direccion</div>
              </div>
            </div>
            <q-rating class="q-mx-sm q-mb-sm" v-model="stars" :max="5" size="25px" />
          </q-card>
        </div>
    </div>
    <div class="row justify-center q-my-lg">
      <q-btn color="primary" label="Ver más" style="width: 70%; heigth 40px; border-radius: 10px"/>
    </div>
    <q-card style="height: 250px" class="q-mx-md q-my-md bg-primary"></q-card>
    <div class="q-mb-md q-mx-sm text-h5">Alojamientos mejores calificados</div>
    <q-scroll-area
        horizontal
        style="height: 330px;"
      >
        <div class="row no-wrap q-py-md q-px-md q-gutter-md">
          <q-card style="border-radius: 24px; width:230px" clickable v-ripple v-for="(card, index) in 10" :key="index">
            <q-card style="height: 280px; width: 100%" class="bg-primary">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md"/>
            </q-card>
          </q-card>
        </div>
      </q-scroll-area>
    <div class="q-mb-md q-mx-sm text-h5">Alojamientos</div>
    <q-scroll-area horizontal class="q-mb-md" :thumb-style="thumbStyle" style="height: 48px;" ref="first">
      <q-tabs v-model="tabSer" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab v-for="(item, index) in servicios" :key="index" :label="item.name" no-caps/>
      </q-tabs>
    </q-scroll-area>
    <div class="row">
      <div class="row justify-center q-py-sm q-px-sm q-gutter-sm" style="width:100%">
          <q-card style="border-radius: 24px; width:40%" clickable v-ripple v-for="(card, index) in 6" :key="index">
            <q-card style="height: 280px; width: 100%" class="bg-primary">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md"/>
            </q-card>
            <div class="q-ml-md">
              <div class="text-subtitle2 q-mb-xs q-mx-sm">Nombre Alojamiento</div>
              <div class="row">
                <q-icon name="place" />
                <div class="text-subtitle2 q-mb-xs q-mx-sm">Ciudad / Direccion</div>
              </div>
            </div>
            <q-rating class="q-mx-sm q-mb-sm" v-model="stars" :max="5" size="25px" />
          </q-card>
        </div>
    </div>
    <!-- <div class="q-mb-xs q-mx-sm">Tiendas mejores calificadas</div> -->
   <!--  <q-scroll-area horizontal class="q-mx-sm q-mb-md" :thumb-style="thumbStyle" style="height: 330px;" ref="first">
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
              <div class=</div>
            </div>"items-center row text-grey">
                <q-icon class="col-1" name="place" /> -->
                <!-- <div class="text-subtitle2 col" style="font-size: 12px">{{item.paisUser.name}}, {{item.ciudadUser.name}}</div> -->

            <!-- <div class="items-center row justify-between">
              <q-rating max="5" size="20px" v-model="rating" color="primary" disable icon="star_border" icon-selected="star" icon-half="star_half" no-dimming />
              <q-btn round @click="$router.push('/tienda/' + item._id)" icon="keyboard_arrow_right" text-color="primary" color="white" size="10px"/>
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
          <q-btn no-caps flat dense @click="$router.push('/descripcionalojamiento/' + hospedaje._id)" class="bg-primary text-white" style="width: 100px; border-radius: 10px">${{hospedaje.price}} / noche</q-btn>
        </q-card-section>
      </q-card>
    </q-list> -->
    <div class="column items-center q-mt-lg" style="height: 250px;">
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
    <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round icon="shopping_bag" color="primary" size="20px">
        <q-badge color="red" label="2" floating/>
      </q-btn>
    </q-page-sticky> -->
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
      rating: 3,
      hospedajes: [],
      urlHospedaje: '',
      servicios: [],
      thumbStyle: {
        borderRadius: '5px',
        backgroundColor: 'gray',
        opacity: 0.25
      },
      services: [
        { name: 'Hospedaje', value: 1 },
        { name: 'Tienda', value: 2 }
      ],
      petType: [
        { name: 'Perro', value: 1 },
        { name: 'Gato', value: 2 },
        { name: 'Ambos', value: 3 }
      ],
      cities: [],
      search: {}
    }
  },
  mounted () {
    this.getCities()
    this.getTiendas()
    this.getProductos()
    this.urlHospedaje = env.apiUrl + 'hospedajes_img'
    this.obtener_hospedajes()
    this.getServicios()
    console.log('this.tiendas :>> ', this.tiendas)
  },
  methods: {
    async getCities () {
      await this.$api.get('ciudades').then(res => {
        if (res) {
          this.cities = res
          console.log('cities :>> ', this.cities)
        }
      })
    },
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
          // console.log(this.productos)
        }
      })
    },
    obtener_hospedajes () {
      this.$api.get('hospedaje').then(res => {
        if (res) {
          this.hospedajes = res
          // console.log(this.hospedajes)
        }
      })
    },
    getServicios () {
      this.$api.get('servicios').then(res => {
        if (res) {
          this.servicios = res
          // console.log(this.servicios, 'mira')
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

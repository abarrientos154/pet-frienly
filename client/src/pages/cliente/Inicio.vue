<template>
  <div style="max-width: 100%">
    <q-card style="height: 400px; width: 100%;" class="bg-primary">
    </q-card>
    <div class="q-mx-md">
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
    <div class="q-mb-md q-mx-sm text-h4">Ultimas tiendas añadidas</div>
    <q-scroll-area
        horizontal
        style="height: 330px;"
      >
        <div class="row no-wrap q-py-md q-px-md q-gutter-md">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:230px" clickable v-ripple v-for="(store, index) in stores" :key="index" @click="$router.push('/inicio-proveedor/' + store._id)">
            <q-img :src="imgTienda + store._id" style="height: 280px; width: 100%" class="column">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey q-mb-xl"/>
            </q-img>
            <div class="absolute-full q-ml-md column justify-end q-mb-sm">
              <div class="text-white text-bold">{{store.tienda.name}}</div>
              <div class="row">
                <q-icon name="place" class="q-mr-xs text-white"/>
                <div class="text-white text-subtitle2 col-10">{{store.city}}, {{store.tienda.direccion}}</div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    <q-card style="height: 250px" class="q-mx-md q-my-md bg-primary"></q-card>
    <div class="q-mb-md q-mx-sm text-h4">Nuestras tiendas</div>
    <div class="row">
      <div class="row justify-center q-py-sm q-px-sm q-gutter-sm" style="width:100%">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:40%; min-width:120px" clickable v-ripple v-for="(store, index) in stores" :key="index" @click="$router.push('/inicio-proveedor/' + store._id)">
            <q-img :src="imgTienda + store._id" style="height: 280px; width: 100%" class="bg-primary">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey q-mb-xl"/>
            </q-img>
            <div class="absolute-full q-ml-md column justify-end q-mb-sm">
              <q-rating class="q-mb-sm" v-model="stars" :max="5" size="130%" />
              <div class="text-white text-bold">{{store.tienda.name}}</div>
              <div class="row">
                <q-icon name="place" class="q-mr-xs text-white"/>
                <div class="text-subtitle2 text-white">{{store.city}}, {{store.tienda.direccion}}</div>
              </div>
            </div>
          </q-card>
        </div>
    </div>
    <div class="row justify-center q-my-lg">
      <q-btn no-caps color="primary" label="Ver más" class="q-py-md" style="width: 70%; heigth 40px; border-radius: 6px"/>
    </div>
    <q-card style="height: 250px" class="q-mx-md q-my-md bg-primary"></q-card>
    <div class="q-mb-md q-mx-sm text-h4">Ultimos alojamientos</div>
    <q-scroll-area
        horizontal
        style="height: 330px;"
      >
        <div class="row no-wrap q-py-md q-px-md q-gutter-md">
          <q-card style="border-radius: 24px; width:230px" clickable >
            <q-card style="height: 220px; width: 100%" class="bg-primary">
            </q-card>
            <div class="row justify-center items-center q-ma-md">
              <q-btn flat label="$12.000 por noche" style="border-radius: 25px" class="text-white q-pa-sm bg-primary"/>
            </div>
          </q-card>
          <q-card style="border-radius: 24px; width:230px" clickable >
            <q-card style="height: 220px; width: 100%" class="bg-primary">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey"/>
            </q-card>
            <div class="row justify-center items-center q-ma-md">
              <div class="text-subtitle2 text-grey q-mb-xs q-mx-sm">Nombre Alojamiento</div>
              <div class="row">
                <q-icon class="text-grey" name="place" />
                <div class="text-subtitle2 text-grey q-mb-xs q-mx-sm">Pais / Ciudad</div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    <div class="q-mb-md q-mx-sm text-h4">Alojamientos</div>
    <div class="row">
      <div class="row justify-center q-py-sm q-px-sm q-gutter-sm" style="width:100%">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:40%; min-width:120px" clickable v-ripple v-for="(item, index) in host" :key="index" @click="$router.push('/inicio-hospedador/' + item._id)">
            <q-img :src="imgProfile + item._id" style="height: 280px; width: 100%" class="bg-primary">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey q-mb-xl"/>
            </q-img>
            <div class="absolute-full q-ml-md column justify-end q-mb-sm">
              <div class="text-white text-bold">{{item.my_space.name}}</div>
              <div class="row">
                <q-icon name="place" class="q-mr-xs text-white"/>
                <div class="text-white text-subtitle2 q-mr-sm">{{item.city}}, {{item.my_space.direction}}</div>
              </div>
            </div>
          </q-card>
        </div>
    </div>
    <div class="row justify-center q-my-lg">
      <q-btn no-caps color="primary" label="Ver más" class="q-py-md" style="width: 70%; heigth 40px; border-radius: 6px"/>
    </div>
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
      imgProfile: '',
      imgProducto: '',
      tabCat: 'mails',
      tabSer: 'mails',
      stores: [],
      productos: [],
      rating: 3,
      host: [],
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
      search: {},
      stars: 4
    }
  },
  mounted () {
    this.getCities()
    this.getStore()
    this.getProductos()
    this.urlHospedaje = env.apiUrl + 'hospedaje_img'
    this.getHost()
    this.getServicios()
    console.log('this.stores :>> ', this.stores)
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
    getStore () {
      this.$api.post('user_by_rol', { rol: [3] }).then(res => {
        this.imgTienda = env.apiUrl + 'tienda_img/'
        console.log('this.imgTienda :>> ', this.imgTienda)
        if (res) {
          this.stores = res
          console.log(this.stores)
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
    getHost () {
      this.$api.post('user_by_rol', { rol: [4] }).then(res => {
        this.imgProfile = env.apiUrl + 'perfil_img/'
        if (res) {
          this.host = res
          console.log(this.host)
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

<template>
  <div>
    <div style="height: 300px; width: 100%;" class="bg-grey">
      <q-img src="nopublicidad.jpg" style="height: 300px; width: 100%" />
      <q-btn no-caps color="primary" class="q-mt-md q-ml-md absolute-top" label="Editar Perfil" @click="$router.push('/editar-perfil/' + user._id)"/>
    </div>

    <div class="q-mx-md">
      <div class="q-mt-md q-mx-sm text-h5">Bienvenido Usuario</div>
      <div class="q-mb-md q-mx-sm">El amor es una palabra de cuatro patas</div>
      <div class="q-mb-md q-mx-sm text-weight-bolder">¿Qué es lo que buscas?
      <div class="text-overline">Selecciona Hospedaje o Tienda</div>
      <div class="row q-mx-sm q-mb-sm">
        <q-select outlined dense filled v-model="service" :options="services" option-value="value" option-label="name" emit-value map-options class="shadow-4 col q-mr-sm">
        </q-select>
      </div>
      </div>
      <div class="q-mb-md q-mx-sm text-weight-bolder">¿Para quién lo buscas?
      <div class="text-overline">Selecciona perro gato o ambos</div>
      <div class="row q-mx-sm q-mb-sm">
        <q-select outlined dense filled v-model="petType" :options="petTypes" map-options class="shadow-4 col q-mr-sm">
        </q-select>
      </div>
      </div>
      <div class="q-mb-md q-mx-sm text-weight-bolder">¿Donde estas buscando?
      <div class="text-overline">Selecciona tu ciudad</div>
      <div class="row q-mx-sm q-mb-sm">
        <q-select outlined dense filled v-model="city" :options="cities" option-value="_id" option-label="name" emit-value map-options class="shadow-4 col q-mr-sm">
        </q-select>
      </div>
      </div>
      <div class="row justify-center q-my-lg">
        <q-btn no-caps class="q-py-xs" color="primary" label="Buscar" style="width: 70%"
        :disable="!service || !petType || !city ? true : false" @click="filtrarDatos()"/>
      </div>
    </div>

    <div class="q-pa-sm">
      <div class="q-mb-md text-h5 text-center">Ultimas tiendas añadidas</div>
      <q-scroll-area
          horizontal
          style="height: 330px;"
        >
          <div class="row no-wrap q-py-md q-px-md q-gutter-md" style="width: 100%">
            <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:200px" clickable v-ripple v-for="(store, index) in lastStores" :key="index" @click="$router.push('/inicio-proveedor/' + store._id)">
              <q-img :src="imgTienda + store._id" style="height: 280px; width: 100%" class="column">
                <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey q-mb-xl"/>
              </q-img>
              <div class="absolute-bottom q-pl-md column justify-end q-mb-sm">
                <div class="row no-wrap items-center" style="width:100%">
                  <div class="text-white text-bold ellipsis">{{store.tienda.name}}</div>
                </div>
                <div class="row no-wrap items-center" style="width:100%">
                  <q-icon name="place" class="q-mr-xs text-white"/>
                  <div class="ellipsis text-white text-subtitle2 col-10">{{store.city}}, {{store.tienda.direccion}}</div>
                </div>
              </div>
            </q-card>
          </div>
        </q-scroll-area>

      <q-card style="height: 200px" class="q-mx-md q-my-md bg-grey">
        <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%" />
      </q-card>

      <div class="q-mb-md q-mx-sm text-h5">Nuestras tiendas</div>
      <div class="row justify-around" style="width:100%">
        <div class="col-6 q-mb-sm row justify-center" v-for="(store, index) in stores" :key="index">
            <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:95%" clickable v-ripple
            @click="$router.push('/inicio-proveedor/' + 'store._id')">
              <q-img :src="imgTienda + store._id" style="height: 280px; width: 100%">
                <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey q-mb-xl"/>
              </q-img>
              <div class="absolute-bottom q-ml-md column justify-end q-mb-sm">
                <q-rating readonly class="q-mb-sm" color="grey" color-selected="orange-8" v-model="store.calificacion" :max="5" size="20px" />
                <div class="row no-wrap items-center" style="width:100%">
                  <div class="text-white text-bold ellipsis">{{store.tienda.name}}</div>
                </div>
                <div class="row no-wrap items-center" style="width:100%">
                  <q-icon name="place" class="q-mr-xs text-white"/>
                  <div class="ellipsis text-subtitle2 text-white">{{store.city}}, {{store.tienda.direccion}}</div>
                </div>
              </div>
            </q-card>
          </div>
      </div>

      <div class="row justify-center q-my-lg">
        <q-btn no-caps color="primary" label="Ver más" class="q-py-sm" style="width: 70%;" @click="$router.push('/tiendas')"/>
      </div>

      <q-card style="height: 200px" class="q-mx-md q-my-md bg-grey">
        <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%" />
      </q-card>

      <div class="q-mb-md text-center text-h5">Ultimos alojamientos</div>
      <q-scroll-area
          horizontal
          style="height: 330px;"
        >
          <div class="row no-wrap q-py-md q-px-md q-gutter-md" style="width:100%">
            <q-card style="border-radius: 15px; width:330px" clickable v-ripple v-for="(item, index) in lastHost" :key="index" @click="$router.push('/inicio-hospedador/' + item._id)">
               <q-img :src="imgProfile + item.spaceFile.name" style="height: 200px; width: 100%">
                <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey q-mb-xl"/>
              </q-img>
              <div class="row justify-center items-center q-ma-md">
                <div class="row no-wrap items-center" style="width:100%">
                  <div class="text-grey-8 text-bold text-subtitle1 ellipsis">{{item.my_space.name}}</div>
                </div>
                <div class="row no-wrap items-center" style="width:100%">
                  <q-icon name="place" class="q-mr-xs text-grey-8"/>
                  <div class="text-grey-8 ellipsis text-caption col-10">{{item.country}}, {{item.city}}</div>
                </div>
              </div>
            </q-card>
          </div>
        </q-scroll-area>

      <div class="q-mb-md q-mx-sm text-h5">Alojamientos</div>
      <div class="row justify-around">
        <div class="row justify-center col-6 q-mb-sm" v-for="(item, index) in host" :key="index">
            <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:95%" clickable v-ripple
            @click="$router.push('/inicio-hospedador/' + item._id)">
              <q-img :src="imgProfile + item.spaceFile.name" style="height: 280px; width: 100%">
                <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey q-mb-xl"/>
              </q-img>
              <div class="absolute-bottom q-ml-md column justify-end q-mb-sm">
                <div class="row no-wrap items-center" style="width:100%">
                  <div class="text-white text-bold ellipsis">{{item.my_space.name}}</div>
                </div>
                <div class="row no-wrap items-center" style="width:100%">
                  <q-icon name="place" class="q-mr-xs text-white"/>
                  <div class="ellipsis text-white text-subtitle2 q-mr-sm">{{item.city}}, {{item.my_space.direction}}</div>
                </div>
              </div>
            </q-card>
          </div>
      </div>

      <div class="row justify-center q-my-lg">
        <q-btn no-caps color="primary" label="Ver más" class="q-py-sm" style="width: 70%;" @click="$router.push('/descanso')"/>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="primary" icon="pets" direction="up" vertical-actions-align="right" @click="$router.push('/mascotas')">
      </q-fab>
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
      service: null,
      petType: null,
      city: null,
      imgTienda: '',
      imgProfile: '',
      urlHospedaje: '',
      user: {},
      stores: [],
      lastStores: [],
      host: [],
      lastHost: [],
      cities: [],
      petTypes: ['Perros', 'Gatos', 'Ambos'],
      services: [
        { name: 'Hospedaje', value: 1 },
        { name: 'Tienda', value: 2 }
      ]
    }
  },
  mounted () {
    this.getUser()
    this.getCities()
    this.getStore()
    this.urlHospedaje = env.apiUrl + 'hospedaje_img'
    this.getHost()
  },
  methods: {
    getUser () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
        }
      })
    },
    async getCities () {
      await this.$api.get('ciudades').then(res => {
        if (res) {
          this.cities = res
        }
      })
    },
    async getStore () {
      await this.$api.post('user_by_rol', { rol: [3] }).then(res => {
        this.imgTienda = env.apiUrl + '/tienda_img/'
        if (res) {
          this.stores = res.slice(0, 4)
          const total = [...res]
          this.lastStores = total.reverse().slice(0, 10)
        }
      })
    },
    async getHost () {
      await this.$api.post('user_by_rol', { rol: [4] }).then(res => {
        this.imgProfile = env.apiUrl + '/espacio_img/'
        if (res) {
          this.host = res.slice(0, 4)
          const total = [...res]
          this.lastHost = total.reverse().slice(0, 10)
        }
      })
    },
    filtrarDatos () {
      if (this.service === 1) {
        this.$router.push('descanso/' + this.petType + '/' + this.city)
      } else {
        this.$router.push('tiendas/' + this.petType + '/' + this.city)
      }
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

<template>
  <div class="q-pa-sm">
    <q-header elevated class="bg-primary row justify-center items-center" style="width:100%; height:60px">
      <div class="text-white text-subtitle1 text-center">Todas las tiendas</div>
    </q-header>

    <div class="full-width">
      <img src="mascotas1.svg" width="100%" height="100%" />
    </div>

    <div class="full-width row q-pt-md">
      <div class="col-12 row justify-around q-gutter-x-xs">

        <div
          v-for="(item, index) in services"
          :key="index"
          class="row style-card-services q-pa-md"
          :style="service === item.value ? 'background-color: #F0B418;' : ''"
          @click="service = item.value"
        >
          <div class="row col-12 justify-center">
            <q-img :src="item.icon" width="50px" height="50px" />
            <div class="col-12 text-center" :class="service === item.value ? 'text-white' : 'text-black'">{{ item.name }}</div>
          </div>
        </div>

      </div>
    </div>

    <div class="row q-pt-xl q-pa-lg">
      <q-card class="col-12 row q-pa-md q-pb-xl q-pt-xl q-gutter-y-md" style="border-radius:12px; overflow:hidden">
        <q-img src="pata2.svg" class="img-style"/>
        <div class="col-12 text-center text-bold">Busca espacio para tu mascota</div>
        <div class="col-12">
          <q-select
            outlined
            dense
            rounded
            label="Gato o Perro"
            v-model="petType"
            :options="petTypes"
            map-options
          />
        </div>
        <div v-if="!login" class="col-12">
          <q-select
            outlined
            dense
            rounded
            v-model="city"
            :options="cities"
            option-value="_id"
            option-label="name"
            emit-value
            map-options
            label="Ciudad"
          />
        </div>

        <div class="col-12 row justify-center">
          <div class="col-6">
            <q-btn
              label="Buscar"
              rounded
              color="secondary"
              style="width:100%"
              dense
              push
              @click="filtrarDatos()"
            />
          </div>
        </div>

      </q-card>
    </div>

    <div class="column q-pl-md">
      <div class="q-mt-sm text-subtitle1 text-bold">Tiendas mejor calificadas</div>
      <div class="text-caption text-grey-8">Las tiendas mejor calificadas en tu ciudad</div>
    </div>
    <q-scroll-area
        v-if="mejorCalificadas.length"
        horizontal
        style="height: 330px;"
      >
        <div class="row no-wrap q-py-md q-px-md q-gutter-md" style="width: 100%">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:200px" clickable v-ripple v-for="(store, index) in mejorCalificadas" :key="index"
          @click="store.roles[0] === 3 ? $router.push('/inicio-proveedor/' + store._id) : $router.push('/inicio-servicios/' + store._id)">
            <q-img :src="imgTienda + store._id" style="height: 280px; width: 100%" class="column">
            </q-img>
            <div class="absolute-bottom column justify-end q-mb-md">
              <q-rating readonly class="q-pl-sm q-mb-sm" color="grey" color-selected="orange-8" v-model="store.calificacion" :max="5" size="20px" />
              <div class="bg-primary q-pl-sm" style="width:100%">
                <div class="row no-wrap items-center" style="width:100%">
                  <div class="text-white text-subtitle1 ellipsis">{{store.tienda.name}}</div>
                </div>
                <div class="row no-wrap items-start" style="width:100%">
                  <q-icon name="place" class="q-mr-xs q-mt-xs text-white"/>
                  <div class="ellipsis text-white text-caption col-10">{{store.city}} <br> {{store.tienda.direccion}}</div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
      <div v-else class="row items-center justify-center" style="height: 330px;">No hay tiendas actualmente</div>

    <q-card style="height: 200px" class="q-mx-md q-my-md bg-grey">
      <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%" />
    </q-card>

    <div class="q-mr-lg q-mt-md">
      <div class="q-mb-md q-mx-sm text-weight-bolder">¿Para quién lo buscas?
      <div class="text-caption text-grey-8">Selecciona para quien, perro, gato o ambos</div>
      <div class="row q-px-sm q-mb-sm">
        <q-select dense filled class="col-11" v-model="petType" :options="petTypes" map-options
        @input="filtrarTiendas()">
        </q-select>
      </div>
      </div>
      <div v-if="!nologin" class="q-mb-md q-mx-sm text-weight-bolder">¿Donde estas buscando?
      <div v-if="!nologin" class="text-caption text-grey-8">Selecciona tu ciudad</div>
      <div v-if="!nologin" class="row q-px-sm q-mb-sm">
        <q-select dense filled class="col-11" v-model="city" :options="cities" option-label="name" map-options
        @input="filtrarTiendas()">
        </q-select>
      </div>
      </div>
    </div>

    <div v-if="stores.length" class="row justify-around col-6 q-mb-sm">
      <div class="col-6 q-mb-sm" v-for="(store, index) in stores" :key="index">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:95%" clickable v-ripple
          @click="store.roles[0] === 3 ? $router.push('/inicio-proveedor/' + store._id) : $router.push('/inicio-servicios/' + store._id)">
            <q-img :src="imgTienda + store._id" style="height: 280px; width: 100%">
            </q-img>
            <div class="absolute-bottom column justify-end q-mb-md">
              <q-rating readonly class="q-mb-sm q-pl-sm" color="grey" color-selected="orange-8" v-model="store.calificacion" :max="5" size="20px" />
              <div class="bg-primary q-pl-sm" style="width:100%">
                <div class="text-white text-subtitle1 ellipsis">{{store.tienda.name}}</div>
                <div class="row no-wrap items-start" style="width:100%">
                  <q-icon name="place" class="q-mr-xs q-mt-xs text-white"/>
                  <div class="ellipsis text-caption text-white">{{store.city}} <br> {{store.tienda.direccion}}</div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
    </div>
    <div v-else class="row items-center justify-center" style="height: 280px;">No hay tiendas actualmente</div>
  </div>
</template>
<script>
import env from '../../env'
export default {
  data () {
    return {
      services: [
        { name: 'Hospedaje', value: 1, icon: 'ihospedaje1.svg' },
        { name: 'Servicios', value: 3, icon: 'iservicio1.svg' },
        { name: 'Tienda', value: 2, icon: 'itienda1.svg' }
      ],
      service: 1,
      imgTienda: '',
      petType: null,
      city: null,
      nologin: true,
      login: true,
      cities: [],
      mejorCalificadas: [],
      stores: [],
      petTypes: ['Perros', 'Gatos', 'Ambos']
    }
  },
  async mounted () {
    const value = localStorage.getItem('TRI_SESSION_INFO')
    if (value) {
      await this.getCities()
      this.nologin = false
      await this.getStore()
    } else {
      this.login = false
      await this.getStore()
    }
    this.verifyQueryRoute() // verifica el query para filtrar las tiendas, de momento solo filtra por servicios
  },
  watch: {
    $route () {
      location.reload()
    }
  },
  methods: {
    verifyQueryRoute () {
      if (this.$route.query.service === '3') { // si es servicio entonces filtro las tiendas obtenidas por el rol de servicio
        console.log(this.stores, 'stores service')
        this.service = 3
        this.stores = this.stores.filter(store => store.roles[0] === 5)
        console.log(this.stores, 'stores service')
      }
    },
    async getCities () {
      await this.$api.get('ciudades').then(res => {
        if (res) {
          this.cities = res
          if (this.$route.params.type && this.$route.params.city) {
            this.petType = this.$route.params.type
            this.city = this.cities.find(v => v._id === this.$route.params.city)
            this.filtrarTiendas()
          }
        }
      })
    },
    async getStore () {
      await this.$api.post(!this.nologin ? 'user_by_rol' : 'user_by_rol_no_logueo', { rol: [3, 5] }).then(res => {
        this.imgTienda = env.apiUrl + 'tienda_img/'
        if (res) {
          this.mejorCalificadas = res
          if (!this.$route.params.type) {
            console.log('GETSTORE')
            this.stores = res
          } else {
            this.petType = this.$route.params.type
            this.filtrarTiendas()
          }
        }
      })
    },
    async filtrarTiendas () {
      this.$q.loading.show({
        message: 'Filtrando datos'
      })
      await this.$api.post('filtrar_tiendas', { type: this.petType ? this.petType : false, ciudad: this.city ? this.city : false }).then(res => {
        this.stores = res
        this.verifyQueryRoute() // para verificar si la ruta tienes query para filtrar las tiendas por servicios (ROL 5)
        console.log('FILTRARSTORE')
        this.$q.loading.hide()
      })
    },
    filtrarDatos () {
      if (this.service === 1) {
        if (!this.login) {
          this.$router.push('descanso/' + this.petType + '/' + this.city)
        } else {
          this.$router.push('/descanso/' + this.petType)
        }
      } else if (this.service === 3) {
        this.$router.push(this.petType + '?service=' + this.service)
      } else {
        if (!this.login) {
          this.$router.push(this.petType + '/' + this.city)
        } else {
          this.$router.push(this.petType)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.style-card-services {
  border: 1px solid black;
  border-radius: 100%;
  height: 110px;
  width: 110px;
}

.img-style {
  position:absolute;
  top:-25px;
  left:-10px;
  transform: rotate(117deg);
  width: 60px;
  height: 60px;
}

.div-btn {
  border-radius: 20px;
}

</style>

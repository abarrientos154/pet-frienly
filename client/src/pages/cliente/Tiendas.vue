<template>
  <div class="q-pa-sm">
    <q-header elevated class="bg-primary row justify-center items-center" style="width:100%; height:60px">
      <div class="text-white text-subtitle1 text-center">Todas las tiendas</div>
    </q-header>

    <div class="column q-pl-md">
      <div class="q-mt-sm text-subtitle1 text-bold">Tiendas mejor calificadas</div>
      <div class="text-caption text-grey-8">Las tiendas mejor calificadas en tu ciudad</div>
    </div>
    <q-scroll-area
        v-if="mejorCalificadas.length"
        horizontal
        style="height: 330px;"
      >
        <div class="row no-wrap q-py-md q-px-md q-gutter-md">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:200px" clickable v-ripple v-for="(store, index) in mejorCalificadas" :key="index" @click="$router.push('/inicio-proveedor/' + store._id)">
            <q-img :src="imgTienda + store._id" style="height: 280px; width: 100%" class="column">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey q-mb-xl"/>
            </q-img>
            <div class="absolute-full q-ml-md column justify-end q-mb-sm">
              <q-rating readonly class="q-mb-sm" color="grey" color-selected="orange-8" v-model="store.calificacion" :max="5" size="20px" />
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
      <div class="q-mb-md q-mx-sm text-weight-bolder">¿Donde estas buscando?
      <div class="text-caption text-grey-8">Selecciona tu ciudad</div>
      <div class="row q-px-sm q-mb-sm">
        <q-select dense filled class="col-11" v-model="city" :options="cities" option-label="name" map-options
        @input="filtrarTiendas()">
        </q-select>
      </div>
      </div>
    </div>

    <div v-if="stores.length" class="row justify-around col-6 q-mb-sm">
      <div class="col-6 q-mb-sm" v-for="(store, index) in stores" :key="index">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:95%" clickable v-ripple @click="$router.push('/inicio-proveedor/' + store._id)">
            <q-img :src="imgTienda + store._id" style="height: 280px; width: 100%">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey q-mb-xl"/>
            </q-img>
            <div class="absolute-full q-ml-md column justify-end q-mb-sm">
              <q-rating readonly class="q-mb-sm" color="grey" color-selected="orange-8" v-model="store.calificacion" :max="5" size="20px" />
              <div class="text-white text-bold">{{store.tienda.name}}</div>
              <div class="row no-wrap items-center" style="width:100%">
                <q-icon name="place" class="q-mr-xs text-white"/>
                <div class="ellipsis text-subtitle2 text-white">{{store.city}}, {{store.tienda.direccion}}</div>
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
      imgTienda: '',
      petType: null,
      city: null,
      cities: [],
      mejorCalificadas: [],
      stores: [],
      petTypes: ['Perros', 'Gatos', 'Ambos']
    }
  },
  mounted () {
    this.getCities()
    this.getStore()
  },
  methods: {
    async getCities () {
      await this.$api.get('ciudades').then(res => {
        if (res) {
          this.cities = res
        }
      })
    },
    getStore () {
      this.$api.post('user_by_rol', { rol: [3] }).then(res => {
        this.imgTienda = env.apiUrl + 'tienda_img/'
        if (res) {
          this.stores = res
          this.mejorCalificadas = res
        }
      })
    },
    filtrarTiendas () {
      this.$q.loading.show({
        message: 'Filtrando datos'
      })
      this.$api.post('filtrar_tiendas', { type: this.petType ? this.petType : false, ciudad: this.city ? this.city : false }).then(res => {
        this.stores = res
        this.$q.loading.hide()
      })
    }
  }
}
</script>

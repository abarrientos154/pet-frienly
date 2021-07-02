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

    <q-card style="height: 200px" class="q-mx-md q-my-md bg-grey"></q-card>

    <div class="q-mr-lg q-mt-md">
      <div class="q-mb-md q-mx-sm text-weight-bolder">¿Para quién lo buscas?
      <div class="text-caption text-grey-8">Selecciona para quien, perro, gato o ambos</div>
      <div class="row q-px-sm q-mb-sm">
        <q-select dense filled class="col-11" v-model="search.petType" :options="petType" option-value="value" option-label="name" emit-value map-options>
        </q-select>
      </div>
      </div>
      <div class="q-mb-md q-mx-sm text-weight-bolder">¿Donde estas buscando?
      <div class="text-caption text-grey-8">Selecciona tu ciudad</div>
      <div class="row q-px-sm q-mb-sm">
        <q-select dense filled class="col-11" v-model="search.city" :options="cities" option-value="_id" option-label="name" emit-value map-options>
        </q-select>
      </div>
      </div>
    </div>

    <div class="row justify-around col-6 q-mb-sm">
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
  </div>
</template>
<script>
import env from '../../env'
export default {
  data () {
    return {
      imgTienda: '',
      search: {},
      cities: [],
      mejorCalificadas: [],
      stores: [],
      petType: [
        { name: 'Perro', value: 1 },
        { name: 'Gato', value: 2 },
        { name: 'Ambos', value: 3 }
      ]
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
    }
  }
}
</script>

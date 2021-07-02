<template>
  <div style="max-width: 100%">
    <q-header elevated class="bg-primary row justify-center items-center" style="width:100%; height:60px">
      <div class="text-white text-subtitle1 text-center">Espacios de descanso</div>
    </q-header>

    <div class="column q-pl-md">
      <div class="q-mt-sm text-subtitle1 text-bold">Espacios mejor calificados</div>
      <div class="text-caption text-grey-8">Espacios mejor calificados en tu ciudad</div>
    </div>
    <q-scroll-area
        horizontal
        style="height: 330px;"
      >
        <div class="row no-wrap q-py-md q-px-md q-gutter-md">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:230px" clickable v-ripple v-for="(item, index) in host" :key="index" @click="$router.push('/inicio-hospedador/' + item._id)">
            <q-img :src="imgProfile + item.spaceFile.name" style="height: 280px; width: 100%">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey q-mb-xl"/>
            </q-img>
            <div class="absolute-full q-ml-md column justify-end q-mb-sm">
              <q-rating readonly class="q-mt-lg q-mb-sm" color="grey" color-selected="orange-8" v-model="item.calificacion" :max="5" size="20px" />
              <div class="row no-wrap items-center" style="width:100%">
                <div class="text-white text-bold ellipsis">{{item.my_space.name}}</div>
              </div>
              <div class="row no-wrap items-center" style="width:100%">
                <q-icon name="place" class="q-mr-xs text-white"/>
                <div class="ellipsis text-white text-subtitle2">{{item.city}}, {{item.my_space.direction}}</div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>

      <q-card style="height: 200px" class="q-mx-md q-my-md bg-grey"></q-card>

      <div class="q-ml-sm q-mt-md">
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

    <div class="row justify-around">
      <div class="col-6 q-mb-sm" v-for="(item, index) in host" :key="index">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:95%" clickable v-ripple @click="$router.push('/inicio-hospedador/' + item._id)">
            <q-img :src="imgProfile + item.spaceFile.name" style="height: 280px; width: 100%">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey q-mb-xl"/>
            </q-img>
            <div class="absolute-full q-ml-md column justify-end q-mb-sm">
              <q-rating readonly class="q-mt-lg q-mb-sm" color="grey" color-selected="orange-8" v-model="item.calificacion" :max="5" size="20px" />
              <div class="row no-wrap items-center" style="width:100%">
                <div class="text-white text-bold ellipsis">{{item.my_space.name}}</div>
              </div>
              <div class="row no-wrap items-center" style="width:100%">
                <q-icon name="place" class="q-mr-xs text-white"/>
                <div class="ellipsis text-white text-subtitle2">{{item.city}}, {{item.my_space.direction}}</div>
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
      petType: [
        { name: 'Perro', value: 1 },
        { name: 'Gato', value: 2 },
        { name: 'Ambos', value: 3 }
      ],
      cities: [],
      search: {},
      host: [],
      imgProfile: '',
      stars: 4
    }
  },
  mounted () {
    this.getCities()
    this.getHost()
  },
  methods: {
    async getCities () {
      await this.$api.get('ciudades').then(res => {
        if (res) {
          this.cities = res
        }
      })
    },
    getHost () {
      this.$api.post('user_by_rol', { rol: [4] }).then(res => {
        this.imgProfile = env.apiUrl + 'espacio_img/'
        if (res) {
          this.host = res
        }
      })
    }
  }
}
</script>

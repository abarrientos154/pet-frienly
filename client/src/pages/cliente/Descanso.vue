<template>
  <div style="max-width: 100%">
    <q-header elevated class="bg-primary row justify-center items-center" style="width:100%; height:60px">
      <div class="text-white text-h5 text-center">Espacios de descanso</div>
    </q-header>
    <div class="column">
      <div class="q-ml-lg q-mt-lg text-h5">Espacios mejor calificados</div>
      <div class="q-ml-lg text-subtitle2 text-grey">Espacios mejor calificados en tu ciudad</div>
    </div>
    <q-scroll-area
        horizontal
        style="height: 330px;"
      >
        <div class="row no-wrap q-py-md q-px-md q-gutter-md">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:230px" clickable v-ripple v-for="(item, index) in host" :key="index">
            <q-img :src="imgProfile + item._id" style="height: 280px; width: 100%" class="bg-primary">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey q-mb-xl"/>
            </q-img>
            <div class="absolute-full q-ml-md column justify-end q-mb-sm">
              <q-rating class="q-mt-lg q-mb-sm" v-model="stars" :max="5" size="130%" />
              <div class="text-white text-bold">{{item.my_space.name}}</div>
              <div class="row">
                <q-icon name="place" class="q-mr-xs text-white"/>
                <div class="text-white text-subtitle2">{{item.city}}, {{item.my_space.direction}}</div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
      <q-card style="height: 250px" class="q-mx-md q-my-md bg-primary"></q-card>
      <div class="q-mr-lg">
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
      </div>
    <div class="row">
      <div class="row justify-center q-py-sm q-px-sm q-gutter-sm q-mb-md" style="width:100%">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:40%; min-width:120px" clickable v-ripple v-for="(item, index) in host" :key="index">
            <q-img :src="imgProfile + item._id" style="height: 280px; width: 100%" class="bg-primary">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey q-mb-xl"/>
            </q-img>
            <div class="absolute-full q-ml-md column justify-end q-mb-sm">
              <q-rating class="q-mt-lg q-mb-sm" v-model="stars" :max="5" size="130%" />
              <div class="text-white text-bold">{{item.my_space.name}}</div>
              <div class="row">
                <q-icon name="place" class="q-mr-xs text-white"/>
                <div class="text-white text-subtitle2">{{item.city}}, {{item.my_space.direction}}</div>
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
          console.log('cities :>> ', this.cities)
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
    }
  }
}
</script>

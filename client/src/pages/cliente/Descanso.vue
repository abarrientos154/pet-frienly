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
        v-if="mejorCalificados.length"
        horizontal
        style="height: 330px;"
      >
        <div class="row no-wrap q-py-md q-px-md q-gutter-md">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:200px" clickable v-ripple v-for="(item, index) in mejorCalificados" :key="index" @click="$router.push('/inicio-hospedador/' + item._id)">
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
      <div v-else class="row items-center justify-center" style="height: 330px;">No hay alojamientos actualmente</div>

      <q-card style="height: 200px" class="q-mx-md q-my-md bg-grey">
        <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%" />
      </q-card>

      <div class="q-ml-sm q-mt-md">
        <div class="q-mb-md q-mx-sm text-weight-bolder">¿Para quién lo buscas?
        <div class="text-caption text-grey-8">Selecciona para quien, perro, gato o ambos</div>
        <div class="row q-px-sm q-mb-sm">
          <q-select dense filled class="col-11" v-model="petType" :options="petTypes" map-options
          @input="filtrarAlojamientos()">
          </q-select>
        </div>
        </div>
        <div class="q-mb-md q-mx-sm text-weight-bolder">¿Donde estas buscando?
        <div class="text-caption text-grey-8">Selecciona tu ciudad</div>
        <div class="row q-px-sm q-mb-sm">
          <q-select dense filled class="col-11" v-model="city" :options="cities" option-label="name" map-options
          @input="filtrarAlojamientos()">
          </q-select>
        </div>
        </div>
      </div>

    <div v-if="host.length" class="row justify-around">
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
    <div v-else class="row items-center justify-center" style="height: 280px;">No hay alojamientos actualmente</div>
  </div>
</template>
<script>
import env from '../../env'
export default {
  data () {
    return {
      petType: null,
      city: null,
      imgProfile: '',
      petTypes: ['Perros', 'Gatos', 'Ambos'],
      cities: [],
      mejorCalificados: [],
      host: []
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
          this.mejorCalificados = res
        }
      })
    },
    filtrarAlojamientos () {
      this.$q.loading.show({
        message: 'Filtrando datos'
      })
      this.$api.post('filtrar_alojamientos', { type: this.petType ? this.petType : false, ciudad: this.city ? this.city : false }).then(res => {
        this.host = res
        this.$q.loading.hide()
      })
    }
  }
}
</script>

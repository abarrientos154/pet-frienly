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
            <q-img :src="imgProfile + item._id" style="height: 280px; width: 100%">
            </q-img>
            <div class="absolute-bottom column justify-end q-mb-md">
              <q-rating readonly class="q-mt-lg q-mb-sm q-pl-sm" color="grey" color-selected="orange-8" v-model="item.calificacion" :max="5" size="20px" />
              <div class="bg-primary q-pl-sm" style="width:100%">
                <div class="row no-wrap items-center" style="width:100%">
                  <div class="text-white text-subtitle1 ellipsis">{{item.my_space.name}}</div>
                </div>
                <div class="row no-wrap items-start" style="width:100%">
                  <q-icon name="place" class="q-mr-xs q-mt-xs text-white"/>
                  <div class="ellipsis text-white text-caption">{{item.city}} <br> {{item.my_space.direction}}</div>
                </div>
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
        <div v-if="!nologin" class="q-mb-md q-mx-sm text-weight-bolder">¿Donde estas buscando?
        <div v-if="!nologin" class="text-caption text-grey-8">Selecciona tu ciudad</div>
        <div v-if="!nologin" class="row q-px-sm q-mb-sm">
          <q-select dense filled class="col-11" v-model="city" :options="cities" option-label="name" map-options
          @input="filtrarAlojamientos()">
          </q-select>
        </div>
        </div>
      </div>

    <div v-if="host.length" class="row justify-around">
      <div class="col-6 q-mb-sm" v-for="(item, index) in host" :key="index">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:95%" clickable v-ripple @click="$router.push('/inicio-hospedador/' + item._id)">
            <q-img :src="imgProfile + item._id" style="height: 280px; width: 100%">
            </q-img>
            <div class="absolute-bottom column justify-end q-mb-md">
              <q-rating readonly class="q-mt-lg q-mb-sm q-pl-sm" color="grey" color-selected="orange-8" v-model="item.calificacion" :max="5" size="20px" />
              <div class="bg-primary q-pl-sm" style="width:100%">
                <div class="row no-wrap items-center" style="width:100%">
                  <div class="text-white text-subtitle1 ellipsis">{{item.my_space.name}}</div>
                </div>
                <div class="row no-wrap items-start" style="width:100%">
                  <q-icon name="place" class="q-mr-xs q-mt-xs text-white"/>
                  <div class="ellipsis text-white text-caption">{{item.city}} <br> {{item.my_space.direction}}</div>
                </div>
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
      nologin: true,
      imgProfile: '',
      petTypes: ['Perros', 'Gatos', 'Ambos'],
      cities: [],
      mejorCalificados: [],
      host: []
    }
  },
  mounted () {
    const value = localStorage.getItem('TRI_SESSION_INFO')
    if (value) {
      this.getCities()
      this.nologin = false
      this.getHost()
    } else {
      this.getHost()
    }
  },
  methods: {
    async getCities () {
      await this.$api.get('ciudades').then(res => {
        if (res) {
          this.cities = res
          if (this.$route.params.type && this.$route.params.city) {
            this.petType = this.$route.params.type
            this.city = this.cities.find(v => v._id === this.$route.params.city)
            this.filtrarAlojamientos()
          }
        }
      })
    },
    async getHost () {
      await this.$api.post(!this.nologin ? 'user_by_rol' : 'user_by_rol_no_logueo', { rol: [4] }).then(res => {
        this.imgProfile = env.apiUrl + 'espacio_img/'
        if (res) {
          this.mejorCalificados = res
          if (!this.$route.params.type) {
            this.host = res
          } else {
            this.petType = this.$route.params.type
            this.filtrarAlojamientos()
          }
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

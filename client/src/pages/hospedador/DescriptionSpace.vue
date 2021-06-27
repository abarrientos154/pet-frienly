<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary row justify-between items-center full-width" style="height: 60px">
      <q-btn round flat stack dense no-caps class="absolute-left" icon="arrow_back" color="white" size="md" @click="$router.go(-1)"/>
      <div class="col text-white text-h6 text-center">{{hospedaje.name}}</div>
    </q-header>
    <q-page-container>
      <div>
        <q-carousel size="sm" v-model="slide" style="height: 200px; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px" transition-prev="jump-right" transition-next="jump-left" swipeable animated prev-icon="arrow_left" next-icon="arrow_right" navigation arrows>
          <q-carousel-slide v-for="(img, index) in hospedaje.images" :key="index" :name="index" :img-src="baseu + img.src"/>
        </q-carousel>
        <div class="q-pa-md">
          <div class="q-mb-md">
            <div class="text-subtitle1 q-mb-sm">Conoce nuestro alojamiento</div>
            <div class="text-subtitle3 text-grey-6">{{hospedaje.description}}</div>
          </div>
          <div class="q-mb-lg">
            <div class="text-subtitle1 text-bold">Informacion</div>
            <div class="row">
              <div class="col q-mx-sm">
                <div class="text-subtitle3 text-bold text-grey-6">Disponible para</div>
                <div class="text-caption text-grey-6">{{hospedaje.pet_type}}</div>
                <div class="text-subtitle3 text-bold text-grey-6">Cantidad de pasajero</div>
                <div class="text-caption text-grey-6">{{hospedaje.guests}} mascotas</div>
                <div class="text-subtitle3 text-bold text-grey-6">Tipo de espacio</div>
                <div class="text-caption text-grey-6">{{hospedaje.location}}</div>
              </div>
              <div class="col q-mx-sm">
                <div class="text-subtitle3 text-bold text-grey-6">Tamaños que recibe</div>
                <div class="text-caption text-grey-6">{{hospedaje.petSize}}</div>
              </div>
            </div>
          </div>
          <div class="q-mb-lg row items-center">
            <div class="col column items-center">
              <q-avatar rounded class="bg-orange-2 text-black q-mb-xs" icon="directions_car" size="50px" style="border-radius: 10px;"/>
              <div class="text-subtitle3">Estacionamiento</div>
            </div>
            <div class="col column items-center">
              <q-avatar rounded class="bg-orange-2 text-black q-mb-xs" icon="pool" size="50px" style="border-radius: 10px;"/>
              <div class="text-subtitle3">Piscina</div>
            </div>
            <div class="col column items-center">
              <q-avatar rounded class="bg-orange-2 text-black q-mb-xs" icon="directions_walk" size="50px" style="border-radius: 10px;"/>
              <div class="text-subtitle3">Paseo</div>
            </div>
          </div>
          <div class="row items-center">
            <q-btn class="col q-pa-sm" color="primary" label="Editar alojamiento" @click="$router.push('/edit_space/' + hospedaje._id)" style="border-top-left-radius: 15px; border-bottom-left-radius: 15px; border-top-right-radius: 0px; border-bottom-right-radius: 0px;" no-caps/>
            <q-btn class="col2 q-pa-sm text-black" color="orange-2" style="border-top-left-radius: 0px; border-bottom-left-radius: 0px; border-top-right-radius: 15px; border-bottom-right-radius: 15px;" no-caps>${{hospedaje.price}} por dia</q-btn>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      slide: 0,
      id: '',
      baseu: '',
      hospedaje: {}
    }
  },
  mounted () {
    this.getHospedaje()
  },
  methods: {
    getHospedaje () {
      if (this.$route.params.id) {
        this.id = this.$route.params.id
        this.$api.get('hospedaje/' + this.id).then(res => {
          if (res) {
            this.hospedaje = res
            this.baseu = env.apiUrl + 'hospedajes_img/'
            console.log(this.hospedaje)
          }
        })
      }
    }
  }
}
</script>

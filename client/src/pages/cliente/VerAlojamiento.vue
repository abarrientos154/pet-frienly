<template>
    <div class="row justify-center">
        <div class="q-pa-md col col-xs-10 col-sm-8 col-md-7 col-lg-5 col-xl-4 no-wrap q-mx-md q-my-sm">
            <div class="text-h4 text-center q-my-md">{{accomodation.name}}</div>
            <q-card class="dimension">
                <q-carousel
                animated
                v-model="slide"
                arrows
                navigation
                infinite
                >
                    <q-carousel-slide :name="index + 1" v-for="(item, index) in images" :key="index">
                        <img
                            :src="item.root"
                            style="height: 100%; width: 100%"
                         />
                    </q-carousel-slide>
                </q-carousel>
                <q-card-section>
                    <div class="text-subtitle1">
                        {{accomodation.name}}
                    </div>
                    <div class="row justify-between">
                        <div class="row">
                            <q-icon class="q-mx-sm" name="place" />
                            <div class="text-subtitle2">{{accomodation.datos_proveedor.place}}</div>
                        </div>
                        <div>
                            <q-btn flat dense icon="send" class="q-pa-sm bg-primary" text-color="white">Hablar</q-btn>
                        </div>
                    </div>
                    <q-rating class="q-my-md" v-model="stars" :max="5" size="32px" />
                    <q-separator/>
                    <q-scroll-area
                        horizontal
                        style="height: 80px; width: 100%;"
                        class="q-my-md"
                        :visible="false"
                    >
                        <div class="row no-wrap">
                            <div v-for="(icon, index) in icons" :key="index" class="column q-mx-xl">
                                <q-icon :name="icon.icon" class="bg-primary" style="border-radius:10px" size="50px"/>
                                <div class="text-subtitle2">{{icon.name}}</div>
                            </div>
                        </div>
                    </q-scroll-area>
                </q-card-section>
                <q-card-section>
                    <div>
                        <div class="text-subtitle1">
                            Conoce nuestro alojamiento:
                        </div>
                        <div class="text-body1">
                            {{accomodation.description}}
                        </div>
                        <div class="text-body1">
                            Tu mascota disfrutará de: {{accomodation.dimensions}} Metros Cuadrados
                        </div>
                        <div class="text-body1">
                            Este es un sitio ideal para: {{accomodation.pet_type}}
                        </div>
                    </div>
                    <div class="column items-center q-my-md">
                        <q-btn-group style="border-radius:10px">
                            <q-btn color="primary" text-color="white" label="Reserva ahora!" class="q-pa-sm"/>
                            <q-btn color="amber-2" text-color="black" class="q-pa-sm">${{accomodation.price}} por día</q-btn>
                        </q-btn-group>
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      accomodation: {},
      slide: 1,
      stars: 4,
      icons: [
        { name: 'Parking', icon: 'local_parking' },
        { name: 'Piscina', icon: 'pool' },
        { name: 'Paseo', icon: 'directions_walk' },
        { name: 'Restaurante', icon: 'restaurant' }
      ],
      images: []
    }
  },
  mounted () {
    this.baseu = env.apiUrl + 'hospedajes_img'
    this.getAccomodation()
  },
  methods: {
    async getAccomodation () {
      const id = this.$route.params.id
      await this.$api.get('hospedaje/' + id).then(res => {
        if (res) {
          this.accomodation = res
          console.log(this.accomodation)
          this.getImagesRoot()
        }
      })
    },
    getImagesRoot () {
      var image = {}
      for (var i in this.accomodation.images) {
        image.root = this.baseu + '/' + this.accomodation.images[i].src
        // console.log('this.accomodation.images[i].src :>> ', this.accomodation.images[i].src)
        image.name = i
        // console.log('image :>> ', image)
        this.images.push(image)
        image = {}
      }
      console.log('this.images :>> ', this.images)
    }
  }
}
</script>

<style>
    .dimension {
        max-width: 800px;
        min-width: 90%;
    }
</style>

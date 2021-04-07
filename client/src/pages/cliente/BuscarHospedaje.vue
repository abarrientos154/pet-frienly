<template>
    <div class="bg-primary q-pt-xl">
        <q-card class="q-pa-xs q-pa-sm column" style="width: 100%; height: 100%; border-top-left-radius: 25px; border-top-right-radius: 25px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px">
          <div class="q-my-lg">Busquemos donde alojara a su mascota</div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md">
              <div class="q-mb-sm text-black">Ciudad</div>
              <q-select dense filled label="Pais, Region, Ciudad, Dirección">
                <template v-slot:prepend>
                  <q-icon color="primary" name="location_on" />
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md">
              <div class="q-mb-sm text-black">Fecha</div>
              <q-select dense filled label="">
                <template v-slot:prepend>
                  <q-icon color="primary" name="calendar_today" />
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md">
              <div class="q-mb-sm text-black">Cantidad de mascotas</div>
              <q-select dense filled label="">
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md">
              <div class="q-mb-sm text-black">Tipo de habitacion</div>
              <q-select dense filled label="">
                <template v-slot:prepend>
                  <q-icon color="primary" name="star" />
                </template>
              </q-select>
            </div>
          </div>
          <q-btn dense class="q-mb-sm bg-primary text-white" style="width: 100%">Buscar</q-btn>
          <div class="full-width q-mb-xl">
            <google-map :center="center" :zoom="10" @getBounds="getBounds" @newPlace="handleNewPlace" :withoutDirection="false" />
          </div>
        </q-card>
    </div>
</template>

<script>
import GoogleMap from '../../components/GoogleMap.vue'
export default {
  components: {
    GoogleMap
  },
  data () {
    return {
      center: { lat: -33.4504117, lng: -70.6707553 }
    }
  },
  methods: {
    handleNewPlace (place, coordinates) {
      console.log('handleNewPlace', coordinates, place)
    },
    getBounds (bounds, center) {
      console.log(center, 'center')
    }
  }
}
</script>

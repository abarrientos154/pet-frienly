<template>
  <div style="max-width: 100%">
    <q-header elevated class="bg-primary row justify-center items-center" style="width:100%; height:60px">
      <div class="text-white text-subtitle1 text-center">Todas las tiendas</div>
    </q-header>
    <div class="column">
      <div class="q-ml-lg q-mt-lg text-h5">Tiendas mejor calificados</div>
      <div class="q-ml-lg text-subtitle2 text-grey">Las tiendas mejor calificadas en tu ciudad</div>
    </div>
    <q-scroll-area
        horizontal
        style="height: 330px;"
      >
        <div class="row no-wrap q-py-xs q-px-md q-gutter-md">
          <q-card style="border-radius: 24px; width:230px" clickable v-ripple v-for="(card, index) in 10" :key="index">
            <q-card style="height: 280px; width: 100%" class="bg-primary">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey"/>
              <q-card-section class="q-my-lg"></q-card-section>
              <q-card-section>
                <q-rating class="q-mt-lg q-mb-sm" v-model="stars" :max="5" size="25px" />
                <div class="text-white text-subtitle2">Nombre del alojamiento</div>
                <div class="row">
                  <q-icon name="place" class="q-mr-xs text-white"/>
                  <div class="text-subtitle2 text-white">Ciudad / Direccion</div>
                </div>
              </q-card-section>
            </q-card>
          </q-card>
        </div>
      </q-scroll-area>
    <q-card style="height: 250px" class="q-mx-md q-mb-md bg-primary"></q-card>
    <div class="q-mr-lg q-mt-md">
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
        <div class="row justify-center q-py-xl q-px-sm q-gutter-sm" style="width:100%">
          <q-card style="border-radius: 24px; width:40%" clickable v-ripple v-for="(card, index) in 8" :key="index">
            <q-card style="height: 280px; width: 100%" class="bg-primary">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md bg-grey"/>
              <q-card-section class="q-my-lg"></q-card-section>
              <q-card-section>
                <q-rating class="q-mt-lg q-mb-sm" v-model="stars" :max="5" size="25px" />
                <div class="text-white text-subtitle2">Nombre del alojamiento</div>
                <div class="row">
                  <q-icon name="place" class="q-mr-xs text-white"/>
                  <div class="text-subtitle2 text-white">Ciudad / Direccion</div>
                </div>
              </q-card-section>
            </q-card>
          </q-card>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      petType: [
        { name: 'Perro', value: 1 },
        { name: 'Gato', value: 2 },
        { name: 'Ambos', value: 3 }
      ],
      cities: [],
      search: {}
    }
  },
  mounted () {
    this.getCities()
  },
  methods: {
    async getCities () {
      await this.$api.get('ciudades').then(res => {
        if (res) {
          this.cities = res
          console.log('cities :>> ', this.cities)
        }
      })
    }
  }
}
</script>

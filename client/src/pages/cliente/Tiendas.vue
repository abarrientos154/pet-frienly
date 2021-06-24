<template>
  <div style="max-width: 100%">
    <div class="q-mb-md q-mx-sm q-mt-md text-h5 text-weight-bold">Tiendas mejor calificadas</div>
    <div class="q-mb-md q-mx-sm text-overline">Las tiendas mejor calificadas en tu ciudad</div>
    <q-scroll-area
        horizontal
        style="height: 330px;"
      >
        <div class="row no-wrap q-py-xs q-px-md q-gutter-md">
          <q-card style="border-radius: 24px; width:230px" clickable v-ripple v-for="(card, index) in 10" :key="index">
            <q-card style="height: 280px; width: 100%" class="bg-primary">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md"/>
            </q-card>
          </q-card>
        </div>
      </q-scroll-area>
    <q-card style="height: 250px" class="q-mx-md q-my-md bg-primary"></q-card>
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
      <div class="row">
        <div class="row justify-center q-py-xl q-px-sm q-gutter-sm" style="width:100%">
          <q-card style="border-radius: 24px; width:40%" clickable v-ripple v-for="(card, index) in 8" :key="index">
            <q-card style="height: 280px; width: 100%" class="bg-primary">
              <q-btn flat round color="white" icon="favorite" class="q-mt-md q-ml-md"/>
            </q-card>
            <div class="q-ml-md">
              <div class="text-subtitle2 q-mb-xs q-mx-sm">Nombre Alojamiento</div>
              <div class="row">
                <q-icon name="place" />
                <div class="text-subtitle2 q-mb-xs q-mx-sm">Ciudad / Direccion</div>
              </div>
            </div>
            <q-rating class="q-mx-sm q-mb-sm" v-model="stars" :max="5" size="25px" />
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

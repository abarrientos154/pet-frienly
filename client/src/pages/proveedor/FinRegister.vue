<template>
  <div>
      <q-carousel
        class="window-height q-pa-none"
        animated
        v-model="slide"
        ref="carousel2">
        <q-carousel-slide :name="1" class="q-pa-none" img-src="https://cdn.quasar.dev/img/mountains.jpg">
          <div class="absolute-center q-py-sm full-width">
            <div class="row justify-end q-mb-md">
              <q-btn flat color="white" size="lg" icon="arrow_forward" @click="slide = 2"/>
            </div>
            <div class="text-h4 text-white text-bold q-px-sm">Te gustaria agregar <br> servicios</div>
            <div class="text-subtitle1 text-white q-px-sm">Toca la pantalla y agrega los servicios que quieres ofrecer</div>
          </div>
          <div class="row justify-center absolute-bottom q-mb-md q-gutter-xs">
            <q-btn no-caps rounded color="primary" label="Agregar servicio" class="q-py-xs" style="width: 60%;"
              @click="$router.push('/registro_servicio')"/>
            <q-btn no-caps flat color="white" text-color="white" label="Omitir para ir a tienda" class="q-py-xs" style="width: 60%;"
              to="/inicio_proveedor"/>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="q-pa-none" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-center q-py-sm full-width">
            <div class="row justify-start q-mb-md">
              <q-btn flat color="white" size="lg" icon="arrow_back" @click="slide = 1"/>
            </div>
            <div class="text-h4 text-white text-bold q-px-sm">Te gustaria agregar tu <br> primer producto</div>
            <div class="text-subtitle1 text-white q-px-sm">Toca la pantalla y ve a la tienda para agregar un producto</div>
          </div>
          <div class="row justify-center absolute-bottom q-mb-md q-gutter-xs">
            <q-btn no-caps rounded color="primary" label="Nuevo producto" class="q-py-xs" style="width: 60%;"
              @click="$router.push('/registro_producto')"/>
            <q-btn no-caps flat color="white" text-color="white" label="Omitir para ir a tienda" class="q-py-xs" style="width: 60%;"
              to="/inicio_proveedor"/>
          </div>
        </q-carousel-slide>
      </q-carousel>
  </div>
</template>
<script>
export default {
  data () {
    return {
      slide: 1
    }
  },
  methods: {
  }
}
</script>

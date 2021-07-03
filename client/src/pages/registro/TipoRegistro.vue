<template>
  <div>
    <q-carousel
      class="window-height"
      animated
      v-model="slide"
      infinite
      swipeable
      ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none" img-src="https://cdn.quasar.dev/img/mountains.jpg">
        <div class="absolute-center full-width custom-caption bg-transparent">
          <div class="row justify-end q-mb-md">
            <q-btn flat color="white" size="lg" icon="arrow_forward" to="/registro/proveedor"/>
          </div>
          <div class="text-h4 text-bold" color="white">Quiero ser un <br> proveedor</div>
          <div class="text-subtitle1">Tienes una tienda de mascotas o espaciospara alojar mascotas? PetFriendly es tu lugar</div>
          <div class="q-gutter-xs">
            <q-btn
              push dense color="white" text-color="black" style="width: 20px; height: 10px;"
              @click="$refs.carousel.previous()"/>
            <q-btn
              push dense color="white" text-color="black"  style="width: 20px; height: 10px;"
              @click="$refs.carousel.next()"/>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="q-pa-none" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-center full-width custom-caption bg-transparent">
          <div class="row justify-end q-mb-md">
            <q-btn flat color="white" size="lg" icon="arrow_forward" to="/registro/cliente"/>
          </div>
          <div class="text-h4 text-bold" color="white">Quiero un producto o <br> servicio</div>
          <div class="text-subtitle1">Todo lo que tu mascota necesita en una sola app. Desde paseos hasta alojamiento.</div>
          <div class="q-gutter-xs">
            <q-btn
              push dense color="white" text-color="black" style="width: 20px; height: 10px;"
              @click="$refs.carousel.previous()"/>
            <q-btn
              push dense color="white" text-color="black"  style="width: 20px; height: 10px;"
              @click="$refs.carousel.next()"/>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="q-pa-none" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
        <div class="absolute-center full-width custom-caption bg-transparent">
          <div class="row justify-end q-mb-md">
            <q-btn flat color="white" size="lg" icon="arrow_forward" to="/registro/hospedador"/>
          </div>
          <div class="text-h4 text-bold" color="white">Quiero ser un <br> proveedor de espacios</div>
          <div class="text-subtitle1">Tienes espacios para alojar mascotas? PetFriendly es tu lugar</div>
          <div class="q-gutter-xs">
            <q-btn
              push dense color="white" text-color="black" style="width: 20px; height: 10px;"
              @click="$refs.carousel.previous()"/>
            <q-btn
              push dense color="white" text-color="black"  style="width: 20px; height: 10px;"
              @click="$refs.carousel.next()"/>
          </div>
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
  }
}
</script>
<style lang="sass" scoped>
.custom-caption
  text-align: left
  padding-top: 30px
  padding-bottom: 30px
  padding-left: 10px
  color: white
  background-color: rgba(0, 0, 0, .3)
  margin-bottom: 40%
</style>

<template>
  <div>
    <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none" img-src="https://cdn.quasar.dev/img/mountains.jpg">
        <q-btn flat round color="primary" icon="arrow_forward_ios" class="fixed-right" to="/proveedor/registro" />
        <div class="absolute-bottom custom-caption">
          <div class="text-h4" color="white">Quiero ser un</div>
          <div class="text-h4" color="white">proveedor</div>
          <div class="text-subtitle1">tienes una tienda de mascotas o espacios</div>
          <div class="text-subtitle1">para alojar mascotas? PetFriendly es tu lugar</div>
      </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="q-pa-none" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
        <q-btn flat round color="primary" icon="arrow_forward_ios" class="fixed-right" />
        <div class="absolute-bottom custom-caption">
          <div class="text-h4" color="white">Quiero ser un</div>
          <div class="text-h4" color="white">proveedor</div>
          <div class="text-subtitle1">tienes una tienda de mascotas o espacios</div>
          <div class="text-subtitle1">para alojar mascotas? PetFriendly es tu lugar</div>
      </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="q-pa-none" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
        <q-btn flat round color="primary" icon="arrow_forward_ios" class="fixed-right"  to="/hospedador/registro"/>
        <div class="absolute-bottom custom-caption">
          <div class="text-h4" color="white">Quiero ser un proveedor</div>
          <div class="text-h4" color="white">de espacios</div>
          <div class="text-subtitle1">tienes espacios para alojar mascotas?</div>
          <div class="text-subtitle1">PetFriendly es tu lugar</div>
        </div>
      </q-carousel-slide>
      <template v-slot:control>
        <q-carousel-control
          position="bottom-left"
          :offset="[5, 10]"
          class="q-gutter-xs"
          style="margin-bottom:41%;"
        >
          <q-btn
            push dense color="black" text-color="black" style="width: 20px; height: 10px;"
            @click="$refs.carousel.previous()"
          />
          <q-btn
            push dense color="black" text-color="black"  style="width: 20px; height: 10px;"
            @click="$refs.carousel.next()"
          />
        </q-carousel-control>
      </template>
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

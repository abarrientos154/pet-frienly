<template>
  <div>
    <q-carousel
      class="window-height"
      animated
      v-model="slide"
      infinite
      swipeable
      ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-sm">
          <q-btn flat round color="black" size="lg" icon="arrow_back" @click="$router.go(-1)"/>
        </div>
        <div class="absolute-center full-width column justify-between">
          <div class="q-pb-xl">
            <div class="row justify-center q-pb-lg">
              <img src="logo.png" style="width:260px" />
            </div>
            <div class="text-h5 text-bold text-center text-grey-9">¿Qué quieres hacer?</div>
            <div class="text-caption text-center">Selecciona lo que quieres realizar en el app</div>
          </div>

          <div class="q-pt-xl column items-center q-gutter-sm">
            <q-btn no-caps rounded class="q-py-xs" color="primary" label="Cliente" style="width: 60%"
              to="/registro/cliente"/>
            <q-btn no-caps rounded class="q-py-xs" color="primary" label="Aliado" style="width: 60%"
              @click="slide = 2"/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="q-pa-sm">
          <q-btn flat round color="black" size="lg" icon="arrow_back" @click="slide = 1"/>
        </div>
        <div class="absolute-center full-width column justify-between">
          <div class="q-pb-xl">
            <div class="row justify-center">
              <img src="logo.png" style="width:260px" />
            </div>
          </div>

          <div class="q-pt-xl column items-center q-gutter-sm">
            <div class="text-h5 text-bold text-center text-grey-9 q-pb-sm">¿Qué tipo de aliado <br> quieres ser?</div>
            <q-btn no-caps rounded class="q-py-xs" color="primary" label="Tienda" style="width: 60%"
              to="/registro/proveedor"/>
            <q-btn no-caps rounded class="q-py-xs" color="primary" label="Hospedador" style="width: 60%"
              to="/registro/hospedador"/>
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

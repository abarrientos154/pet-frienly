<template>
  <div style="max-width: 100%">
    <div class="q-mt-md q-mx-sm text-h6">Bienvenido Usuario</div>
    <div class="q-mb-md q-mx-sm text-secondary text-weight-bolder">El amor es una palabra de cuatro patas</div>
    <q-input outlined type="text" class="q-mb-xs q-mx-sm shadow-8" label="Que necesitas?" dense style="width: auto border-radius: 20px">
      <template v-slot:prepend>
        <q-icon name="search"/>
      </template>
    </q-input>
    <div class="q-mb-md q-mx-sm text-h6">Catalogo de productos</div>
    <q-scroll-area horizontal class="q-mb-md" style="height: 48px;">
      <q-tabs v-model="tab" dense class="text-grey row justify-between" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab class="col" label="Categoria" />
        <q-tab class="col" label="Categoria" />
        <q-tab class="col" label="Categoria" />
        <q-tab class="col" label="Categoria" />
      </q-tabs>
    </q-scroll-area>
    <div class="q-mb-xs q-mx-sm">Ultimos Productos agregados</div>
    <q-scroll-area horizontal class="q-mx-sm q-mb-md" style="height: 330px;">
      <div class="row no-wrap" style="width: 100%">
        <q-card class="q-mt-sm q-mx-sm bordes shadow-11" style="width: 200px; height: 300px;">
          <q-card-section style="height: 65%;">
            <q-avatar square class="absolute-center" color="secondary" style="width: 180px; height: 90%"/>
          </q-card-section>
          <q-separator />
          <q-card-section class="bg-orange-2" style="height: 35%;">
            <div>
              <div class="text-subtitle2" style="font-size: 13px">Nombre del producto</div>
              <div class="items-center row text-grey">
                  <q-icon name="place" />
                  <div class="text-subtitle2" style="font-size: 12px">Tienda</div>
              </div>
            </div>
            <div class="items-center row justify-between">
              <div class="row">
                <q-icon size="20px" name="star" color="secondary" v-for="(i, index) in 5" :key="index"/>
              </div>
              <q-btn round icon="keyboard_arrow_right" text-color="primary" color="white" size="10px"/>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-sm q-mx-sm bordes shadow-11" style="width: 200px; height: 300px;">
          <q-card-section style="height: 65%;">
            <q-avatar square class="absolute-center" color="secondary" style="width: 180px; height: 90%"/>
          </q-card-section>
          <q-separator />
          <q-card-section class="bg-orange-2" style="height: 35%;">
            <div>
              <div class="text-subtitle2" style="font-size: 13px">Nombre del producto</div>
              <div class="items-center row text-grey">
                  <q-icon name="place" />
                  <div class="text-subtitle2" style="font-size: 12px">Tienda</div>
              </div>
            </div>
            <div class="items-center row justify-between">
              <div class="row">
                <q-icon size="20px" name="star" color="secondary" v-for="(i, index) in 5" :key="index"/>
              </div>
              <q-btn round icon="keyboard_arrow_right" text-color="primary" color="white" size="10px"/>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-sm q-mx-sm bordes shadow-11" style="width: 200px; height: 300px;">
          <q-card-section style="height: 65%;">
            <q-avatar square class="absolute-center" color="secondary" style="width: 180px; height: 90%"/>
          </q-card-section>
          <q-separator />
          <q-card-section class="bg-orange-2" style="height: 35%;">
            <div>
              <div class="text-subtitle2" style="font-size: 13px">Nombre del producto</div>
              <div class="items-center row text-grey">
                  <q-icon name="place" />
                  <div class="text-subtitle2" style="font-size: 12px">Tienda</div>
              </div>
            </div>
            <div class="items-center row justify-between">
              <div class="row">
                <q-icon size="20px" name="star" color="secondary" v-for="(i, index) in 5" :key="index"/>
              </div>
              <q-btn round icon="keyboard_arrow_right" text-color="primary" color="white" size="10px"/>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-sm q-mx-sm bordes shadow-11" style="width: 200px; height: 300px;">
          <q-card-section style="height: 65%;">
            <q-avatar square class="absolute-center" color="secondary" style="width: 180px; height: 90%"/>
          </q-card-section>
          <q-separator />
          <q-card-section class="bg-orange-2" style="height: 35%;">
            <div>
              <div class="text-subtitle2" style="font-size: 13px">Nombre del producto</div>
              <div class="items-center row text-grey">
                  <q-icon name="place" />
                  <div class="text-subtitle2" style="font-size: 12px">Tienda</div>
              </div>
            </div>
            <div class="items-center row justify-between">
              <div class="row">
                <q-icon size="20px" name="star" color="secondary" v-for="(i, index) in 5" :key="index"/>
              </div>
              <q-btn round icon="keyboard_arrow_right" text-color="primary" color="white" size="10px"/>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
    <div class="q-mb-md q-mx-sm text-h6">Nuestras tiendas</div>
    <q-scroll-area horizontal class="q-mb-md" style="height: 48px;">
      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab label="Servicio" />
        <q-tab label="Servicio" />
        <q-tab label="Servicio" />
        <q-tab label="Servicio" />
        <q-tab label="Servicio" />
        <q-tab label="Servicio" />
      </q-tabs>
    </q-scroll-area>
    <div class="q-mb-xs q-mx-sm">Tiendas mejores calificadas</div>
    <q-scroll-area horizontal class="q-mx-sm q-mb-md" style="height: 330px;">
      <div class="row no-wrap" style="width: 100%">
        <q-card class="q-mt-sm q-mx-sm bordes shadow-11" style="width: 200px; height: 300px;">
          <q-card-section style="height: 65%;">
            <q-avatar square class="absolute-center" color="secondary" style="width: 180px; height: 90%"/>
          </q-card-section>
          <q-separator />
          <q-card-section class="bg-orange-2" style="height: 35%;">
            <div>
              <div class="text-subtitle2" style="font-size: 13px">Nombre de la tienda</div>
              <div class="items-center row text-grey">
                  <q-icon name="place" />
                  <div class="text-subtitle2" style="font-size: 12px">Dirección de la tienda</div>
              </div>
            </div>
            <div class="items-center row justify-between">
              <div class="row">
                <q-icon size="20px" name="star" color="secondary" v-for="(i, index) in 5" :key="index"/>
              </div>
              <q-btn round icon="keyboard_arrow_right" text-color="primary" color="white" size="10px"/>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-sm q-mx-sm bordes shadow-11" style="width: 200px; height: 300px;">
          <q-card-section style="height: 65%;">
            <q-avatar square class="absolute-center" color="secondary" style="width: 180px; height: 90%"/>
          </q-card-section>
          <q-separator />
          <q-card-section class="bg-orange-2" style="height: 35%;">
            <div>
              <div class="text-subtitle2" style="font-size: 13px">Nombre de la tienda</div>
              <div class="items-center row text-grey">
                  <q-icon name="place" />
                  <div class="text-subtitle2" style="font-size: 12px">Dirección de la tienda</div>
              </div>
            </div>
            <div class="items-center row justify-between">
              <div class="row">
                <q-icon size="20px" name="star" color="secondary" v-for="(i, index) in 5" :key="index"/>
              </div>
              <q-btn round icon="keyboard_arrow_right" text-color="primary" color="white" size="10px"/>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-sm q-mx-sm bordes shadow-11" style="width: 200px; height: 300px;">
          <q-card-section style="height: 65%;">
            <q-avatar square class="absolute-center" color="secondary" style="width: 180px; height: 90%"/>
          </q-card-section>
          <q-separator />
          <q-card-section class="bg-orange-2" style="height: 35%;">
            <div>
              <div class="text-subtitle2" style="font-size: 13px">Nombre de la tienda</div>
              <div class="items-center row text-grey">
                  <q-icon name="place" />
                  <div class="text-subtitle2" style="font-size: 12px">Dirección de la tienda</div>
              </div>
            </div>
            <div class="items-center row justify-between">
              <div class="row">
                <q-icon size="20px" name="star" color="secondary" v-for="(i, index) in 5" :key="index"/>
              </div>
              <q-btn round icon="keyboard_arrow_right" text-color="primary" color="white" size="10px"/>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-sm q-mx-sm bordes shadow-11" style="width: 200px; height: 300px;">
          <q-card-section style="height: 65%;">
            <q-avatar square class="absolute-center" color="secondary" style="width: 180px; height: 90%"/>
          </q-card-section>
          <q-separator />
          <q-card-section class="bg-orange-2" style="height: 35%;">
            <div>
              <div class="text-subtitle2" style="font-size: 13px">Nombre de la tienda</div>
              <div class="items-center row text-grey">
                  <q-icon name="place" />
                  <div class="text-subtitle2" style="font-size: 12px">Dirección de la tienda</div>
              </div>
            </div>
            <div class="items-center row justify-between">
              <div class="row">
                <q-icon size="20px" name="star" color="secondary" v-for="(i, index) in 5" :key="index"/>
              </div>
              <q-btn round icon="keyboard_arrow_right" text-color="primary" color="white" size="10px"/>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
    <div class="q-mx-sm text-h6">Alojamientos</div>
    <div class="q-mb-md q-mx-sm">Alojamientos mejor catificados</div>
    <q-list class="q-mb-xl row justify-center" style="width: 100%; height: auto;">
      <q-card class="q-mb-md q-mx-sm col no-wrap shadow-11" style="min-width: 300px; max-width: 375px; border-radius: 12px;">
        <q-card-section class="bg-secondary" style="height: 175px;">
          <q-btn position="top-left" round icon="favorite" color="primary" size="10px"/>
        </q-card-section>
        <q-separator />
        <q-card-section class="row justify-between">
          <div>
            <div class="text-subtitle2" style="font-size: 13px">Nombre del alojamiento</div>
            <div class="items-center row text-grey">
                <q-icon name="place" />
                <div class="text-subtitle2" style="font-size: 12px">País, Ciudad</div>
            </div>
          </div>
          <q-btn flat dense class="bg-primary text-white" style="width: 100px">$850 / mes</q-btn>
        </q-card-section>
      </q-card>
      <q-card class="q-mb-md q-mx-sm col no-wrap shadow-11" style="min-width: 300px; max-width: 375px; border-radius: 12px;">
        <q-card-section class="bg-secondary" style="height: 175px;">
          <q-btn position="top-left" round icon="favorite" color="primary" size="10px"/>
        </q-card-section>
        <q-separator />
        <q-card-section class="row justify-between">
          <div>
            <div class="text-subtitle2" style="font-size: 13px">Nombre del alojamiento</div>
            <div class="items-center row text-grey">
                <q-icon name="place" />
                <div class="text-subtitle2" style="font-size: 12px">País, Ciudad</div>
            </div>
          </div>
          <q-btn flat dense class="bg-primary text-white" style="width: 100px">$850 / mes</q-btn>
        </q-card-section>
      </q-card>
    </q-list>
    <div class="column items-center" style="height: 250px;">
      <div class="text-weight-bolder" style="font-size: 15px">Suscribete a nuestro boletín</div>
      <div style="font-size: 11px">Recibe las mejores ofertas de todos</div>
      <div  class="q-mb-md" style="font-size: 11px">nuestros proveedores</div>
      <q-input outlined label="Tu correo aquí" color-label="secondary">
        <template v-slot:prepend>
          <q-icon name="mail_outline"/>
        </template>
        <template v-slot:append class="bg-secondary">
          <q-btn flat dense icon="send" class="bg-primary" text-color="white" style="height: 100%; width: 50px; margin-right: -12px"/>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      tab: 'mails'
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
.bordes
  border-top-left-radius: 0px
  border-top-right-radius: 30px
  border-bottom-left-radius: 30px
  border-bottom-right-radius: 30px
</style>

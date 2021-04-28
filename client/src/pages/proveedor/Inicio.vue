<template>
  <div>
    <div class="q-mb-md">
      <q-carousel animated arrows navigation infinite class="img" v-model="carrusel">
        <q-carousel-slide :name="0" :img-src="baseu + form._id" />
        <q-carousel-slide v-for="(img, index) in form.tiendaFiles" :key="index" :name="index + 1" :img-src="baseuTienda + img" />
      </q-carousel>

      <div class="row items-center justify-between q-pa-md">
        <div>
          <div class="text-h5">{{form.name}}</div>
          <div class="row text-grey">
            <q-icon name="place" size="20px"/>
            <div>{{form.place ? form.place : 'Pais, Ciudad'}}</div>
          </div>
          <div class="q-gutter-y-md row">
            <q-rating
              v-model="ratingModel"
              size="20px"
              icon="star"
            />
          <div class="q-pa-sm text-green-9 text-bold">{{"("}}{{this.ratingModel}}{{")"}}</div>
          </div>
        </div>
        <q-btn color="primary" icon="send" label="Hablar" style="border-radius: 10px" no-caps/>
      </div>
    </div>

    <!-- <q-scroll-area horizontal class="q-mb-md" :thumb-style="thumbStyle" style="height: 100px" ref="first">
      <q-tabs v-model="tabSer" dense class="text-grey-10" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab v-for="(item, index) in servicios" :key="index" no-caps>
          <q-img :src="item.img" spinner-color="white" style="height: 60px; width: 70px"/>
          <div class="column items-center justify-center">
            <div class="text-caption text-bold">{{item.label}}</div>
          </div>
        </q-tab>
      </q-tabs>
    </q-scroll-area> -->

    <q-card class="q-pa-sm full-width">
      <q-scroll-area
        horizontal
        style="height: 100px; width: 100%;"
        class="bg-grey-1 rounded-borders"
      >
        <div class="column items-center justify-center">
        <div class="row no-wrap" style="width: 100%">
          <div v-ripple v-for="(item, index) in form.formatSer" class="q-mt-sm q-mr-sm q-ml-sm" style="border-radius:12px;width: 100px" :key="index">
            <div class="column items-center justify-center">
          <q-avatar square size="40px">
            <img :src="item.icons">
          </q-avatar>
          <div class="text-caption text-center">{{item.name}}</div>
        </div>
          </div>
        </div>
        </div>
      </q-scroll-area>
    </q-card>

    <div class="q-pa-sm q-mb-sm">
      <div class="text-h6">Nuestra tienda</div>
      <div class="text-grey-7 text-subtitle q-mb-sm">{{ lorem }}</div>
      <q-input dense borderless class="shadow-4 q-mx-md q-mb-md" v-model="text" label="Que necesitas?" style="border-radius: 10px">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="text-h6 q-mb-md">Ultimos productos agregados</div>
      <q-scroll-area horizontal class="q-mb-sm" style="height: 330px; width:100%">
        <div class="row no-wrap" style="width: 100%">
          <q-card class="q-mt-sm q-mx-sm bordes shadow-11" v-for="(item, index) in productos" :key="index" v-ripple style="width: 200px; height: 300px;">
            <q-card-section style="height: 65%;">
              <q-img class="absolute-center" :src="item.images.length > 0 ? baseuproductos + item.images[0] : 'noimgpro.png'" style="width: 90%; height: 90%;"/>
            </q-card-section>
            <q-separator />
            <q-card-section class="bg-orange-2" style="height: 35%;">
              <div>
                <q-scroll-area horizontal style="height: 23px; width:100%">
                  <div class="text-subtitle2 text-weight-bolder" style="font-size: 13px">{{item.name}}</div>
                </q-scroll-area>
                <div class="items-center row text-grey">
                  <q-icon class="col-1" name="place" />
                  <div class="text-subtitle2 col" style="font-size: 12px">País, Ciudad</div>
                </div>
              </div>
              <div class="items-center row justify-between">
                <q-rating max="5" size="20px" v-model="rating" color="primary" disable icon="star_border" icon-selected="star" icon-half="star_half" no-dimming />
                <q-btn round @click="$router.push('/descripcion_producto/' + item._id)" icon="keyboard_arrow_right" text-color="primary" color="white" size="10px"/>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
      <div class="q-mb-md text-h6">Todos nuestros productos</div>
      <q-scroll-area horizontal class="q-mb-sm" style="height: 330px; width:100%">
        <div class="row no-wrap" style="width: 100%">
          <q-card class="q-mt-sm q-mx-sm bordes shadow-11" v-for="(item, index) in productos" :key="index" v-ripple style="width: 200px; height: 300px;">
            <q-card-section style="height: 65%;">
              <q-img class="absolute-center" :src="item.images.length > 0 ? baseuproductos + item.images[0] : 'noimgpro.png'" style="width: 90%; height: 90%;"/>
            </q-card-section>
            <q-separator />
            <q-card-section class="bg-orange-2" style="height: 35%;">
              <div>
                <q-scroll-area horizontal style="height: 23px; width:100%">
                  <div class="text-subtitle2 text-weight-bolder" style="font-size: 13px">{{item.name}}</div>
                </q-scroll-area>
                <div class="items-center row text-grey">
                  <q-icon class="col-1" name="place" />
                  <div class="text-subtitle2 col" style="font-size: 12px">País, Ciudad</div>
                </div>
              </div>
              <div class="items-center row justify-between">
                <q-rating max="5" size="20px" v-model="rating" color="primary" disable icon="star_border" icon-selected="star" icon-half="star_half" no-dimming />
                <q-btn round @click="$router.push('/descripcion_producto/' + item._id)" icon="keyboard_arrow_right" text-color="primary" color="white" size="10px"/>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
      <div class="q-mb-sm text-h6">Alojamientos</div>
      <div class="q-mb-md">Alojamientos mejor calificados</div>
      <q-list class="q-mb-xl row justify-center" style="width: 100%; height: auto;">
        <q-card v-for="(hospedaje, index) in hospedajes" :key="index" class="q-mb-md q-mx-sm col no-wrap shadow-11" style="min-width: 300px; max-width: 375px; border-radius: 12px;">
          <q-img @click="seeAccommodation(hospedaje._id)" :src="hospedaje.images[0] ? baseuHospedaje + '/' + hospedaje.images[0] : 'noimgpro.png'" style="height: 175px;">
            <q-btn position="top-left" round icon="favorite" color="primary" size="10px" class="q-mt-sm q-ml-sm"/>
          </q-img>
          <q-separator />
          <q-card-section class="row justify-between">
            <div>
              <div class="text-subtitle2" style="font-size: 13px">{{hospedaje.name}}</div>
              <div class="items-center row text-grey">
                  <q-icon name="place" />
                  <div class="text-subtitle2" style="font-size: 12px">Pais, Ciudad</div>
              </div>
            </div>
            <q-btn no-caps flat dense @click="$router.push('/descripcion_hospedaje/' + hospedaje._id)" class="bg-primary text-white" style="width: 100px; border-radius: 10px">${{hospedaje.price}} / noche</q-btn>
          </q-card-section>
        </q-card>
      </q-list>
    </div>
  </div>
</template>

<script>
import env from '../../env'
export default {
  components: {
  },
  data () {
    return {
      form: {},
      carrusel: 0,
      text: '',
      servicios2: [],
      lorem: '¡Descubre diferentes lugares, playas, hoteles y principales zonas turísticas en Mejillones para planificar de manera más organizada y divertida tu viaje! Consigue ofertas exclusivas, gestiona tus reservas y revisa la opinión de otros viajeros.',
      servicios: [
        {
          img: 'favicon.ico',
          label: 'Servicio'
        },
        {
          img: 'favicon.ico',
          label: 'Servicio'
        },
        {
          img: 'favicon.ico',
          label: 'Servicio'
        },
        {
          img: 'favicon.ico',
          label: 'Servicio'
        },
        {
          img: 'favicon.ico',
          label: 'Servicio'
        },
        {
          img: 'favicon.ico',
          label: 'Servicio'
        }
      ],
      tabSer: 'mails',
      productos: [],
      rating: 4,
      slide: 0,
      ratingModel: 3,
      baseu: '',
      baseuTienda: '',
      baseuproductos: '',
      baseuHospedaje: '',
      hospedajes: [],
      thumbStyle: {
        borderRadius: '5px',
        backgroundColor: 'gray',
        opacity: 0.25
      }
    }
  },
  mounted () {
    this.getUser()
    this.obtenerDatos()
    this.baseu = env.apiUrl + 'perfil_img/'
    this.baseuTienda = env.apiUrl + 'tienda_img/'
    this.baseuproductos = env.apiUrl + 'productos_img/'
    this.baseuHospedaje = env.apiUrl + 'hospedajes_img'
    this.obtener_productos()
    this.obtener_hospedajes()
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
          this.form = v
          console.log(this.form, 'usuario')
        }
      })
    },
    obtenerDatos () {
      this.$api.get('servicios').then(res => {
        if (res) {
          this.servicios2 = res
          console.log(this.servicios2, 'miraaaaaaaaaaaaaaaaa')
        }
      })
    },
    obtener_productos () {
      this.$api.get('producto').then(res => {
        if (res) {
          this.productos = res
          // console.log(this.productos, 'los productos')
        }
      })
    },
    obtener_hospedajes () {
      this.$api.get('hospedaje').then(res => {
        if (res) {
          this.hospedajes = res
          // console.log(this.hospedajes)
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.img
  width: 100%
  height: 350px
  border-top-left-radius: 0px
  border-top-right-radius: 0px
  border-bottom-left-radius: 15px
  border-bottom-right-radius: 15px
.bordes
  border-top-left-radius: 0px
  border-top-right-radius: 30px
  border-bottom-left-radius: 30px
  border-bottom-right-radius: 30px
</style>

<template>
  <div>
    <q-header elevated class="bg-primary row justify-center items-center" style="width:100%; height:60px">
      <div class="text-white text-subtitle1 text-center">{{tienda.name}}</div>
    </q-header>

    <div class="row q-pa-sm">
      <div class="col-6">
        <q-img style="height: 100%; width: 100%" :src="baseuTienda + tienda.perfil"/>
        <div class="q-gutter-y-md row">
          <q-rating
            v-model="tienda.calificacion"
            color="orange"
            readonly
            size="25px"
            icon="star"
          />
        <div class="q-pa-sm text-green-9 text-bold">({{tienda.calificacion ? tienda.calificacion : 0}})</div>
        </div>
      </div>
      <div class="col-6 q-pl-sm">
        <div class="text-bold text-subtitle1">Bienvenido</div>
        <div>descripcion</div>
      </div>
    </div>

    <div class="q-pa-sm q-mt-md">
      <div class="text-h6">Servicios ofrecidos</div>
      <q-scroll-area
          v-if="tienda.servicios && tienda.servicios.length"
          horizontal
          style="height: 160px;"
        >
          <div class="row no-wrap q-py-sm q-px-md q-gutter-md">
            <q-card style="border-radius: 50px; width:140px; height:140px" clickable v-ripple v-for="(item, index) in tienda.servicios" :key="index">
              <q-img :src="baseuServicios + item._id" style="height: 100%; width: 100%; border-radius: 50px" >
                <div class="full-width text-center absolute-bottom">{{item.servicio.name}}</div>
              </q-img>
            </q-card>
          </div>
      </q-scroll-area>
    </div>

    <!-- <div>
      <div class="text-subtitle1 text-bold">Informacion</div>
      <div class="row">
        <div class="col q-mx-md">
          <div class="text-subtitle3 text-bold text-grey-6">Ciudad</div>
          <div class="text-caption text-grey-6">{{cityUser.name}}</div>
          <div class="text-subtitle3 text-bold text-grey-6">Direccion</div>
          <div class="text-caption text-grey-6">{{user.my_space.direction}}</div>
          <div class="text-subtitle3 text-bold text-grey-6">Correo de contacto</div>
          <div class="text-caption text-grey-6">{{user.my_space.email}}</div>
        </div>
        <div class="col q-mx-md">
          <div class="text-subtitle3 text-bold text-grey-6">Horarios de atencóon</div>
          <div class="text-caption text-grey-6">Apertura {{user.my_space.hora_inicio}}</div>
          <div class="text-caption text-grey-6">Cierre {{user.my_space.hora_cierre}}</div>
          <div class="text-subtitle3 text-bold text-grey-6">Telefono de contacto</div>
          <div class="text-caption text-grey-6">{{user.my_space.phone}}</div>
        </div>
      </div>
    </div> -->

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
      id: '',
      user: {},
      tienda: {},
      form: {},
      carrusel: 0,
      text: '',
      servicios: [],
      lorem: '¡Descubre diferentes lugares, playas, hoteles y principales zonas turísticas en Mejillones para planificar de manera más organizada y divertida tu viaje! Consigue ofertas exclusivas, gestiona tus reservas y revisa la opinión de otros viajeros.',
      tabSer: 'mails',
      productos: [],
      rating: 4,
      slide: 0,
      ratingModel: 3,
      baseu: '',
      baseuTienda: '',
      baseuproductos: '',
      baseuServicios: '',
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
    this.baseuServicios = env.apiUrl + 'servicio_img/'
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.getTienda(this.id)
    }
    this.obtener_productos()
    this.obtener_hospedajes()
  },
  methods: {
    getUser () {
      this.$api.get('user_logueado').then(v => {
        if (v) {
          this.user = v
          this.form = v
          if (this.user.roles[0] === 3) {
            this.getTienda(this.user._id)
          }
          console.log('usuario', this.user)
        }
      })
    },
    getTienda (id) {
      this.$api.get('tienda_by_id/' + id).then(v => {
        if (v) {
          this.tienda = v.tienda
          console.log('tienda', this.tienda)
        }
      })
    },
    obtenerDatos () {
      this.$api.get('servicios').then(res => {
        if (res) {
          this.servicios = res
          console.log(this.servicios, 'miraaaaaaaaaaaaaaaaa')
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

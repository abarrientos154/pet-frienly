<template>
  <div>
  <q-page>
    <div style="width: 100%;height:100%">
      <q-img :src="baseu + form._id" style="height: 100%; width: 100%" />
    </div>
    <q-card class="my-card">
      <q-list>
        <q-item>
          <q-item-section>
            <div class="text-h6 text-grey-9 text-bold">{{form.name}}</div>
            <div class="text-h7 text-grey-9 text-bold">{{form.place}}</div>
            <div class="q-gutter-y-md row">
              <q-rating
                v-model="ratingModel"
                size="2em"
                icon="star"
              />
            <div class="q-pa-sm text-h7 text-green-9 text-bold">{{"("}}{{this.ratingModel}}{{")"}}</div>
            </div>
          </q-item-section>
          <q-item-section class="q-pt-xl" side top>
            <q-btn color="primary" icon="send" label="Boton" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
      <q-card class="q-pa-sm full-width">
        <q-scroll-area
        horizontal
        style="height: 90px; width:100%"
      >
        <div class="row no-wrap" style="width: 100%">
          <div v-ripple v-for="(item, index) in servicios" class="column items-center justify-center bg-white q-mt-xs q-mr-xl" style="border-radius:12px;width: 100px" :key="index">
            <q-img :src="item.img" spinner-color="white" style="height: 60px; width: 70px">
            </q-img>
              <div class="column items-center justify-center">
                <div class="text-caption text-bold">{{item.label}}</div>
              </div>
          </div>
        </div>
      </q-scroll-area>
      </q-card>
        <div class="q-pa-xs text-h7 text-black-9 text-bold">Nuestra tienda:</div>
        <div class="q-pa-xs text-grey-8 ">
        {{ lorem }}
      </div>
      <q-input borderless v-model="text" label="¿Que estas buscando?" class="bg-grey-2">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      <div class="q-pa-sm text-h7 text-black-9 text-bold">Ultimos productos agregados:</div>

      <q-card class="q-pa-sm full-width">
        <q-scroll-area
          horizontal
          style="height: 280px; width:100%"
        >
        <div class="row no-wrap" style="width: 100%">

          <q-card v-ripple v-for="(item2, index2) in productos" class="column items-center justify-center bg-white q-mt-xs q-mr-md" style="border-radius:12px;width: 160px" :key="index2">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" spinner-color="white"> </q-img>
            <q-card-section class="bg-grey" style="width: 160px">
                <div class="colum">
                    <div class="text-h6 text-grey-9 text-bold">{{item2.label}}</div>
                    <div class="text-h7 text-grey-9 text-bold">{{item2.tienda}}</div>
                    <div class="q-gutter-y-md row">
                    <q-rating class="q-mb-xl" v-model="item2.rating" max="5" size="1.5em" color="yellow" disable icon="star_border" icon-selected="star" icon-half="star_half" no-dimming />
                    </div>
                      <q-btn round color="white" class="absolute-bottom-right text-red" icon="keyboard_arrow_right" />
                  </div>
            </q-card-section>
        </q-card>
        </div>
      </q-scroll-area>
      </q-card>

     <div class="q-pa-sm text-h7 text-black-9 text-bold">Todos nuestros productos:</div>
      <q-card class="q-pa-sm full-width">
        <q-scroll-area
          horizontal
          style="height: 280px; width:100%"
        >
        <div class="row no-wrap" style="width: 100%">

          <q-card v-ripple v-for="(item2, index2) in productos" class="column items-center justify-center bg-white q-mt-xs q-mr-md" style="border-radius:12px;width: 160px" :key="index2">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" spinner-color="white"> </q-img>
            <q-card-section class="bg-grey" style="width: 160px">
                <div class="colum">
                    <div class="text-h6 text-grey-9 text-bold">{{item2.label}}</div>
                    <div class="text-h7 text-grey-9 text-bold">{{item2.tienda}}</div>
                    <div class="q-gutter-y-md row">
                    <q-rating class="q-mb-xl" v-model="item2.rating" max="5" size="1.5em" color="yellow" disable icon="star_border" icon-selected="star" icon-half="star_half" no-dimming />
                    </div>
                    <q-btn round color="white" class="absolute-bottom-right text-red" icon="keyboard_arrow_right" />
                  </div>
            </q-card-section>
        </q-card>
        </div>
      </q-scroll-area>
      </q-card>
      <div class="q-pa-sm q-mt-md text-h5 text-black">Alojamientos</div>
      <div class="q-pa-sm text-h6 text-black">Alojamientos mejor calificados</div>
      <q-card class="column items-center justify-center bg-white q-mt-xs q-mr-md" style="border-radius:12px;width:100%">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" spinner-color="white">
              <q-btn round color="primary" class="absolute-top-left text-white" icon="favorite" />
            </q-img>
            <q-list>
        <q-item>
          <q-item-section>
            <div class="text-h6 text-grey-9 text-bold">Nombre alojamiento</div>
            <div class="text-h7 text-grey-9 text-bold">{{form.place}}</div>
          </q-item-section>
          <q-item-section class="q-pt-xl" side top>
            <q-btn color="primary" icon="attach_money" label="Boton" />
          </q-item-section>
        </q-item>
      </q-list>
        </q-card>
  </q-page>
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
      text: '',
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
        }
      ],
      productos: [
        {
          img: 'favicon.ico',
          label: 'Producto',
          tienda: 'tienda',
          rating: 3
        },
        {
          img: 'favicon.ico',
          label: 'Producto',
          tienda: 'tienda',
          rating: 3
        },
        {
          img: 'favicon.ico',
          label: 'Producto',
          tienda: 'tienda',
          rating: 3
        }
      ],
      slide: 0,
      ratingModel: 3,
      baseu: ''
    }
  },
  mounted () {
    this.getUser()
    this.baseu = env.apiUrl + '/perfil_img/'
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
          this.form = v
          console.log(this.form, 'usuarioooooooo')
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>

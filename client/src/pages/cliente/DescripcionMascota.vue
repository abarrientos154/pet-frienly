<template>
  <div class="bg-secondary" style="height:100%">
    <div class="row justify-center">
      <div class="q-pa-md col col-xs-10 col-sm-8 col-md-7 col-lg-5 col-xl-4 no-wrap q-mx-md q-my-sm">
        <div class="column dimension no-wrap">
          <q-img class="q-my-sm" :src="form.images ? baseu + perfile : 'noimgpro.png'" spinner-color="white" style="height: 250px; width: 100%;border-radius:10px">
            <div class="row justify-between" style="width:100%">
            </div>
            <div class="row absolute-bottom" style="width:100%">
            <div class="q-pl-md q-pt-xs text-caption">{{form.direccion}}</div>
            </div>
          </q-img>
          <q-card class="q-px-sm q-pb-md bg-secondary shadow-up-3 q-mt-sm" style="border-radius:10px">
            <q-item>
                <q-item-section>
                <q-item-label class="text-h6 text-center">{{form.name}}</q-item-label>
                </q-item-section>
                <q-item-section side top>
                </q-item-section>
              </q-item>
              <q-scroll-area
                horizontal
                style="height: 100px;"
                >
                <div class="row no-wrap" style="width: 100%">
                    <q-card @click="perfile = img" v-for="(img, index) in form.images" class="bg-secondary  q-mt-xs q-mx-sm" style="border-radius:12px;width: 100%" :key="index">
                    <q-img :src="form.images ? baseu + img : 'noimgpro.png'" spinner-color="white" :style="`height: ${alto}; width: ${ancho}`" />
                    </q-card>
                </div>
              </q-scroll-area>
          </q-card>
          <q-card class="bordes q-my-md q-pa-md shadow-up-4" style="border-radius:10px;min-height:240px">
            <div class="text-subtitle2 q-ml-md q-pt-xs">Descripción personal:</div>
            <div class="q-pa-md">{{form.personal_description}}</div>
            <div class="text-subtitle2 q-ml-md q-pt-xs">Raza:</div>
            <div class="q-pa-md">{{form.race}}</div>
            <div class="text-subtitle2 q-ml-md q-pt-xs">Edad:</div>
            <div class="q-pa-md">{{form.age}}</div>
            <div class="text-subtitle2 q-ml-md q-pt-xs">Vacunas:</div>
            <div class="q-pa-md">{{form.vaccines}}</div>
            <div class="text-subtitle2 q-ml-md q-pt-xs">Enfermedades:</div>
            <div class="q-pa-md">{{form.diseases}}</div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      id: this.$route.params.id,
      rol: 0,
      perfile: '',
      ruta: 'mascota',
      form: {},
      infoClient: {},
      categoria: {},
      baseu: '',
      ancho: '',
      alto: ''
    }
  },
  mounted () {
    this.getDimensions()
    this.cargarMascota()
    this.baseu = env.apiUrl + 'mascota_img/'
    console.log(screen.width)
    console.log(screen.height)
  },
  methods: {
    cargarMascota () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.$api.get(`${this.ruta}/${this.id}`).then(res => {
            if (res) {
              this.form = res
              this.perfile = this.form.images[0]
              if (this.form) {
                this.$api.get('user_by_id/' + this.form.ownerId).then(v => {
                  this.infoClient = v
                })
              }
            }
          })
        }
      })
    },
    getDimensions () {
      if (screen.width > screen.height) {
        this.ancho = '6vw'
        this.alto = '9vh'
        console.log('ancho', this.ancho)
        console.log('alto', this.alto)
      } else if (screen.width === screen.height) {
        this.ancho = '10vw'
        this.alto = '10vh'
        console.log('ancho', this.ancho)
        console.log('alto', this.alto)
      } else {
        this.ancho = '16vw'
        this.alto = '7vh'
        console.log('ancho', this.ancho)
        console.log('alto', this.alto)
      }
    }
  }
}
</script>

<style scoped lang="scss">
/* .bordes {
  border-top: 6px solid $primary
} */

.dimension {
  min-width: 200px;
}
</style>

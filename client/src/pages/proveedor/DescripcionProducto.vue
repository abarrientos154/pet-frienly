<template>
  <div>
    <div class="row justify-center">
      <div class="q-pa-md col col-xs-10 col-sm-8 col-md-7 col-lg-5 col-xl-4 no-wrap q-mx-md q-my-sm">
        <q-card flat bordered class="dimension">
          <q-card-section horizontal>
            <q-card-section>
              <div class="column items-center justify-center">
                <q-avatar rounded v-for="(item, index) in botones" :key="index">
                  <q-img :src="cargarPhoto(index)" :class="item.select ? 'seleccionado':''" @click="seleccionar(index)" />
                </q-avatar>
              </div>
            </q-card-section>
            <div class="column full-width">
              <div class="q-mt-md">
                <q-img :ratio="1" style="height: 250px; max-height:550px" :src="mostrarImg">
                </q-img>
              </div>
              <q-card class="bordes q-my-md q-pa-md shadow-up-4" style="border-radius:10px;min-height:240px">
                <div class="text-subtitle2 q-ml-md q-pt-xs">Nombre del Producto:</div>
                <div class="q-pa-md">{{form.name}}</div>
                <div class="text-subtitle2 q-ml-md q-pt-xs">Descripcion:</div>
                <div class="q-pa-md">{{form.descripcion}}</div>
                <div class="text-subtitle2 q-ml-md q-pt-xs">Precio:</div>
                <div class="q-pa-md">{{form.precio}}</div>
                <div class="text-subtitle2 q-ml-md q-pt-xs">Cantidad:</div>
                <div class="q-pa-md">{{form.cantidad}}</div>
              </q-card>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      imgProducto: [],
      mostrarImg: 'noimgpro.png',
      productoFile: null,
      botones: [
        {
          file: null,
          src: '',
          select: true
        },
        {
          file: null,
          src: '',
          select: false
        },
        {
          file: null,
          src: '',
          select: false
        },
        {
          file: null,
          src: '',
          select: false
        },
        {
          file: null,
          src: '',
          select: false
        }
      ]
    }
  },
  mounted () {
    this.baseu = env.apiUrl + 'productos_img'
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.$api.get('producto/' + this.id).then(res => {
        if (res) {
          this.form = res
          this.imgsTraidas()
          // this.imgPro = env.apiUrl + '/productos_img/' + this.form.fileName
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  methods: {
    imgsTraidas () {
      console.log('imgtraidas')
      for (let i = 0; i < this.form.images.length; i++) {
        var cc = ''
        cc = this.baseu + '/' + this.form.images[i].src
        console.log(cc)
        this.botones[i].src = cc
      }
      if (this.botones[0].src !== '') {
        this.mostrarImg = this.botones[0].src
      }
    },
    cargarPhoto (ind) {
      if (this.botones[ind].src !== '') {
        return this.botones[ind].src
      } else {
        return 'noimgpro.png'
      }
    },
    seleccionar (ind) {
      console.log('select')
      const data = this.botones
      const indexSelect = data.findIndex(v => v.select)
      data[indexSelect].select = false
      data[ind].select = true
      this.botones = data
      console.log(data[ind])
      if (data[ind].src !== '') {
        this.mostrarImg = data[ind].src
      } else {
        console.log('no data')
        this.mostrarImg = 'noimgpro.png'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.button-camera {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: white;
  height:40px;
  width:40px
}
.seleccionado {
  border-radius: 5px;
  background: $grey-4;
}
.dimension {
  min-width: 200px;
}
</style>

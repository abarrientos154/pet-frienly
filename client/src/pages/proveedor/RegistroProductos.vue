<template>
  <div>
    <div class="row justify-center">
      <div class="q-pa-md col col-xs-10 col-sm-8 col-md-7 col-lg-5 col-xl-4 no-wrap q-mx-md q-my-sm">
        <q-card flat bordered class="dimension">
          <q-card-section horizontal>
            <q-card-section>
              <div v-if="imgProducto && edit" class="column items-center justify-center">
                <q-avatar rounded v-for="(item, index) in botones" :key="index">
                  <q-img :src="cargarPhoto(index)" :class="item.select ? 'seleccionado':''" @click="seleccionar(index)" />
                </q-avatar>
              </div>
              <div v-else class="column items-center justify-center">
                <q-avatar rounded v-for="(item, index) in botones" :key="index">
                  <q-img :src="cargarImagen(index)" :class="item.select ? 'seleccionado':''" @click="seleccionar(index)" />
                </q-avatar>
                <!-- <q-btn v-for="(item, index) in botones" :key="index" icon="edit" color="grey-5" :flat="!item.select" class="q-mt-xl" @click="seleccionar(index)" style="height:50px" /> -->
              </div>
            </q-card-section>
            <div class="column full-width">
              <div class="q-mt-md">
                <q-img :ratio="1" style="height: 250px; max-height:550px" :src="mostrarImg">
                  <q-file borderless v-model="productoFile" class="absolute-top-right q-ma-sm button-camera" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1">
                    <q-icon name="mode_edit" class="absolute-center" size="20px" color="black" />
                  </q-file>
                </q-img>
              </div>
              <div class="q-mx-xl q-mt-md">
                <q-input filled v-model="form.name"  label="Nombre del producto" dense :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()">
                <template v-slot:append>
                  <q-icon name="mode_edit" />
                </template>
                </q-input>
                <div class="q-mt-md">
                    <q-input prefix="$" filled label="Precio" color="primary" v-model.number="form.precio" type="number" dense :error="$v.form.precio.$error" error-message="Este campo es requerido"  @blur="$v.form.precio.$touch()" :rules="[val => val > 0]" min="0"/>
                  </div>
                <div class="q-mt-md text-h6">Descripcion</div>
                  <q-input filled outlined v-model="form.descripcion" type="textarea" :error="$v.form.descripcion.$error" error-message="Este campo es requerido"  @blur="$v.form.descripcion.$touch()"/>
                <div class=" row items-center justify-center">
                  <div class="q-mt-sm text-h6 q-pr-sm">Cantidad</div>
                  <div class="q-mt-lg">
                    <q-input v-model.number="form.cantidad" borderless class="q-pr-sm" type="number" dense :error="$v.form.cantidad.$error" error-message=""  @blur="$v.form.cantidad.$touch()" style="width: 50px" min="0"/>
                  </div>
                  <div class="q-pr-xs">
                    <q-btn class="q-mx-xs" color="grey" dense icon="add" style="height: 30px;width:30px" @click="form.cantidad++"/>
                    <q-btn color="grey" dense icon="remove" style="height: 30px;width:30px" @click="resta()"/>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row justify-center q-ma-lg">
      <q-btn color="primary" text-color="white" rounded :label="edit ? 'Actualizar' : 'Guardar'" @click="!edit ? agregar() : actualizarProducto()"/>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      imgProducto: [],
      mostrarImg: 'noimgpro.png',
      id: '',
      productoFile: null,
      edit: false,
      editImg: false,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      form: {
        cantidad: 0
      },
      file: null,
      imgPro: null,
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
  validations: {
    form: {
      name: { required, minLength: minLength(3), maxLength: maxLength(50) },
      descripcion: { required },
      cantidad: { required, minLength: minLength(1), maxLength: maxLength(20) },
      precio: { required, minLength: minLength(1) }
    },
    file: { required }
  },
  mounted () {
    this.baseu = env.apiUrl + 'productos_img'
    if (this.$route.params.id) {
      this.edit = true
      this.editImg = true
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
    console.log(this.botones)
  },
  methods: {
    async convertImg (img) {
      try {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(img)
          reader.onload = () => resolve(reader.result)
          reader.onerror = error => reject(error)
        })
      } catch (error) {
        console.log(error)
      }
    },
    imgsTraidas () {
      console.log('imgtraidas')
      for (let i = 0; i < this.form.images.length; i++) {
        var cc = ''
        cc = this.baseu + '/' + this.form.images[i].src
        console.log(cc)
        this.botones[i].src = cc
        console.log(this.botones)
        this.imgProducto.push(cc)
      }
      if (this.botones[0].src !== '') {
        this.mostrarImg = this.botones[0].src
      }
      this.editImg = true
      console.log(this.editImg)
    },
    cargarImagen (ind) {
      if (this.botones[ind].file) {
        console.log(this.botones[ind].file)
        return URL.createObjectURL(this.botones[ind].file)
      } else {
        return 'noimgpro.png'
      }
    },
    cargarPhoto (ind) {
      if (this.botones[ind].src !== '') {
        return this.botones[ind].src
      } else {
        return 'noimgpro.png'
      }
    },

    async perfil_img () {
      const indexSelect = this.botones.findIndex(v => v.select)
      // this.botones[indexSelect].file = this.productoFile
      this.botones[indexSelect] = { file: this.productoFile, src: await this.convertImg(this.productoFile), select: true }
      this.mostrarImg = URL.createObjectURL(this.productoFile)
      // this.mostrarImg = URL.createObjectURL(this.productoFile)
      this.productoFile = null
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
        if (this.edit && this.editImg) {
          console.log('edit')
          this.mostrarImg = data[ind].src
        } else {
          console.log('noedit')
          this.mostrarImg = (data[ind].src)
          // this.mostrarImg = URL.createObjectURL(data[ind].file)
        }
      } else {
        console.log('no data')
        this.mostrarImg = 'noimgpro.png'
      }
    },
    changeFile () {
      if (this.file) { this.imgPro = URL.createObjectURL(this.file) }
    },
    resta () {
      if (this.form.cantidad > 0) {
        this.form.cantidad = this.form.cantidad - 1
      }
    },
    async agregar () {
      console.log('guardar')
      this.$v.$touch()
      if (!this.$v.form.$error && this.form.cantidad > 0) {
        this.$q.loading.show({
          message: 'Subiendo Producto, Por Favor Espere...'
        })
        var formData = new FormData()
        var cantidadArchivos = 0
        for (const j in this.botones) {
          if (this.botones[j].file) {
            cantidadArchivos++
            formData.append('files_' + cantidadArchivos, this.botones[j].file)
          }
        }
        this.form.cantidadArchivos = cantidadArchivos
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('producto', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.notify({
            message: 'Producto agregado con exito',
            color: 'primary'
          })
          this.$q.loading.hide()
          this.$router.push('/productos')
        })
      }
    },
    async actualizarProducto () {
      console.log(this.botones)
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Actualizando Producto, Por Favor Espere...'
        })
        var formData = new FormData()
        /* if (this.file) {
          this.form.buscar_file = true
          formData.append('files', this.file)
        } else {
          this.form.buscar_file = false
        } */
        var cantidadArchivos = 0
        var index = []
        for (var j in this.botones) {
          if (this.botones[j].file !== null) {
            index.push(j)
            // this.botones[j].file.index = j
            console.log(j)
            cantidadArchivos++
            formData.append('files_' + cantidadArchivos, this.botones[j].file)
          }
          /* if (this.botones[j].file) {
            console.log(j)
            cantidadArchivos++
            formData.append('files_' + cantidadArchivos, this.botones[j].file)
          } */
        }
        this.form.index = index
        this.form.cantidadArchivos = cantidadArchivos
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.put('producto/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.notify({
            message: 'Producto agregado con exito',
            color: 'primary'
          })
          this.$q.loading.hide()
          this.$router.push('/productos')
        })
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

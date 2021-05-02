<template>
  <div class="column justify-between">
    <div class="q-pa-md row">
      <div v-if="imgProducto && edit" class="q-mr-md col-2 column items-center">
        <q-avatar rounded v-for="(item, index) in botones" :key="index" :class="item.select ? 'seleccionado q-mb-sm':'bg-orange-1 q-mb-sm'" @click="seleccionar(index)" style="height: 75px; width: 100%; border-radius: 15px;">
          <q-img style="height: 100%;" :src="cargarPhoto(index)"/>
          <q-icon :name="item.src ? 'mode_edit' : 'add'" class="absolute-center" size="30px" color="black" />
        </q-avatar>
      </div>

      <div v-else class="q-mr-md col-2 column items-center">
        <q-avatar rounded v-for="(item, index) in botones" :key="index" :class="item.select ? 'seleccionado q-mb-sm':'bg-orange-1 q-mb-sm'" @click="seleccionar(index)" style="height: 75px; width: 100%; border-radius: 15px;">
          <q-img style="height: 100%;" :src="cargarImagen(index)"/>
          <q-icon :name="item.file ? 'mode_edit' : 'add'" class="absolute-center" size="30px" color="black" />
        </q-avatar>
      </div>

      <div class="col column items-center">
        <q-avatar rounded style="height: 350px; width: 100%; border-radius: 15px;" :class="mostrarImg !=  null ? 'q-mb-md':'bg-secondary q-mb-md'">
          <q-img style="height: 100%;" :src="mostrarImg !=  null ? mostrarImg : ''">
            <q-file borderless v-model="productoFile" class="q-ma-sm button-camera" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%;"/>
            <q-icon :name="mostrarImg !=  null ? 'mode_edit' : 'add_a_photo'" class="absolute-top-right q-ma-sm" size="30px" color="black" />
          </q-img>
        </q-avatar>

        <div class="column full-width">
          <div v-if="edit && editNameCant === false" class="row">
            <div class="text-h6">{{form.name}}</div>
            <div>
              <q-btn round flat dense class="q-mr-xs" icon="mode_edit" style="height: 30px;width:30px" @click="editNameCant = !editNameCant"/>
            </div>
          </div>
          <div v-if="edit && editNameCant === false" class="text-grey q-mb-lg">Disponible - {{form.cantidad}} Unidades</div>
          <q-input filled v-if="editNameCant || edit === false" v-model="form.name"  label="Nombre del producto" dense :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()">
            <template v-slot:append>
              <q-icon name="mode_edit" />
            </template>
          </q-input>

          <div v-if="edit && editprecio === false" class="row q-mb-lg">
            <div class="text-h4 text-primary">$ {{form.precio}}</div>
            <div>
              <q-btn round flat dense class="q-mr-xs" icon="mode_edit" style="height: 30px;width:30px" @click="editprecio = !editprecio"/>
            </div>
          </div>
          <q-input v-if="editprecio || edit === false" prefix="$" filled label="Precio" color="primary" v-model.number="form.precio" type="number" dense :error="$v.form.precio.$error" error-message="Este campo es requerido"  @blur="$v.form.precio.$touch()" :rules="[val => val > 0]" min="0"/>

          <div class="row justify-between">
            <div class="text-h6">Descripcion</div>
            <div v-if="edit && editdescripcion === false">
              <q-btn round flat dense class="q-mr-xs" icon="mode_edit" style="height: 30px;width:30px" @click="editdescripcion = !editdescripcion"/>
            </div>
          </div>
          <div v-if="edit && editdescripcion === false" class="text-grey">{{form.descripcion}}</div>
          <q-input filled outlined v-if="editdescripcion || edit === false" v-model="form.descripcion" type="textarea" :error="$v.form.descripcion.$error" error-message="Este campo es requerido"  @blur="$v.form.descripcion.$touch()"/>

          <div v-if="editNameCant || edit === false" class="row items-center justify-center">
            <div class="q-mr-xs text-h6 q-pr-sm">Cantidad</div>
            <div class="q-mr-xs q-mt-lg">
              <q-input v-model.number="form.cantidad" borderless class="q-pr-sm" type="number" dense :error="$v.form.cantidad.$error" error-message=""  @blur="$v.form.cantidad.$touch()" style="width: 50px" min="0"/>
            </div>
            <div class="q-pr-xs">
              <q-btn round flat dense class="q-mr-xs" color="primary" icon="add" style="height: 30px;width:30px" @click="form.cantidad++"/>
              <q-btn round flat dense class="q-mr-xs" color="primary" icon="remove" style="height: 30px;width:30px" @click="resta()"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-center q-ma-md">
      <q-btn class="full-width" color="primary" text-color="white" rounded :label="edit ? 'Actualizar' : 'Guardar'" @click="!edit ? agregar() : actualizarProducto()" no-caps/>
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
      mostrarImg: null,
      id: '',
      productoFile: null,
      edit: false,
      editNameCant: false,
      editprecio: false,
      editdescripcion: false,
      editImg: false,
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
      }
    },
    cargarPhoto (ind) {
      if (this.botones[ind].src !== '') {
        return this.botones[ind].src
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
        this.mostrarImg = null
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
  border-radius: 15px;
  background: $grey-5;
}
.dimension {
  min-width: 200px;
}
</style>

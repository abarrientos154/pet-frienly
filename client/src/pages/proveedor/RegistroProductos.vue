<template>
  <div class="q-pa-md">
    <q-card flat bordered>
      <q-card-section horizontal>
        <q-card-section>
          <div class="column items-center justify-center">
            <q-btn v-for="(item, index) in botones" :key="index" icon="edit" color="grey-5" :flat="!item.select" class="q-mt-xl" @click="seleccionar(index)" style="height:50px" />
          </div>
        </q-card-section>
        <div class="column full-width">
          <q-img style="height: 250px;" class="col" :src="mostrarImg">
            <q-file borderless v-model="productoFile" class="absolute-top-right q-ma-sm button-camera" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1">
              <q-icon name="mode_edit" class="absolute-center" size="20px" color="white" />
            </q-file>
          </q-img>
          <div class="q-mt-lg text-h6">Nombre del producto</div>
          <q-input filled v-model="form.name"  label="Nombre del producto" dense :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()">
           <template v-slot:append>
            <q-icon name="mode_edit" />
          </template>
          </q-input>
          <div class="q-mt-md">
              <q-input filled label="$0.00" color="primary" v-model.number="form.precio" type="number" dense :error="$v.form.precio.$error" error-message="Este campo es requerido"  @blur="$v.form.precio.$touch()"/>
            </div>
          <div class="q-mt-md text-h6">Descripcion</div>
            <q-input filled outlined v-model="form.descripcion" type="textarea" :error="$v.form.descripcion.$error" error-message="Este campo es requerido"  @blur="$v.form.descripcion.$touch()"/>
            <div class=" row">
        <div class="q-mt-sm text-h6 q-pr-sm">Cantidad</div>
        <q-input v-model.number="form.cantidad" class="q-pr-sm" type="number" dense :error="$v.form.cantidad.$error" error-message=""  @blur="$v.form.cantidad.$touch()" style="width: 60px"/>
          <div class="q-pr-xs">
          <q-btn color="grey" icon="add" style="height: 40px;width:40px" @click="form.cantidad++"/>
          <q-btn color="grey" icon="remove" style="height: 40px;width:40px" @click="resta()"/>
          </div>
      </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="row justify-center q-ma-lg">
      <q-btn color="primary" text-color="white" rounded class="full-width" label="Guardar" @click="agregar()"/>
    </div>
  </div>
</template>

<script></script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      mostrarImg: 'noimgpro.png',
      id: '',
      productoFile: null,
      edit: false,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      form: {
        cantidad: 0
      },
      file: null,
      imgPro: null,
      botones: [
        {
          file: null,
          select: true
        },
        {
          file: null,
          select: false
        },
        {
          file: null,
          select: false
        },
        {
          file: null,
          select: false
        },
        {
          file: null,
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
    if (this.$route.params.id) {
      this.edit = true
      this.id = this.$route.params.id
      this.$api.get('producto/' + this.id).then(res => {
        if (res) {
          this.form = res
          this.imgPro = env.apiUrl + '/productos_img/' + this.form.fileName
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  methods: {
    perfil_img () {
      const indexSelect = this.botones.findIndex(v => v.select)
      this.botones[indexSelect].file = this.productoFile
      this.mostrarImg = URL.createObjectURL(this.productoFile)
      this.productoFile = null
    },
    seleccionar (ind) {
      const data = this.botones
      const indexSelect = data.findIndex(v => v.select)
      data[indexSelect].select = false
      data[ind].select = true
      this.botones = data
      if (data[ind].file) {
        this.mostrarImg = URL.createObjectURL(data[ind].file)
      } else {
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

          // this.$router.push('/productos')
        })
      }
    },
    async actualizarProducto () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Actualizando Producto, Por Favor Espere...'
        })
        var formData = new FormData()
        if (this.file) {
          this.form.buscar_file = true
          formData.append('files', this.file)
        } else {
          this.form.buscar_file = false
        }
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.put('producto/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
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
</style>

<template>
  <div class="q-pa-md">
    <div class="q-mt-sm q-mb-sm text-subtitle2 q-pl-sm">{{edit ? 'Modificar Producto' : 'Nuevo Producto'}}</div>
    <q-input rounded outlined bg-color="yellow-2" v-model="form.name" label="Nombre" dense :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()"/>
    <div class="q-mt-lg q-mb-sm text-subtitle2 q-pl-sm">Categoria</div>
    <div class="row justify-around">
      <q-btn v-for="(item, index) in categorias" push :color="item.select === false ? 'white' : 'primary'" :text-color="item.select === false ? 'black' : 'white'" round :icon="item.icons" class="q-mt-sm q-mr-sm q-ml-sm" :key="index" @click="seleccionarcategoria(item)" />
    </div>
    <div class="q-mt-lg q-mb-sm text-subtitle2 q-pl-sm">Descripcion</div>
      <q-input rounded outlined bg-color="yellow-2" v-model="form.description" type="textarea" :error="$v.form.description.$error" error-message="Este campo es requerido"  @blur="$v.form.description.$touch()"/>
    <div class="row">
      <div class="q-mt-lg q-ml-sm q-mb-sm text-subtitle2">Cantidad</div>
      <div class="q-mt-md q-ml-xl q-mb-sm">
        <q-input bg-color="primary" v-model.number="form.cantidad" type="number" dense :error="$v.form.cantidad.$error" error-message="Este campo es requerido"  @blur="$v.form.cantidad.$touch()"/>
      </div>
    </div>
    <div class="row items-center">
      <div class="q-mt-lg q-ml-sm q-mb-sm text-subtitle2">Agregar Foto</div>
      <div class="q-ml-md q-mt-lg row">
        <q-file label="Click aqui" hint="Opcional" dense class="q-pa-sm" bg-color="yellow-2" style="width:200px" v-model="file" accept=".jpg, image/*" @input="changeFile" :error="$v.file.$error" error-message="Este campo es requerido"  @blur="$v.file.$touch()" >
          <template v-slot:before>
            <q-avatar size="60px" square>
              <q-img :src="imgPro ? imgPro : 'noimgpro.png'" />
            </q-avatar>
          </template>
        </q-file>
      </div>
    </div>
    <div class="row justify-center q-ma-lg">
      <q-btn color="primary" text-color="white" :label="edit ? 'Actualizar Producto' : 'Agregar Producto'" @click="!edit ? agregar() : actualizarProducto()"/>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      id: '',
      edit: false,
      form: {},
      categorias: [],
      categoria_id: '',
      file: null,
      imgPro: null
    }
  },
  validations: {
    form: {
      name: { required, minLength: minLength(3), maxLength: maxLength(50) },
      description: { required },
      cantidad: { required, minLength: minLength(1), maxLength: maxLength(20) }
    },
    categoria_id: { required },
    file: { required }
  },
  mounted () {
    this.obtenerDatos()
    if (this.$route.params.id) {
      this.edit = true
      this.id = this.$route.params.id
      this.$api.get('producto/' + this.id).then(res => {
        if (res) {
          this.form = res
          this.categoria_id = this.form.categoria_id
          for (let i = 0; i < this.categorias.length; i++) {
            if (this.categorias[i]._id === this.form.categoria_id) {
              this.categorias[i].select = true
            } else {
              this.categorias[i].select = false
            }
          }
          this.imgPro = env.apiUrl + '/productos_img/' + this.form.fileName
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  methods: {
    changeFile () {
      if (this.file) { this.imgPro = URL.createObjectURL(this.file) }
    },
    async agregar () {
      this.$v.$touch()
      if (this.$v.categoria_id.$error && !this.$v.form.$error && !this.$v.file.$error) {
        this.$q.notify({
          message: 'Debes seleccionar una categoria',
          color: 'red'
        })
      }
      if (!this.$v.categoria_id.$error && !this.$v.form.$error && !this.$v.file.$error) {
        this.form.categoria_id = this.categoria_id
        this.$q.loading.show({
          message: 'Subiendo Producto, Por Favor Espere...'
        })
        var formData = new FormData()
        formData.append('files', this.file)
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('producto', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.loading.hide()
          this.$router.push('/productos')
        })
      }
    },
    async actualizarProducto () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.form.categoria_id = this.categoria_id
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
    },
    obtenerDatos () {
      this.$api.get('categoria').then(res => {
        if (res) {
          var categoria = res
          this.categorias = categoria.map(v => {
            return {
              _id: v._id,
              icons: v.icons,
              select: false
            }
          })
        }
      })
    },
    seleccionarcategoria (item) {
      this.categoria_id = item._id
      for (let i = 0; i < this.categorias.length; i++) {
        if (this.categorias[i]._id === this.categoria_id) {
          this.categorias[i].select = true
        } else {
          this.categorias[i].select = false
        }
      }
    }
  }
}
</script>

<style lang="scss">
.button-camera {
  border-radius: 12px;
  border: 2px solid $secondary;
  width: 100px;
  height: 50px;
  background-color: $primary;
  font-size: 0px;
}
</style>

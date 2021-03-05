<template>
  <div class="q-pa-md">
    <div class="q-mt-sm q-mb-sm text-subtitle2 q-pl-sm">{{edit ? 'Modificar Hospedaje' : 'Nuevo Hospedaje'}}</div>
    <q-input rounded outlined bg-color="yellow-2" v-model="form.name" label="Nombre" dense :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()"/>
    <div class="q-mt-lg q-mb-sm text-subtitle2 q-pl-sm">Descripcion</div>
    <q-input rounded outlined bg-color="yellow-2" v-model="form.description" type="textarea" :error="$v.form.description.$error" error-message="Este campo es requerido"  @blur="$v.form.description.$touch()"/>
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
// import env from '../../env'
export default {
  data () {
    return {
      id: '',
      edit: false,
      form: {},
      file: null,
      imgPro: null
    }
  },
  validations: {
    form: {
      name: { required, minLength: minLength(3), maxLength: maxLength(50) },
      description: { required }
    },
    file: { required }
  },
  mounted () {
    if (this.$route.params.id) {
      this.edit = true
      this.id = this.$route.params.id
      this.$api.get('hospedaje/' + this.id).then(res => {
        if (res) {
          this.form = res
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
      if (!this.$v.form.$error && !this.$v.file.$error) {
        this.$q.loading.show({
          message: 'Subiendo Hospedaje, Por Favor Espere...'
        })
        var formData = new FormData()
        formData.append('files', this.file)
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('hospedaje', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.loading.hide()
          this.$router.push('/hospedaje')
        })
      }
    },
    async actualizarProducto () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Actualizando Hospedaje, Por Favor Espere...'
        })
        var formData = new FormData()
        if (this.file) {
          this.form.buscar_file = true
          formData.append('files', this.file)
        } else {
          this.form.buscar_file = false
        }
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.put('hospedaje/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.loading.hide()
          this.$router.push('/hospedaje')
        })
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

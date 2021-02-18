<template>
  <div>
    <div class="row justify-center">
      <div class="text-h6 q-ma-md text-center" style="background-color: #fff599; width: 250px; border-radius: 12px">{{edit ? 'Modificar Categoria' : 'Nueva Categoria'}}</div>
    </div>
    <q-card class="q-mx-xl q-ma-md justify-center" style=" border-left: 6px solid $primary; background-color: rgba(202, 202, 202, 0.474); border-radius: 12px;">
      <div class="q-px-md q-py-md column">
        <div class="row col-2 justify-center">
          <q-avatar size="125px" font-size="90px" color="amber-5" :icon="form.icons ? form.icons : 'add_circle_outline'" class="q-mb-md text-black" @blur="$v.form.icons.$touch()"/>
        </div>
        <q-select rounded outlined class="q-mb-md" v-model="form.icons" label="Icono" dense :options="['lightbulb','article','format_paint','local_shipping','settings','build','support_agent']" error-message="Escoja un Icono" :error="$v.form.icons.$error" @blur="$v.form.icons.$touch()"/>
        <q-input rounded outlined class="q-mb-md" bg-color="yellow-2" v-model="form.name" label="Nombre" dense :error="$v.form.name.$error" error-message="Este campo es requerido" @blur="$v.form.name.$touch()"/>
        <q-btn color="amber" glossy :label="edit ? 'Actualizar' : 'Agregar'" @click="!edit ? agregar() : actualizar()"/>
      </div>
    </q-card>
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
      icons: null,
      form: {}
    }
  },
  validations: {
    form: {
      icons: { required },
      name: { required, minLength: minLength(3), maxLength: maxLength(50) }
    },
    categorias: { required }
  },
  mounted () {
    this.obtenerDatos(this.$route.params.id)
    if (this.$route.params.id) {
      this.edit = true
      this.id = this.$route.params.id
    }
  },
  methods: {
    obtenerDatos (id) {
      this.$api.get('getCategoriaById/' + id).then(res => {
        if (res) {
          this.form = res
        }
      })
    },
    async agregar () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.form.categorias = this.categorias
        this.$q.loading.show({
          message: 'Subiendo Categoria, Por Favor Espere...'
        })
        var formData = new FormData()
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('newCategoria', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.loading.hide()
          this.$router.push('/categorias')
        })
      }
    },
    async actualizar () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.form.categorias = this.categorias
        this.$q.loading.show({
          message: 'Actualizando Categoria, Por Favor Espere...'
        })
        var formData = new FormData()
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.put('updateCategoria/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.loading.hide()
          this.$router.push('/categorias')
        })
      }
    }
  }
}
</script>

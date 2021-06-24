<template>
  <div class="q-pa-lg">
    <div class="q-pa-md">
      <div class="text-subtitle1">Carga las fotos de tu producto</div>
      <div class="text-caption text-grey-10 text-italic">Puedes cargar hasta 3 fotos</div>
      <div class="row">
        <q-avatar rounded style="height: 100px; width: 100px; border-radius: 15px;" class="bg-grey q-my-xs q-mr-xs">
          <q-file  borderless :disable="imgs.length < 3 ? false : true" v-model="img" class="button-camera" @input="producto_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%;"/>
          <q-icon name="backup" class="absolute-center" size="50px" color="white" />
        </q-avatar>
        <q-scroll-area horizontal class="col" style="height: 110px;">
          <div class="row no-wrap" style="width: 100%;">
            <q-avatar class="q-ma-xs" rounded v-for="(item, index) in mostrarImg" :key="index" style="height: 100px; width: 100px; border-radius: 15px;">
              <q-img style="height: 100%;" :src="item"/>
            </q-avatar>
          </div>
        </q-scroll-area>
      </div>
      <div v-if="$v.imgs.$error" class="text-red">Debes cargar por lo menos 1 imagen</div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <div class="text-subtitle1 text-bold">Escoje el nombre de tu producto</div>
        <div class="text-caption text-grey-10 text-italic">Solo 25 caracteres</div>
        <q-input dense maxlength="30" filled v-model="form.name" placeholder="Nombre espacio" error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <div class="text-subtitle1 text-bold">¿Para quien estará disponible tu producto?</div>
        <div class="text-caption text-grey-10 text-italic">Escoge perro, gato o ambos</div>
        <q-select filled dense color="black" v-model="form.destinatario" :options="mascotas" label="Selecciona el tipo de mascota" map-options
          error-message="requerido" :error="$v.form.destinatario.$error" @blur="$v.form.destinatario.$touch()"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey text-italic">No hay Resultados</q-item-section>
              </q-item>
            </template>
        </q-select>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <div class="text-subtitle1 text-bold">Selecciona la categoria</div>
        <q-select filled dense color="black" v-model="categoria" :options="categorias" map-options
          error-message="requerido" :error="$v.categoria.$error" @blur="$v.categoria.$touch()"
          option-label="name" >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey text-italic">No hay Resultados</q-item-section>
              </q-item>
            </template>
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section>
                  <q-item-label v-html="scope.opt.name" />
                </q-item-section>
              </q-item>
            </template>
        </q-select>
      </div>
    </div>

    <div>
      <div class="text-subtitle1 text-bold">Descripción del producto</div>
      <div class="text-caption text-grey-10 text-italic">Solo 80 caracteres</div>
      <q-input maxlength="90" filled outlined placeholder="Mi producto hace..." v-model="form.description" type="textarea" error-message="Este campo es requerido" :error="$v.form.description.$error" @blur="$v.form.description.$touch()"/>
    </div>

    <div>
      <div class="row items-center">
        <div class="text-subtitle1 text-bold col">Precio</div>
        <div class=" col column">
          <q-input prefix="$" filled color="primary" v-model.number="form.price" type="number" dense :rules="[val => val > 0]" min="0" error-message="Este campo es requerido" :error="$v.form.price.$error" @blur="$v.form.price.$touch()"/>
        </div>
      </div>
      <div class="row items-center">
        <div class="text-subtitle1 text-bold col">Control Stock</div>
        <div class=" col column">
          <div class="text-caption text-grey-10 text-italic">Cantidad de productos</div>
          <q-input filled color="primary" v-model.number="form.cantidad" type="number" dense :rules="[val => val > 0]" min="0" error-message="Este campo es requerido" :error="$v.form.cantidad.$error" @blur="$v.form.cantidad.$touch()"/>
        </div>
      </div>
      <!-- <div class="row items-center">
        <div class="text-subtitle1 text-bold col">Precio oferta</div>
        <div class=" col column">
          <div class="text-subtitle1 text-grey text-italic" style="font-size: 11px">Cantidad de metros cuadrados</div>
          <q-input filled color="primary" v-model.number="form.dimensions" type="number" dense :rules="[val => val > 0]" min="0" error-message="Este campo es requerido" :error="$v.form.dimensions.$error" @blur="$v.form.dimensions.$touch()"/>
        </div>
      </div> -->
    </div>
    <div class="column items-center q-mt-xl">
      <q-btn color="primary" class="q-pa-xs" label="Crear producto" style="width: 60%; border-radius: 4px" @click="!edit ? guardar() : actualizar()" no-caps/>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      img: null,
      categoria: null,
      edit: false,
      baseu: '',
      id: '',
      form: {},
      imgs: [],
      mostrarImg: [],
      categorias: [],
      mascotas: ['Perros', 'Gatos', 'Ambos']
    }
  },
  validations: {
    form: {
      name: { required },
      destinatario: { required },
      description: { required },
      price: { required },
      cantidad: { required },
      oferta_price: { required },
      fecha_termino: { required },
      hora_termino: { required }
    },
    categoria: { required },
    imgs: { required, minLength: minLength(1) }
  },
  mounted () {
    this.baseu = env.apiUrl + 'hospedajes_img'
    if (this.$route.params.id) {
      this.edit = true
      this.id = this.$route.params.id
      this.$api.get('producto/' + this.id).then(res => {
        if (res) {
          this.form = res
          this.categoria = res.categoria
        }
      }).catch(error => {
        console.log(error)
      })
    }
    /* this.getCategorias() */
  },
  methods: {
    getCategorias () {
      this.$api.get('categorias').then(res => {
        if (res) {
          this.categirias = res
        }
      })
    },
    producto_img () {
      this.imgs.push(this.img)
      this.mostrarImg.push(URL.createObjectURL(this.img))
      this.img = null
    },
    guardar () {
      this.$v.$touch()
      console.log(this.form)
      if (!this.$v.imgs.$error && !this.$v.form.$error) {
        console.log('sin fallo')
        this.$q.loading.show({
          message: 'Subiendo Espacio de Descanso, Por Favor Espere...'
        })
        var formData = new FormData()
        var cantidadArchivos = this.imgs.length
        for (const j in this.imgs) {
          formData.append('files_' + j, this.imgs[j])
        }
        this.form.cantidadArchivos = cantidadArchivos
        formData.append('dat', JSON.stringify(this.form))
        this.$api.post('hospedaje', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          if (res) {
            this.$q.notify({
              message: 'Espacio de Descanso agregado con exito',
              color: 'positive'
            })
            this.$router.push('/inicio_hospedador')
          }
          this.$q.loading.hide()
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
      }
    },
    async actualizar () {
      this.$v.servicio.$touch()
      this.$v.form.$touch()
      if (!this.$v.servicio.$error && !this.$v.form.$error) {
        this.form.servicio_id = this.servicio._id
        this.$q.loading.show({
          message: 'Actualizando servicio, por favor espere...'
        })
        var formData = new FormData()
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.put('edit_servicio/' + this.id, this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Servicio actualizado correctamente',
              positive: 'positive'
            })
            this.$q.loading.hide()
            this.$router.go(-1)
          } else {
            this.$q.loading.hide()
          }
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos requeridos',
          color: 'negative'
        })
      }
    }
  }
}
</script>

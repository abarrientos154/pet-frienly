<template>
<q-layout view="lHh Lpr lFf">
  <q-header elevated class="bg-primary row items-center" style="width:100%; height:60px">
    <div class="col-1">
      <q-btn flat round color="white" icon="arrow_back" @click="$router.go(-1)"/>
    </div>
    <div class="col-10 text-white text-subtitle1 text-center">{{edit ? 'Editar producto' : 'Nuevo producto'}}</div>
  </q-header>

  <div class="q-px-lg q-py-lg q-mt-xl">
    <div class="q-px-md">
      <div class="text-subtitle1">Carga las fotos de tu producto</div>
      <div class="text-caption text-grey-10 text-italic">Puedes cargar hasta 3 fotos</div>
      <div class="row">
        <q-avatar rounded style="height: 100px; width: 100px; border-radius: 15px;" class="bg-grey q-my-xs q-mr-xs">
          <q-file  borderless :disable="imgs.length < 3 ? false : true" v-model="img" @input="!edit ? producto_img() : add_img()" accept=".jpg, image/*" style="font-size: 0px; width: 100%; height: 100%;"/>
          <q-icon name="backup" class="absolute-center" size="50px" color="white" />
        </q-avatar>
        <q-scroll-area horizontal class="col" style="height: 110px;">
          <div class="row no-wrap" style="width: 100%;">
            <q-avatar class="q-ma-xs" rounded v-for="(item, index) in mostrarImg" :key="index" style="height: 100px; width: 100px; border-radius: 15px;">
              <q-img style="height: 100%;" :src="item">
                <q-btn @click="!edit ? borrarImg(index, 1) : eliminarImg(imgs[index])" flat class="absolute all-pointer-events" size="15px" dense icon="clear" color="negative" style="top: 0px; right: 0px" rounded />
              </q-img>
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
        <q-input dense maxlength="30" filled v-model="form.name" placeholder="Mi nombre de producto" error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
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
      <q-input maxlength="90" filled outlined placeholder="Mi producto hace..." v-model="form.descripcion" type="textarea" error-message="Este campo es requerido" :error="$v.form.descripcion.$error" @blur="$v.form.descripcion.$touch()"/>
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
      <q-checkbox v-model="form.oferta" size="xs" label="Oferta" />
      <div v-if="form.oferta" class="row items-start q-mt-md">
        <div class="text-subtitle1 text-bold col q-mt-lg">Precio oferta</div>
        <div class=" col column">
          <div class="text-caption text-grey-10 text-italic">Introduce el precio oferta</div>
          <q-input prefix="$" filled dense color="primary" v-model.number="form.oferta_price" type="number" error-message="Este campo es requerido" :error="$v.form.oferta_price.$error" @blur="$v.form.oferta_price.$touch()"/>
          <div class="text-caption text-grey-10 text-italic">Fecha de término</div>
          <q-input filled dense color="primary" v-model="form.fecha_termino" type="date" error-message="Este campo es requerido" :error="$v.form.fecha_termino.$error" @blur="$v.form.fecha_termino.$touch()"/>
        </div>
      </div>
    </div>
    <div class="column items-center q-mt-xl">
      <q-btn color="primary" class="q-pa-xs" :label="!edit ? 'Crear producto' : 'Guardar cambios'" style="width: 60%; border-radius: 4px" @click="!edit ? guardar() : actualizar()" no-caps/>
    </div>
  </div>
</q-layout>
</template>

<script>
import { required, minLength, requiredIf } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      img: null,
      categoria: null,
      edit: false,
      baseu: '',
      id: '',
      form: {
        oferta: false
      },
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
      descripcion: { required },
      price: { required },
      cantidad: { required },
      oferta_price: { required: requiredIf(function () { return this.form.oferta }) },
      fecha_termino: { required: requiredIf(function () { return this.form.oferta }) }
    },
    categoria: { required },
    imgs: { required, minLength: minLength(1) }
  },
  mounted () {
    this.baseu = env.apiUrl + 'productos_img/'
    if (this.$route.params.id) {
      this.edit = true
      this.id = this.$route.params.id
      this.getProducto(this.id)
    }
    this.getCategorias()
  },
  methods: {
    getProducto (id) {
      this.$api.get('producto/' + id).then(res => {
        if (res) {
          this.form = res
          console.log(res)
          this.categoria = res.categoria
          this.imgs = res.images
          this.mostrarImg = []
          for (let i = 0; i < this.imgs.length; i++) {
            this.mostrarImg.push(this.baseu + this.imgs[i])
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getCategorias () {
      this.$api.get('categorias').then(res => {
        if (res) {
          this.categorias = res
        }
      })
    },
    guardar () {
      this.$v.$touch()
      if (!this.$v.imgs.$error && !this.$v.form.$error && !this.$v.categoria.$error) {
        this.$q.loading.show({
          message: 'Agregando producto, Por Favor Espere...'
        })
        var formData = new FormData()
        var cantidadArchivos = this.imgs.length
        for (let i = 0; i < cantidadArchivos; i++) {
          formData.append('files_' + i, this.imgs[i])
        }
        this.form.cantidadArchivos = cantidadArchivos
        this.form.categoria_id = this.categoria._id
        formData.append('dat', JSON.stringify(this.form))
        this.$api.post('producto', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          if (res) {
            this.$q.notify({
              message: 'Producto agregado con exito',
              color: 'positive'
            })
            this.$q.loading.hide()
            this.$router.go(-1)
          }
          this.$q.loading.hide()
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos requeridos',
          color: 'negative'
        })
      }
    },
    async actualizar () {
      this.$v.categoria.$touch()
      this.$v.form.$touch()
      if (!this.$v.categoria.$error && !this.$v.form.$error) {
        this.form.categoria_id = this.categoria._id
        this.$q.loading.show({
          message: 'Actualizando producto, por favor espere...'
        })
        await this.$api.put('producto/' + this.id, this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Producto actualizado correctamente',
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
    },
    producto_img () {
      this.imgs.push(this.img)
      this.mostrarImg.push(URL.createObjectURL(this.img))
      this.img = null
    },
    async add_img () {
      this.$q.loading.show()
      if (this.img) {
        var formData = new FormData()
        formData.append('files', this.img)
        await this.$api.post('subir_archivo_producto/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.imgs = res.images
          this.mostrarImg = []
          for (let i = 0; i < this.imgs.length; i++) {
            this.mostrarImg.push(this.baseu + this.imgs[i])
          }
          this.$q.loading.hide()
        })
      }
    },
    borrarImg (index, val) {
      this.imgs.splice(index, val)
      this.mostrarImg.splice(index, val)
    },
    eliminarImg (nameFile) {
      if (this.imgs.length > 1) {
        this.$q.dialog({
          title: 'Confirma',
          message: '¿Seguro desea eliminar esta imagen?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$q.loading.show({
            message: 'Eliminando imagen'
          })
          this.$api.delete('eliminar_archivo_producto/' + nameFile + '/' + this.id).then(res => {
            if (res) {
              this.imgs = res.images
              this.mostrarImg = []
              for (let i = 0; i < this.imgs.length; i++) {
                this.mostrarImg.push(this.baseu + this.imgs[i])
              }
              this.$q.loading.hide()
            }
          })
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        })
      } else {
        this.$q.dialog({
          title: '¡Atención!',
          message: 'Debes tener por lo menos 1 imagen del producto',
          cancel: false,
          persistent: false
        }).onOk(() => {})
      }
    }
  }
}
</script>

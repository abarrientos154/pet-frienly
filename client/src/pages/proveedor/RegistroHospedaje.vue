<template>
  <div>
    <div class="column items-center">
      <q-img class="bg-secondary q-mb-md" :src="mostrarImg !=  null ? mostrarImg : ''" style="width: 100%; height: 300px;">
        <q-file borderless v-model="hospedajeFile" class="q-ma-sm button-camera" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%;"/>
        <q-icon :name="mostrarImg !=  null ? 'mode_edit' : 'add_a_photo'" class="absolute-top-right q-ma-sm" size="30px" color="black" />
      </q-img>
      <div class="q-mb-md text-h5">{{edit ? 'Actualizar' : 'Nuevo'}} espacio de descanso</div>
      <div style="width: 70%">
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md q-px-xs">
            <div class="q-mb-xs text-black text-caption">Nombre del espacio</div>
            <q-input filled v-model="form.name" dense :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()"/>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md q-px-xs">
            <div class="q-mb-xs text-black text-caption">Cantidad de mascotas</div>
            <q-input filled v-model.number="form.pet_num" type="number" dense :error="$v.form.pet_num.$error" error-message="Este campo es requerido"  @blur="$v.form.pet_num.$touch()" lazy-rules :rules="[ val => val > 0 && val <= 1000 ]"/>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md q-px-xs">
            <div class="q-mb-xs text-black text-caption">Tipos de mascotas que recibe</div>
            <q-input filled v-model="form.pet_type" dense :error="$v.form.pet_type.$error" error-message="Este campo es requerido"  @blur="$v.form.pet_type.$touch()"/>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md q-px-xs">
            <div class="q-mb-xs text-black text-caption">Metros cuadrados</div>
            <q-input filled v-model.number="form.dimensions" type="number" dense :error="$v.form.dimensions.$error" error-message="Este campo es requerido"  @blur="$v.form.dimensions.$touch()"/>
          </div>
        </div>
        <div>
          <div class="col q-mb-md q-px-xs">
            <div class="q-mb-xs text-black text-caption">Tipos de habitaciones</div>
            <q-select dense outlined filled option-value="_id" option-label="name" v-model="tiposHabtSelect" :options="tiposHabt" multiple emit-value map-options error-message="Este campo es requerido" :error="$v.tiposHabtSelect.$error" @blur="$v.tiposHabtSelect.$touch()">
              <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                <q-item v-bind="itemProps" v-on="itemEvents">
                  <q-item-section>
                    <q-item-label v-html="opt.name" ></q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-checkbox :value="selected" @input="toggleOption(opt)" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col q-mb-md q-px-xs">
            <div class="q-mb-xs text-black text-caption">Descripción</div>
            <q-input filled outlined v-model="form.description" type="textarea" :error="$v.form.description.$error" error-message="Este campo es requerido"  @blur="$v.form.description.$touch()"/>
          </div>
          <div class="col q-mb-md q-px-xs">
            <div class="q-mb-xs text-black text-caption">Valor por noche</div>
            <q-input prefix="$" filled color="primary" v-model.number="form.price" type="number" dense :error="$v.form.price.$error" error-message="Este campo es requerido"  @blur="$v.form.price.$touch()" :rules="[val => val > 0]" min="0"/>
          </div>
        </div>
      </div>
      <q-scroll-area horizontal class="q-mb-md" :thumb-style="thumbStyle" style="height: 100px; width: 100%;" ref="first">
        <div v-if="imgHospedaje && edit" class="row no-wrap" style="width: 100%">
          <q-avatar rounded v-for="(item, index) in botones" :key="index" :class="item.select ? 'seleccionado q-mx-sm':'bg-orange-1 q-mx-sm'" @click="seleccionar(index)" style="height: 80px; width: 80px; border-radius: 15px;">
            <q-img style="height: 100%;" :src="cargarPhoto(index)"/>
            <q-icon :name="item.src ? 'mode_edit' : 'add'" class="absolute-center" size="30px" color="black" />
          </q-avatar>
        </div>
        <div v-else class="row no-wrap" style="width: 100%">
          <q-avatar rounded v-for="(item, index) in botones" :key="index" :class="item.select ? 'seleccionado q-mx-sm':'bg-orange-1 q-mx-sm'" @click="seleccionar(index)" style="height: 80px; width: 80px; border-radius: 15px;">
            <q-img style="height: 100%;" :src="cargarImagen(index)"/>
            <q-icon :name="item.file ? 'mode_edit' : 'add'" class="absolute-center" size="30px" color="black" />
          </q-avatar>
        </div>
      </q-scroll-area>
      <div class="row justify-center q-ma-md" style="width: 70%">
        <div class="text-caption q-mb-md column items-center">
          <q-checkbox class="text-caption" v-model="terminos" size="25px" label="Acepto Terminos y condiciones de uso"/>
          <div class="text-negative text-caption" v-if="!terminos && aparecer"> Debe Aceptar los terminos </div>
        </div>
        <q-btn class="q-pa-sm" color="primary" text-color="white" rounded :label="edit ? 'Actualizar' : 'Guardar'" @click="!edit ? agregar() : actualizarHospedaje()" style="width: 100%" no-caps/>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      user: {},
      imgHospedaje: [],
      mostrarImg: null,
      id: '',
      hospedajeFile: null,
      edit: false,
      editImg: false,
      form: {},
      file: null,
      imgPro: null,
      tiposHabt: [],
      tiposHabtSelect: [],
      posicion: 0,
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
      ],
      terminos: false,
      aparecer: false,
      thumbStyle: {
        borderRadius: '5px',
        backgroundColor: 'gray',
        opacity: 0.25
      }
    }
  },
  validations: {
    form: {
      name: { required, minLength: minLength(3), maxLength: maxLength(50) },
      description: { required },
      price: { required, minLength: minLength(1) },
      dimensions: { required },
      pet_type: { required },
      pet_num: { required }
    },
    file: { required },
    tiposHabtSelect: { required }
  },
  mounted () {
    this.baseu = env.apiUrl + 'hospedajes_img'
    if (this.$route.params.id) {
      this.edit = true
      this.terminos = true
      this.editImg = true
      this.id = this.$route.params.id
      this.$api.get('hospedaje/' + this.id).then(res => {
        if (res) {
          this.form = res
          this.tiposHabtSelect = this.form.habt_types
          this.imgsTraidas()
          // this.imgPro = env.apiUrl + '/hospedajes_img/' + this.form.fileName
        }
      }).catch(error => {
        console.log(error)
      })
    }
    this.getTiposHabt()
    this.getUser()
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
        this.imgHospedaje.push(cc)
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
      // this.botones[indexSelect].file = this.hospedajeFile
      this.botones[indexSelect] = { file: this.hospedajeFile, src: await this.convertImg(this.hospedajeFile), select: true }
      this.mostrarImg = URL.createObjectURL(this.hospedajeFile)
      // this.mostrarImg = URL.createObjectURL(this.hospedajeFile)
      this.hospedajeFile = null
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
        this.mostrarImg = null
      }
    },
    async agregar () {
      console.log('guardar')
      this.$v.$touch()
      this.form.habt_types = this.tiposHabtSelect
      this.form.ciudad_id = this.user.ciudad_id
      if (!this.$v.form.$error && this.terminos) {
        console.log('sin fallo')
        this.$q.loading.show({
          message: 'Subiendo Hospedaje, Por Favor Espere...'
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
        await this.$api.post('hospedaje', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.notify({
            message: 'Hospedaje agregado con exito',
            color: 'primary'
          })
          this.$q.loading.hide()
          // this.$router.push('/hospedajes')
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
        this.aparecer = true
      }
    },
    async actualizarHospedaje () {
      console.log(this.botones)
      this.$v.form.$touch()
      if (!this.$v.form.$error && this.terminos) {
        this.$q.loading.show({
          message: 'Actualizando Hospedaje, Por Favor Espere...'
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
        await this.$api.put('hospedaje/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.notify({
            message: 'Hospedaje agregado con exito',
            color: 'primary'
          })
          this.$q.loading.hide()
          // this.$router.push('/hospedajes')
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
        this.aparecer = true
      }
    },
    getTiposHabt () {
      this.$api.get('habitacion_type').then(res => {
        if (res) {
          this.tiposHabt = res
        }
      })
    },
    getUser () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.user = v
          console.log(this.user)
        }
      })
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
  background: $grey-5;
}
.dimension {
  min-width: 200px;
}
</style>

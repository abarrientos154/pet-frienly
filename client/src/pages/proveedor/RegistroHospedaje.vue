<template>
  <div>
    <div class="row justify-center">
      <div class="q-pa-md col col-xs-10 col-sm-8 col-md-7 col-lg-5 col-xl-4 no-wrap q-mx-md q-my-sm">
        <q-card flat bordered class="dimension">
          <q-card-section horizontal>
            <q-card-section>
              <div v-if="imgHospedaje && edit" class="column items-center justify-center">
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
                  <q-file borderless v-model="hospedajeFile" class="absolute-top-right q-ma-sm button-camera" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1">
                    <q-icon name="mode_edit" class="absolute-center" size="20px" color="black" />
                  </q-file>
                </q-img>
              </div>
              <div class="q-mx-xl q-mt-md">
                <q-input filled v-model="form.name"  label="Nombre del Alojamiento" dense :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()">
                  <template v-slot:append>
                    <q-icon name="mode_edit" />
                  </template>
                </q-input>
                <div class="q-mt-md">
                    <q-input prefix="$" filled label="Precio por noche" color="primary" v-model.number="form.price" type="number" dense :error="$v.form.price.$error" error-message="Este campo es requerido"  @blur="$v.form.price.$touch()" :rules="[val => val > 0]" min="0"/>
                  </div>
                <div class="q-mt-md text-h6">Descripcion</div>
                  <q-input filled outlined v-model="form.description" type="textarea" :error="$v.form.description.$error" error-message="Este campo es requerido"  @blur="$v.form.description.$touch()"/>
                <q-input filled v-model.number="form.dimensions" type="number"  label="Metros Cuadrados" dense :error="$v.form.dimensions.$error" error-message="Este campo es requerido"  @blur="$v.form.dimensions.$touch()">
                </q-input>
                <q-input filled v-model="form.pet_type"  label="Tipo de Mascotas" dense :error="$v.form.pet_type.$error" error-message="Este campo es requerido"  @blur="$v.form.pet_type.$touch()">
                </q-input>
                <q-input filled v-model.number="form.pet_num" type="number" label="Cantidad de Mascotas" dense :error="$v.form.pet_num.$error" error-message="Este campo es requerido"  @blur="$v.form.pet_num.$touch()" lazy-rules :rules="[ val => val > 0 && val <= 1000 ]"/>
                <q-select dense outlined filled option-value="_id" option-label="name" v-model="tiposHabtSelect" :options="tiposHabt" label="Tipos de habitaciones" multiple emit-value map-options error-message="Este campo es requerido" :error="$v.tiposHabtSelect.$error" @blur="$v.tiposHabtSelect.$touch()">
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
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row justify-center q-ma-lg">
      <q-btn color="primary" text-color="white" rounded :label="edit ? 'Actualizar' : 'Guardar'" @click="!edit ? agregar() : actualizarHospedaje()"/>
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
      mostrarImg: 'noimgpro.png',
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
      ]
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
        this.mostrarImg = 'noimgpro.png'
      }
    },
    async agregar () {
      console.log('guardar')
      this.$v.$touch()
      this.form.habt_types = this.tiposHabtSelect
      console.log(this.form.habt_types)
      this.form.ciudad_id = this.user.ciudad_id
      if (!this.$v.form.$error) {
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
      }
    },
    async actualizarHospedaje () {
      console.log(this.botones)
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
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
  background: $grey-4;
}
.dimension {
  min-width: 200px;
}
</style>

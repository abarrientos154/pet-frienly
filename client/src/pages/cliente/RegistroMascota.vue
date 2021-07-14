<template>
  <div>
    <q-header elevated class="bg-primary row items-center" style="width:100%; height:60px">
        <div class="col-1">
        <q-btn flat round color="white" icon="arrow_back" @click="$router.go(-1)"/>
        </div>
        <div class="col-10 text-white text-subtitle1 text-center">{{edit ? 'Actualizar datos de mascota' : 'Crear nueva mascota'}}</div>
    </q-header>

    <div class="row justify-center q-mb-lg">
      <div class="text-center text-grey text-h5 text-bold q-my-lg">Cuentanos de tu <br> mascota</div>
      <q-img :src="mostrarImg" class="bg-grey" style="width: 60%; height: 150px; border-radius: 5px;"/>
    </div>

    <div>
      <div class="text-subtitle2 q-ml-lg">Fotos de tu mascota</div>
      <div class="text-overline q-ml-lg">Puede cargar hasta 3 fotos</div>
      <div class="row">
        <div v-if="files.length < 3" class="column items-center" style="width: 33%">
          <q-avatar square size="90px">
            <q-img src="" class="bg-grey" style="height: 100%">
              <q-file borderless v-model="img" class="absolute-center button-subir" @input="changePetFile()" accept=".jpg, image/*">
                <q-icon name="photo_camera" class="absolute-center" size="25px" color="white" />
              </q-file>
            </q-img>
          </q-avatar>
        </div>
        <div class="column items-center" v-for="(item, i) in petImg" :key="i" style="width: 33%">
          <q-avatar square size="90px">
            <q-img :src="item" class="bg-grey" style="height: 100%">
              <q-file borderless v-model="img" class="absolute-center button-subir" @input="changePetFile(i)" accept=".jpg, image/*">
                <q-icon name="edit" class="absolute-center" size="25px" color="white" />
              </q-file>
            </q-img>
          </q-avatar>
        </div>
      </div>
    </div>

    <div class="q-pa-lg">
      <div>
        <div>Nombre de mascota</div>
        <div class="text-overline q-ml-md">Solo 25 caracteres</div>
        <q-input filled v-model="form.name"  dense error-message="Requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
      </div>
      <div>
        <div>Edad</div>
        <div class="text-overline q-ml-md">¿Cuántos años tiene tu mascota?</div>
        <q-input type="number" min="0" filled v-model.number="form.age"  dense error-message="Requerido" :error="$v.form.age.$error" @blur="$v.form.age.$touch()"/>
      </div>
      <div>
        <div>Fecha de nacimiento</div>
        <div class="text-overline q-ml-md">¿Cuándo nacio tu mascota?</div>
        <q-input filled readonly dense v-model="form.birthdate" placeholder="dd/mm/aaaa" @click="$refs.qDateProxy.show()"
        error-message="Este campo es requerido" :error="$v.form.birthdate.$error" @blur="$v.form.birthdate.$touch()">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="form.birthdate" mask="DD/MM/YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Cerrar" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div>
        <div>¿Qué tipo de mascota tienes?</div>
        <div class="text-overline q-ml-md">Selecciona el tipo de mascota</div>
        <q-select filled v-model="form.type"  dense placeholder="Escoja un tipo" error-message="Requerido" :error="$v.form.type.$error" @blur="$v.form.type.$touch()" option-value="name" option-label="name" emit-value map-options :options="petType" @input="getSize(form.type)">
      </q-select>
      </div>
      <div>
        <div>Raza</div>
        <div class="text-overline q-ml-md">¿Qué raza es tu mascota?</div>
        <q-input type="tel" filled v-model="form.race"  dense placeholder="Escoja una raza" error-message="Requerido" :error="$v.form.race.$error" @blur="$v.form.race.$touch()"/>
      </div>
      <div>
        <div>Tamaño</div>
        <div class="text-overline q-ml-md">Tamaño de tu mascota</div>
        <q-select filled v-model="form.size"  dense placeholder="indique el tamaño" error-message="Requerido" :error="$v.form.size.$error" @blur="$v.form.size.$touch()" option-value="name" option-label="name" emit-value map-options :options="sizes">
      </q-select>
      </div>
      <div>
        <div>Descripción</div>
        <div class="text-overline q-ml-md">Hasta 100 caracteres</div>
        <q-input type="textarea" filled v-model="form.description" error-message="Requerido" :error="$v.form.description.$error" @blur="$v.form.description.$touch()"/>
      </div>
      <div class="column items-center">
        <q-btn rounded class="q-pa-sm" color="primary" :label="edit ? 'Actualizar Mascota' : 'Crear Mascota'" style="width: 70%;" @click="edit ? updatePet() : savePet()"/>
      </div>
    </div>
  </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      id: '',
      edit: false,
      terms: false,
      form: {},
      index: [],
      img: null,
      mostrarImg: null,
      files: [],
      petImg: [],
      perfilFile: null,
      sizeDog: [
        { name: 'Pequeño', value: 1 },
        { name: 'Mediano', value: 2 },
        { name: 'Intermedio', value: 3 },
        { name: 'Grande', value: 4 }
      ],
      sizeCat: [
        { name: 'Pequeño', value: 1 },
        { name: 'Grande', value: 4 }
      ],
      petType: [
        { name: 'Perro', value: 1 },
        { name: 'Gato', value: 2 }
      ],
      sizes: []
    }
  },
  validations: {
    form: {
      name: { required, maxLength: maxLength(25) },
      age: { required },
      birthdate: { required },
      type: { required },
      race: { required },
      size: { required },
      description: { required, maxLength: maxLength(100) }
    },
    files: { required }
  },
  mounted () {
    this.baseu = env.apiUrl + 'mascota_img'
    if (this.$route.params.id) {
      this.edit = true
      this.id = this.$route.params.id
      this.$api.get('mascota/' + this.id).then(res => {
        if (res) {
          this.form = res
          console.log('this.form >> ', this.form)
          this.imgsTraidas()
          this.mostrarImg = this.petImg[0]
        }
      }).catch(error => {
        console.log(error)
      })
    }
    console.log('edit :>> ', this.edit)
  },
  methods: {
    async savePet () {
      console.log('savePet')
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Subiendo su mascota, Por Favor Espere...'
        })
        const formDataTwo = new FormData()
        if (this.files) {
          this.form.cantidadArchivos = this.files.length
          console.log('this.files :>> ', this.files)
          for (let i = 0; i < this.files.length; i++) {
            formDataTwo.append('files' + i, this.files[i])
          }
        } else {
          this.form.cantidadArchivos = 0
        }
        formDataTwo.append('dat', JSON.stringify(this.form))
        await this.$api.post('mascota', formDataTwo, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
            this.$q.loading.hide()
            this.$q.notify({
              message: 'Tu mascota ha sido creada correctamente',
              color: 'positive'
            })
            this.$router.push('/mascotas')
          }
        })
      }
    },
    getSize (value) {
      if (value === 'Perro') {
        this.sizes = [...this.sizeDog]
      } else if (value === 'Gato') {
        this.sizes = [...this.sizeCat]
      }
    },
    imgsTraidas () {
      for (let i = 0; i < this.form.images.length; i++) {
        console.log('prueba')
        var cc = ''
        cc = this.baseu + '/' + this.form.images[i]
        this.petImg[i] = cc
        this.files[i] = 1
      }
    },
    async updatePet () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Actualizando Mascota, Por Favor Espere...'
        })
        var formData = new FormData()
        if (this.files) {
          this.form.cantidadArchivos = this.files.length
          for (let i = 0; i < this.files.length; i++) {
            if (this.files[i] !== 1) {
              formData.append('files' + i, this.files[i])
              this.index.push(i)
            }
          }
          this.form.index = this.index
        } else {
          this.form.cantidadArchivos = 0
        }
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.put('mascota/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          if (res) {
            this.$q.notify({
              message: 'Tu mascota ha sido actualizada correctamente',
              color: 'positive'
            })
            this.$router.push('/mascotas')
          }
          this.$q.loading.hide()
        })
      }
    },
    changePetFile (i) {
      if (this.img && i != null) {
        this.files[i] = this.img
        this.petImg[i] = URL.createObjectURL(this.img)
        this.mostrarImg = URL.createObjectURL(this.img)
        this.img = null
      } else {
        this.files.push(this.img)
        this.petImg.push(URL.createObjectURL(this.img))
        this.mostrarImg = URL.createObjectURL(this.img)
        this.img = null
      }
    }
  }
}
</script>

<style>
.color-select {
  background-color: #fff599
}
/* .respon {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  min-width: 300px;
  margin: auto;
  position: relative;
} */
.dimension {
  min-width: 200px;
}
</style>

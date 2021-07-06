<template>
 <div>
   <div class="q-pa-lg">
      <q-btn flat rounded color="primary" icon="arrow_back" @click="$router.push('/inicio_cliente')"/>
      <q-card style="height: 150px" class="q-mx-xl q-my-xl bg-grey">
        <q-img style="height: 100%;" :src="files[0] ? petImg[0] : ''">
        </q-img>
      </q-card>
      <div class="text-center text-h5 text-grey-8">Cuentanos de tu <br> mascota</div>
      <div style="text-align: left; padding-top: 20px">
      <div class="text-subtitle2 q-ml-md">Fotos de tu mascota</div>
      <div class="text-overline q-ml-md">Puede cargar hasta 3 fotos</div>
      <div class="row justify-around q-my-md">
        <q-avatar square size="80px">
          <img :src="files[0] ? petImg[0] : 'petnoimg.png'" style="width: 150%">
            <q-file borderless v-model="files[0]" class="absolute-center button-subir" @input="changePetFile(0)" accept=".jpg, image/*" style="z-index:1">
              <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
            </q-file>
        </q-avatar>
        <q-avatar square size="80px">
          <img :src="files[1] ? petImg[1] : 'petnoimg.png'" style="width: 150%">
            <q-file borderless v-model="files[1]" class="absolute-center button-subir" @input="changePetFile(1)" accept=".jpg, image/*" style="z-index:1">
              <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
            </q-file>
        </q-avatar>
        <q-avatar square size="80px">
          <img :src="files[2] ? petImg[2] : 'petnoimg.png'" style="width: 150%">
            <q-file borderless v-model="files[2]" class="absolute-center button-subir" @input="changePetFile(2)" accept=".jpg, image/*" style="z-index:1">
              <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
            </q-file>
        </q-avatar>
      </div>
      </div>
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
        <q-btn rounded class="q-pa-sm" color="primary" label="Crear Mascota" style="width: 70%;" @click="savePet()"/>
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
      terms: false,
      form: {},
      files: [null, null, null],
      petImg: [null, null, null],
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
    album: { required }
  },
  mounted () {
    this.baseu = env.apiUrl + 'mascota_img'
    if (this.$route.params.id) {
      this.edit = true
      this.editImg = true
      this.id = this.$route.params.id
      this.$api.get('mascota/' + this.id).then(res => {
        if (res) {
          this.form = res
          // this.categoria_id = this.form.categoria_id
          this.imgsTraidas()
          /* for (let i = 0; i < this.categorias.length; i++) {
            if (this.categorias[i]._id === this.form.categoria_id) {
              this.categorias[i].select = true
            } else {
              this.categorias[i].select = false
            }
          } */
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  methods: {
    async savePet () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Subiendo su mascota, Por Favor Espere...'
        })
        const formDataTwo = new FormData()
        if (this.files) {
          this.form.cantidadArchivos = this.files.length
          for (let i = 0; i < this.files.length; i++) {
            formDataTwo.append('album' + i, this.files[i])
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
            this.$router.push('/inicio_cliente')
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
        this.imgMascota.push(cc)
      }
      this.editImg = true
      console.log(this.editImg)
    },
    filesMascota () {
      var img = ''
      var cc = {}
      if (this.editImg && this.album.length > 0) {
        this.imgMascota = []
        this.editImg = false
      }
      if (this.album.length > 0) {
        cc = this.album[this.album.length - 1]
        img = URL.createObjectURL(cc)
        this.imgMascota.push(img)
      }
    },
    agregar () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Subiendo su mascota, Por Favor Espere...'
        })
        var formData = new FormData()
        formData.append('perfilFile', this.perfilFile)
        this.form.cantidadArchivos = this.album.length
        for (let i = 0; i < this.album.length; i++) {
          formData.append('album' + i, this.album[i])
        }
        formData.append('dat', JSON.stringify(this.form))
        console.log(this.perfilFile)
        this.$api.post('mascota', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          this.$q.loading.hide()
          this.$router.push('/mascotas')
        })
      } else {
        console.log('fallando')
      }
    },
    async actualizarMascota () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        // this.form.categoria_id = this.categoria_id
        this.$q.loading.show({
          message: 'Actualizando Mascota, Por Favor Espere...'
        })
        var formData = new FormData()
        if (this.album) {
          this.form.cantidadArchivos = this.album.length
          for (let i = 0; i < this.album.length; i++) {
            formData.append('album' + i, this.album[i])
          }
        } else {
          this.form.cantidadArchivos = 0
        }
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.put('mascota/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.loading.hide()
          this.$router.push('/mascotas')
        })
      }
    },
    changePetFile (ind) {
      if (this.files[ind]) { this.petImg[ind] = URL.createObjectURL(this.files[ind]) }
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

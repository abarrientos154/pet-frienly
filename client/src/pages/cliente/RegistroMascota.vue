<template>
 <div>
   <div class="column text-h6 q-my-md items-center">Nueva Mascota</div>
   <div class="row justify-center">
      <div class="q-pa-md col col-xs-10 col-sm-8 col-md-7 col-lg-5 col-xl-4 no-wrap q-mx-md q-my-sm">
        <div class="column dimension no-wrap">
          <q-input outlined bg-color="amber-2" v-model="form.name" label="Nombre" dense :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()"/>
          <q-input class="q-mt-md" outlined autogrow bg-color="amber-2" v-model="form.race" label="Raza" dense :error="$v.form.race.$error" error-message="Este campo es requerido" @blur="$v.form.race.$touch()" />
          <q-input class="q-mt-md" outlined autogrow bg-color="amber-2" v-model="form.age" label="Edad" dense :error="$v.form.age.$error" error-message="Este campo es requerido" @blur="$v.form.age.$touch()" />
        </div>
        <div class="dimension no-wrap">
          <q-input class="q-mt-md" outlined autogrow bg-color="amber-2" v-model="form.vaccines" label="Vacunas" dense :error="$v.form.vaccines.$error" error-message="Este campo es requerido" @blur="$v.form.vaccines.$touch()" />
          <q-input class="q-mt-md" outlined autogrow bg-color="amber-2" v-model="form.diseases" label="Enfermedades" dense :error="$v.form.diseases.$error" error-message="Este campo es requerido" @blur="$v.form.diseases.$touch()" />
        </div>
      </div>
      <div class="q-pa-md col col-xs-10 col-sm-8 col-md-7 col-lg-5 col-xl-4 no-wrap q-mx-md q-my-sm">
        <div class="dimension no-wrap">
          <q-card class="q-mb-md bg-amber-2" style="border-radius:10px">
            <q-card-section>
              <div>Albúm de fotos</div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 row justify-between">
              <div class="col-10">
                  <q-file max-files="5" style="width: 100%" accept=".jpg, image/*" multiple append v-model="album" hint="Pueden ser hasta 5 fotos" outlined label="CLICK AQUÍ" :error="$v.album.$error" error-message="Este campo es requerido" @blur="$v.album.$touch()">
                    </q-file>
              </div>
              <div class="col-2 row justify-center">
                <q-icon size="md" name="close" color="negative" @click="album = [], imgMascota = [], edit ? imgsTraidas() : ''" class="cursor-pointer" />
              </div>
              </div>
            </q-card-section>
              <q-separator />
              <q-card-section class="row justify-around">
                <div v-if="!imgMascota.length" class="text-subtitle2 text-grey text-center">No hay fotos de la mascota</div>
                <div v-else v-ripple v-for="(item, index) in imgMascota" :key="index" class="col-5 q-pa-sm">
                  <q-img
                    :src="imgMascota.length > 0 ? imgMascota[index] : 'favicon.ico'"
                    style="width:120px"
                  />
                </div>
              </q-card-section>
          </q-card>
          <q-card class="q-pa-md" style="border-radius:10px">
            <div class="text-h6 q-ml-sm q-pt-xs">Descripción personal</div>
            <q-input borderless v-model="form.personal_description" type="textarea" />
          </q-card>
        </div>
      </div>
    </div>
   <div class="column q-my-md">
      <div class="row justify-center q-pa-sm">
        <q-btn color="primary" :label="edit ? 'Actualizar Mascota' : 'Crear Mascota'" @click="!edit ? agregar() : actualizarMascota()"/>
      </div>
    </div>
 </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      perfilFile: null,
      imgPerfil: '',
      form: {},
      album: [],
      imgMascota: [],
      id: '',
      file: null,
      edit: false,
      editImg: false
    }
  },
  validations: {
    form: {
      name: { required },
      race: { required },
      age: { required },
      vaccines: { required },
      diseases: { required },
      personal_description: { required }

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
    test () {
      if (this.perfilFile) { this.imgPerfil = URL.createObjectURL(this.perfilFile) }
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

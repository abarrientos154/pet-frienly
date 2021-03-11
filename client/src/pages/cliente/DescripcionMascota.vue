<template>
  <div class="bg-secondary" style="height:100%">
      <div class="respon q-mx-xl q-my-md">
        <q-img class="q-my-sm" :src="form.images ? baseu + perfile : 'noimgpro.png'" spinner-color="white" style="height: 250px; width: 100%;border-radius:10px">
            <div class="row justify-between" style="width:100%">
                <div class="col-10 text-h6 text-white text-weight-bolder">{{infoClient.full_name && infoClient.last_name ? infoClient.full_name + ' ' + infoClient.last_name : infoClient.full_name}}</div>
            </div>
            <div class="row absolute-bottom" style="width:100%">
            <!-- <q-icon class="col-1" name="room" color="blak" style="font-size: 1.5rem;"/> -->
            <div class="q-pl-md q-pt-xs text-caption">{{form.direccion}}</div>
            </div>
        </q-img>

        <q-card class="q-pa-md bg-secondary shadow-up-3 q-mt-sm" style="border-radius:10px">
            <q-item>
                <q-item-section>
                <q-item-label class="text-h6 text-weight-bolder">{{form.name}}</q-item-label>
                </q-item-section>
                <q-item-section side top>
                <!-- <div class="row">
                    <q-icon :name="categoria.icons" color="yellow" style="font-size: 2rem;"/>
                </div> -->
                </q-item-section>
            </q-item>
            <q-scroll-area
            horizontal
            style="height: 110px;"
            >
            <div class="row no-wrap" style="width: 100%">
                <q-card @click="perfile = img" v-for="(img, index) in form.images" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index">
                <q-img :src="form.images ? baseu + img : 'noimgpro.png'" spinner-color="white" style="height: 100px; width: 100px" />
                </q-card>
            </div>
            </q-scroll-area>
        </q-card>

        <q-card class="bordes q-my-md q-pa-md shadow-up-4" style="border-radius:10px;min-height:240px">
            <div class="text-subtitle2 q-ml-md q-pt-xs">Descripción personal:</div>
            <div class="q-pa-md">{{form.personal_description}}</div>
            <div class="text-subtitle2 q-ml-md q-pt-xs">Raza:</div>
            <div class="q-pa-md">{{form.race}}</div>
            <div class="text-subtitle2 q-ml-md q-pt-xs">Vacunas:</div>
            <div class="q-pa-md">{{form.vaccines}}</div>
            <div class="text-subtitle2 q-ml-md q-pt-xs">Enfermedades:</div>
            <div class="q-pa-md">{{form.diseases}}</div>
        </q-card>
      </div>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      id: this.$route.params.id,
      rol: 0,
      perfile: '',
      ruta: 'mascota',
      form: {},
      infoClient: {},
      categoria: {},
      baseu: ''
    }
  },
  mounted () {
    this.cargarMascota()
    this.baseu = env.apiUrl + 'mascota_img/'
  },
  methods: {
    cargarMascota () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.$api.get(`${this.ruta}/${this.id}`).then(res => {
            if (res) {
              this.form = res
              this.perfile = this.form.images[0]
              if (this.form) {
                this.$api.get('user_by_id/' + this.form.ownerId).then(v => {
                  this.infoClient = v
                })
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-top: 6px solid $primary
}
.respon {
  /* height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  max-width: 600px;
  min-width: 400px;
  /* margin: auto; */
  /* position: relative; */
}
</style>

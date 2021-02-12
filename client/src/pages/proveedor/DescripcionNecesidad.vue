<template>
  <div class="bg-secondary" style="height:100%">
      <q-img :src="form.images ? baseu + perfile : 'noimgpro.png'" spinner-color="white" style="height: 250px; width: 100%;border-bottom-right-radius:25px;border-bottom-left-radius:25px">
        <div class="row justify-between" style="width:100%">
            <div class="col-10 text-h6 text-white text-weight-bolder">{{infoClient.full_name && infoClient.last_name ? infoClient.full_name + ' ' + infoClient.last_name : infoClient.full_name}}</div>
        </div>
        <div class="row absolute-bottom" style="width:100%">
          <q-icon class="col-1" name="room" color="blak" style="font-size: 1.5rem;"/>
          <div class="q-pl-md q-pt-xs text-caption">{{form.direccion}}</div>
        </div>
      </q-img>

      <q-card class="q-pa-md bg-secondary shadow-up-3 q-mt-sm" style="border-top-left-radius:25px;border-top-right-radius:25px">
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 text-weight-bolder">{{form.name}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <div class="row">
                <q-icon :name="categoria.icons" color="yellow" style="font-size: 2rem;"/>
              </div>
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

      <q-card class="bordes q-pa-md shadow-up-4" style="border-top-left-radius:25px;border-top-right-radius:25px;min-height:240px">
        <div class="text-subtitle2 q-ml-md q-pt-xs">Descripción</div>
        <div class="q-pa-md">{{form.descripcion}}</div>
        <div v-if="rol === 3" class="row justify-center q-pa-sm q-mt-md">
          <q-btn color="primary" label="Iniciar cotización" @click="iraChat(form._id)"/>
        </div>
      </q-card>
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
      ruta: 'necesidad',
      form: {},
      infoClient: {},
      categoria: {},
      baseu: ''
    }
  },
  mounted () {
    this.cargarSolicitud()
    this.baseu = env.apiUrl + '/necesidad_img/'
  },
  methods: {
    cargarSolicitud () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.$api.get(`${this.ruta}/${this.id}`).then(res => {
            if (res) {
              this.form = res
              this.perfile = this.form.images[0]
              this.cargarCategoria()
              if (this.form) {
                this.$api.get('user_by_id/' + this.form.ownerId).then(v => {
                  this.infoClient = v
                })
              }
            }
          })
        }
      })
    },
    iraChat (id) {
      this.$api.get('user_info').then(res => {
        if (res) {
          var info = {}
          info.proveedor_id = res._id
          info.cliente_id = this.infoClient._id
          this.$api.post('crear_chat/' + id, info).then(v => {
            if (v) {
              this.$router.push('/chat/' + v._id)
            }
          })
        }
      })
    },
    cargarCategoria () {
      this.$api.get('categoria').then(v => {
        if (v) {
          this.categoria = v.find(x => x._id === this.form.categoria_id)
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
</style>

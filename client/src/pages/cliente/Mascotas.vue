<template>
  <div>
    <q-header elevated class="bg-primary row justify-center items-center" style="width:100%; height:60px">
      <div class="text-white text-subtitle1 text-center">Mis Mascotas</div>
    </q-header>
    <q-btn class="q-mt-sm" flat rounded color="primary" icon="arrow_back" @click="$router.push('/inicio_cliente')"/>
    <div v-if="data.length" class="row justify-around q-ma-sm">
      <div class="col-6 q-mb-sm" v-for="(item, index) in data" :key="index">
          <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:95%" v-ripple>
            <q-img :src="item.images ? baseu + '/' + item.images[0] : 'noimgpro.png'" style="height: 280px; width: 100%">
              <q-btn class="bg-grey q-mr-xs q-mt-md q-ml-md q-mb-xl" round flat size="sm" text-color="primary" icon="edit" @click="updatePet(item._id)" />
              <q-btn class="bg-grey q-mr-xs q-mt-md q-mb-xl" round flat size="sm" text-color="primary" icon="delete" @click="deletePet(item._id)" />
            </q-img>
            <!-- <div class="absolute-full q-mt-md q-ml-md q-mb-xl">
              <q-btn class="bg-grey q-mr-xs" round flat size="sm" text-color="primary" icon="edit" @click="updatePet(item._id)" />
              <q-btn class="bg-grey" round flat size="sm" text-color="primary" icon="delete" @click="deletePet(item._id)" />
            </div> -->
            <div class="absolute-full q-ml-md column justify-end q-mb-sm">
              <div class="row no-wrap items-center" style="width:100%">
                <div class="text-white text-bold ellipsis">{{item.name}}</div>
              </div>
              <div class="row no_wrap" style="width:100%">
                <q-chip class="text-white text-bold ellipsis" :label="item.type" color="primary" />
              </div>
              <div class="row no-wrap items-center" style="width:100%">
                <div class="text-white text-bold ellipsis">Raza: {{item.race}}</div>
              </div>
            </div>
          </q-card>
      </div>
    </div>
    <div v-else class="row items-center justify-center" style="height: 280px;">No hay alojamientos actualmente</div>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-fab color="primary" icon="add" direction="up" vertical-actions-align="right" @click="$router.push('/registromascota')">
    </q-fab>
  </q-page-sticky>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      data: []
    }
  },
  mounted () {
    this.getMascotas()
    this.baseu = env.apiUrl + 'mascota_img'
    console.log(this.baseu)
  },
  methods: {
    getMascotas () {
      this.$api.get('mascota').then(res => {
        console.log(res)
        this.data = res
      })
      /* this.$api.get('user_info').then(res => {
        if (res) {
          var id = res._id
          this.$api.get('mascota_by_user_id/' + id).then(v => {
            if (v) {
              this.data = v
            }
          })
        }
      }) */
    },
    updatePet (id) {
      this.$router.push('/edit_mascota/' + id)
    },
    deletePet (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas eliminar esta mascota?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.delete('mascota/' + id).then(res => {
          if (res) {
            this.$q.notify({
              color: 'positive',
              message: 'Eliminado Correctamente'
            })
            this.getMascotas()
          }
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    }
  }
}
</script>

<style scoped lang="scss">
/* .bordes {
  border-left: 6px solid $primary;
  background-color: rgba(202, 202, 202, 0.474);
  border-radius: 12px;
} */
.estilo-titulos {
  background-color: #fff599;
  width: 250px;
  border-radius: 12px
}
/* .respon {
  // height: 100%;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // max-width: 600px;
  // min-width: 350px;
  //margin: auto;
  // position: relative;
} */
.dimension {
  min-width: 300px;
  max-width: 800px;
}
</style>

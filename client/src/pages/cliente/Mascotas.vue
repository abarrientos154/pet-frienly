<template>
  <div>
    <q-header elevated class="bg-primary row items-center" style="width:100%; height:60px">
        <div class="col-1">
        <q-btn flat round color="white" icon="arrow_back" @click="$router.go(-1)"/>
        </div>
        <div class="col-10 text-white text-subtitle1 text-center">Mis Mascotas</div>
    </q-header>

    <div class="q-pb-sm q-pa-sm">
      <div class="text-subtitle1 text-bold">Mis mascotas</div>
      <div class="q-mb-sm text-caption text-grey-8 text-italic">Todo sobre tus mascotas</div>
    </div>

    <div v-if="data.length" class="row justify-center">
      <div class="col-12 row justify-center q-pb-md" v-for="(item, index) in data" :key="index">
        <q-card class="shadow-5 q-pt-md" style="width: 90%;" clickable v-ripple>
            <div class="row justify-between">
              <div class="col-10 bg-primary text-subtitle1 q-px-sm q-py-xs ellipsis text-white"
                style="border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                  {{item.name}}
              </div>
              <div class="col-2 row justify-center">
                <q-btn class="" round flat size="md" color="primary" icon="delete"
                @click="deletePet(item._id)" />
              </div>
            </div>
            <div class="row q-py-md">
              <div class="col-4 q-pa-sm row justify-center">
                <q-img :src="item.images ? baseu + '/' + item.images[0] : 'noimgpro.png'" style="height: 100px; width: 100%; border-radius: 20px"/>
              </div>
              <div class="q-py-sm q-gutter-xs">
                <div class="text-subtitle2">Fecha de nacimiento</div>
                <div class="text-caption">{{item.birthdate}}</div>
                <div><b>Raza </b>{{item.race}}</div>
                <div><b>Tamaño </b>{{item.size}}</div>
              </div>
            </div>
            <div class="row justify-center q-py-sm">
                <q-btn no-caps class="q-py-sm" color="primary" label="Editar" style="width: 70%"
                @click="updatePet(item._id)"/>
            </div>
        </q-card>
      </div>
    </div>
    <div v-else class="row items-center justify-center" style="height: 280px;">No hay mascotas actualmente</div>

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

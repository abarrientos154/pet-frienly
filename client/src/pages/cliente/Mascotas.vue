<template>
  <div>
    <div class="row justify-between q-ma-sm">
        <q-btn no-caps class="shadow-11" color="white" text-color="black" icon="add" to="/registromascota"/>
    </div>
    <q-separator inset />
    <div class="row justify-center">
        <div class="text-h6 q-ma-md text-center estilo-titulos">Mis Mascotas</div>
    </div>
    <q-list class="q-mx-lg q-mx-md q-my-md q-gutter-sm respon" v-if="data.length > 0">
      <q-card class="q-pa-md bordes" v-for="(item, index) in data" :key="index" v-ripple >
        <div class="row justify-between">
          <div class="col-4">
            <q-img :src="item.images ? baseu + '/' + item.images[0] : 'noimgpro.png'" style="width:100px; height: 80px;" />
          </div>
          <div class="col-6">
              <q-scroll-area
                horizontal
                style="height: 27px"
              >
                <div class="text-subtitle2 text-weight-bolder">{{item.name}}</div>
              </q-scroll-area>
              <div class="text-caption">Raza:</div>
              <q-chip text-color="white" :label="item.race" color="amber-7" />
          </div>
          <q-separator vertical color="black" />
          <div class="column justify-around">
            <q-btn round flat color="white" size="sm" text-color="black" icon="edit" @click="editMascota(item._id)" />
            <q-separator color="black" />
            <q-btn round flat color="white" size="sm" text-color="red" icon="delete" @click="deleteMascota(item._id)" />
          </div>
        </div>
      </q-card>
    </q-list>
    <q-card v-else class="shadow-2 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Actualmente sin mascotas...</div>
    </q-card>
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
    editMascota (id) {
      this.$router.push('/edit_mascota/' + id)
    },
    deleteMascota (id) {
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
.bordes {
  border-left: 6px solid $primary;
  background-color: rgba(202, 202, 202, 0.474);
  border-radius: 12px;
}
.estilo-titulos {
  background-color: #fff599;
  width: 250px;
  border-radius: 12px
}
.respon {
  /* height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  max-width: 600px;
  min-width: 350px;
  /* margin: auto; */
  /* position: relative; */
}
</style>

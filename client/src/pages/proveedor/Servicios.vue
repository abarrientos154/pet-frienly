<template>
  <div>
    <div class="row justify-between q-ma-sm">
        <q-btn no-caps class="shadow-11" color="white" text-color="black" icon="add" to="/registrohospedaje" />
        <q-btn no-caps class="shadow-11" color="primary" text-color="black" label="Ofertas" />
    </div>
    <q-separator inset />
    <div class="row justify-center">
        <div class="text-h6 q-ma-md text-center estilo-titulos">Servicios de Hospedaje</div>
    </div>
    <q-list class="row justify-center" v-if="data.length > 0">
      <q-card class="q-pa-md bordes dimension col-6 no-wrap q-mx-xl q-my-sm" v-for="(item, index) in data" :key="index" v-ripple>
        <div class="row justify-between">
          <div @click="$router.push('/descripcion_hospedaje/' + item._id)" class="col-4">
            <q-img :src="item.filename ? baseu + '/' + item.filename : 'noimgpro.png'" style="width:100px; height: 80px;" />
          </div>
          <div @click="$router.push('/descripcion_hospedaje/' + item._id)" class="col-6">
              <q-scroll-area
                horizontal
                style="height: 27px"
              >
                <div class="text-subtitle2 text-weight-bolder">{{item.name}}</div>
              </q-scroll-area>
              <div>Precio: <strong>{{item.price}}</strong></div>
              <div>Metros: <strong>{{item.dimensions}}Mts</strong></div>
              <div>Tipo de Mascota: <strong>{{item.pet_type}}</strong></div>
          </div>
          <q-separator vertical color="black" />
          <div class="column justify-around">
            <q-btn round flat color="white" size="sm" text-color="black" icon="edit" @click="editHospedaje(item._id)" />
            <q-separator color="black" />
            <q-btn round flat color="white" size="sm" text-color="red" icon="delete" @click="deleteHospedaje(item._id)" />
          </div>
        </div>
      </q-card>
    </q-list>
    <q-card v-else class="shadow-2 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Actualmente sin hospedajes...</div>
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
    this.getHospedaje()
    this.baseu = env.apiUrl + 'hospedajes_img'
  },
  methods: {
    getHospedaje () {
      this.$api.get('user_info').then(res => {
        if (res) {
          var id = res._id
          this.$api.get('hospedaje_by_proveedor/' + id).then(v => {
            if (v) {
              this.data = v
            }
          })
        }
      })
    },
    editHospedaje (id) {
      this.$router.push('/editar_hospedaje/' + id)
    },
    deleteHospedaje (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas eliminar este hospedaje?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.delete('hospedaje/' + id).then(res => {
          if (res) {
            this.$q.notify({
              color: 'positive',
              message: 'Hospedaje Eliminado Correctamente'
            })
            this.getHospedaje()
            this.$router.push('/hospedajes')
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
.dimension {
  min-width: 350px;
  max-width: 800px;
}
</style>

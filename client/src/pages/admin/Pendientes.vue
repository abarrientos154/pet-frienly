<template>
  <div>
    <div class="row justify-center">
        <div class="text-h6 q-ma-md text-center estilo-titulos">Proveedores Pendientes</div>
    </div>
    <q-list class="q-mx-sm q-my-md q-gutter-sm" v-if="data.length > 0">
      <q-card class="q-pa-md bordes" v-for="(item, index) in data" :key="index" v-ripple>
        <div class="row justify-between">
          <div class="col-4" @click="$router.push('/descripcionusuario/'+item._id)">
            <q-img :src="baseu + item._id" style="width:100px; height: 80px;" />
          </div>
          <div class="col-6" @click="$router.push('/descripcionusuario/'+item._id)">
              <q-scroll-area
                horizontal
                style="height: 33px; width:100%"
              >
                <div class="text-subtitle2 text-weight-bolder">{{item.full_name}}</div>
              </q-scroll-area>
              <div class="text-caption q-pl-sm">{{item.country}}</div>
              <q-chip text-color="white" label="Aprobar usuario" color="orange" />
          </div>
          <div class="col-2 column justify-around">
            <q-btn round color="red" glossy icon="clear" size="sm" @click="rechazarProv(item._id)" />
            <q-btn round color="green-14" glossy icon="done" size="sm" @click="aprobarProv(item._id)" />
          </div>
        </div>
      </q-card>
    </q-list>
    <q-card v-else class="shadow-2 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Actualmente sin proveedores pendientes...</div>
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
    this.getProveedores()
    this.baseu = env.apiUrl + '/perfil_img/perfil'
  },
  methods: {
    getProveedores () {
      this.$api.post('user_by_status', { rol: [3] }).then(res => {
        if (res) {
          this.data = res
        }
      })
    },
    aprobarProv (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas aprobar este proveedor?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.put('update_status/' + id, { status: 1 }).then(res => {
          if (res) {
            this.getProveedores()
          }
        })
      }).onCancel(() => {
        // cancel
      })
    },
    rechazarProv (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas rechazar este proveedor?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.put('update_status/' + id, { status: 2 }).then(res => {
          if (res) {
            this.getProveedores()
          }
        })
      }).onCancel(() => {
        // cancel
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
</style>

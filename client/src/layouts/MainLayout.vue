<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white row justify-between">
        <q-btn round dense flat icon="menu" color="primary" @click="drawer = !drawer"/>
        <div class="text-black">Inicio</div>
        <q-btn flat dense :icon="rol !== 1 ? 'person' : ''" class="bg-secondary" @click="rol !== 1 ? $router.push('/Datos') : ''"  style=""/>
      </q-toolbar>
    </q-header>
    <q-drawer v-if="drawer === true" v-model="drawer" :width="200" :breakpoint="500" overlay bordered content-class="bg-white">
      <q-separator/>
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(item, index) in menu">
            <q-item :key="index" clickable v-ripple v-if="can(item.permission)" @click="item.label === 'Cerrar Sesión' ? cerrarSesion() : $router.push(item.ruta)">
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                  {{ item.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <!-- <q-footer>
      <div class="bg-grey-1 text-primary shadow-2 full-width row justify-around" >
        <q-btn icon="home" color="primary" flat round size="md" :to="rol === 2 ? '/inicio_cliente' : rol === 3 ? '/inicio_proveedor' : rol === 1 ? '/inicio_administrador' : ''" />
        <q-btn v-if="rol != 1" :icon="rol === 3 ? 'view_list' : 'pets'" color="primary" flat round size="md" :to="rol === 2 ? '/mascotas' : rol === 3 ? '/productos' : ''"/>
        <q-btn v-if="rol != 1" :icon="rol === 3 ? 'hotel' : 'shopping_cart'" color="primary" flat round size="md" :to="rol === 2 ? '#' : rol === 3 ? '/hospedaje' : ''"/>
        <q-btn :icon="rol === 1 ? 'lock_clock' : 'shopping_cart'" color="primary" flat round size="md" :to="rol === 1 ? '/proveedores_pendientes' : '/mis_cotizaciones'" />
        <q-btn icon="logout" color="primary" flat round size="md" to="/login" />
      </div>
    </q-footer> -->
    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn v-if="rol != 1 && 3" round icon="shopping_bag" color="primary" size="20px">
          <q-badge color="red" label="2" floating/>
        </q-btn>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('generals', ['can']),
    mostrarBoton () {
      return this.$route.meta.botonchat
    }
  },
  name: 'MainLayout',
  data () {
    return {
      usuario: {},
      rol: null,
      drawer: false,
      menu: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio',
          permission: 1
        },
        {
          icon: 'pets',
          label: 'Mascotas',
          ruta: '/mascotas',
          permission: 1
        },
        {
          icon: 'logout',
          label: 'Cerrar Sesión',
          ruta: '',
          permission: 1
        }
      ]
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
        }
      })
    }
  }
}
</script>
<style>
.float{
position:fixed;
width:55px;
height:55px;
bottom:80px;
right:10px;
background-color:#0C9;
color:#FFF;
border-radius:50px;
text-align:center;
}
</style>

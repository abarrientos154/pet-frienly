<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white row justify-between">
        <q-btn round dense flat icon="keyboard_backspace" color="primary" @click="$router.go(-1)"/>
        <q-img src="logo-210x47.png" style="width:140px" />
        <q-btn flat round dense :icon="rol !== 1 ? 'person' : ''" color="primary" @click="rol !== 1 ? $router.push('/Datos') : ''"  />
      </q-toolbar>
    </q-header>
    <q-footer>
      <div class="bg-grey-1 text-primary shadow-2 full-width row justify-around" >
          <q-btn icon="home" color="primary" flat round size="md" :to="rol === 2 ? '/inicio_cliente' : rol === 3 ? '/inicio_proveedor' : rol === 1 ? '/inicio_administrador' : ''" />
          <q-btn icon="view_list" color="primary" flat round size="md" :to="rol === 2 ? '/solicitudes' : rol === 3 ? '/productos' : rol === 1 ? '/reportes_usuarios' : ''"/>
          <q-btn v-if="rol != 1" icon="add" outline color="secondary" class="q-mb-sm" round size="lg" :to="rol === 2 ? '/registronecesidades' : rol === 3 ? '/registroproductos' : ''"/>
          <q-btn :icon="rol === 1 ? 'lock_clock' : 'shopping_cart'" color="primary" flat round size="md" :to="rol === 1 ? '/proveedores_pendientes' : '/mis_cotizaciones'" />
          <q-btn icon="logout" color="primary" flat round size="md" to="/login" />
      </div>
    </q-footer>
    <q-page-container>
      <router-view />
        <q-btn v-if="rol != 1 && mostrarBoton" class="float" fab icon="forum" color="primary" to="/mis_chats" />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  computed: {
    mostrarBoton () {
      return this.$route.meta.botonchat
    }
  },
  name: 'MainLayout',
  data () {
    return {
      usuario: {},
      rol: null
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

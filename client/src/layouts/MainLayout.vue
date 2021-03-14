<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated>
      <q-toolbar class="bg-white row justify-between">
        <q-btn round dense flat icon="menu" color="primary" @click="clickmenu ()"/>
        <div class="text-black">{{page}}</div>
        <q-btn flat dense :icon="rol != 1 ? 'person' : ''" class="bg-secondary" @click="rol !== 1 ? $router.push('/Datos') : ''"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="drawer === true" v-model="drawer" :width="200" :breakpoint="500" overlay bordered content-class="bg-white">
      <q-separator/>
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(item, index) in menu">
            <q-item :key="index" clickable v-ripple v-if="can(item.permission)" @click="item.label === 'Cerrar Sesión' ? cerrarSesion() : ruta (item)">
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
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MainLayout',
  data () {
    return {
      usuario: {},
      rol: null,
      drawer: false,
      menu: [],
      page: '',
      admin: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_administrador',
          permission: 1
        },
        {
          icon: 'list',
          label: 'Proveedores',
          ruta: '/proveedores',
          permission: 1
        },
        {
          icon: 'logout',
          label: 'Cerrar Sesión',
          ruta: '',
          permission: 1
        }
      ],
      cliente: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_cliente',
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
      ],
      proveedor: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio_proveedor',
          permission: 1
        },
        {
          icon: 'list',
          label: 'Productos',
          ruta: '/productos',
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
  computed: {
    ...mapGetters('generals', ['can']),
    mostrarBoton () {
      return this.$route.meta.botonchat
    }
  },
  methods: {
    ...mapMutations('generals', ['logout']),
    cerrarSesion () {
      this.logout()
      this.$router.push('/login')
    },
    getUser () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
        }
      })
    },
    clickmenu () {
      this.drawer = !this.drawer
      if (this.rol === 1) {
        this.menu = this.admin
      } else {
        if (this.rol === 2) {
          this.menu = this.cliente
        } else {
          if (this.rol === 3) {
            this.menu = this.proveedor
          } else {
            console.log(this.rol)
          }
        }
      }
    },
    ruta (item) {
      this.$router.push(item.ruta)
      this.page = item.label
    }
  }
}
</script>

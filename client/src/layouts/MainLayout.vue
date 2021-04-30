<template>
  <q-layout view="lHh Lpr lFf">

    <q-header>
      <q-toolbar class="bg-white row justify-between">
        <q-btn round dense flat icon="menu" color="primary" @click="clickmenu ()"/>
        <div class="text-black">{{page}}</div>
        <div>
          <q-avatar rounded v-if="rol != 1" class="bg-secondary" icon="person" style="border-radius: 10px"></q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="drawer === true" v-model="drawer" :width="200" :breakpoint="500" overlay bordered content-class="bg-white">
      <q-separator/>
      <q-scroll-area class="fit">
        <q-list v-if="rol != null">
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
        <div v-else class="column q-pa-md items-center">
          <q-btn label="Iniciar Sesión" color="primary" @click="$router.push('/login')" no-caps/>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
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
      page: 'Inicio',
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
          icon: 'apartment',
          label: 'Hospedaje',
          ruta: '/hospedajes',
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
    console.log(localStorage, 'local')
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
      if (localStorage.TRI_SESSION_INFO) {
        this.$api.get('user_info').then(v => {
          if (v) {
            this.rol = v.roles[0]
          } else {
            console.log(this.rol)
          }
        })
      }
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

<template>
  <q-layout view="lHh Lpr lFf">

    <q-header>
      <q-toolbar class="bg-primary row justify-center">
        <!-- <q-btn round dense flat icon="menu" color="primary" @click="clickmenu ()"/> -->
        <div class="text-white text-h6" v-if="rol === 4">Tu espacio</div>
        <!-- <div>
          <q-avatar rounded v-if="rol != 1" class="bg-secondary" icon="person" style="border-radius: 10px" @click="rol !== 1 ? $router.push('/Datos') : ''"></q-avatar>
        </div> -->
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-if="drawer === true" v-model="drawer" :width="200" :breakpoint="500" overlay bordered content-class="bg-white">
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
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <div class="bg-primary full-width row" v-if="rol != null">
        <q-btn round flat stack dense no-caps v-for="(item, index) in menu" :key="index" class="col text-italic q-py-xs" :icon="item.icon" :label="item.label" color="white" size="md" @click="item.label === 'Salir' ? cerrarSesion() : $router.push(item.ruta)"/>
      </div>
      <q-btn v-else class="full-width q-pa-sm" label="Iniciar Sesión" color="primary" @click="$router.push('/login')" no-caps/>
    </q-footer>
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
          label: 'home',
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
          icon: 'location_city',
          label: 'Hoteleria',
          ruta: '/Hoteleria_pendientes',
          permission: 1
        },
        {
          icon: 'power_settings_new',
          label: 'Salir',
          ruta: '',
          permission: 1
        }
      ],
      cliente: [
        {
          icon: 'home',
          label: 'home',
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
          icon: 'power_settings_new',
          label: 'Salir',
          ruta: '',
          permission: 1
        }
      ],
      proveedor: [
        {
          icon: 'home',
          label: 'home',
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
          icon: 'power_settings_new',
          label: 'Salir',
          ruta: '',
          permission: 1
        }
      ],
      hospedador: [
        {
          icon: 'home',
          label: 'home',
          ruta: '/home_hospedador'
        },
        {
          icon: 'store',
          label: 'Espacios',
          ruta: '/new_space'
        },
        {
          icon: 'description',
          label: 'Reportes',
          ruta: '/reports'
        },
        {
          icon: 'assignment',
          label: 'Pedidos',
          ruta: '/orders'
        },
        {
          icon: 'power_settings_new',
          label: 'Salir',
          ruta: ''
        }
      ]
    }
  },
  mounted () {
    this.getUser()
    // console.log(localStorage, 'local')
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
        this.$api.get('user_logueado').then(v => {
          if (v) {
            this.rol = v.roles[0]
            if (this.rol === 1) {
              this.menu = this.admin
            } else {
              if (this.rol === 2) {
                this.menu = this.cliente
              } else {
                if (this.rol === 3) {
                  this.menu = this.proveedor
                } else {
                  if (this.rol === 4) {
                    this.menu = this.hospedador
                  } else {
                    console.log(this.rol)
                  }
                }
              }
            }
          } else {
            console.log(this.rol)
          }
        })
      }
    }
  }
}
</script>

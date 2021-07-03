<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <div class="bg-primary full-width row items-center" v-if="rol != null">
        <div class="col row justify-center items-center q-py-xs" v-for="(item, index) in menu" :key="index">
          <q-btn flat stack dense no-caps class="text-italic" :icon="item.icon" color="primary" text-color="white" size="md" @click="item.label === 'Salir' ? cerrarSesion() : ruta(item)">
            <div style="font-size: 10px">{{item.label}}</div>
          </q-btn>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MainLayout',
  data () {
    return {
      rol: null,
      menu: [],
      admin: [
        {
          icon: 'home',
          label: 'Home',
          ruta: '/inicio_administrador'
        },
        {
          icon: 'list',
          label: 'Proveedores',
          ruta: '/proveedores'
        },
        {
          icon: 'location_city',
          label: 'Hoteleria',
          ruta: '/Hoteleria_pendientes'
        },
        {
          icon: 'power_settings_new',
          label: 'Salir',
          ruta: ''
        }
      ],
      cliente: [
        {
          icon: 'home',
          label: 'Home',
          ruta: '/inicio_cliente'
        },
        {
          icon: 'store',
          label: 'Tiendas',
          ruta: '/tiendas'
        },
        {
          icon: 'home_work',
          label: 'Descanso',
          ruta: '/descanso'
        },
        {
          icon: 'assignment',
          label: 'Pedidos',
          ruta: '/mis_pedidos'
        },
        {
          icon: 'assignment',
          label: 'Reservas',
          ruta: '/mis_reservas'
        },
        {
          icon: 'power_settings_new',
          label: 'Salir',
          ruta: ''
        }
      ],
      proveedor: [
        {
          icon: 'home',
          label: 'Home',
          ruta: '/inicio_proveedor'
        },
        {
          icon: 'assignment',
          label: 'Pedidos',
          ruta: '/pedidos'
        },
        {
          icon: 'description',
          label: 'Estadísticas',
          ruta: '/estadisticas_resportes'
        },
        {
          icon: 'power_settings_new',
          label: 'Salir',
          ruta: ''
        }
      ],
      hospedador: [
        {
          icon: 'home',
          label: 'Home',
          ruta: '/inicio_hospedador'
        },
        {
          icon: 'store',
          label: 'Nuevo Espacio',
          ruta: '/nuevo_espacio'
        },
        {
          icon: 'description',
          label: 'Reportes',
          ruta: '/reportes'
        },
        {
          icon: 'assignment',
          label: 'Reservass',
          ruta: '/pedidos_hospedador'
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
            } else if (this.rol === 2) {
              this.menu = this.cliente
            } else if (this.rol === 3) {
              this.menu = this.proveedor
            } else if (this.rol === 4) {
              this.menu = this.hospedador
            }
          }
        })
      }
    },
    ruta (itm) {
      this.$router.push(itm.ruta)
    }
  }
}
</script>

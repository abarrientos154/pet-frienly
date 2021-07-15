<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated v-if="rol != null">
      <div class="bg-primary full-width row items-center">
        <div class="col row justify-center items-center q-py-xs" v-for="(item, index) in menu" :key="index">
          <q-btn flat stack dense no-caps class="text-italic" :icon="item.icon" color="primary" text-color="white" size="md" @click="item.label === 'Salir' ? cerrarSesion() : ruta(item)">
            <div style="font-size: 10px">{{item.label}}</div>
          </q-btn>
        </div>
      </div>
    </q-footer>

    <q-dialog v-model="modal">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-center text-h5 text-bold text-primary q-pb-sm">Bienvenido a PetFriendly</div>
          <div class="text-center text-subtitle2">Te invitamos a registrarte para que conozcas tiendas y alojamientos cerca de ti</div>
        </q-card-section>

        <q-card-section class="column items-center">
          <q-btn no-caps style="border-radius: 14px" label="Registrarme" color="primary" @click="$router.push('/registro')" />
          <q-btn no-caps flat dense label="Omitir" color="primary" @click="modal = false" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MainLayout',
  data () {
    return {
      rol: null,
      modal: false,
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
          ruta: '/inicio'
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
    this.get()
    const value = localStorage.getItem('TRI_SESSION_INFO')
    if (value) {
      this.getUser()
    }
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
    get () {
      var primera = localStorage.getItem('primeraVez')
      primera = JSON.parse(primera)
      if (primera) {
        this.modal = false
      } else {
        localStorage.setItem('primeraVez', JSON.stringify({ modal: true }))
        this.modal = true
      }
    },
    ruta (itm) {
      this.$router.push(itm.ruta)
    }
  }
}
</script>

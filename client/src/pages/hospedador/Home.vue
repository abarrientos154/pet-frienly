<template>
  <div class="q-pa-sm">
    <q-header elevated class="bg-primary row justify-center items-center full-width" style="height: 60px">
      <div class="text-white text-subtitle1 text-center">{{rol === 4 ? 'Tu espacio' : hospedador.spaceFile ? hospedador.my_space.name : ''}}</div>
    </q-header>

    <div class="row q-pa-sm">
      <div class="col q-mr-sm" style="max-width: 250px;">
        <q-avatar rounded style="height: 100px; width: 100%;" class="q-my-xs">
          <q-img style="height: 100%;" :src="hospedador.spaceFile ? baseu + hospedador.spaceFile.name : ''"/>
        </q-avatar>
        <div class="row justify-between">
          <q-rating v-model="ratingModel" color="grey" color-selected="orange-8" readonly size="18px"/>
          <div class="q-pa-sm text-green-9 text-bold">{{"("}}{{this.ratingModel}}{{")"}}</div>
        </div>
      </div>
      <div class="col">
        <div class="text-subtitle1 text-bold">Bienvenido</div>
        <q-scroll-area class="q-mb-sm" style="height: 75px;">
          <div class="text-caption">{{hospedador.my_space ? hospedador.my_space.description : ''}}</div>
        </q-scroll-area>
        <q-btn v-if="rol === 4" class="full-width" label="Editar perfil" color="primary" @click="$router.push('/editar_hospedador')" no-caps/>
      </div>
    </div>

    <div>
      <div class="text-subtitle1 text-bold">Informacion</div>
      <div v-if="hospedador.my_space" class="row">
        <div class="col q-mx-md">
          <div class="text-subtitle3 text-bold text-grey-6">Ciudad</div>
          <div class="text-caption text-grey-6">{{cityUser.name}}</div>
          <div class="text-subtitle3 text-bold text-grey-6">Direccion</div>
          <div class="text-caption text-grey-6">{{hospedador.my_space.direction}}</div>
          <div class="text-subtitle3 text-bold text-grey-6">Correo de contacto</div>
          <div class="text-caption text-grey-6">{{hospedador.my_space.email}}</div>
        </div>
        <div class="col q-mx-md">
          <div class="text-subtitle3 text-bold text-grey-6">Horarios de atencóon</div>
          <div class="text-caption text-grey-6">Apertura {{hospedador.my_space.hora_inicio}}</div>
          <div class="text-caption text-grey-6">Cierre {{hospedador.my_space.hora_cierre}}</div>
          <div class="text-subtitle3 text-bold text-grey-6">Telefono de contacto</div>
          <div class="text-caption text-grey-6">{{hospedador.my_space.phone}}</div>
        </div>
      </div>
    </div>

    <div class="q-pa-sm">
      <div class="text-h6 q-pb-sm">Reseñas de clientes</div>
      <q-scroll-area horizontal style="height: 150px" v-if="comentarios.length">
        <div class="row items-center no-wrap q-gutter-md q-px-sm" style="width: 100%">
          <q-card class="shadow-6" v-for="(item, index) in comentarios" :key="index" style="width: 300px; height: 125px;">
            <q-card-section horizontal style="height: 100%;">
              <q-card-section>
                <q-avatar rounded style="height: 100%; width: 100px; border-radius: 20px;" class="bg-grey">
                  <q-img style="height: 100%;" :src="baseuPerfil + item.cliente_id"/>
                </q-avatar>
              </q-card-section>
              <div class="q-py-md q-pr-md col column">
                <div class="col">
                  <q-scroll-area style="height: 55px;">
                    <div class="text-caption text-grey-8 text-italic">{{item.comentario}}</div>
                  </q-scroll-area>
                </div>
                <q-rating max="5" size="15px" v-model="item.calificacion" color="grey" color-selected="orange-8" readonly/>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
      <div v-else class="row items-center justify-center" style="height: 150px;">No hay reseñas actualmente</div>
    </div>

    <div>
      <div class="text-subtitle1 text-bold q-mb-md">Conoce los espacios disponibles</div>
      <q-list v-if="hospedajes.length" class="q-mb-md row justify-center" style="width: 100%; height: auto;">
        <q-card v-for="(item, index) in hospedajes" :key="index" class=" q-mb-md col no-wrap" style="min-width: 300px; max-width: 375px; border-radius: 12px;" @click="$router.push('/descripcion_espacio/' + item._id)">
          <q-img :src="baseuHospedador + item.images[0]" style="height: 175px;">
            <q-btn position="top-left" round icon="favorite" color="primary" size="10px" class="q-mt-sm q-ml-sm"/>
          </q-img>
          <div class="row justify-end q-mb-md q-mr-sm" style="margin-top: -70px;">
            <q-avatar rounded class="bg-orange-2 text-black q-mx-xs" icon="directions_car" size="50px" style="border-radius: 10px;"/>
            <q-avatar rounded class="bg-orange-2 text-black q-mx-xs" icon="pool" size="50px" style="border-radius: 10px;"/>
            <q-avatar rounded class="bg-orange-2 text-black q-mx-xs" icon="directions_walk" size="50px" style="border-radius: 10px;"/>
          </div>
          <q-card-section class="row justify-between">
            <div>
              <div class="text-subtitle2" style="font-size: 13px">{{item.name}}</div>
              <div class="items-center row text-grey">
                  <q-icon name="bubble_chart" size="20px" />
                  <div class="text-subtitle2" style="font-size: 12px">{{item.state}}</div>
              </div>
            </div>
            <q-btn no-caps flat dense rounded class="bg-primary text-white q-pa-sm">${{item.price}} por noche</q-btn>
          </q-card-section>
        </q-card>
      </q-list>
      <div v-else class="row items-center justify-center" style="height: 150px;">No hay alojamientos actualmente</div>
      <div class="column items-center q-mb-xl">
        <q-btn class="q-pa-sm" v-if="allhospedajes.length > 3" color="primary" :label="ver ? 'Ver menos' : 'Ver más'" style="width: 70%;" @click="verMas()" no-caps/>
      </div>
    </div>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      ver: false,
      ratingModel: 0,
      rol: 0,
      id: '',
      baseu: '',
      baseuPerfil: '',
      baseuHospedador: '',
      hospedador: {},
      user: {},
      cityUser: {},
      comentarios: [],
      allhospedajes: [],
      hospedajes: []
    }
  },
  mounted () {
    this.baseu = env.apiUrl + 'espacio_img/'
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.getUser()
  },
  methods: {
    getUser () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.rol = res.roles[0]
          if (this.rol === 4) {
            this.getHospedador(res._id)
            this.getHospedajes()
          } else if (this.rol === 2) {
            this.user = res
            if (this.$route.params.id) {
              this.id = this.$route.params.id
              this.getHospedador(this.id)
            }
          }
        }
      })
    },
    getHospedador (id) {
      this.$api.get('hospedaje_by_id/' + id).then(res => {
        if (res) {
          this.hospedador = res
          this.ratingModel = this.hospedador.my_space.calificacion
          this.ciudadUser()
          this.getHospedajes()
          this.$api.get('mis_comentarios/' + id).then(res => {
            if (res) {
              this.comentarios = res
            }
          })
        }
      })
    },
    ciudadUser () {
      this.$api.get('ciudad_by_id/' + this.hospedador.my_space.ciudad_id).then(res => {
        if (res) {
          this.cityUser = res
        }
      })
    },
    getHospedajes () {
      this.$q.loading.show({
        message: 'Cargando hospedajes'
      })
      this.$api.get('hospedaje_by_hospedador/' + this.hospedador._id).then(res => {
        if (res) {
          this.allhospedajes = res
          this.hospedajes = this.allhospedajes.slice(0, 3)
          this.baseuHospedador = env.apiUrl + 'hospedajes_img/'
          this.$q.loading.hide()
        }
      })
    },
    verMas () {
      this.ver = !this.ver
      if (this.ver) {
        this.hospedajes = this.allhospedajes
      } else {
        this.hospedajes = this.allhospedajes.slice(0, 3)
      }
    }
  }
}
</script>

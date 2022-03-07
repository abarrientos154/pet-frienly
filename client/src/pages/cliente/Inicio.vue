<template>
  <q-page style="padding-bottom: 80px;">
    <div style="height: 140px; width: 100%;" class="bg-grey">
      <img src="mascotas1.svg" style="height: 100%; width: 100%; border:none; object-fit: cover;" />
    </div>

    <div class="row q-pt-lg">
      <div class="col-12 text-center text-h5">Bienestar a 4 patas</div>
    </div>

    <div class="full-width row q-pt-md">
      <div class="col-12 row justify-around q-gutter-x-xs">

        <div
          v-for="(item, index) in services"
          :key="index"
          class="row style-card-services q-pa-md"
          :style="service === item.value ? 'background-color: #F0B418;' : ''"
          @click="service = item.value"
        >
          <div class="row col-12 justify-center">
            <q-img :src="item.icon" width="50px" height="50px" />
            <div class="col-12 text-center" :class="service === item.value ? 'text-white' : 'text-black'">{{ item.name }}</div>
          </div>
        </div>

      </div>
    </div>

    <div class="row q-pt-xl q-pa-lg">
      <q-card class="col-12 row q-pa-md q-pb-xl q-pt-xl q-gutter-y-md" style="border-radius:12px; overflow:hidden">
        <q-img src="pata2.svg" class="img-style"/>
        <div class="col-12 text-center text-bold">Busca espacio para tu mascota</div>
        <div class="col-12">
          <q-select
            outlined
            dense
            rounded
            label="Gato o Perro"
            v-model="petType"
            :options="petTypes"
            map-options
          />
        </div>
        <div v-if="!login" class="col-12">
          <q-select
            outlined
            dense
            rounded
            v-model="city"
            :options="cities"
            option-value="_id"
            option-label="name"
            emit-value
            map-options
            label="Ciudad"
          />
        </div>

        <div class="col-12 row justify-center">
          <div class="col-6">
            <q-btn
              label="Buscar"
              rounded
              color="secondary"
              style="width:100%"
              dense
              push
              @click="filtrarDatos()"
            />
          </div>
        </div>

      </q-card>
    </div>

    <section class="col-12 row q-pa-md">
      <div class="col-12 text-center text-h5">Ultimas tiendas añadidas</div>
      <q-list
        class="col-12 q-pt-md"
        v-if="lastStores.length > 0"
      >
        <q-card
          class="row q-py-xs q-px-sm items-center"
          clickable
          v-ripple
          v-for="(store, index) in lastStores"
          :key="index"
          @click="store.roles[0] === 3 ? $router.push('/inicio-proveedor/' + store._id) : $router.push('/inicio-servicios/' + store._id)"
        >
          <div class="col-4">
            <img
              :src="imgTienda + store._id"
              width="100%"
              height="70px"
              style="border-radius: 200px"
            />
          </div>
          <div class="col-7 row q-px-sm q-pl-md">
            <div class="text-bold text-subtitle1 col-12"> {{store.tienda.name}} </div>
            <div class="col-6">
              <q-rating
                v-model="store.calificacion"
                size="1em"
                :max="5"
                color="primary"
                readonly
              />
              <div class="row no-wrap items-center">
                <q-icon name="location_on" color="grey" />
                <div class="text-caption">
                  {{store.city}}
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </q-list>
      <div v-else class="col-12 text-center q-pt-md text-caption">No hay tiendas actualmente</div>
    </section>

<!--
    <div class="q-mx-md">
      <div class="q-mt-md q-mx-sm text-h5">Bienvenido Usuario</div>
      <div class="q-mb-md q-mx-sm">El amor es una palabra de cuatro patas</div>
      <div class="q-mb-md q-mx-sm text-weight-bolder">¿Qué es lo que buscas?
      <div class="text-overline">Selecciona Hospedaje o Tienda</div>
      <div class="row q-mx-sm q-mb-sm">
        <q-select outlined dense filled v-model="service" :options="services" option-value="value" option-label="name" emit-value map-options class="shadow-4 col q-mr-sm">
        </q-select>
      </div>
      </div>
      <div class="q-mb-md q-mx-sm text-weight-bolder">¿Para quién lo buscas?
      <div class="text-overline">Selecciona perro gato o ambos</div>
      <div class="row q-mx-sm q-mb-sm">
        <q-select outlined dense filled v-model="petType" :options="petTypes" map-options class="shadow-4 col q-mr-sm">
        </q-select>
      </div>
      </div>
      <div v-if="login" class="q-mb-md q-mx-sm text-weight-bolder">¿Donde estas buscando?
      <div v-if="login" class="text-overline">Selecciona tu ciudad</div>
      <div v-if="login" class="row q-mx-sm q-mb-sm">
        <q-select outlined dense filled v-model="city" :options="cities" option-value="_id" option-label="name" emit-value map-options class="shadow-4 col q-mr-sm">
        </q-select>
      </div>
      </div>
      <div class="row justify-center q-my-lg">
        <q-btn no-caps class="q-py-xs" color="primary" label="Buscar" style="width: 70%"
        :disable="login ? !service || !petType || !city ? true : false : !service || !petType ? true : false" @click="filtrarDatos()"/>
      </div>
    </div>
    <div class="q-pa-sm">
      <div class="q-mb-md text-h5 text-center">Ultimas tiendas añadidas</div>
      <q-scroll-area
          v-if="lastStores.length"
          horizontal
          style="height: 330px;"
        >
          <div class="row no-wrap q-py-md q-px-md q-gutter-md" style="width: 100%">
            <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:200px" clickable v-ripple v-for="(store, index) in lastStores" :key="index" @click="store.roles[0] === 3 ? $router.push('/inicio-proveedor/' + store._id) : $router.push('/inicio-servicios/' + store._id)">
              <q-img :src="imgTienda + store._id" style="height: 280px; width: 100%" class="column">
              </q-img>
              <div class="absolute-bottom column justify-end q-mb-md">
                <q-rating readonly class="q-mb-sm q-pl-sm" color="grey" color-selected="orange-8" v-model="store.calificacion" :max="5" size="20px" />
                <div class="bg-primary q-pl-sm" style="width:100%">
                  <div class="row no-wrap items-center" style="width:100%">
                    <div class="text-white text-subtitle1 ellipsis">{{store.tienda.name}}</div>
                  </div>
                  <div class="row no-wrap items-start" style="width:100%">
                    <q-icon name="place" class="q-pt-xs q-pr-xs text-white"/>
                    <div class="ellipsis text-caption text-white">{{store.city}} <br> {{store.tienda.direccion}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </q-scroll-area>
        <div v-else class="row items-center justify-center" style="height: 330px;">No hay tiendas actualmente</div>

      <q-card style="height: 200px" class="q-mx-md q-my-md bg-grey">
        <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%" />
      </q-card>

      <div class="q-mb-md q-mx-sm text-h5">Nuestras tiendas</div>
      <div v-if="stores.length" class="row justify-around" style="width:100%">
        <div class="col-6 q-mb-sm row justify-center" v-for="(store, index) in stores" :key="index">
            <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:95%" clickable v-ripple
            @click="store.roles[0] === 3 ? $router.push('/inicio-proveedor/' + store._id) : $router.push('/inicio-servicios/' + store._id)">
              <q-img :src="imgTienda + store._id" style="height: 280px; width: 100%">
              </q-img>
              <div class="absolute-bottom column justify-end q-mb-md">
                <q-rating readonly class="q-mb-sm q-pl-sm" color="grey" color-selected="orange-8" v-model="store.calificacion" :max="5" size="20px" />
                <div class="bg-primary q-pl-sm" style="width:100%">
                  <div class="row no-wrap items-center" style="width:100%">
                    <div class="text-white text-subtitle1 ellipsis">{{store.tienda.name}}</div>
                  </div>
                  <div class="row no-wrap items-start" style="width:100%">
                    <q-icon name="place" class="q-pt-xs q-pr-xs text-white"/>
                    <div class="ellipsis text-caption text-white">{{store.city}} <br> {{store.tienda.direccion}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
      </div>
      <div v-else class="row items-center justify-center" style="height: 280px;">No hay tiendas actualmente</div>

      <div class="row justify-center q-my-lg">
        <q-btn no-caps color="primary" label="Ver más" class="q-py-sm" style="width: 70%;" @click="$router.push('/tiendas')"/>
      </div>

      <q-card style="height: 200px" class="q-mx-md q-my-md bg-grey">
        <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%" />
      </q-card>

      <div class="q-mb-md text-center text-h5">Ultimos alojamientos</div>
      <q-scroll-area
          v-if="lastHost.length"
          horizontal
          style="height: 340px;"
        >
          <div class="row no-wrap q-py-md q-px-md q-gutter-md" style="width:100%">
            <q-card style="border-radius: 15px; width:330px" clickable v-ripple v-for="(item, index) in lastHost" :key="index" @click="$router.push('/inicio-hospedador/' + item._id)">
               <q-img :src="imgProfile + item._id" style="height: 200px; width: 100%">
              </q-img>
              <div class="row justify-center items-center q-ma-md">
                <div class="row no-wrap items-center" style="width:100%">
                  <div class="text-grey-8 text-bold text-subtitle1 ellipsis">{{item.my_space.name}}</div>
                </div>
                <div class="row no-wrap items-start" style="width:100%">
                  <q-icon name="place" class="q-pt-xs q-pr-xs text-grey-8"/>
                  <div class="text-grey-8 ellipsis text-caption col-10">{{item.country}} <br> {{item.city}}</div>
                </div>
              </div>
            </q-card>
          </div>
        </q-scroll-area>
        <div v-else class="row items-center justify-center" style="height: 330px;">No hay alojamientos actualmente</div>

      <div class="q-mb-md q-mx-sm text-h5">Alojamientos</div>
      <div v-if="host.length" class="row justify-around">
        <div class="row justify-center col-6 q-mb-sm" v-for="(item, index) in host" :key="index">
            <q-card style="border-top-left-radius: 24px; border-top-right-radius: 24px; width:95%" clickable v-ripple
            @click="$router.push('/inicio-hospedador/' + item._id)">
              <q-img :src="imgProfile + item._id" style="height: 280px; width: 100%">
              </q-img>
              <div class="absolute-bottom q-pl-sm column justify-end q-mb-md bg-primary">
                <div class="row no-wrap items-center" style="width:100%">
                  <div class="text-white text-subtitle1 ellipsis">{{item.my_space.name}}</div>
                </div>
                <div class="row no-wrap items-start" style="width:100%">
                  <q-icon name="place" class="q-pt-xs q-pr-xs text-white"/>
                  <div class="ellipsis text-white text-caption">{{item.city}} <br> {{item.my_space.direction}}</div>
                </div>
              </div>
            </q-card>
          </div>
      </div>
      <div v-else class="row items-center justify-center" style="height: 280px;">No hay alojamientos actualmente</div>

      <div class="row justify-center q-my-lg">
        <q-btn no-caps color="primary" label="Ver más" class="q-py-sm" style="width: 70%;" @click="$router.push('/descanso')"/>
      </div>
    </div>
 -->

    <q-page-sticky v-if="user._id" position="bottom-right" :offset="[18, 18]">
      <q-fab color="primary" icon="pets" label="Mis acciones" no-caps direction="up" vertical-actions-align="right">
        <q-fab-action label-class="bg-primary text-white text-subtitle2 q-py-xs" external-label label-position="left"
          color="primary" icon="person" label="Editar perfil" @click="$router.push('/editar-perfil/' + user._id)" />
        <q-fab-action label-class="bg-primary text-white text-subtitle2 q-py-xs" external-label label-position="left"
          color="primary" icon="pets" label="Mascotas" @click="$router.push('/mascotas')" />
      </q-fab>
    </q-page-sticky>

    <q-page-sticky v-if="!login" position="bottom-right" :offset="[18, 18]">
      <q-btn no-caps class="q-pa-xs" rounded color="primary" label="¡Regístrate ahora!" to="/login" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import env from '../../env'
export default {
  components: {
  },
  data () {
    return {
      service: 1,
      petType: null,
      city: null,
      login: true,
      imgTienda: '',
      imgProfile: '',
      urlHospedaje: '',
      user: {},
      stores: [],
      lastStores: [],
      host: [],
      lastHost: [],
      cities: [],
      petTypes: ['Perros', 'Gatos', 'Ambos'],
      services: [
        { name: 'Hospedaje', value: 1, icon: 'ihospedaje1.svg' },
        { name: 'Servicios', value: 3, icon: 'iservicio1.svg' },
        { name: 'Tienda', value: 2, icon: 'itienda1.svg' }
      ],
      itemSelect: 1,
      items: [
        { title: 'Hospedaje', value: 1, icon: 'ihospedaje1.svg' },
        // { title: 'Servicios', value: 2, icon: 'iservicio1.svg' },
        { title: 'Tienda', value: 3, icon: 'itienda1.svg' }
      ]
    }
  },
  mounted () {
    this.urlHospedaje = env.apiUrl + 'hospedaje_img'
    const value = localStorage.getItem('TRI_SESSION_INFO')
    if (value) {
      this.getUser()
      this.getCities()
      this.getStore()
      this.getHost()
    } else {
      this.login = false
      this.getStore()
      this.getHost()
    }
  },
  methods: {
    getUser () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
        }
      })
    },
    async getCities () {
      await this.$api.get('ciudades').then(res => {
        if (res) {
          this.cities = res
        }
      })
    },
    async getStore () {
      await this.$api.post(this.login ? 'user_by_rol' : 'user_by_rol_no_logueo', { rol: [3, 5] }).then(res => {
        this.imgTienda = env.apiUrl + 'tienda_img/'
        if (res) {
          this.stores = res.slice(0, 4)
          const total = [...res]
          this.lastStores = total.reverse().slice(0, 10)
        }
      })
    },
    async getHost () {
      await this.$api.post(this.login ? 'user_by_rol' : 'user_by_rol_no_logueo', { rol: [4] }).then(res => {
        this.imgProfile = env.apiUrl + 'espacio_img/'
        if (res) {
          this.host = res.slice(0, 4)
          const total = [...res]
          this.lastHost = total.reverse().slice(0, 10)
        }
      })
    },
    filtrarDatos () {
      if (this.service === 1) {
        if (!this.login) {
          this.$router.push('descanso/' + this.petType + '/' + this.city)
        } else {
          this.$router.push('descanso/' + this.petType)
        }
      } else if (this.service === 3) {
        this.$router.push('tiendas/' + this.petType + '?service=' + this.service)
      } else {
        if (!this.login) {
          this.$router.push('tiendas/' + this.petType + '/' + this.city)
        } else {
          this.$router.push('tiendas/' + this.petType)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.style-card-services {
  border: 1px solid black;
  border-radius: 100%;
  height: 110px;
  width: 110px;
}

.img-style {
  position:absolute;
  top:-25px;
  left:-10px;
  transform: rotate(117deg);
  width: 60px;
  height: 60px;
}

.div-btn {
  border-radius: 20px;
}

</style>

<style lang="sass" scoped>
.bordes
  border-top-left-radius: 0px
  border-top-right-radius: 30px
  border-bottom-left-radius: 30px
  border-bottom-right-radius: 30px

</style>

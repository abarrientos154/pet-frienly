<template>
  <div>
    <q-header elevated class="bg-primary row justify-center items-center" style="width:100%; height:60px">
      <div class="text-white text-subtitle1 text-center">{{tienda.name}}</div>
    </q-header>

    <div class="row q-pa-sm">
      <div class="col-6">
        <q-img style="height: 100%; width: 100%" :src="baseuTienda + id"/>
        <div class="q-gutter-y-md row">
          <q-rating
            v-model="tienda.calificacion"
            color="orange"
            readonly
            size="25px"
            icon="star"
          />
        <div class="q-pa-sm text-green-9 text-bold">({{tienda.calificacion ? tienda.calificacion : 0}})</div>
        </div>
      </div>
      <div class="col-6 q-pl-sm">
        <div class="text-bold text-subtitle1">Bienvenido</div>
        <div>{{tienda.descripcion}}</div>
        <div v-if="miTienda" class="q-pt-sm">
          <q-btn label="Editar perfil" color="primary" no-caps style="width: 100%" to="/editar_proveedor"/>
        </div>
      </div>
    </div>

    <div class="q-pa-sm q-mt-md">
      <div class="text-h6">Servicios ofrecidos</div>
      <q-scroll-area
          v-if="tienda.servicios && tienda.servicios.length"
          horizontal
          style="height: 160px;"
        >
          <div class="row no-wrap q-py-sm q-px-md q-gutter-md">
            <q-card style="border-radius: 50px; width:140px; height:140px" clickable v-ripple v-for="(item, index) in tienda.servicios" :key="index"
            @click="servicio = item, verServicio = true">
              <q-img :src="baseuServicios + item._id" style="height: 100%; width: 100%; border-radius: 50px" >
                <div class="full-width text-center absolute-bottom">{{item.servicio.name}}</div>
              </q-img>
            </q-card>
          </div>
      </q-scroll-area>
    </div>

    <div class="q-pa-sm">
      <div class="text-h6">Informacion</div>
      <div class="row q-mx-md">
        <div class="col-6">
          <div class="text-subtitle2 text-grey-8">Ciudad</div>
          <div class="text-caption text-grey-8">{{tienda.city ? tienda.city.name : ''}}</div>
          <div class="text-subtitle2 text-grey-8">Direccion</div>
          <div class="text-caption text-grey-8">{{tienda.direccion}}</div>
          <div class="text-subtitle2 text-grey-8">Correo de contacto</div>
          <div class="text-caption text-grey-8">{{tienda.email}}</div>
          <div class="text-subtitle2 text-grey-8">Telefono de contacto</div>
          <div class="text-caption text-grey-8">{{tienda.phone}}</div>
        </div>
        <div class="col-6">
          <div class="text-subtitle2 text-grey-8">Horarios de atencóon</div>
          <div class="text-caption text-grey-8">Apertura {{tienda.hora_inicio}}</div>
          <div class="text-caption text-grey-8">Cierre {{tienda.hora_cierre}}</div>
          <div class="text-subtitle2 text-grey-8">Despacho a regiones</div>
          <div class="text-caption text-grey-8">{{tienda.despachoReg ? 'Habilitado' : 'Deshabilitado'}}</div>
          <div class="text-subtitle2 text-grey-8">Delivery</div>
          <div class="text-caption text-grey-8">{{tienda.delivery ? tienda.deliveryGratis ? 'Gratuito' : tienda.deliveryValor : 'Deshabilitado'}}</div>
        </div>
      </div>
    </div>

    <div class="q-pa-sm">
      <div class="text-h6">Reseñas de clientes</div>
      <q-scroll-area horizontal style="height: 150px">
        <div class="row no-wrap q-gutter-md" style="width: 100%">
          <q-card class="shadow-6" v-for="index in 3" :key="index" style="width: 300px; height: 125px;">
            <q-card-section horizontal style="height: 100%;">
              <q-card-section>
                <q-avatar rounded style="height: 100%; width: 100px; border-radius: 20px;" class="bg-grey">
                  <q-img style="height: 100%;" :src="''"/>
                </q-avatar>
              </q-card-section>
              <div class="q-py-md q-pr-md col column">
                <div class="text-subtitle3 text-bold">Titulo del comentario</div>
                <div class="col">
                  <q-scroll-area style="height: 55px;">
                    <div class="text-caption text-grey-6 text-italic">{{'Descripcion'}}</div>
                  </q-scroll-area>
                </div>
                <q-rating max="5" size="15px" v-model="rating" color="grey" color-selected="orange-8" readonly/>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
    </div>

    <div class="q-pa-sm">
      <div class="text-h6 text-grey-8 text-center">Ultimos productos agregados</div>
      <q-scroll-area
        v-if="ultimos.length"
        horizontal
        style="height: 330px; width:100%">
        <div class="row no-wrap q-gutter-md" style="width: 100%">
          <q-card v-for="(item, index) in ultimos" :key="index" v-ripple clickable style="width: 200px; height: 300px; border-radius: 20px">
            <q-img :src="baseuproductos + item.images[0]" style="width: 100%; height: 100%; border-radius: 20px">
              <div class="column justify-between bg-transparent" style="width: 100%; height:100%">
                <div class="absolute-top row justify-between items-center q-mt-sm" style="width:100%">
                  <div class="col-8">
                    <div v-if="!item.oferta" class="bg-primary text-subtitle2 q-px-sm ellipsis"
                      style="border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                      ${{item.price}}
                    </div>
                    <div v-if="item.oferta" class="bg-orange-9 text-subtitle2 q-px-sm ellipsis"
                      style="border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                      ${{item.oferta_price}}
                    </div>
                  </div>
                  <div class="col-3">
                    <q-btn v-if="miTienda" flat round color="grey-10" icon="edit" @click="$router.push('/editar_producto/' + item._id)" />
                  </div>
                </div>
                <div class="bg-primary absolute-bottom q-mb-md" style="width:100%">
                  <div class="text-subtitle2 text-center ellipsis q-px-xs">{{item.name}}</div>
                </div>
              </div>
            </q-img>
          </q-card>
        </div>
      </q-scroll-area>

      <div class="text-h6 text-grey-8 text-center q-mb-md">Busca por categoria de productos</div>
      <q-scroll-area
          horizontal
          style="height: 60px;"
        >
          <div class="row no-wrap q-gutter-md items-center">
            <div v-for="(item, index) in categorias" :key="index">
              <q-btn no-caps :color="filterSelec === item._id ? 'positive' : 'grey'" text-color="grey-10" :label="item.name" style="min-width:150px"
              @click="filtrar(item._id)" />
            </div>
          </div>
      </q-scroll-area>

        <div class="row justify-around q-mt-xs">
          <div class="col-6 row justify-center" v-for="(item, index) in productosFilter" :key="index">
            <q-card v-ripple clickable style="width: 95%; height: 300px; border-radius: 20px">
              <q-img :src="baseuproductos + item.images[0]" style="width: 100%; height: 100%; border-radius: 20px">
                <div class="column justify-between bg-transparent" style="width: 100%; height:100%">
                  <div class="absolute-top row justify-between items-center q-mt-sm" style="width:100%">
                    <div class="col-8">
                      <div v-if="!item.oferta" class="bg-primary text-subtitle2 q-px-sm ellipsis"
                        style="border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                        ${{item.price}}
                      </div>
                      <div v-if="item.oferta" class="bg-orange-9 text-subtitle2 q-px-sm ellipsis"
                        style="border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                        ${{item.oferta_price}}
                      </div>
                    </div>
                    <div class="col-3">
                      <q-btn v-if="miTienda" flat round color="grey-10" icon="edit" @click="$router.push('/editar_producto/' + item._id)" />
                    </div>
                  </div>
                  <div class="bg-primary absolute-bottom q-mb-md" style="width:100%">
                    <div class="text-subtitle2 text-center ellipsis q-px-xs">{{item.name}}</div>
                  </div>
                </div>
              </q-img>
            </q-card>
          </div>
        </div>
      <div class="row justify-center q-mt-md">
        <q-btn v-if="allFilter.length > 4" class="q-py-xs" no-caps color="primary" :label="!ver1 ? 'Ver más' : 'Ver menos'" style="width:80%"
        @click="verMas(1)" />
      </div>

      <div class="text-h6 text-grey-8 text-center q-my-md">Todos los productos</div>
      <div class="row justify-around">
          <div class="col-6 row justify-center" v-for="(item, index) in productos" :key="index">
            <q-card v-ripple clickable style="width: 95%; height: 300px; border-radius: 20px">
              <q-img :src="baseuproductos + item.images[0]" style="width: 100%; height: 100%; border-radius: 20px">
                <div class="column justify-between bg-transparent" style="width: 100%; height:100%">
                  <div class="absolute-top row justify-between items-center q-mt-sm" style="width:100%">
                    <div class="col-8">
                      <div v-if="!item.oferta" class="bg-primary text-subtitle2 q-px-sm ellipsis"
                        style="border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                        ${{item.price}}
                      </div>
                      <div v-if="item.oferta" class="bg-orange-9 text-subtitle2 q-px-sm ellipsis"
                        style="border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                        ${{item.oferta_price}}
                      </div>
                    </div>
                    <div class="col-3">
                      <q-btn v-if="miTienda" flat round color="grey-10" icon="edit" @click="$router.push('/editar_producto/' + item._id)" />
                    </div>
                  </div>
                  <div class="bg-primary absolute-bottom q-mb-md" style="width:100%">
                    <div class="text-subtitle2 text-center ellipsis q-px-xs">{{item.name}}</div>
                  </div>
                </div>
              </q-img>
            </q-card>
          </div>
        </div>
      <div class="row justify-center q-mt-md">
        <q-btn v-if="allProductos.length > 6" class="q-py-xs" no-caps color="primary" :label="!ver2 ? 'Ver más' : 'Ver menos'" style="width:80%"
        @click="verMas(2)" />
      </div>
    </div>

    <q-page-sticky v-if="miTienda" position="bottom-right" :offset="[18, 18]">
      <q-fab color="primary" icon="add" direction="up" vertical-actions-align="right">
        <q-fab-action label-class="bg-grey-4 text-grey-10" external-label label-position="left"
          color="primary" icon="add_shopping_cart" label="Producto" @click="$router.push('/registro_producto')" />
        <q-fab-action label-class="bg-grey-4 text-grey-10" external-label label-position="left"
          color="primary" icon="add_business" label="Servicio" @click="$router.push('/registro_servicio')" />
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="verServicio">
      <q-card class="q-py-lg" style="width:100%; border-radius: 20px">
        <div>
          <div class="text-center text-h5 text-bold text-grey-8 q-mb-sm">{{servicio.servicio? servicio.servicio.name : 'Tipo de servicio'}}</div>
          <div class="row justify-center">
            <img :src="baseuServicios + servicio._id" style="height: 190px; width: 190px; border-radius: 20px" />
          </div>
          <div class="text-center text-subtitle1 text-grey-9 q-pa-lg">{{servicio.description}}</div>
          <div class="q-px-md">
            <div class="text-subtitle1 text-bold">Detalles del servicio ofrecido</div>
            <div class="row items-center">
              <div class="text-subtitle1 text-bold">Disponible: </div>
              <div class="text-subtitle1 q-pl-sm">{{servicio.destinatario}}</div>
            </div>
            <div class="row items-center">
              <div class="text-subtitle1 text-bold">Valor por hora: </div>
              <div class="text-subtitle1 q-pl-sm">${{servicio.price}}</div>
            </div>
          </div>
        </div>

        <div class="row justify-center q-my-lg">
          <q-btn v-if="miTienda" class="q-py-xs" no-caps color="primary" label="Editar servicio" style="width:80%"
          @click="$router.push('/editar_servicio/' + servicio._id)"/>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import env from '../../env'
export default {
  components: {
  },
  data () {
    return {
      ver1: false,
      ver2: false,
      miTienda: false,
      verServicio: false,
      id: '',
      filterSelec: '',
      baseuTienda: '',
      baseuproductos: '',
      baseuServicios: '',
      text: '',
      rating: 4,
      user: {},
      tienda: {
        calificacion: 0
      },
      servicio: {},
      allProductos: [],
      ultimos: [],
      productos: [],
      allFilter: [],
      productosFilter: [],
      categorias: []
    }
  },
  mounted () {
    this.baseuTienda = env.apiUrl + 'tienda_img/'
    this.baseuproductos = env.apiUrl + 'productos_img/'
    this.baseuServicios = env.apiUrl + 'servicio_img/'
    this.getUser()
    this.getCategorias()
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.getTienda(this.id)
      this.getProductos(this.id)
    }
  },
  methods: {
    async getUser () {
      await this.$api.get('user_logueado').then(v => {
        if (v) {
          this.user = v
          if (this.user.roles[0] === 3) {
            this.id = this.user._id
            this.getTienda(this.user._id)
            this.getProductos(this.user._id)
          }
        }
      })
    },
    async getTienda (id) {
      await this.$api.get('tienda_by_id/' + id).then(v => {
        if (v) {
          this.tienda = v.tienda
          if (this.user._id === v._id) {
            this.miTienda = true
          } else {
            this.miTienda = false
          }
        }
      })
    },
    getProductos (id) {
      this.$q.loading.show({
        message: 'Cargando productos'
      })
      this.$api.get('producto_by_proveedor/' + id).then(res => {
        if (res) {
          this.allProductos = res
          var tot = res.slice()
          this.ultimos = tot.reverse().slice(0, 10)
          this.productos = this.allProductos.slice(0, 6)
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    getCategorias () {
      this.$api.get('categorias').then(res => {
        if (res) {
          this.categorias = res
        }
      })
    },
    filtrar (id) {
      this.filterSelec = id
      this.allFilter = this.allProductos.filter(v => v.categoria_id === id)
      this.productosFilter = this.allFilter.slice(0, 4)
    },
    verMas (val) {
      if (val === 1) {
        if (!this.ver1) {
          this.productosFilter = this.allFilter
        } else {
          this.productosFilter = this.allFilter.slice(0, 4)
        }
        this.ver1 = !this.ver1
      } else {
        if (!this.ver2) {
          this.productos = this.allProductos
        } else {
          this.productos = this.allProductos.slice(0, 6)
        }
        this.ver2 = !this.ver2
      }
    }
  }
}
</script>

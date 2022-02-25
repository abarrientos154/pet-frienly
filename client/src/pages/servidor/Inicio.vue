<template>
  <div>
    <q-header elevated class="bg-primary row justify-center items-center" style="width:100%; height:60px">
      <div class="text-white text-subtitle1 text-center">{{tienda.name}}</div>
    </q-header>

    <div class="row q-pa-sm">
      <div class="col-6">
        <img style="height: 150px; width: 100%" :src="baseuTienda + id"/>
        <div class="row items-center">
          <q-rating
            v-model="tienda.calificacion"
            class="col-11"
            color="orange"
            readonly
            size="25px"
            icon="star"
          />
        <div class="col-1 text-green-9 text-bold">({{tienda.calificacion ? tienda.calificacion : 0}})</div>
        </div>
      </div>
      <div class="col-6 q-pl-sm">
        <div class="text-bold text-subtitle1">Bienvenido</div>
        <div>{{tienda.descripcion}}</div>
        <div v-if="miTienda" class="q-pt-sm">
          <q-btn label="Editar perfil" color="primary" no-caps style="width: 100%" to="/editar_servicios"/>
        </div>
      </div>
    </div>

    <div class="q-pa-sm q-mt-md">
      <div class="text-h6">Servicios ofrecidos</div>
      <q-scroll-area
          v-if="servicios.length"
          horizontal
          style="height: 160px;"
        >
          <div class="row no-wrap q-py-sm q-px-md q-gutter-md">
            <q-card style="border-radius: 50px; width:140px; height:140px" clickable v-ripple v-for="(item, index) in servicios" :key="index"
            @click="servicio = item, verServicio = true">
              <q-img :src="baseuServicios + item._id" style="height: 100%; width: 100%; border-radius: 50px" >
                <div class="full-width text-center absolute-bottom bg-primary">{{item.servicio.name}}</div>
              </q-img>
            </q-card>
          </div>
      </q-scroll-area>
      <div v-else class="row items-center justify-center" style="height: 160px;">No hay servicios actualmente</div>
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

    <q-page-sticky v-if="miTienda" position="bottom-right" :offset="[18, 18]">
      <q-fab color="primary" icon="add" label="Nuevo" no-caps direction="up" vertical-actions-align="right">
        <q-fab-action label-class="bg-primary text-white text-subtitle2 q-py-xs" external-label label-position="left"
          color="primary" icon="add_business" label="Servicio" @click="$router.push('/registro_servicio')" />
      </q-fab>
    </q-page-sticky>

    <q-page-sticky v-if="miTienda === false && login" position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="shopping_bag" color="primary" @click="verCarrito = true" />
    </q-page-sticky>

    <q-dialog v-model="verServicio" maximized>
      <q-card class="text-black q-mr-lg q-pt-md">
        <section class="section-img">
          <div class="content">
            <div class="row col-12 items-center">
              <q-btn icon="arrow_back_ios" flat v-close-popup round  />
            </div>
            <div class="row q-pt-lg q-pa-md">
              <div class="col-12 row items-center" style="height:70px">
                <div class="col-4">
                  <q-avatar rounded style="width:100%;height:100px" >
                    <img :src="baseuServicios + servicio._id" style="height: 100%; width: 100%; border-radius: 20px" />
                  </q-avatar>
                </div>
                <div class="col-7 q-pl-md text-h6">
                  {{servicio.servicio? servicio.servicio.name : 'Tipo de servicio'}}
                </div>
              </div>
            </div>
          </div>
        </section>

        <q-card class="q-pt-lg shadow q-px-md q-mt-lg">
          <div class="row text-center">
            <div class="text-h6 col-12"> Consulta por hora </div>
            <div class="text-h6 col-12"> ${{formatPrice(servicio.price)}} </div>
          </div>
          <div class="row q-gutter-y-md q-pt-xl">

            <div class="row col-12 items-center q-gutter-x-sm">
              <q-icon name="check_circle" size="md" color="positive" />
              <div class="text-caption"> {{servicio.description}} </div>
            </div>

            <div class="row col-12 items-center q-gutter-x-sm">
              <q-icon name="check_circle" size="md" color="positive" />
              <div class="text-caption"> {{servicio.destinatario === 'Ambos' ? 'Perros y Gatos' : servicio.destinatario}} </div>
            </div>

          </div>
        </q-card>

        <div class="row justify-center q-my-lg fixed-bottom q-pr-lg">
          <q-btn v-if="miTienda" class="q-py-xs" no-caps color="primary" label="Editar servicio" style="width:70%"
          @click="$router.push('/editar_servicio/' + servicio._id)"/>
          <q-btn v-if="miTienda" flat no-caps color="red" icon="delete"
          @click="eliminarServicio(servicio._id)"/>
          <q-btn v-if="miTienda === false" class="q-py-sm" no-caps color="primary" label="Agregar al carro" style="width:80%"
          @click="login ? addCarrito(servicio) : nologin = true, verServicio = false"/>
        </div>
      </q-card>

      <!--

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
              <div class="text-subtitle1 q-pl-sm">{{servicio.destinatario === 'Ambos' ? 'Perros y Gatos' : servicio.destinatario}}</div>
            </div>
            <div class="row items-center">
              <div class="text-subtitle1 text-bold">Valor por hora: </div>
              <div class="text-subtitle1 q-pl-sm">${{formatPrice(servicio.price)}}</div>
            </div>
          </div>
        </div>

        <div class="row justify-center q-my-lg">
          <q-btn v-if="miTienda" class="q-py-xs" no-caps color="primary" label="Editar servicio" style="width:70%"
          @click="$router.push('/editar_servicio/' + servicio._id)"/>
          <q-btn v-if="miTienda" flat no-caps color="red" icon="delete"
          @click="eliminarServicio(servicio._id)"/>
          <q-btn v-if="miTienda === false" class="q-py-sm" no-caps color="primary" label="Agregar al carro" style="width:80%"
          @click="login ? addCarrito(servicio) : nologin = true, verServicio = false"/>
        </div>
      </q-card>
      -->
    </q-dialog>

    <q-dialog v-model="verCarrito" maximized persistent>
      <q-card style="width: 100%">
        <q-toolbar class="bg-primary row items-center" style="width:100%; height:60px">
          <div class="col-1">
            <q-btn flat round color="white" icon="arrow_back" @click="verCarrito = false"/>
          </div>
          <div class="col-10 text-white text-subtitle1 text-center">Carro de compra</div>
        </q-toolbar>

        <q-scroll-area style="height: 65%; width: 100%;">
          <div class="q-px-md q-pt-xl">
            <q-list class="q-gutter-md" v-if="carrito.length">
              <div v-for="(producto, index) in carrito" :key="index">
                <div class="row items-start justify-start q-ma-xs">
                  <div class="col-3 q-mr-sm column justify-start items-start">
                    <img
                      :src="producto.servicio ? baseuServicios + producto.image : baseuproductos + producto.image"
                      spinner-color="white"
                      style="height: 100px; width: 100%; border-radius: 10px"/>
                  </div>

                  <div class="col-8 row items-between" style="height: 100px">
                    <div class="col-12 row justify-between items-strat">
                      <div class="row no-wrap q-pl-sm col-11">
                        <div class="text-subtitle1 ellipsis">{{producto.name}}</div>
                      </div>
                      <div class="col-1">
                        <q-btn flat round no-caps dense color="grey-6" icon="delete"
                        @click="deleteProdCarrito(index)" />
                      </div>
                    </div>

                    <div class="col-12 row justify-between items-end">
                      <div class="q-ml-sm">
                        <div class="text-h6 text-primary">${{!producto.oferta ? formatPrice(producto.price) : formatPrice(producto.oferta_price)}} </div>
                      </div>
                      <div class="row">
                        <div>
                          <q-btn size="12px" dense color="grey" icon="remove" @click="editCantidad(index, false)" />
                        </div>
                        <div class="text-primary text-h6 q-px-sm">{{producto.cantidad_compra}}</div>
                        <div>
                          <q-btn size="12px" dense color="primary" icon="add" @click="editCantidad(index, true)" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-list>
            <div v-else class="text-center">Agrega servicios al carro de compra</div>
          </div>
        </q-scroll-area>

        <div class="q-pt-lg q-px-md">
          <div class="row justify-between" style="width:100%">
            <div class="text-subtitle1 text-grey-8">Cantidad de servicios</div>
            <div class="text-subtitle1 text-primary">{{totalProductos}}</div>
          </div>
          <q-separator />
          <div class="row justify-between q-my-lg" style="width:100%">
            <div class="text-subtitle1 text-grey-8">Precio total</div>
            <div class="text-h6 text-primary">${{formatPrice(totalCarrito)}}</div>
          </div>
        </div>

        <div class="row justify-center q-pb-md" style="width:100%">
          <q-btn :disable="carrito.length ? false : true" @click="$v.direccion.$reset(), comprarCarrito = true, verCarrito = false" no-caps label="Pagar" color="primary" class="q-py-sm" style="width: 80%;" />
        </div>
      </q-card>
    </q-dialog>

    <q-dialog persistent maximized v-model="comprarCarrito">
      <q-card style="width: 100%">
        <q-toolbar class="bg-primary row items-center" style="width:100%; height:60px">
          <div class="col-1">
            <q-btn flat round color="white" icon="arrow_back" @click="verCarrito = true, comprarCarrito = false"/>
          </div>
          <div class="col-10 text-white text-subtitle1 text-center">Check Out</div>
        </q-toolbar>
        <div class="q-px-md q-pt-xl row items-between container" style="height:92%">
          <div class="col-12">
            <div class="q-px-sm">
              <div class="text-h6 text-grey-8 text-subtitle1">Dirección de envío</div>
              <div class="col-12 row container-dir shadow-1">

                <div class="row col-12">
                  <div class="col-12">Seleccione una ciudad</div>
                  <div class="col-12">
                    <q-select dense v-model="city" :options="cities" option-value="_id" label="Ciudad de destino" option-label="name" emit-value map-options error-message="Requerido" :error="$v.city.$error" @blur="$v.city.$touch()" />
                  </div>
                </div>

                <div class="row col-12">
                  <div class="q-pt-sm col-12">Ingrese una dirección</div>
                  <div class="col-12">
                    <q-input dense v-model="direccion" placeholder="Dirección del envio" error-message="Requerido" :error="$v.direccion.$error" @blur="$v.direccion.$touch()" />
                  </div>
                </div>

              </div>

              <div class="text-h6 text-subtitle1 text-grey-8 q-mt-lg">Pedido</div>
              <section class="container-dir shadow-1 q-gutter-y-sm q-mt-xs">
                <div class="row justify-between" style="width:100%">
                  <div class="text-subtitle1 text-grey-8">Cantidad de productos</div>
                  <div class="text-subtitle1 text-bold">{{totalProductos}}</div>
                </div>
                <div class="row justify-between items-center" style="width:100%">
                  <div class="text-subtitle1 text-grey-8">Total a pagar</div>
                  <div class="text-h6 text-bold">${{formatPrice(totalCarrito)}}</div>
                </div>
                <div class="row justify-between" style="width:100%">
                  <div class="text-subtitle1 text-grey-8">Precio total</div>
                  <div class="text-h6 text-bold">${{formatPrice(totalCarrito)}}</div>
                </div>
              </section>

            </div>
          </div>
          <div class="col-12 q-py-lg column justify-end items-end">

            <div class="row justify-center" style="width:100%">
              <q-btn
                :disable="carrito.length ? false : true"
                @click="iniciarCompra()"
                label="Pagar"
                color="blue"
                class="q-py-sm"
                style="width: 80%;"
                push
              />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog persistent maximized v-model="compraExitosa">
      <q-card class="flex flex-center">
        <div class="column">

          <div class="col-12 q-mt-md" style="height:100px">
            <img src="logo1.svg" width="100%" height="100%" />
          </div>

          <div class="col-12 text-center text-h4 text-grey-7">
            Todo ha ido bien!
          </div>

          <div class="col-12 q-pt-xl row justify-center">
            <q-icon name="check_circle" size="150px" color="positive" />
          </div>

          <div class="col-12 text-center text-subtitle1 q-px-xl text-grey-8">
            Tu orden sera entregada muy pronto en la puerta de tu hogar!
          </div>

          <div class="q-pt-xl col-12 justify-center column items-center q-gutter-sm">
            <q-btn
              no-caps
              push
              style="width:60%"
              color="blue"
              label="Volver a tienda"
              @click="compraExitosa = false"
            />
          </div>
        </div>
      </q-card>
      <!--
      <q-card style="width: 100%; height: 100%">
        <div class="absolute-center full-width column justify-between">
          <div class="q-pb-xl">
            <div class="row justify-center q-pb-lg">
              <img src="logo.png" style="width:260px" />
            </div>
            <div class="text-h5 text-bold text-center text-grey-9 q-px-md">Tu pedido ha sido comprado con éxito</div>
            <div class="text-caption text-center">Puedes ver tu pedido en tu panel de pedidos</div>
          </div>

          <div class="q-pt-xl column items-center q-gutter-sm">
            <q-btn no-caps rounded class="q-py-xs" color="primary" label="Volver a tienda" style="width: 60%"
              @click="compraExitosa = false"/>
          </div>
        </div>
      </q-card>
       -->
    </q-dialog>

    <q-dialog persistent maximized v-model="compraFallo">
      <q-card style="width: 100%; height: 100%">
        <div class="absolute-center full-width column justify-between">
          <div class="q-pb-xl">
            <div class="row justify-center q-pb-lg">
              <img src="logo.png" style="width:260px" />
            </div>
            <div class="text-h5 text-bold text-center text-grey-9 q-px-md">Tu compra ha fallado</div>
            <div class="text-caption text-center">Te estamos redireccionando a la tienda</div>
          </div>

          <div class="q-pt-xl column items-center q-gutter-sm">
            <q-btn no-caps rounded class="q-py-xs" color="primary" label="Volver a tienda" style="width: 60%"
              @click="compraFallo = false"/>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="nologin">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-center text-subtitle1">Para poder adquirir un servicio debes tener una cuenta.</div>
          <div class="text-center text-h6">¿Deseas registrarte?</div>
        </q-card-section>

        <q-card-section class="column items-center">
          <q-btn no-caps style="border-radius: 14px" label="Registrarme" color="primary" @click="$router.push('/registro')" />
          <div class="row items-center">
            <div>Ya tengo una cuenta</div>
            <q-btn no-caps flat dense class="text-subtitle1 text-bold" color="primary" @click="$router.push('/login')" >Iniciar Sesión</q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import env from '../../env'
import { required } from 'vuelidate/lib/validators'
export default {
  components: {
  },
  data () {
    return {
      verServicio: false,
      verCarrito: false,
      comprarCarrito: false,
      compraExitosa: false,
      compraFallo: false,
      login: true,
      nologin: false,
      miTienda: null,
      city: null,
      direccion: '',
      id: '',
      baseuTienda: '',
      baseuServicios: '',
      baseuPerfil: '',
      text: '',
      rating: 4,
      user: {},
      tienda: {
        calificacion: 0
      },
      servicio: {},
      form: {},
      servicios: [],
      cities: [],
      comentarios: [],
      carrito: []
    }
  },
  validations: {
    direccion: { required },
    city: { required }
  },
  computed: {
    totalCarrito () {
      let total = 0
      if (this.carrito.length > 0) {
        for (const i of this.carrito) {
          if (!i.oferta) {
            total = total + (i.price * i.cantidad_compra)
          } else {
            total = total + (i.oferta_price * i.cantidad_compra)
          }
        }
      }
      return total
    },
    totalProductos () {
      const total = this.carrito.length
      /* if (this.carrito.length > 0) {
        for (const i of this.carrito) {
          total = total + i.cantidad_compra
        }
      } */
      return total
    }
  },
  mounted () {
    this.baseuTienda = env.apiUrl + 'tienda_img/'
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuServicios = env.apiUrl + 'servicio_img/'
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.getTienda(this.id)
    }
    const value = localStorage.getItem('TRI_SESSION_INFO')
    if (value) {
      this.getUser()
    } else {
      this.login = false
    }
  },
  methods: {
    async getUser () {
      await this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          if (this.user.roles[0] === 5) {
            this.id = this.user._id
            this.getTienda(this.user._id)
          } else if (this.user.roles[0] === 2) {
            this.getCities()
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
          this.getServicios(id)
          this.$api.get('mis_comentarios/' + id).then(res => {
            if (res) {
              this.comentarios = res
            }
          })
        }
      })
    },
    getServicios (id) {
      const variable = this.miTienda || !this.login ? 'servicios_by_proveedor/' + id : 'servicios_by_cliente/' + id
      this.$api.get(variable).then(res => {
        if (res) {
          this.servicios = res
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
    formatPrice (value) {
      const val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    addCarrito (val) {
      if (!this.carrito.find(v => v.articulo_id === val._id)) {
        var prod = {
          articulo_id: val._id,
          price: val.price,
          cantidad_compra: 1,
          servicio: true,
          name: val.servicio.name,
          proveedor_id: val.tienda_id,
          oferta: false,
          image: val._id
        }
        this.carrito.push(prod)
        prod = {}
        this.$q.notify({
          message: 'Añadido al carro de compra',
          color: 'positive',
          positive: 'positive'
        })
      } else {
        this.$q.dialog({
          title: '¡Atención!',
          message: 'Ya añadiste este servicio al carro de compra.'
        }).onOk(() => {

        })
      }
    },
    editCantidad (index, val) {
      if (val) {
        this.carrito[index].cantidad_compra = this.carrito[index].cantidad_compra + 1
      } else {
        if (this.carrito[index].cantidad_compra > 1) {
          this.carrito[index].cantidad_compra = this.carrito[index].cantidad_compra - 1
        }
      }
    },
    deleteProdCarrito (index) {
      this.carrito.splice(index, 1)
    },
    async iniciarCompra () {
      this.$v.direccion.$touch()
      this.$v.city.$touch()
      if (!this.$v.direccion.$error && !this.$v.city.$error) {
        this.$q.loading.show({
          message: 'Iniciando compra'
        })
        this.form.country_id = this.user.country_id
        this.form.city_id = this.city
        this.form.direccion = this.direccion
        this.form.cliente_id = this.user._id
        this.form.tienda_id = this.id
        this.form.tienda_name = this.tienda.name
        this.form.totalValor = this.totalCarrito
        this.form.totalProductos = this.totalProductos
        this.form.servicios = true
        this.$api.post('comprar_productos', { dat: this.form, carrito: this.carrito }).then(async res => {
          if (res) {
            this.carrito = []
            this.direccion = null
            this.$q.loading.hide()
            this.comprarCarrito = false
            this.compraExitosa = true
          } else {
            this.$q.loading.hide()
            this.comprarCarrito = false
            this.compraFallo = true
          }
        })
      }
    },
    eliminarServicio (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro desea eliminar este servicio?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.loading.show({
          message: 'Eliminando servicio'
        })
        this.$api.delete('servicio/' + id).then(res => {
          if (res) {
            this.getTienda(this.id)
            this.verServicio = false
            this.$q.loading.hide()
          }
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.container-dir {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 10px;
}

.container {
  background-color: rgba(235, 235, 235, 0.563);
}

</style>

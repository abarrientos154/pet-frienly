<template>
  <div class="q-pa-sm">
    <q-header elevated class="bg-primary row justify-center items-center" style="width:100%; height:60px">
      <div class="text-white text-subtitle1 text-center">Tus pedidos</div>
    </q-header>

    <div class="q-mb-lg">
      <div class="text-subtitle1 text-bold">Pedidos en curso</div>
      <div class="q-mb-sm text-caption text-grey-8 text-italic">Ordena los pedidos por fechas para ver su estado</div>
    </div>

    <div v-if="pendientes.length" class="q-mb-md column items-center" style="width: 100%;">
        <q-card v-for="(item, index) in pendientes" :key="index" class="q-mb-md shadow-5" style="width: 95%;">
            <div class="row justify-between full-width q-pa-sm">
              <div class="text-subtitle2"> <b>Fecha de compra </b> {{item.fecha_compra}} </div>
              <div class="text-subtitle2"> <b>Pedido nº </b> {{index + 1}} </div>
            </div>

            <div class="bg-primary text-subtitle1 q-px-sm q-py-xs ellipsis text-white"
                style="width:90%; border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                <b>Estado del pedido: </b> {{item.status}}
            </div>

            <div class="full-width q-my-lg q-px-md" v-if="item.detalles">
              <div class="q-mb-sm">
                <div class="text-caption text-bold">Detalles del pedido</div>
                <div class="text-caption text-italic">Los productos adquiridos fueron</div>
              </div>
              <div class="column q-my-lg">
                <div class="row q-mb-md" v-for="(prod, index2) in item.productos" :key="index2">
                  <div class="col-4 column items-center">
                    <q-avatar rounded style="height: 80px; width: 80px; border-radius: 15px;" class="bg-grey">
                      <q-img style="height: 100%;" :src="prod.servicio ? baseuServicios + prod.image : baseuproductos + prod.image"/>
                    </q-avatar>
                  </div>
                  <div class="col-8 column justify-between">
                    <div class="text-caption text-grey-10">{{prod.name}}</div>
                    <div class="row justify-between">
                        <div class="text-primary" >${{prod.price}}</div>
                        <div class="text-primary" >{{prod.cantidad_compra}} {{prod.servicio ? 'h' : 'u'}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-px-sm">
                <div class="row justify-between q-mb-sm">
                  <div class="text-caption text-grey-7">Cantidad de artículos</div>
                  <div class="text-caption text-black">{{item.totalProductos}}</div>
                </div>
                <q-separator/>
                <div class="row justify-between q-my-sm">
                  <div class="text-caption text-grey-7">Valor</div>
                  <div class="text-caption text-black">${{item.totalValor}}</div>
                </div>
                <q-separator/>
                <div class="row justify-between q-my-sm">
                  <div class="text-caption text-grey-7">Precio total</div>
                  <div class="text-subtitle1 text-black">${{item.totalValor}}</div>
                </div>
              </div>
              <div v-if="item.status === 'En Local'" class="q-mb-sm">
                <div class="text-caption text-bold">Estado del pedido</div>
                <div class="text-caption text-italic q-mb-sm">Seleccione el estado que tendrá el pedido.</div>
                <q-select dense filled v-model="item.newStatus" :options="['Enviado']"/>
              </div>
              <div v-if="item.status === 'En Local'" class="q-my-sm">
                <div class="text-caption text-bold">Estado del pedido</div>
                <div class="text-caption text-italic q-mb-sm">Una vez que cambias el estado a enviado, debes esperar por la respuesta del cliente.</div>
              </div>
            </div>
            <div v-if="!item.detalles" class="row justify-center q-py-lg">
                <q-btn no-caps class="q-py-sm" color="primary" label="Ver detalles" style="width: 70%"
                @click="item.newStatus = '', item.detalles = true"/>
            </div>
            <div v-else>
                <div class="column items-center q-py-lg">
                    <q-btn v-if="item.status === 'En Local'" :disable="item.newStatus !== '' ? false : true" no-caps class="q-py-sm" color="primary" label="Cambiar estado" style="width: 70%"
                    @click="cambiarStatus(item)"/>
                    <q-btn no-caps flat class="q-mt-sm" color="white" text-color="grey-8" label="Ver menos" style="width: 70%"
                    @click="item.detalles = false"/>
                </div>
            </div>
        </q-card>
      </div>
    <div v-else class="text-center">No hay pedidos pendientes</div>

    <div class="q-mb-lg">
      <div class="text-subtitle1 text-bold">Filtra tus pedidos</div>
      <div class="q-mb-sm text-caption text-grey-8 text-italic">Historial de pedidos</div>
      <div class="row q-px-lg">
        <div class="col-12 text-caption">Selecciona el mes</div>
        <q-input filled readonly dense v-model="selectMes" class="col q-mr-md" placeholder="Mes" mask="##" @click="$refs.qDateProxy.show()">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="selectMes" text-color="black" mask="MM" minimal emit-immediately default-view="Months"
                  @input="$refs.qDateProxy.hide()">
                    <div class="row items-center justify-between">
                      <q-btn @click="pedidos = allPedidos, selectMes = '', $refs.qDateProxy.hide()" label="Todos" color="primary" flat />
                      <q-btn v-close-popup label="Cerrar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        <q-btn class="col2" :disable="selectMes !== '' ? false : true" label="Buscar" color="primary" no-caps @click="filtrarPedidos()"/>
      </div>
    </div>

      <div v-if="pedidos.length" class="q-mb-md column items-center" style="width: 100%;">
        <q-card v-for="(item, index) in pedidos" :key="index" class="q-mb-md shadow-5" style="width: 95%;">
            <div class="row justify-between full-width q-pa-sm">
              <div class="text-subtitle2"> <b>Fecha de compra </b> {{item.fecha_compra}} </div>
              <div class="text-subtitle2"> <b>Pedido nº </b> {{index + 1}} </div>
            </div>

            <div class="bg-primary text-subtitle1 q-px-sm q-py-xs ellipsis text-white"
                style="width:90%; border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                <b>Estado del pedido: </b> {{item.status}}
            </div>

            <div class="full-width q-my-lg q-px-md" v-if="item.detalles">
              <div class="q-mb-sm">
                <div class="text-caption text-bold">Detalles del pedido</div>
                <div class="text-caption text-italic">Los productos adquiridos fueron</div>
              </div>
              <div class="column q-my-lg">
                <div class="row q-mb-md" v-for="(prod, index2) in item.productos" :key="index2">
                  <div class="col-4 column items-center">
                    <q-avatar rounded style="height: 80px; width: 80px; border-radius: 15px;" class="bg-grey">
                      <q-img style="height: 100%;" :src="prod.servicio ? baseuServicios + prod.image : baseuproductos + prod.image"/>
                    </q-avatar>
                  </div>
                  <div class="col-8 column justify-between">
                    <div class="text-caption text-grey-10">{{prod.name}}</div>
                    <div class="row justify-between">
                        <div class="text-primary" >${{prod.price}}</div>
                        <div class="text-primary" >{{prod.cantidad_compra}} {{prod.servicio ? 'h' : 'u'}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-px-sm">
                <div class="row justify-between q-mb-sm">
                  <div class="text-caption text-grey-7">Cantidad de artículos</div>
                  <div class="text-caption text-black">{{item.totalProductos}}</div>
                </div>
                <q-separator/>
                <div class="row justify-between q-my-sm">
                  <div class="text-caption text-grey-7">Valor</div>
                  <div class="text-caption text-black">${{item.totalValor}}</div>
                </div>
                <q-separator/>
                <div class="row justify-between q-my-sm">
                  <div class="text-caption text-grey-7">Precio total</div>
                  <div class="text-subtitle1 text-black">${{item.totalValor}}</div>
                </div>
              </div>
              <div v-if="item.status === 'En Local'" class="q-mb-sm">
                <div class="text-caption text-bold">Estado del pedido</div>
                <div class="text-caption text-italic q-mb-sm">Seleccione el estado que tendrá el pedido.</div>
                <q-select dense filled v-model="item.newStatus" :options="['Enviado']"/>
              </div>
              <div v-if="item.status === 'En Local'" class="q-my-sm">
                <div class="text-caption text-bold">Estado del pedido</div>
                <div class="text-caption text-italic q-mb-sm">Una vez que cambias el estado a enviado, debes esperar por la respuesta del cliente.</div>
              </div>
            </div>
            <div v-if="!item.detalles" class="row justify-center q-py-lg">
                <q-btn no-caps class="q-py-sm" color="primary" label="Ver detalles" style="width: 70%"
                @click="item.newStatus = '', item.detalles = true"/>
            </div>
            <div v-else>
                <div class="column items-center q-py-lg">
                    <q-btn v-if="item.status === 'En Local'" :disable="item.newStatus !== '' ? false : true" no-caps class="q-py-sm" color="primary" label="Cambiar estado" style="width: 70%"
                    @click="cambiarStatus(item)"/>
                    <q-btn no-caps flat class="q-mt-sm" color="white" text-color="grey-8" label="Ver menos" style="width: 70%"
                    @click="item.detalles = false"/>
                </div>
            </div>
        </q-card>
      </div>
      <div v-else class="text-center">No hay pedidos completados</div>

      <div class="column items-center q-mb-xl">
        <q-btn v-if="allPedidos.length > 4" @click="verMas()" class="q-pa-sm" color="primary" :label="ver ? 'Ver menos' :'Ver más'" style="width: 70%;" no-caps/>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
import env from '../../env'
export default {
  data () {
    return {
      ver: false,
      selectMes: '',
      baseuproductos: '',
      baseuServicios: '',
      newStatus: '',
      allPedidos: [],
      pedidos: [],
      pendientes: []
    }
  },
  mounted () {
    this.baseuproductos = env.apiUrl + 'productos_img/'
    this.baseuServicios = env.apiUrl + 'servicio_img/'
    this.getPedidos()
  },
  methods: {
    getPedidos () {
      this.$q.loading.show({
        message: 'Cargando pedidos'
      })
      this.$api.get('pedidos').then(res => {
        if (res) {
          this.allPedidos = res.filter(v => v.status === 'Completado')
          this.pedidos = this.allPedidos.slice(0, 4)
          this.pendientes = res.filter(v => v.status === 'En Local' || v.status === 'Enviado')
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    cambiarStatus (data) {
      this.$q.loading.show({
        message: 'Cambiando estado'
      })
      this.$api.put('pedido_status/' + data._id, { status: data.newStatus }).then(res => {
        if (res) {
          this.getPedidos()
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    filtrarPedidos () {
      this.pedidos = this.allPedidos.filter(v => {
        if (moment(v.created_at).format('YYYY/MM') === moment().format('YYYY') + '/' + String(this.selectMes)) {
          return v
        }
      })
    },
    verMas () {
      if (!this.ver) {
        this.pedidos = this.allPedidos
      } else {
        this.pedidos = this.allPedidos.slice(0, 4)
      }
      this.ver = !this.ver
    }
  }
}
</script>

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
              <div class="text-subtitle2"> <b>Fecha de compra </b> 00/00/0000 </div>
              <div class="text-subtitle2"> <b>Pedido nº </b> {{index + 1}} </div>
            </div>

            <div class="bg-primary text-subtitle1 q-px-sm q-py-xs ellipsis text-white"
                style="width:90%; border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                <b>Estado del pedido: </b> En Local
            </div>

            <div class="full-width q-my-lg q-px-md" v-if="item.detalles">
              <div class="q-mb-sm">
                <div class="text-caption text-bold">Detalles del pedido</div>
                <div class="text-caption text-italic">Los productos adquiridos fueron</div>
              </div>
              <div class="column q-my-lg">
                <div class="row q-mb-md" v-for="(prod, index2) in 2" :key="index2">
                  <div class="col-4 column items-center">
                    <q-avatar rounded style="height: 80px; width: 80px; border-radius: 15px;" class="bg-grey">
                      <q-img style="height: 100%;" :src="''"/>
                    </q-avatar>
                  </div>
                  <div class="col-8 column justify-between">
                    <div class="text-caption text-grey-10">Nombre del producto</div>
                    <div class="row justify-between">
                        <div class="text-primary" >$0095</div>
                        <div class="text-primary" >01</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-px-sm">
                <div class="row justify-between q-mb-sm">
                  <div class="text-caption text-grey-7">Cantidad de artículos</div>
                  <div class="text-caption text-black">10</div>
                </div>
                <q-separator/>
                <div class="row justify-between q-my-sm">
                  <div class="text-caption text-grey-7">Valor</div>
                  <div class="text-caption text-black">$10</div>
                </div>
                <q-separator/>
                <div class="row justify-between q-my-sm">
                  <div class="text-caption text-grey-7">Precio total</div>
                  <div class="text-subtitle1 text-black">$10</div>
                </div>
              </div>
              <div class="q-mb-sm">
                <div class="text-caption text-bold">Estado del pedido</div>
                <div class="text-caption text-italic q-mb-sm">Seleccione el estado que tendrá el pedido.</div>
                <q-select dense filled v-model="item.status" :options="['Recibe conforme']"/>
              </div>
              <div class="q-my-sm">
                <div class="text-caption text-bold">Estado del pedido</div>
                <div class="text-caption text-italic q-mb-sm">Una vez que cambias el estado a recibido, se marcará como completada la operación.</div>
              </div>
            </div>
            <div v-if="!item.detalles" class="row justify-center q-py-lg">
                <q-btn no-caps class="q-py-sm" color="primary" label="Ver detalles" style="width: 70%"
                @click="estado = '', item.detalles = true"/>
            </div>
            <div v-else>
                <div class="column items-center q-py-lg">
                    <q-btn no-caps class="q-py-sm" color="primary" label="Cambiar estado" style="width: 70%"
                    />
                    <q-btn no-caps flat class="q-mt-sm" color="white" text-color="grey-8" label="Ver menos" style="width: 70%"
                    @click="item.detalles = false"/>
                </div>
            </div>
        </q-card>
      </div>

    <div class="q-mb-lg">
      <div class="text-subtitle1 text-bold">Filtra tus pedidos</div>
      <div class="q-mb-sm text-caption text-grey-8 text-italic">Historial de pedidos</div>
      <div class="row q-px-lg">
        <div class="col2 text-caption">Selecciona <br/>el mes</div>
        <q-select outlined dense filled class="col q-mx-md" placeholder="Mes" v-model="selectMes" :options="['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']"/>
        <q-btn class="col2" label="Buscar" color="primary" no-caps/>
      </div>
    </div>

      <div v-if="pedidos.length" class="q-mb-md column items-center" style="width: 100%;">
        <q-card v-for="(item, index) in pedidos" :key="index" class="q-mb-md shadow-5" style="width: 95%;">
            <div class="row justify-between full-width q-pa-sm">
              <div class="text-subtitle2"> <b>Fecha de compra </b> 00/00/0000 </div>
              <div class="text-subtitle2"> <b>Pedido nº </b> {{index + 1}} </div>
            </div>

            <div class="bg-primary text-subtitle1 q-px-sm q-py-xs ellipsis text-white"
                style="width:90%; border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                <b>Estado del pedido: </b> En Local
            </div>

            <div class="full-width q-my-lg q-px-md" v-if="item.detalles">
              <div class="q-mb-sm">
                <div class="text-caption text-bold">Detalles del pedido</div>
                <div class="text-caption text-italic">Los productos adquiridos fueron</div>
              </div>
              <div class="column q-my-lg">
                <div class="row q-mb-md" v-for="(prod, index2) in 2" :key="index2">
                  <div class="col-4 column items-center">
                    <q-avatar rounded style="height: 80px; width: 80px; border-radius: 15px;" class="bg-grey">
                      <q-img style="height: 100%;" :src="''"/>
                    </q-avatar>
                  </div>
                  <div class="col-8 column justify-between">
                    <div class="text-caption text-grey-10">Nombre del producto</div>
                    <div class="row justify-between">
                        <div class="text-primary" >$0095</div>
                        <div class="text-primary" >01</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-px-sm">
                <div class="row justify-between q-mb-sm">
                  <div class="text-caption text-grey-7">Cantidad de artículos</div>
                  <div class="text-caption text-black">10</div>
                </div>
                <q-separator/>
                <div class="row justify-between q-my-sm">
                  <div class="text-caption text-grey-7">Valor</div>
                  <div class="text-caption text-black">$10</div>
                </div>
                <q-separator/>
                <div class="row justify-between q-my-sm">
                  <div class="text-caption text-grey-7">Precio total</div>
                  <div class="text-subtitle1 text-black">$10</div>
                </div>
              </div>
              <div class="q-mb-sm">
                <div class="text-caption text-bold">Estado del pedido</div>
                <div class="text-caption text-italic q-mb-sm">Seleccione el estado que tendrá el pedido.</div>
                <q-select dense filled v-model="item.status" :options="['Recibe conforme']"/>
              </div>
              <div class="q-my-sm">
                <div class="text-caption text-bold">Estado del pedido</div>
                <div class="text-caption text-italic q-mb-sm">Una vez que cambias el estado a recibido, se marcará como completada la operación.</div>
              </div>
            </div>
            <div v-if="!item.detalles" class="row justify-center q-py-lg">
                <q-btn no-caps class="q-py-sm" color="primary" label="Ver detalles" style="width: 70%"
                @click="estado = '', item.detalles = true"/>
            </div>
            <div v-else>
                <div class="column items-center q-py-lg">
                    <q-btn no-caps class="q-py-sm" color="primary" label="Cambiar estado" style="width: 70%"
                    />
                    <q-btn no-caps flat class="q-mt-sm" color="white" text-color="grey-8" label="Ver menos" style="width: 70%"
                    @click="item.detalles = false"/>
                </div>
            </div>
        </q-card>
      </div>

      <div class="column items-center q-mb-xl">
        <q-btn v-if="allPedidos.length > 4" @click="verMas()" class="q-pa-sm" color="primary" :label="ver ? 'Ver menos' :'Ver más'" style="width: 70%;" no-caps/>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ver: false,
      selectMes: '',
      allPedidos: [],
      pedidos: [],
      pendientes: []
    }
  },
  mounted () {
    this.getPedidos()
  },
  methods: {
    getPedidos () {
      this.allPedidos = [{ detalles: false }, { detalles: false }, { detalles: false }, { detalles: false }, { detalles: false }]
      this.pedidos = this.allPedidos.slice(0, 4)
      this.pendientes = this.allPedidos.slice(0, 2)
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

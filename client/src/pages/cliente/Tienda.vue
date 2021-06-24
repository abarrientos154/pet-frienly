<template>
  <div>
    <div v-if="carro == false">
      <div>
        <div>
          <q-carousel animated arrows navigation infinite v-model="carrusel" style="height: 250px; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px">
            <q-carousel-slide :name="0" :img-src="baseu + perfile" />
            <q-carousel-slide v-for="(img, index) in data.tiendaFiles" :key="index" :name="index + 1" :img-src="baseuTienda + img" />
          </q-carousel>

          <div class="q-pa-md">
            <div class="text-h5 q-mb-xs">{{data.name}}</div>
            <div class="row text-grey q-mb-xs">
              <q-icon name="place" size="20px"/>
              <div>{{data.place ? data.place : 'Pais, Ciudad'}}</div>
            </div>
            <div class="q-gutter-y-md row q-mb-xs">
              <q-rating
                v-model="ratingModel"
                size="20px"
                icon="star"
              />
              <div class="q-pa-sm text-green-9 text-bold">{{"("}}{{this.ratingModel}}{{")"}}</div>
            </div>
            <div class="text-h6 q-mb-xs">Nuestra tienda</div>
            <div class="text-grey-7 text-subtitle">{{ lorem }}</div>
          </div>
        </div>

        <div v-if="misProd.length > 0">
          <div class="q-pa-md text-h6">Ultimos productos agregados</div>

          <q-scroll-area horizontal class="q-mb-sm" style="height: 250px; width:100%">
            <div class="row no-wrap" style="width: 100%">
              <q-card v-for="(item, index) in misProd" :key="index" class="q-mb-md q-mx-sm col no-wrap" style="width: 160px; height: 230px; border-radius: 12px;">
                <q-img :src="baseuProd + item.images[0]" style="height: 100%;">
                  <q-btn class="absolute-top-right q-ma-sm" round :icon="item.llevar ? 'dangerous' : 'shopping_bag'" color="primary" size="15px" @click="llevarProd(index)"/>
                  <div class="absolute-bottom" @click="$router.push('/descripcionproducto/'+item._id)">
                    <div class="text-caption text-weight-bolder">{{item.name}}</div>
                    <div class="text-primary text-weight-bolder">${{item.precio}}</div>
                  </div>
                </q-img>
              </q-card>
            </div>
          </q-scroll-area>

          <div class="q-pa-md text-h6">Todos los productos</div>

          <q-list class="row justify-center" v-if="misProd.length <= 6">
            <q-card v-for="(item, index) in misProd" :key="index" class="q-mb-md q-mx-sm" style="width: 160px; height: 230px; border-radius: 12px;">
              <q-img :src="baseuProd + item.images[0]" style="height: 100%;">
                <q-btn class="absolute-top-right q-ma-sm" round :icon="item.llevar ? 'dangerous' : 'shopping_bag'" color="primary" size="15px" @click="llevarProd(index)"/>
                <div class="absolute-bottom"  @click="$router.push('/descripcionproducto/'+item._id)">
                  <div class="text-caption text-weight-bolder">{{item.name}}</div>
                  <div class="text-primary text-weight-bolder">${{item.precio}}</div>
                </div>
              </q-img>
            </q-card>
          </q-list>

          <div v-else>
            <q-list v-if="ver == false" class="row justify-center">
              <div v-for="index in 6" :key="index" class="row justify-center col-xs-6 col-sm-3 col-md-3 col-lg-3 q-pb-md q-px-sm">
                <q-card style="width: 160px; height: 230px; border-radius: 12px;">
                  <q-img :src="baseuProd + misProd[index - 1].images[0]" style="height: 100%;">
                    <q-btn class="absolute-top-right q-ma-sm" round :icon="misProd[index - 1].llevar ? 'dangerous' : 'shopping_bag'" color="primary" size="15px" @click="llevarProd(index - 1)"/>
                    <div class="absolute-bottom"  @click="$router.push('/descripcionproducto/'+misProd[index - 1]._id)">
                      <div class="text-caption text-weight-bolder">{{misProd[index - 1].name}}</div>
                      <div class="text-primary text-weight-bolder">${{misProd[index - 1].precio}}</div>
                    </div>
                  </q-img>
                </q-card>
              </div>
            </q-list>
            <q-scroll-area v-else class="q-mb-sm" style="height: 750px;">
              <q-list class="row justify-center">
                <div v-for="(item, index) in misProd" :key="index" class="row justify-center col-xs-6 col-sm-3 col-md-3 col-lg-3 q-pb-md q-px-sm">
                  <q-card style="width: 160px; height: 230px; border-radius: 12px;">
                    <q-img :src="baseuProd + item.images[0]" style="height: 100%;">
                      <q-btn class="absolute-top-right q-ma-sm" round :icon="item.llevar ? 'dangerous' : 'shopping_bag'" color="primary" size="15px" @click="llevarProd(index)"/>
                      <div class="absolute-bottom" @click="$router.push('/descripcionproducto/'+item._id)">
                        <div class="text-caption text-weight-bolder">{{item.name}}</div>
                        <div class="text-primary text-weight-bolder">${{item.precio}}</div>
                      </div>
                    </q-img>
                  </q-card>
                </div>
              </q-list>
            </q-scroll-area>
            <div class="row justify-center q-ma-md">
              <q-btn class="q-pa-sm" color="primary" text-color="white" rounded :label="ver ? 'Ver menos' : 'Ver más'" @click="ver = !ver" style="width: 60%" no-caps/>
            </div>
          </div>
        </div>

        <div class="q-pa-md q-mb-md" v-if="misEspacios.length > 0">
          <div class="q-mb-sm text-h6">Nuestros espacios</div>
          <q-list class="q-mb-xl row justify-center" style="width: 100%; height: auto;">
            <q-card v-for="(hospedaje, index) in misEspacios" :key="index" class="q-mb-md q-mx-sm col no-wrap" style="min-width: 300px; max-width: 375px; border-radius: 12px;">
              <q-img :src="hospedaje.images[0] ? baseuHospedaje + '/' + hospedaje.images[0] : 'noimgpro.png'" style="height: 175px;">
                <q-btn position="top-left" round icon="favorite" color="primary" size="10px" class="q-mt-sm q-ml-sm"/>
              </q-img>
              <div class="row justify-end" style="margin-top: -55px">
                <q-avatar rounded class="bg-orange-2 text-black q-mx-xs" icon="directions_car" size="50px" style="border-radius: 15px;"/>
                <q-avatar rounded class="bg-orange-2 text-black q-mx-xs" icon="pool" size="50px" style="border-radius: 15px;"/>
                <q-avatar rounded class="bg-orange-2 text-black q-mx-xs" icon="directions_walk" size="50px" style="border-radius: 15px;"/>
              </div>
              <q-card-section class="row justify-between">
                <div>
                  <div class="text-subtitle2" style="font-size: 13px">{{hospedaje.name}}</div>
                  <div class="items-center row text-grey">
                      <q-icon name="place" />
                      <div class="text-subtitle2" style="font-size: 12px">Pais, Ciudad</div>
                  </div>
                </div>
                <q-btn no-caps flat dense rounded @click="$router.push('/descripcion_hospedaje/' + hospedaje._id)" class="bg-primary text-white q-pa-sm">${{hospedaje.price}} por noche</q-btn>
              </q-card-section>
            </q-card>
          </q-list>
        </div>
      </div>

      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h6">Advertencia!</div>
          </q-card-section>
          <q-card-section class="q-pt-none">{{ loremAlert }}</q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-page-sticky position="bottom-right" v-if="misProd.length > 0">
        <q-btn round class="q-ma-md" icon="shopping_bag" color="primary" size="20px" @click="carrocompras()">
          <q-badge v-if="productosSelec.length > 0" color="red" :label="productosSelec.length" floating/>
        </q-btn>
      </q-page-sticky>
    </div>

    <div v-else>
      <div v-if="productosSelec.length > 0">
        <div>
          <q-list class="column items-center q-pa-md">
            <div v-for="(item, index) in productosSelec" :key="index" class="row justify-between full-width q-mb-md no-wrap">
              <div class="row no-wrap">
                <div class="row no-wrap">
                  <div>
                    <q-checkbox size="45px" v-model="item.llevar" @input="calcular()" style="margin-top: -11px;"/>
                  </div>
                  <q-avatar rounded class="bg-secondary" style="height: 100px; width: 75px;">
                    <q-img style="height: 100%;" :src="baseuProd + item.images[0]"/>
                  </q-avatar>
                </div>
                <div class="column justify-between q-px-sm">
                  <div>
                    <div>{{item.name}}</div>
                    <div class="text-grey">{{data.name}}</div>
                  </div>
                  <div class="text-primary text-subtitle1">${{item.precio}}</div>
                </div>
              </div>

              <div class="column justify-between items-end">
                <q-btn round flat dense class="on-right" color="secondary" icon="delete" @click="quitarProd(item, index)" size="20px"/>
                <div class="row items-center q-mr-sm no-wrap">
                  <q-btn dense :color="item.llevarCant == 1 ? 'secondary' : 'primary'" icon="remove" style="height: 30px;width:30px" @click="item.llevarCant > 1 ? restar(item) : ''"/>
                  <div class="text-primary q-mx-sm">{{item.llevarCant}}</div>
                  <q-btn dense :color="item.cantidad > 0 ? 'primary' : 'secondary'" icon="add" style="height: 30px;width:30px" @click="item.cantidad > 0 ? aumentar(item) : ''"/>
                </div>
              </div>
            </div>
          </q-list>
          <div style="height: 250px"></div>
        </div>
        <div class="q-pa-md absolute-bottom">
          <div class="row items-center justify-between q-mb-lg">
            <div class="text-grey">Cantidad de articulos</div>
            <div>{{articulos}}</div>
          </div>
          <div class="row items-center justify-between q-mb-lg">
            <div class="text-grey">Valor</div>
            <div>${{valor}}</div>
          </div>
          <div class="row items-center justify-between q-mb-lg">
            <div class="text-grey">Comisión PetFrienly</div>
            <div>${{comision}}</div>
          </div>
          <div class="row items-center justify-between q-mb-sm">
            <div class="text-grey">Precio total</div>
            <div class="text-primary text-h6">${{total}}</div>
          </div>
          <div class="row justify-center">
            <q-btn class="full-width q-pa-sm" color="primary" text-color="white" label="Confirmar la compra" @click="carro = !carro" no-caps/>
          </div>
        </div>
      </div>
      <div v-else class="absolute-center text-center text-h6 text-primary" style="width: 100%;">Carro de compras vacio...</div>
    </div>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      id: this.$route.params.id,
      baseu: '',
      baseuTienda: '',
      baseuProd: '',
      baseuHospedaje: '',
      perfile: '',
      carrusel: 0,
      rol: null,
      data: {},
      misProd: [],
      ver: false,
      misEspacios: [],
      ratingModel: 3,
      lorem: '¡Descubre diferentes lugares, playas, hoteles y principales zonas turísticas en Mejillones para planificar de manera más organizada y divertida tu viaje! Consigue ofertas exclusivas, gestiona tus reservas y revisa la opinión de otros viajeros.',
      loremAlert: 'Antes de salir de la tienda o recargar la página, debe efectuar la compra de los productos seleccionados. De lo contrario, la lista de productos se renovará y se perderán los datos ingresados.',
      productosSelec: [],
      carro: false,
      articulos: 0,
      valor: 0,
      comision: 0,
      total: 0,
      alert: false
    }
  },
  mounted () {
    // this.getInfo()
  },
  methods: {
    getInfo () {
      this.$api.get('user_by_id/' + this.id).then(v => {
        this.data = v
        console.log(this.data)
        this.rol = v.roles[0]
        this.perfile = this.id
        this.baseu = env.apiUrl + 'perfil_img/'
        this.baseuTienda = env.apiUrl + 'tienda_img/'
        if (this.rol === 3) {
          this.getProduct()
          this.getEspacios()
        }
      })
    },
    getProduct () {
      this.$api.get('producto_by_proveedor/' + this.id).then(v => {
        if (v) {
          this.misProd = v
          this.baseuProd = env.apiUrl + 'productos_img/'
        }
      })
    },
    getEspacios () {
      this.$api.get('hospedaje_by_proveedor/' + this.id).then(v => {
        if (v) {
          this.misEspacios = v
          console.log(this.misEspacios)
          this.baseuHospedaje = env.apiUrl + 'hospedajes_img'
        }
      })
    },
    llevarProd (ind) {
      if (this.misProd[ind].llevar) {
        this.misProd[ind].llevar = !this.misProd[ind].llevar
        if (this.misProd[ind].llevar === true) {
          this.misProd[ind].llevarCant = 1
          this.misProd[ind].cantidad = this.misProd[ind].cantidad - this.misProd[ind].llevarCant
        } else {
          this.misProd[ind].llevarCant = 0
          this.misProd[ind].cantidad = this.misProd[ind].cantidad + 1
        }
        this.productosSelec = this.misProd.filter(v => v.llevar)
      } else {
        this.misProd[ind].llevar = true
        this.misProd[ind].llevarCant = 1
        this.misProd[ind].cantidad = this.misProd[ind].cantidad - this.misProd[ind].llevarCant
        this.productosSelec = this.misProd.filter(v => v.llevar)
      }
    },
    carrocompras () {
      this.carro = !this.carro
      this.calcular()
    },
    quitarProd (itm, ind) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro que deseas quitar este producto del carro?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        itm.llevar = false
        itm.cantidad = itm.cantidad + itm.llevarCant
        this.productos.splice(ind, 1)
        this.calcular()
      }).onCancel(() => {
        // cancel
      })
    },
    aumentar (itm) {
      itm.llevarCant++
      itm.cantidad--
      this.calcular()
    },
    restar (itm) {
      itm.llevarCant--
      itm.cantidad++
      this.calcular()
    },
    calcular () {
      this.articulos = 0
      this.valor = 0
      this.comision = 0
      this.total = 0
      this.checProd = this.productosSelec.filter(v => v.llevar)
      for (const i of this.checProd) {
        this.articulos = this.articulos + i.llevarCant
        for (let j = 0; j < i.llevarCant; j++) {
          this.total = this.total + i.precio
          this.comision = (this.total * 5) / 100
          this.valor = this.total - this.comision
        }
      }
    }
  }
}
</script>

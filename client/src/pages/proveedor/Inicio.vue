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

    <div class="q-pa-sm">
      <div class="text-h6 text-grey-8 text-center">Ultimos productos agregados</div>
      <q-scroll-area
        v-if="ultimos.length"
        horizontal
        style="height: 330px; width:100%">
        <div class="row no-wrap q-gutter-md" style="width: 100%">
          <q-card v-for="(item, index) in ultimos" :key="index" v-ripple clickable style="width: 200px; height: 300px; border-radius: 20px">
            <q-img :src="baseuproductos + item.images[0]" style="width: 100%; height: 100%; border-radius: 20px"
            @click="accionProducto(item)">
            </q-img>
            <div>
              <div class="absolute absolute-top row justify-between items-center q-mt-sm" style="width:100%">
                <div class="col-8">
                  <div v-if="!item.oferta" class="bg-primary text-subtitle2 text-white q-px-sm ellipsis"
                    style="border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                    ${{formatPrice(item.price)}}
                  </div>
                  <div v-if="item.oferta" class="bg-orange-9 text-subtitle2 text-white q-px-sm ellipsis"
                    style="border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                    ${{item.oferta_price}}
                  </div>
                </div>
                <div class="col-3">
                  <q-btn v-if="miTienda" flat round color="grey-10" icon="edit" @click="$router.push('/editar_producto/' + item._id)" />
                  <q-btn v-if="miTienda === false" round color="primary" icon="shopping_bag" @click="login ? addCarrito(item) : nologin = true" />
                </div>
              </div>
              <div class="bg-primary absolute-bottom q-mb-md" style="width:100%">
                <div class="text-subtitle2 text-center text-white ellipsis q-px-xs">{{item.name}}</div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
      <div v-else class="row items-center justify-center" style="height: 330px;">No hay productos actualmente</div>

      <div class="text-h6 text-grey-8 text-center q-mb-md">Busca por categoria de productos</div>
      <q-scroll-area
          v-if="categorias.length"
          horizontal
          style="height: 60px;"
        >
          <div class="row no-wrap q-gutter-md items-center">
            <div v-for="(item, index) in categorias" :key="index">
              <q-btn no-caps :color="filterSelec === item._id ? 'primary' : 'grey'" :text-color="filterSelec === item._id ? 'white' : 'grey-10'" :label="item.name" style="min-width:150px"
              @click="filtrar(item._id)" />
            </div>
          </div>
      </q-scroll-area>
      <div v-else class="row items-center justify-center" style="height: 60px;">No hay productos que buscar</div>

        <div class="row justify-around q-mt-xs">
          <div class="col-6 row justify-center" v-for="(item, index) in productosFilter" :key="index">
            <q-card v-ripple clickable style="width: 95%; height: 300px; border-radius: 20px">
              <q-img :src="baseuproductos + item.images[0]" style="width: 100%; height: 100%; border-radius: 20px"
              @click="accionProducto(item)">
              </q-img>
              <div>
                <div class="absolute absolute-top row justify-between items-center q-mt-sm" style="width:100%">
                  <div class="col-8">
                    <div v-if="!item.oferta" class="bg-primary text-subtitle2 text-white q-px-sm ellipsis"
                      style="border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                      ${{formatPrice(item.price)}}
                    </div>
                    <div v-if="item.oferta" class="bg-orange-9 text-subtitle2 text-white q-px-sm ellipsis"
                      style="border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                      ${{item.oferta_price}}
                    </div>
                  </div>
                  <div class="col-3">
                    <q-btn v-if="miTienda" flat round color="grey-10" icon="edit" @click="$router.push('/editar_producto/' + item._id)" />
                    <q-btn v-if="miTienda === false" round color="primary" icon="shopping_bag" @click="login ? addCarrito(item) : nologin = true" />
                  </div>
                </div>
                <div class="bg-primary absolute-bottom q-mb-md" style="width:100%">
                  <div class="text-subtitle2 text-center text-white ellipsis q-px-xs">{{item.name}}</div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      <div class="row justify-center q-mt-md">
        <q-btn v-if="allFilter.length > 4" class="q-py-xs" no-caps color="primary" :label="!ver1 ? 'Ver más' : 'Ver menos'" style="width:80%"
        @click="verMas(1)" />
      </div>

      <div class="text-h6 text-grey-8 text-center q-my-md">Todos los productos</div>
      <div v-if="productos.length" class="row justify-around">
          <div class="col-6 row justify-center" v-for="(item, index) in productos" :key="index">
            <q-card v-ripple clickable style="width: 95%; height: 300px; border-radius: 20px">
              <q-img :src="baseuproductos + item.images[0]" style="width: 100%; height: 100%; border-radius: 20px"
              @click="accionProducto(item)">
              </q-img>
              <div>
                <div class="absolute absolute-top row justify-between items-center q-mt-sm" style="width:100%">
                  <div class="col-8">
                    <div v-if="!item.oferta" class="bg-primary text-subtitle2 text-white q-px-sm ellipsis"
                      style="border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                      ${{formatPrice(item.price)}}
                    </div>
                    <div v-if="item.oferta" class="bg-orange-9 text-subtitle2 text-white q-px-sm ellipsis"
                      style="border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                      ${{item.oferta_price}}
                    </div>
                  </div>
                  <div class="col-3">
                    <q-btn v-if="miTienda" flat round color="grey-10" icon="edit" @click="$router.push('/editar_producto/' + item._id)" />
                    <q-btn v-if="miTienda === false" round color="primary" icon="shopping_bag" @click="login ? addCarrito(item) : nologin = true" />
                  </div>
                </div>
                <div class="bg-primary absolute-bottom q-mb-md" style="width:100%">
                  <div class="text-subtitle2 text-center text-white ellipsis q-px-xs">{{item.name}}</div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      <div v-else class="row items-center justify-center" style="height: 150px;">No hay productos actualmente</div>
      <div class="row justify-center q-mt-md">
        <q-btn v-if="allProductos.length > 6" class="q-py-xs" no-caps color="primary" :label="!ver2 ? 'Ver más' : 'Ver menos'" style="width:80%"
        @click="verMas(2)" />
      </div>
    </div>

    <q-page-sticky v-if="miTienda" position="bottom-right" :offset="[18, 18]">
      <q-fab color="primary" icon="add" label="Nuevo" no-caps direction="up" vertical-actions-align="right">
        <q-fab-action label-class="bg-grey-4 text-grey-10" external-label label-position="left"
          color="primary" icon="add_shopping_cart" label="Producto" @click="$router.push('/registro_producto')" />
        <q-fab-action label-class="bg-grey-4 text-grey-10" external-label label-position="left"
          color="primary" icon="add_business" label="Servicio" @click="$router.push('/registro_servicio')" />
      </q-fab>
    </q-page-sticky>

    <q-page-sticky v-if="miTienda === false && login" position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="shopping_bag" color="primary" @click="verCarrito = true" />
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
          @click="login ? addCarrito(servicio, true) : nologin = true, verServicio = false"/>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="verProducto" maximized persistent>
      <q-card style="width:100%;">
        <q-toolbar class="bg-primary row items-center" style="width:100%; height:60px">
          <div class="col-1">
            <q-btn flat round color="white" icon="arrow_back" @click="verProducto = false"/>
          </div>
          <div class="col-10 text-white text-subtitle1 text-center">{{producto.name}}</div>
        </q-toolbar>

        <q-scroll-area style="height: 80%; width: 100%;">
          <div class="row q-py-lg">
            <div class="col-4 q-px-sm column items-center">
              <div class="q-pb-sm" v-for="(item, index) in producto.images" :key="index">
                <img :src="baseuproductos + item" style="height: 100px; width: 100px; border-radius: 20px"
                @click="imgProd = item" />
              </div>
            </div>

            <div class="col-8 q-pr-md">
              <div class="row justify-center">
                <img :src="baseuproductos + imgProd" style="height: 340px; width: 100%; border-radius: 20px" />
              </div>
              <div class="q-py-md">
                <div class="text-h6">{{producto.name}}</div>
                <div class="text-subtitle1 text-grey-8">Disponible - {{producto.cantidad}} unidades</div>
                <div class="text-primary text-h5 q-py-md">$ {{producto.oferta ? formatPrice(producto.oferta_price) : formatPrice(producto.price)}}</div>
                <div class="text-h6">Descripción</div>
                <div class="text-subtitle1 text-grey-8">{{producto.descripcion}}</div>
              </div>
            </div>
          </div>
        </q-scroll-area>

        <div class="row justify-center q-py-lg">
          <q-btn v-if="miTienda" class="q-py-sm" no-caps color="primary" label="Editar producto" style="width:70%"
          @click="$router.push('/editar_producto/' + producto._id)"/>
          <q-btn v-if="miTienda" flat no-caps color="red" icon="delete"
          @click="eliminarProducto(producto._id)"/>
          <q-btn v-if="miTienda === false" class="q-py-sm" no-caps color="primary" label="Agregar al carro" style="width:80%"
          @click="login ? addCarrito(producto,false) : nologin = true, verProducto = false"/>
        </div>
      </q-card>
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
            <div v-else class="text-center">Agrega productos al carro de compra</div>
          </div>
        </q-scroll-area>

        <div class="q-pt-lg q-px-md">
          <div class="row justify-between" style="width:100%">
            <div class="text-subtitle1 text-grey-8">Cantidad de artículos</div>
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
          <div class="col-10 text-white text-subtitle1 text-center">Pagar</div>
        </q-toolbar>
        <div class="q-px-md q-pt-xl row items-between" style="height:92%">
          <div class="col-12">
            <div class="q-px-sm">
              <div class="text-h6 text-bold">Dirección de envío</div>
              <div class="text-subtitle1 text-grey-7">{{user.name}}</div>
              <q-input filled v-model="direccion"  dense placeholder="Ingrese una dirección"
                error-message="Requerido" :error="$v.direccion.$error" @blur="$v.direccion.$touch()"/>
              <q-separator />
              <div class="text-h6 text-bold q-my-md">Pedido</div>
              <div class="row justify-between" style="width:100%">
                <div class="text-subtitle1 text-grey-8">Cantidad de productos</div>
                <div class="text-subtitle1 text-primary">{{totalProductos}}</div>
              </div>
              <div class="row justify-between items-center q-pt-md" style="width:100%">
                <div class="text-subtitle1 text-grey-8">Total a pagar</div>
                <div class="text-h6 text-primary">${{formatPrice(totalCarrito)}}</div>
              </div>
            </div>
          </div>
          <div class="col-12 q-py-lg column justify-end items-end">
            <div class="row justify-between q-my-lg" style="width:100%">
              <div class="text-subtitle1 text-grey-8">Precio total</div>
              <div class="text-h6 text-primary">${{formatPrice(totalCarrito)}}</div>
            </div>
            <div class="row justify-center" style="width:100%">
              <q-btn :disable="carrito.length ? false : true" @click="iniciarCompra()" no-caps label="Pagar ahora" color="primary" class="q-py-sm" style="width: 80%;" />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog persistent maximized v-model="compraExitosa">
      <q-card style="width: 100%; height: 100%">
        <q-img src="noimg.png" style="width:100%; height: 100%">
          <div class="absolute-bottom q-py-sm full-width">
            <div class="text-h4 text-white text-bold q-px-sm">Tu pedido ha sido comprado con éxito</div>
            <div class="text-subtitle1 text-white q-px-sm">Puedes ver tu pedido en tu panel de pedidos</div>
            <div class="row justify-center q-mb-md q-mt-xl q-pt-lg">
              <q-btn no-caps color="primary" label="Volver a tienda" class="q-py-xs" style="width: 60%;"
                @click="compraExitosa = false"/>
            </div>
          </div>
        </q-img>
      </q-card>
    </q-dialog>

    <q-dialog persistent maximized v-model="compraFallo">
      <q-card style="width: 100%; height: 100%">
        <q-img src="noimg.png" style="width:100%; height: 100%">
          <div class="absolute-bottom q-py-sm full-width">
            <div class="text-h4 text-white text-bold q-px-sm">Tu compra ha fallado</div>
            <div class="text-subtitle1 text-white q-px-sm">Te estamos redireccionando a la tienda</div>
            <div class="row justify-center q-mb-md q-mt-xl q-pt-lg">
              <q-btn no-caps color="primary" label="Volver a tienda" class="q-py-xs" style="width: 60%;"
                @click="compraFallo = false"/>
            </div>
          </div>
        </q-img>
      </q-card>
    </q-dialog>

    <q-dialog v-model="nologin">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-center text-subtitle1">Para poder adquirir un servicio o producto debes tener una cuenta.</div>
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
      ver1: false,
      ver2: false,
      miTienda: null,
      verServicio: false,
      verProducto: false,
      verCarrito: false,
      comprarCarrito: false,
      compraExitosa: false,
      compraFallo: false,
      login: true,
      nologin: false,
      id: '',
      filterSelec: '',
      baseuTienda: '',
      baseuproductos: '',
      baseuServicios: '',
      baseuPerfil: '',
      imgProd: '',
      text: '',
      rating: 4,
      user: {},
      tienda: {
        calificacion: 0
      },
      servicio: {},
      producto: {},
      form: {},
      direccion: null,
      comentarios: [],
      carrito: [],
      allProductos: [],
      ultimos: [],
      productos: [],
      allFilter: [],
      productosFilter: [],
      categorias: []
    }
  },
  validations: {
    direccion: { required }
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
      let total = 0
      if (this.carrito.length > 0) {
        for (const i of this.carrito) {
          total = total + i.cantidad_compra
        }
      }
      return total
    }
  },
  mounted () {
    this.baseuTienda = env.apiUrl + 'tienda_img/'
    this.baseuPerfil = env.apiUrl + 'perfil_img/'
    this.baseuproductos = env.apiUrl + 'productos_img/'
    this.baseuServicios = env.apiUrl + 'servicio_img/'
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.getTienda(this.id)
      this.getProductos(this.id)
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
          if (this.user.roles[0] === 3) {
            this.id = this.user._id
            this.getTienda(this.user._id)
            this.getProductos(this.user._id)
            this.getCategorias(this.user._id)
          }
        }
      })
    },
    async getTienda (id) {
      await this.$api.get('tienda_by_id/' + id).then(v => {
        if (v) {
          this.tienda = v.tienda
          this.getCategorias(v._id)
          if (this.user._id === v._id) {
            this.miTienda = true
          } else {
            this.miTienda = false
          }
          this.$api.get('mis_comentarios/' + id).then(res => {
            if (res) {
              this.comentarios = res
            }
          })
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
    getCategorias (id) {
      this.$api.get('categorias_by_user/' + id).then(res => {
        if (res) {
          this.categorias = res
        }
      })
    },
    accionProducto (data) {
      this.producto = data
      this.imgProd = data.images[0]
      this.verProducto = true
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
    },
    formatPrice (value) {
      const val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    addCarrito (val, bool) {
      if (!this.carrito.find(v => v.articulo_id === val._id)) {
        var prod = {
          articulo_id: val._id,
          price: val.price,
          cantidad_compra: 1
        }
        if (bool) {
          prod.servicio = true
          prod.name = val.servicio.name
          prod.proveedor_id = val.tienda_id
          prod.oferta = false
          prod.image = val._id
        } else {
          prod.name = val.name
          prod.proveedor_id = val.proveedor_id
          prod.oferta = val.oferta
          prod.cantidad = val.cantidad - 1
          prod.image = val.images[0]
          if (val.oferta) {
            prod.oferta_price = val.oferta_price
          }
        }
        this.carrito.push(prod)
        prod = {}
        this.$q.notify({
          message: 'Añadido al carro de compra',
          color: 'positive',
          positive: 'positive'
        })
      } else {
        var message = ''
        if (bool) {
          message = 'servicio'
        } else {
          message = 'producto'
        }
        this.$q.dialog({
          title: '¡Atención!',
          message: 'Ya añadiste este ' + message + ' al carro de compra.'
        }).onOk(() => {

        })
      }
    },
    editCantidad (index, val) {
      if (this.carrito[index].servicio) {
        if (val) {
          this.carrito[index].cantidad_compra = this.carrito[index].cantidad_compra + 1
        } else {
          if (this.carrito[index].cantidad_compra > 1) {
            this.carrito[index].cantidad_compra = this.carrito[index].cantidad_compra - 1
          }
        }
      } else {
        if (val) {
          if (this.carrito[index].cantidad > 0) {
            this.carrito[index].cantidad_compra = this.carrito[index].cantidad_compra + 1
            this.carrito[index].cantidad = this.carrito[index].cantidad - 1
          } else {
            this.$q.dialog({
              title: '¡Atención!',
              message: 'Este producto se agotó de la tienda.'
            }).onOk(() => {

            })
          }
        } else {
          if (this.carrito[index].cantidad_compra > 1) {
            this.carrito[index].cantidad_compra = this.carrito[index].cantidad_compra - 1
            this.carrito[index].cantidad = this.carrito[index].cantidad + 1
          }
        }
      }
    },
    deleteProdCarrito (index) {
      this.carrito.splice(index, 1)
    },
    async iniciarCompra () {
      this.$v.direccion.$touch()
      if (!this.$v.direccion.$error) {
        this.$q.loading.show({
          message: 'Iniciando compra'
        })
        this.form.country_id = this.user.country_id
        this.form.city_id = this.user.city_id
        this.form.direccion = this.direccion
        this.form.cliente_id = this.user._id
        this.form.tienda_id = this.id
        this.form.tienda_name = this.tienda.name
        this.form.totalValor = this.totalCarrito
        this.form.totalProductos = this.totalProductos
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
    },
    eliminarProducto (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro desea eliminar este producto?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.loading.show({
          message: 'Eliminando producto'
        })
        this.$api.delete('producto/' + id).then(res => {
          if (res) {
            this.getProductos(this.id)
            this.verProducto = false
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

'use strict'

/*
|--------------------------------------------------------------------------
| Routes
  Existen 2 grupos de rutas: Las que necesitan autenticación del usuario y las que no. TOMAR MUY EN CUENTA ESTO
  Dentro del grupo de las que necesitan autenticación se debe especificar el middleware para verificar si el
  usuario(autenticado) tiene el permiso para acceder a esa ruta. Ejemplo: .middleware('verifyPermission:1')
  El número 1 indica el permiso que debe tener para acceder a esa ruta
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return {
    greeting: 'Hello world in JSON'
  }
})

const addPrefixToGroup = group => {
  // Grupo para rutas con prefijo /api/
  group.prefix("api");
  return group;
};


addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas sin protección de autenticación aquí
    Route.get("servicios", "ServicioController.index")
    Route.post("login", "UserController.login");
    Route.post("register_proveedor", "UserController.registerProveedor")
    Route.post("register_client", "UserController.registerClient")
    Route.post("update_client", "UserController.updateClient")
    Route.post("register_hospedador", "UserController.registerHospedador")
    Route.get("pais", "PaisController.index")
    Route.get("pais_by_id/:id", "PaisController.paisById")
    Route.get("ciudades", "CiudadController.index")
    Route.get("ciudad_by_id/:id", "CiudadController.ciudadById")
    Route.get("cityByCountry/:id", "CiudadController.cityByCountry")
    Route.get("habitacion_type", "HabitacionController.index")
    Route.get("validate_email/:email", "UserController.validateEmail")
    Route.get("email_send_app/:email", "UserController.recuperacionapp")
    Route.put("actualizar_pass/:code", "UserController.actualizarPass");

    Route.get('perfil_img/:file', 'UploadController.getFileByDirectoryPerfil')
    Route.get('obtener_logo', 'UploadController.getLogo')
    Route.get('tienda_img/:file', 'UploadController.getFileByDirectoryTienda')
    Route.get('espacio_img/:file', 'UploadController.getFileByDirectoryEspacioDescanso')
    Route.get('identificacion_img/:file', 'UploadController.getFileByDirectoryIdentificacion')
    Route.get('productos_img/:file', 'UploadController.getFileByDirectoryProductos')
    Route.get('hospedajes_img/:file', 'UploadController.getFileByDirectoryHospedajes')
    Route.get('mascota_img/:file', 'UploadController.getFileByDirectoryMascota')
    Route.get('servicio_img/:file', 'UploadController.getFileByDirectoryServicio')

    Route.post("user_by_rol", "UserController.userByRol") // metodo para obtener usuarios segun el rol
    Route.post("user_by_rol_no_logueo", "UserController.userByRolNoLogueo")
    Route.get("user_by_id/:id", "UserController.userById") // metodo para obtener informacion del usuario por id del mismo

    Route.get('producto', 'ProductoController.index')
    Route.get('producto/:id', 'ProductoController.show')
    Route.get('producto_by_proveedor/:proveedor_id', 'ProductoController.productoByProveedor')

    Route.get('hospedaje', 'HospedajeController.index')
    Route.get('hospedaje/:id', 'HospedajeController.show')
    Route.get("tienda_by_id/:id", "UserController.tiendaById")
    Route.get("hospedaje_by_id/:id", "UserController.hospedajeById")
    Route.get('hospedaje_by_hospedador/:hospedador_id', 'HospedajeController.hospedajeByHospedador')

    Route.post("filtrar_tiendas", "UserController.filtrarTiendas")
    Route.post("filtrar_alojamientos", "UserController.filtrarAlojamientos")
    Route.post("filtrar_tiendas_no_logueo", "UserController.filtrarTiendasNoLogueo")
    Route.post("filtrar_alojamientos_no_logueo", "UserController.filtrarAlojamientosNoLogueo")
    Route.get('categorias_by_user/:id', 'ProductoController.categoriasByUser')
    Route.get("mis_comentarios/:id", "ProductoController.traerComentarios")
  })
  );
  addPrefixToGroup(
    Route.group(() => {
      // Insertar rutas con protección de autenticación aquí
    Route.get("user_info", "UserController.userInfo") // metodo para obtener informacion del usuario que esta logueado
    Route.get("user_logueado", "UserController.userLogueado")
    Route.get("all_user", "UserController.allUser") // metodo para obtener informacion del usuario que esta logueado
    Route.post("user_enable/:id", "UserController.userEnable") // metodo para bloquear o desbloquear usuarios
    Route.post("user_by_status", "UserController.userByStatus") // metodo para obtener proveedores pendientes
    Route.post("user_by_statushotel", "UserController.userByStatushotel")
    Route.put("update_status/:id", "UserController.userStatus") // metodo para bloquear o desbloquear usuarios
    Route.put("update_statushotel/:id", "UserController.userStatushotel")
    Route.post("update_hospedador", "UserController.editHospedador")
    Route.put('datosnew/:id', 'UserController.updatedata')
    Route.get('clientById/:id', 'UserController.clientById')

    Route.get('mascota', 'MascotaController.index')
    Route.post('mascota', 'MascotaController.store')
    Route.get('mascota_by_user_id/:user_id', 'MascotaController.mascotaByUserId')
    Route.get('mascota/:id', 'MascotaController.show')
    Route.put('mascota/:id', 'MascotaController.update')
    Route.delete('mascota/:id', 'MascotaController.destroy')

    Route.post('producto', 'UploadController.registrarProducto')
    Route.get('categorias', 'ProductoController.categorias')
    Route.put('producto/:id', 'ProductoController.update')
    Route.delete('producto/:id', 'ProductoController.destroy')
    Route.get('producto_filtrado/:filtrar', 'ProductoController.productoFiltrado')
    Route.post("subir_archivo_producto/:producto_id", "UploadController.subirImgProducto")
    Route.delete("eliminar_archivo_producto/:file/:producto_id", "UploadController.eliminarImgProducto")

    Route.post('hospedaje', 'UploadController.registrarHospedaje')
    Route.put('hospedaje/:id', 'HospedajeController.update')
    Route.delete('hospedaje/:id', 'HospedajeController.destroy')
    Route.post('hospedaje_filtrado', 'HospedajeController.hospedajeFiltrado')
    Route.post('perfil_imagen', 'UploadController.newimagenById')
    Route.post("subir_archivo_proveedor" ,'UploadController.subirimgtiendaById')
    Route.get("eliminar_imagen_tienda/:id" ,'UploadController.eliminarigmtiendaById')

    Route.get("servicio/:id", "ServicioController.show")
    Route.post("crear_servicio", "ServicioController.create")
    Route.put("edit_servicio/:id", "ServicioController.update")
    Route.delete("servicio/:id", "ServicioController.destroy")
    Route.post("subir_img_servicio/:servicio_id", "UploadController.subirImgServicio")

    Route.post("edit_proveedor", "UserController.editProveedor")
    Route.post("subir_img_tienda_perfil", "UploadController.subirImgTiendaPerfil")
    Route.post("subir_img_identidad/:val", "UploadController.subirImgIdentidad")
    Route.post("subir_img_espacio_perfil", "UploadController.subirImgEspacioPerfil")

    Route.post("comprar_productos", "ProductoController.pre_pago_tienda")
    Route.post("arrendar_espacio", "ProductoController.arrendarEspacio")
    Route.get("pedidos", "ProductoController.pedidos")
    Route.get("arriendos", "ProductoController.arriendos")
    Route.get("pedidos_cliente", "ProductoController.pedidosCliente")
    Route.put("pedido_status/:id", "ProductoController.pedidoStatus")

    Route.get("ventas_diarias", "ProductoController.ventasDiarias")
    Route.post("estadistica", "ProductoController.crearEstadistica")
    Route.post("calificar", "ProductoController.calificarTienda")

  }).middleware("auth")
);

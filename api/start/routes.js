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
    Route.post("login", "UserController.login");
    Route.post("register", "UserController.register")
    Route.post("register_proveedor", "UserController.registerProveedor")
    Route.get("validate_email/:email", "UserController.validateEmail")

    Route.get('perfil_img/:file', 'UploadController.getFileByDirectoryPerfil')
    Route.get('tienda_img/:file', 'UploadController.getFileByDirectoryTienda')
  })
);

addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas con protección de autenticación aquí
    Route.get("user_info", "UserController.userInfo") // metodo para obtener informacion del usuario que esta logueado
    Route.get("all_user", "UserController.allUser") // metodo para obtener informacion del usuario que esta logueado
    Route.get("user_by_id/:id", "UserController.userById") // metodo para obtener informacion del usuario por id del mismo
    Route.post("user_by_rol", "UserController.userByRol") // metodo para obtener usuarios segun el rol
    Route.post("user_enable/:id", "UserController.userEnable") // metodo para bloquear o desbloquear usuarios
    Route.post("user_by_status", "UserController.userByStatus") // metodo para obtener proveedores pendientes
    Route.put("update_status/:id", "UserController.userStatus") // metodo para bloquear o desbloquear usuarios
    Route.put('datosnew/:id', 'UserController.updatedata')

    Route.post('mascota', 'MascotaController.store')
    Route.get('mascota', 'MascotaController.index')
    Route.get('mascota_by_user_id/:user_id', 'MascotaController.mascotaByUserId')
    Route.get('mascota/:id', 'MascotaController.show')
    Route.put('mascota/:id', 'MascotaController.update')
    Route.delete('mascota/:id', 'MascotaController.destroy')

    Route.post('producto', 'UploadController.registrarProducto')
    Route.put('producto/:id', 'ProductoController.update')
    Route.get('producto_by_proveedor/:proveedor_id', 'ProductoController.productoByProveedor')
    Route.delete('producto/:id', 'ProductoController.destroy')
    Route.get('producto', 'ProductoController.index')
    Route.get('producto/:id', 'ProductoController.show')
    Route.get('producto_filtrado/:filtrar', 'ProductoController.productoFiltrado')

    Route.post('hospedaje', 'UploadController.registrarHospedaje')
    Route.put('hospedaje/:id', 'HospedajeController.update')
    Route.get('hospedaje_by_proveedor/:proveedor_id', 'HospedajeController.hospedajeByProveedor')
    Route.delete('hospedaje/:id', 'HospedajeController.destroy')
    Route.get('hospedaje', 'HospedajeController.index')
    Route.get('hospedaje/:id', 'HospedajeController.show')
    Route.get('hospedaje_filtrado/:filtrar', 'HospedajeController.hospedajeFiltrado')

  }).middleware("auth")
);

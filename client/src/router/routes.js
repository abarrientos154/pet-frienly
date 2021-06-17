const routes = [
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    meta: { botonchat: true },
    children: [
      // Administrador
      { path: '/inicio_administrador', component: () => import('pages/admin/Inicio.vue') },
      { path: '/proveedores', component: () => import('pages/admin/Proveedores.vue') },
      { path: '/proveedores_pendientes', component: () => import('pages/admin/Pendientes.vue') },
      { path: '/Hoteleria_pendientes', component: () => import('pages/admin/Hoteleriapendiente.vue') },
      { path: '/descripcionusuario/:id', component: () => import('pages/admin/DescripcionUsuario.vue') },
      { path: '/descripcionhotel/:id', component: () => import('pages/admin/DescripcionHotel.vue') },
      // Proveedor
      { path: '/inicio_proveedor', component: () => import('pages/proveedor/Inicio.vue') },
      { path: '/productos', component: () => import('pages/proveedor/Productos.vue') },
      { path: '/registroproductos', component: () => import('pages/proveedor/RegistroProductos.vue') },
      { path: '/editar_producto/:id', component: () => import('pages/proveedor/RegistroProductos.vue') },
      { path: '/descripcion_producto/:id', component: () => import('pages/proveedor/DescripcionProducto.vue') },
      { path: '/hospedajes', component: () => import('pages/proveedor/Hospedaje.vue') },
      { path: '/registrohospedaje', component: () => import('pages/proveedor/RegistroHospedaje.vue') },
      { path: '/editar_hospedaje/:id', component: () => import('pages/proveedor/RegistroHospedaje.vue') },
      { path: '/descripcion_hospedaje/:id', component: () => import('pages/proveedor/DescripcionHospedaje.vue') },
      // Cliente
      { path: '/inicio_cliente', component: () => import('pages/cliente/Inicio.vue') },
      { path: '/mascotas', component: () => import('pages/cliente/Mascotas.vue') },
      { path: '/registromascota', component: () => import('pages/cliente/RegistroMascota.vue') },
      { path: '/edit_mascota/:id', component: () => import('pages/cliente/RegistroMascota.vue') },
      { path: '/descripcionmascota/:id', component: () => import('pages/cliente/DescripcionMascota.vue') },
      { path: '/descripcionalojamiento/:id', component: () => import('pages/cliente/VerAlojamiento.vue') },
      { path: '/tienda/:id', component: () => import('pages/cliente/Tienda.vue') },
      { path: '/descripcionproducto/:id', component: () => import('pages/cliente/DescripcionProducto.vue') },
      { path: '/buscar_hospedaje', component: () => import('pages/cliente/BuscarHospedaje.vue') },
      // Generales
      { path: '/Datos', component: () => import('pages/Datauser.vue') },
      { path: '/Datosedit', component: () => import('pages/Userdata.vue') }
    ]
  },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/registro', component: () => import('pages/Registro.vue') },
  { path: '/tipo_usuario', component: () => import('pages/registro/TipoCliente.vue') },
  { path: '/proveedor/registro', component: () => import('pages/registro/RegistroTienda.vue') },
  { path: '/hospedador/registro', component: () => import('pages/registro/RegistroHospedador.vue') },
  {
    path: '/',
    redirect: '/inicio_cliente'
  },
  {
    path: '*',
    redirect: '/inicio_cliente'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

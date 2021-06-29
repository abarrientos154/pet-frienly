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
      { path: '/tienda/:id', component: () => import('pages/proveedor/Inicio.vue') },
      { path: '/pedidos', component: () => import('pages/proveedor/Pedidos.vue') },
      { path: '/estadisticas_resportes', component: () => import('pages/proveedor/Reportes.vue') },
      // Hospedador
      { path: '/inicio_hospedador', component: () => import('pages/hospedador/Home.vue') },
      { path: '/editar_hospedador', component: () => import('pages/hospedador/EditProfile.vue') },
      { path: '/nuevo_espacio', component: () => import('pages/hospedador/NewSpace.vue') },
      { path: '/reportes', component: () => import('pages/hospedador/Reports.vue') },
      { path: '/pedidos_hospedador', component: () => import('pages/hospedador/Orders.vue') },
      // Cliente
      { path: '/inicio_cliente', component: () => import('pages/cliente/Inicio.vue') },
      { path: '/mascotas', component: () => import('pages/cliente/Mascotas.vue') },
      { path: '/registromascota', component: () => import('pages/cliente/RegistroMascota.vue') },
      { path: '/edit_mascota/:id', component: () => import('pages/cliente/RegistroMascota.vue') },
      { path: '/descripcionmascota/:id', component: () => import('pages/cliente/DescripcionMascota.vue') },
      { path: '/descripcionalojamiento/:id', component: () => import('pages/cliente/VerAlojamiento.vue') },
      { path: '/tienda/:id', component: () => import('pages/cliente/Tienda.vue') },
      { path: '/tiendas', component: () => import('pages/cliente/Tiendas.vue') },
      { path: '/descanso', component: () => import('pages/cliente/Descanso.vue') },
      { path: '/descripcionproducto/:id', component: () => import('pages/cliente/DescripcionProducto.vue') },
      { path: '/buscar_hospedaje', component: () => import('pages/cliente/BuscarHospedaje.vue') },
      // Generales
      { path: '/Datos', component: () => import('pages/Datauser.vue') },
      { path: '/Datosedit', component: () => import('pages/Userdata.vue') }
    ]
  },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/registro', component: () => import('pages/registro/TipoRegistro.vue') },
  { path: '/registro/cliente', component: () => import('pages/registro/RegistroCliente.vue') },
  { path: '/registro/proveedor', component: () => import('pages/registro/RegistroTienda.vue') },
  { path: '/registro/hospedador', component: () => import('pages/registro/RegistroHospedador.vue') },

  { path: '/servicios_productos', component: () => import('pages/proveedor/FinRegister.vue') },
  { path: '/registro_servicio', component: () => import('pages/proveedor/RegistroServicio.vue') },
  { path: '/editar_servicio/:id', component: () => import('pages/proveedor/RegistroServicio.vue') },
  { path: '/registro_producto', component: () => import('pages/proveedor/RegistroProductos.vue') },
  { path: '/editar_producto/:id', component: () => import('pages/proveedor/RegistroProductos.vue') },
  { path: '/editar_proveedor', component: () => import('pages/proveedor/EditarPerfil.vue') },

  { path: '/descripcion_espacio/:id', component: () => import('pages/hospedador/DescriptionSpace.vue') },
  { path: '/editar_espacio/:id', component: () => import('pages/hospedador/EditSpace.vue') },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: '/login'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

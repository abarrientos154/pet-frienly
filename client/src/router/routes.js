
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
      { path: '/descripcionusuario/:id', component: () => import('pages/admin/DescripcionUsuario.vue') },
      // Proveedor
<<<<<<< HEAD
      { path: '/inicio_proveedor', component: () => import('pages/proveedor/Inicio.vue') },
      { path: '/productos', component: () => import('pages/proveedor/Productos.vue') },
      { path: '/registroproductos', component: () => import('pages/proveedor/RegistroProductos.vue') },
      { path: '/editar_producto/:id', component: () => import('pages/proveedor/RegistroProductos.vue') },
      { path: '/hospedaje', component: () => import('pages/proveedor/Hospedaje.vue') },
      { path: '/registrohospedaje', component: () => import('pages/proveedor/RegistroHospedaje.vue') },
      { path: '/editar_hospedaje/:id', component: () => import('pages/proveedor/RegistroHospedaje.vue') },
=======
      { path: '/inicio_proveedor', component: () => import('pages/proveedor/Inicio.vue'), meta: { botonchat: true } },
      { path: '/productos', component: () => import('pages/proveedor/Productos.vue'), meta: { botonchat: true } },
      { path: '/registroproductos', component: () => import('pages/proveedor/RegistroProductos.vue'), meta: { botonchat: false } },
      { path: '/editar_producto/:id', component: () => import('pages/proveedor/RegistroProductos.vue'), meta: { botonchat: false } },
      { path: '/descripcion_producto/:id', component: () => import('pages/proveedor/DescripcionProducto.vue'), meta: { botonchat: false } },
      { path: '/hospedaje', component: () => import('pages/proveedor/Hospedaje.vue'), meta: { botonchat: true } },
      { path: '/registrohospedaje', component: () => import('pages/proveedor/RegistroHospedaje.vue'), meta: { botonchat: false } },
      { path: '/editar_hospedaje/:id', component: () => import('pages/proveedor/RegistroHospedaje.vue'), meta: { botonchat: false } },
>>>>>>> 00f61fd00a01b23205bf10e397997daef3b3d157
      // Cliente
      { path: '/inicio_cliente', component: () => import('pages/cliente/Inicio.vue') },
      { path: '/mascotas', component: () => import('pages/cliente/Mascotas.vue') },
      { path: '/registromascota', component: () => import('pages/cliente/RegistroMascota.vue') },
      { path: '/edit_mascota/:id', component: () => import('pages/cliente/RegistroMascota.vue') },
      { path: '/descripcionmascota/:id', component: () => import('pages/cliente/DescripcionMascota.vue') },
      { path: '/descripcionalojamiento', component: () => import('pages/cliente/VerAlojamiento.vue') },
      { path: '/tienda/:id', component: () => import('pages/cliente/Tienda.vue') },
      { path: '/descripcionproducto/:id', component: () => import('pages/cliente/DescripcionProducto.vue') },
      // Generales
      { path: '/Datos', component: () => import('pages/Datauser.vue') },
      { path: '/Datosedit', component: () => import('pages/Userdata.vue') }
    ]
  },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/registro', component: () => import('pages/Registro.vue') },
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


const routes = [
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    meta: { botonchat: true },
    children: [
      // Administrador
      { path: '/inicio_administrador', component: () => import('pages/admin/Inicio.vue') },
      // Proveedor
      { path: '/inicio_proveedor', component: () => import('pages/proveedor/Inicio.vue'), meta: { botonchat: true } },
      // Cliente
      { path: '/inicio_cliente', component: () => import('pages/cliente/Inicio.vue'), meta: { botonchat: true } },
      { path: '/mascotas', component: () => import('pages/cliente/Mascotas.vue'), meta: { botonchat: true } },
      { path: '/registromascota', component: () => import('pages/cliente/RegistroMascota.vue'), meta: { botonchat: false } },
      { path: '/edit_mascota', component: () => import('pages/cliente/RegistroMascota.vue'), meta: { botonchat: false } },
      // Generales
      { path: '/Datos', component: () => import('pages/Datauser.vue'), meta: { botonchat: true } },
      { path: '/Datosedit', component: () => import('pages/Userdata.vue'), meta: { botonchat: false } }
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

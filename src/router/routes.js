
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/Bebida',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name: 'bebida', component: () => import('pages/Bebida.vue') }
    ]
  },
  {
    path: '/Comida',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Comida.vue') }
    ]
  },
  {
    path: '/Carrito',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Carrito.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

// Vue.prototype.mesa = this.$router.currentRoute.query.mesa;

export default routes

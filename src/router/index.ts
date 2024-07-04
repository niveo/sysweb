import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

import { inject } from 'vue'
import { UsuarioServiceKey } from '@/service/UsuarioService'
import PageNotFound from '@/views/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(/* import.meta.env.BASE_URL */),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClienteView.vue')
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/UsuarioView.vue')
    },
    {
      path: '/empresas',
      name: 'empresas',
      component: () => import('../views/EmpresaView.vue')
    },
    {
      path: '/empresas/:codigo',
      name: 'empresas_detalhe',
      component: () => import('../views/EmpresaDetalheView.vue')
    },
    {
      path: '/empresas',
      name: 'empresas_cadastrar',
      component: () => import('../views/EmpresaDetalheView.vue')
    },
    {
      path: '/:catchAll(.*)*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})

router.beforeEach((to, _) => {
  const usuarioService = inject(UsuarioServiceKey)
  if (!usuarioService!!.isAuthenticated() && to.name !== 'login') {
    console.warn('Usuário não autenticado!')
    return { name: 'login' }
  }
})

export default router

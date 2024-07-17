import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import PageError from '@/views/PageError.vue'

import { inject } from 'vue'
import { UsuarioServiceKey } from '@/service/key/UsuarioServiceKey'
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
      path: '/clientes',
      name: 'clientes',
      component: () => import('../components/common/GlobalGradeView.vue'),
      props: {
        codigo: 3
      }
    },
    {
      path: '/clientes/:codigo',
      name: 'clientes_detalhe',
      component: () => import('../views/ClienteDetalheView.vue')
    },
    {
      path: '/clientes',
      name: 'clientes_cadastrar',
      component: () => import('../views/ClienteDetalheView.vue')
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/UsuarioView.vue')
    },
    {
      path: '/empresas',
      name: 'empresas',
      component: () => import('../components/common/GlobalGradeView.vue'),
      props: {
        codigo: 2
      }
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
      path: '/produtos',
      name: 'produtos',
      component: () => import('../components/common/GlobalGradeView.vue'),
      props: {
        codigo: 1
      }
    },
    {
      path: '/produtos/:codigo',
      name: 'produtos_detalhe',
      component: () => import('../views/ProdutoDetalheView.vue')
    },
    {
      path: '/produtos',
      name: 'produtos_cadastrar',
      component: () => import('../views/ProdutoDetalheView.vue')
    },
    {
      path: '/configuracoes',
      name: 'configuracoes',
      component: () => import('../views/ConfiguracaoView.vue')
    },
    {
      path: '/:catchAll(.*)*',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/error',
      name: 'error',
      component: PageError
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

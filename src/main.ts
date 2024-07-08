import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {
  UsuarioServiceImpl,
  EmpresaServiceImpl,
  CidadeServiceImpl,
  BairroServiceImpl,
  EstadoServiceImpl
} from './service/impl/'
import {
  UsuarioServiceKey,
  EmpresaServiceKey,
  CidadeServiceKey,
  BairroServiceKey,
  EstadoServiceKey
} from './service/'

const app = createApp(App)

app.use(router)

app.provide(UsuarioServiceKey, new UsuarioServiceImpl())
app.provide(EmpresaServiceKey, new EmpresaServiceImpl())
app.provide(CidadeServiceKey, new CidadeServiceImpl())
app.provide(BairroServiceKey, new BairroServiceImpl())
app.provide(EstadoServiceKey, new EstadoServiceImpl())

app.mount('#app')

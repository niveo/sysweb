import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {
  UsuarioServiceImpl,
  EmpresaServiceImpl,
  CidadeServiceImpl,
  BairroServiceImpl,
  EstadoServiceImpl,
  NotificationServiceImpl,
  CepServiceImpl,
  ClienteServiceImpl
} from './service/impl/'
import {
  UsuarioServiceKey,
  EmpresaServiceKey,
  CidadeServiceKey,
  BairroServiceKey,
  EstadoServiceKey,
  NotificationServiceKey,
  CepServiceKey,
  ClienteServiceKey
} from './service/'

const app = createApp(App)

app.use(router)

app.provide(UsuarioServiceKey, new UsuarioServiceImpl())
app.provide(EmpresaServiceKey, new EmpresaServiceImpl())
app.provide(ClienteServiceKey, new ClienteServiceImpl())
app.provide(CidadeServiceKey, new CidadeServiceImpl())
app.provide(BairroServiceKey, new BairroServiceImpl())
app.provide(EstadoServiceKey, new EstadoServiceImpl())
app.provide(NotificationServiceKey, new NotificationServiceImpl())
app.provide(CepServiceKey, new CepServiceImpl())

app.mount('#app')

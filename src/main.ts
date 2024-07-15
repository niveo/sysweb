import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {
  UsuarioServiceKey,
  EmpresaServiceKey,
  CidadeServiceKey,
  BairroServiceKey,
  EstadoServiceKey,
  NotificationServiceKey,
  CepServiceKey,
  ClienteServiceKey,
  ClienteContatoServiceKey,
  ClienteEnderecoServiceKey,
  SegmentoClienteServiceKey,
  RedeClienteServiceKey
} from './service/key'
import {
  UsuarioServiceImpl,
  EmpresaServiceImpl,
  CidadeServiceImpl,
  BairroServiceImpl,
  EstadoServiceImpl,
  NotificationServiceImpl,
  CepServiceImpl,
  ClienteServiceImpl,
  ClienteEnderecoServiceImpl,
  ClienteContatoServiceImpl,
  SegmentoClienteServiceImpl,
  RedeClienteServiceImpl
} from './service/impl/'

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
app.provide(ClienteContatoServiceKey, new ClienteContatoServiceImpl())
app.provide(ClienteEnderecoServiceKey, new ClienteEnderecoServiceImpl())
app.provide(SegmentoClienteServiceKey, new SegmentoClienteServiceImpl())
app.provide(RedeClienteServiceKey, new RedeClienteServiceImpl())

app.mount('#app')

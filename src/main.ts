import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'
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
  RedeClienteServiceKey,
  TabelaPrecoServiceKey,
  ProdutoServiceKey,
  ConfiguracaoGradeServiceKey,
  UnidadeServiceKey,
  ProdutoUnidadeServiceKey
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
  RedeClienteServiceImpl,
  TabelaPrecoServiceImpl,
  ProdutoServiceImpl,
  ConfiguracaoGradeServiceImpl,
  UnidadeServiceImpl,
  ProdutoUnidadeServiceImpl
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
app.provide(TabelaPrecoServiceKey, new TabelaPrecoServiceImpl())
app.provide(ProdutoServiceKey, new ProdutoServiceImpl())
app.provide(ConfiguracaoGradeServiceKey, new ConfiguracaoGradeServiceImpl())
app.provide(UnidadeServiceKey, new UnidadeServiceImpl())
app.provide(ProdutoUnidadeServiceKey, new ProdutoUnidadeServiceImpl())

app.component(
  'LT_01',
  defineAsyncComponent(() => import('./components/ProdutoListaItem.vue'))
)

app.component(
  'LT_02',
  defineAsyncComponent(() => import('./components/EmpresaListaItem.vue'))
)

app.component(
  'LT_03',
  defineAsyncComponent(() => import('./components/ClienteListaItem.vue'))
)

app.component(
  'CP_01',
  defineAsyncComponent(() => import('./components/ui/InputComponent.vue'))
)

app.mount('#app')

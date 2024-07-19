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
  ConfiguracaoPesquisaServiceKey,
  UnidadeServiceKey,
  ProdutoUnidadeServiceKey,
  TabelaPrecoLancamentoServiceKey,
  TabelaPrecoProdutoServiceKey
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
  ConfiguracaoPesquisaServiceImpl,
  UnidadeServiceImpl,
  ProdutoUnidadeServiceImpl,
  TabelaPrecoLancamentoServiceimpl,
  TabelaPrecoProdutoServiceImpl
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
app.provide(ConfiguracaoPesquisaServiceKey, new ConfiguracaoPesquisaServiceImpl())
app.provide(UnidadeServiceKey, new UnidadeServiceImpl())
app.provide(ProdutoUnidadeServiceKey, new ProdutoUnidadeServiceImpl())
app.provide(TabelaPrecoLancamentoServiceKey, new TabelaPrecoLancamentoServiceimpl())
app.provide(TabelaPrecoProdutoServiceKey, new TabelaPrecoProdutoServiceImpl())

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
  'LT_04',
  defineAsyncComponent(() => import('./components/TabelaPrecoListaItem.vue'))
)

app.component(
  'CP_01',
  defineAsyncComponent(() => import('./components/ui/InputComponent.vue'))
)

app.component(
  'CA_01',
  defineAsyncComponent(() => import('./components/BairroCadastro.vue'))
)

app.component(
  'CA_02',
  defineAsyncComponent(() => import('./components/CidadeCadastro.vue'))
)

app.component(
  'CA_03',
  defineAsyncComponent(() => import('./components/UnidadeCadastroView.vue'))
)

app.component(
  'CA_04',
  defineAsyncComponent(() => import('./components/RedeClienteCadastroView.vue'))
)

app.component(
  'CA_05',
  defineAsyncComponent(() => import('./components/SegmentoClienteCadastroView.vue'))
)

app.mount('#app')

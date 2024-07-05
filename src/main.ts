import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { UsuarioServiceImpl, EmpresaServiceImpl } from './service/impl/'
import { UsuarioServiceKey, EmpresaServiceKey } from './service/'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import ptBr from 'element-plus/es/locale/lang/pt-br'
import 'dayjs/locale/pt-br'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(router)

app.use(ElementPlus).use(ElementPlus, {
  locale: ptBr
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.provide(UsuarioServiceKey, new UsuarioServiceImpl())
app.provide(EmpresaServiceKey, new EmpresaServiceImpl())

app.mount('#app')

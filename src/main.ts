import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { UsuarioServiceImpl, EmpresaServiceImpl } from './service/impl/'
import { UsuarioServiceKey, EmpresaServiceKey } from './service/'

const app = createApp(App)

app.use(router)

app.provide(UsuarioServiceKey, new UsuarioServiceImpl())
app.provide(EmpresaServiceKey, new EmpresaServiceImpl())

app.mount('#app')

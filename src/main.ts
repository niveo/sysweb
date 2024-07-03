import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { UsuarioServiceImpl } from './service/impl/UsuarioServiceImpl'
import { UsuarioServiceKey } from './service/UsuarioService'

const app = createApp(App)

app.use(router)

app.provide(UsuarioServiceKey, new UsuarioServiceImpl())

app.mount('#app')

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Layout, LayoutHeader, LayoutContent, Button, Popover } from 'ant-design-vue'
import { UserOutlined, TeamOutlined, AppstoreOutlined, HomeOutlined } from '@ant-design/icons-vue'

import { UsuarioServiceKey } from './service/UsuarioService'
import { inject, ref, h } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const openLaunch = ref(false)

const usuarioService = inject(UsuarioServiceKey)!!
const usuarioAutenticado = usuarioService.$usuarioAutenticado

const listaModulos = ref([
  { rota: '/clientes', descricao: 'Clientes', icone: TeamOutlined },
  { rota: '/usuarios', descricao: 'Usuários', icone: UserOutlined },
  { rota: '/empresas', descricao: 'Empresas', icone: TeamOutlined }
])

const navTo = (rota: string) => {
  openLaunch.value = false
  router.push(rota)
}
</script>
<template>
  <Layout>
    <LayoutHeader :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <Button
        ghost
        :icon="h(HomeOutlined)"
        v-show="usuarioAutenticado"
        @click="navTo('/')"
      ></Button>
      <Button
        ghost
        :icon="h(HomeOutlined)"
        v-show="usuarioAutenticado"
        @click="navTo('/empresas')"
      ></Button>
      <Popover v-model:open="openLaunch" trigger="click">
        <template #content>
          <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 5px">
            <button
              class="menuModuloButton"
              @click="navTo(item.rota)"
              v-for="item in listaModulos"
              :key="item.descricao"
            >
              <component :is="item.icone" :style="{ fontSize: '34px', color: '#08c' }" />
              <span class="menuModuloTxt">{{ item.descricao }}</span>
            </button>
          </div>
        </template>
        <Button ghost :icon="h(AppstoreOutlined)" v-show="usuarioAutenticado"></Button>
      </Popover>
    </LayoutHeader>

    <LayoutContent class="content">
      <RouterView />
    </LayoutContent>
  </Layout>
</template>

<style scoped>
.content {
  margin-top: 64px;
  padding: 0 20px;
  background-color: rgb(236, 236, 236);
}
@media only screen and (max-width: 600px) {
  .content {
    padding: 0px;
  }
  .ant-layout-header {
    padding-inline: 10px;
  }
}
.menuModuloButton {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  align-items: center;
  border: 1px solid #eeeeee;
}
.menuModuloTxt {
  font:
    12px SegoeUI-Regular-final,
    Segoe UI,
    'Segoe UI Web (West European)',
    Segoe,
    -apple-system,
    BlinkMacSystemFont,
    Roboto,
    Helvetica Neue,
    Tahoma,
    Helvetica,
    Arial,
    sans-serif;
  margin-top: 0;
  overflow: hidden;
  line-height: 16px;
  transition: color 83ms linear;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  text-align: center;
  max-height: 32px;
  color: #252423;
}
</style>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Layout, LayoutHeader, LayoutSider, LayoutContent, LayoutFooter } from 'ant-design-vue'
import { UsuarioServiceKey } from './service/UsuarioService'
import { inject, ref, watch } from 'vue'
const usuarioAutenticado = ref<boolean>(false)
const usuarioService = inject(UsuarioServiceKey)!!
watch(usuarioService.$usuarioAutenticado, async (newQuestion) => {
  usuarioAutenticado.value = newQuestion
})
</script>
<template>
  <Layout>
    <LayoutHeader>header</LayoutHeader>
    <Layout>
      <LayoutSider v-show="usuarioAutenticado">SD</LayoutSider>
      <LayoutContent>
        <RouterView />
      </LayoutContent>
    </Layout>
    <LayoutFooter>footer</LayoutFooter>
  </Layout>
</template>

<style scoped></style>

<script lang="ts" setup>
import { ref } from 'vue'
const activeKey = ref('1')
</script>
<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Clientes">
      <SegmentoClientePesquisaView tipoEdicao />
      <RedeClientePesquisaView tipoEdicao />
    </a-tab-pane>
    <a-tab-pane key="2" tab="Produtos">
      <UnidadePesquisaView tipoEdicao />
    </a-tab-pane>
  </a-tabs>
</template>
<style></style>

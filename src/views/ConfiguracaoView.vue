<script lang="ts" setup>
import { ref } from 'vue'
import ConfiguracaoClienteView from './ConfiguracaoClienteView.vue'
const activeKey = ref('1')
</script>
<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Clientes">
      <ConfiguracaoClienteView />
    </a-tab-pane>
    <a-tab-pane key="2" tab="Produtos"> </a-tab-pane>
  </a-tabs>
</template>
<style></style>

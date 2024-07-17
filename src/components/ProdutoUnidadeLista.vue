<script setup lang="ts">
import { ref } from 'vue'
import ProdutoUnidadeCadastro from './ProdutoUnidadeCadastro.vue'
import BaseLista from './common/BaseLista.vue'
defineProps<{
  codigo: number
}>()
const refView = ref()
function novoRegistro() {
  refView.value.novoRegistro()
}
const descriptions: any[] = [
  {
    label: 'Barra',
    data: (item: any) => item.barra
  }
]
defineExpose({ novoRegistro })
</script>

<template>
  <BaseLista
    ref="refView"
    :componenteCastro="ProdutoUnidadeCadastro"
    :codigo="codigo"
    path="/produtounidades"
    :descriptions="descriptions"
  >
  </BaseLista>
</template>

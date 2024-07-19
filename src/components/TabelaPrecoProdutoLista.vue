<script setup lang="ts">
import { ref } from 'vue'
import TabelaPrecoProdutoCadastro from './TabelaPrecoProdutoCadastro.vue'
import BaseLista from './common/BaseLista.vue'
import type { DescriptionModel } from '@/model/DescriptionModel'
import { UtilsNumber } from '@/common/utils-number'

defineProps<{
  codigo: number
}>()
const refView = ref()
function novoRegistro() {
  refView.value.novoRegistro()
}

const description: DescriptionModel = {
  title: (item: any) => `${item.produto.codigo} - ${item.produto.referencia}`,
  descriptions: [
    {
      label: 'Valor',
      data: (item: any) => UtilsNumber.format(item.valor)
    }
  ]
}
defineExpose({ novoRegistro })
</script>

<template>
  <BaseLista
    ref="refView"
    :componenteCastro="TabelaPrecoProdutoCadastro"
    :codigo="codigo"
    path="/tabelaprecoprodutos"
    :description="description"
  >
  </BaseLista>
</template>

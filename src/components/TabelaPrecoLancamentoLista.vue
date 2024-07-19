<script setup lang="ts">
import { ref } from 'vue'
import TabelaPrecoLancamentoCadastro from './TabelaPrecoLancamentoCadastro.vue'
import BaseLista from './common/BaseLista.vue'
import type { DescriptionModel } from '@/model/DescriptionModel'
import { UtilsDate } from '@/common/utils-date'

defineProps<{
  codigo: number
}>()
const refView = ref()
function novoRegistro() {
  refView.value.novoRegistro()
}

const description: DescriptionModel = {
  title: (item: any) => UtilsDate.formatPTBR(item.vigor),
  descriptions: [
    {
      label: 'Percentual',
      data: (item: any) => (item.percentual ? `${item.percentual}%` : '')
    }
  ]
}
defineExpose({ novoRegistro })
</script>

<template>
  <BaseLista
    ref="refView"
    :componenteCastro="TabelaPrecoLancamentoCadastro"
    :codigo="codigo"
    path="/tabelaprecolancamentos"
    :description="description"
  >
  </BaseLista>
</template>

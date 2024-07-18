<script setup lang="ts">
import { ref } from 'vue'
import TabelaPrecoLancamentoCadastro from './TabelaPrecoLancamentoCadastro.vue'
import BaseLista from './common/BaseLista.vue'
import { DateUtil } from '../common/DateUtil'

defineProps<{
  codigo: number
}>()
const refView = ref()
function novoRegistro() {
  refView.value.novoRegistro()
}

const descriptions: any[] = [
  {
    label: 'Vigor',
    data: (item: any) => DateUtil.formatPTBR(item.vigor)
  }
]
defineExpose({ novoRegistro })
</script>

<template>
  <BaseLista
    ref="refView"
    :componenteCastro="TabelaPrecoLancamentoCadastro"
    :codigo="codigo"
    path="/tabelaprecolancamentos"
    :descriptions="descriptions"
  >
  </BaseLista>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ClienteContatoCadastro from './ClienteContatoCadastro.vue'
import BaseLista from './common/BaseLista.vue'
defineProps<{
  cliente: number
}>()
const refView = ref()
function novoRegistro() {
  refView.value.novoRegistro()
}
const descriptions: any[] = [
  {
    label: 'Nome',
    data: (item: any) => item.nome
  },
  {
    label: 'Cargo',
    data: (item: any) => item.cargo
  },
  {
    label: 'Telefones',
    span: 2,
    data: (item: any) => item.telefones?.join(' / ')
  },
  {
    label: 'E-mails',
    span: 2,
    data: (item: any) => item.emails?.join(' / ')
  },
  {
    label: 'Observação',
    span: 2,
    data: (item: any) => item.observacao
  }
]
defineExpose({ novoRegistro })
</script>

<template>
  <BaseLista
    ref="refView"
    :componenteCastro="ClienteContatoCadastro"
    :codigo="cliente"
    path="/clientecontatos"
    :descriptions="descriptions"
  >
  </BaseLista>
</template>

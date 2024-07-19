<script setup lang="ts">
import { ref } from 'vue'
import ClienteEnderecoCadastro from './ClienteEnderecoCadastro.vue'
import BaseLista from './common/BaseLista.vue'
import type { DescriptionModel } from '@/model/DescriptionModel'

defineProps<{
  cliente: number
}>()
const refView = ref()
function novoRegistro() {
  refView.value.novoRegistro()
}

const description: DescriptionModel = {
  descriptions: [
    {
      label: 'Logradouro',
      span: 2,
      data: (item: any) => item.endereco.logradouro
    },
    { label: 'Número', data: (item: any) => item.endereco.numero },
    { label: 'Bairro', span: 2, data: (item: any) => item.endereco.bairro.descricao },
    { label: 'Cidade', span: 2, data: (item: any) => item.endereco.cidade.descricao },
    {
      label: 'Estado',
      data: (item: any) => {
        return `${item.endereco.cidade.estado.descricao} - ${item.endereco.cidade.estado.sigla}`
      }
    }
  ]
}
defineExpose({ novoRegistro })
</script>

<template>
  <BaseLista
    ref="refView"
    :componenteCastro="ClienteEnderecoCadastro"
    :codigo="cliente"
    path="/clienteenderecos"
    :description="description"
  >
  </BaseLista>
</template>

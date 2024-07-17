<script setup lang="ts">
import { defineEmits } from 'vue'
import { UnidadeServiceKey } from '../service/key/UnidadeServiceKey'
import UnidadeCadastroView from './UnidadeCadastroView.vue'

defineProps({
  registro: {
    type: Object,
    required: false
  },
  tipoEdicao: {
    type: Boolean,
    required: false,
    default: false
  }
})
const emit = defineEmits(['outRegistro'])
const onOutRegistro = (e: any) => {
  emit('outRegistro', e)
}
</script>

<template>
  <PesquisaRegistroView
    :registro="registro"
    :tipoEdicao="tipoEdicao"
    :serviceKey="UnidadeServiceKey"
    :componenteCadastro="UnidadeCadastroView"
    @outRegistro="onOutRegistro"
    descricao="Unidade"
  />
</template>

<style scoped></style>

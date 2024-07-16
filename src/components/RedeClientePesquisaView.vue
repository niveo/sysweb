<script setup lang="ts">
import { defineEmits } from 'vue'
import { RedeClienteServiceKey } from '../service/key/RedeClienteServiceKey'
import RedeClienteCadastroView from './RedeClienteCadastroView.vue'

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
    :serviceKey="RedeClienteServiceKey"
    :componenteCadastro="RedeClienteCadastroView"
    @outRegistro="onOutRegistro"
    descricao="Rede"
  />
</template>

<style scoped></style>

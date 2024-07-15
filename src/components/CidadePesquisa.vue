<script setup lang="ts">
import { defineEmits } from 'vue'
import { BairroServiceKey } from '../service/key/BairroServiceKey'
import CidadePesquisa from './CidadePesquisa.vue'

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
    :serviceKey="BairroServiceKey"
    :componenteCadastro="CidadePesquisa"
    @outRegistro="onOutRegistro"
    descricao="Cidade"
  />
</template>

<style scoped></style>

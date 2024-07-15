<script setup lang="ts">
import { defineEmits } from 'vue'
import { SegmentoClienteServiceKey } from '@/service/key'
import SegmentoClienteCadastroView from './SegmentoClienteCadastroView.vue'

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
    :serviceKey="SegmentoClienteServiceKey"
    :componenteCadastro="SegmentoClienteCadastroView"
    @outRegistro="onOutRegistro"
    descricao="Segmento"
  />
</template>

<style scoped></style>

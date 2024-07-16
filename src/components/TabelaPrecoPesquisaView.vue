<script setup lang="ts">
import { defineEmits } from 'vue'
import { TabelaPrecoServiceKey } from '../service/key/TabelaPrecoServiceKey'
import SegmentoClienteCadastroView from './SegmentoClienteCadastroView.vue'

defineProps({
  registro: {
    type: Object,
    required: false
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
    :tipoEdicao="false"
    :serviceKey="TabelaPrecoServiceKey"
    @outRegistro="onOutRegistro"
    descricao="Tabela de Preço"
    :tipoCadastro="false"
  />
</template>

<style scoped></style>

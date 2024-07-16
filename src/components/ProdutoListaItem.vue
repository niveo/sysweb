<script setup lang="ts">
import { ProdutoServiceKey } from '../service/key/ProdutoServiceKey'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'

const router = useRouter()
const prop = defineProps<{
  model: any
}>()
const emit = defineEmits(['outRegistroRemovido'])
const service = inject(ProdutoServiceKey)!!

function onEditar() {
  router.push({ name: 'produtos_detalhe', params: { codigo: prop.model.codigo } })
}

function removerRegistro() {
  service
    .remover(prop.model.codigo)
    .then(() => emit('outRegistroRemovido', prop.model.codigo))
    .catch((error: any) => {
      notification.error({
        message: 'Erro',
        description: error.response.data.properties.description
      })
    })
}
</script>

<template>
  <a-list-item key="item.codigo">
    <a-list-item-meta>
      <template #title>
        <a-button type="link" @click="onEditar">
          {{ model.codigo + ' - ' + model.descricao }}</a-button
        >
      </template>
    </a-list-item-meta>
    <a-descriptions layout="vertical" bordered>
      <a-descriptions-item label="Referência">
        {{ model.referencia }}
      </a-descriptions-item>
    </a-descriptions>
  </a-list-item>
</template>

<style scoped></style>

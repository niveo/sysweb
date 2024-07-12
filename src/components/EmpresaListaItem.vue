<script setup lang="ts">
import { EmpresaServiceKey } from '@/service'
import { EditOutlined, MoreOutlined } from '@ant-design/icons-vue'
import { h, inject } from 'vue'
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'

const router = useRouter()
const prop = defineProps<{
  model: any
}>()
const emit = defineEmits(['outRegistroRemovido'])
const service = inject(EmpresaServiceKey)!!

function onEditar() {
  router.push({ name: 'empresas_detalhe', params: { codigo: prop.model.codigo } })
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
    <a-list-item-meta :description="model.razaoSocial">
      <template #title>
        <a-button type="link" @click="onEditar"> {{ model.codigo + ' - ' + model.nome }}</a-button>
      </template>
    </a-list-item-meta>
    <a-descriptions layout="vertical" bordered>
      <a-descriptions-item label="CNPJ / CPF">
        {{ model.documento }}
      </a-descriptions-item>
      <a-descriptions-item label="IE" v-if="model.inscricaoEstadual">
        {{ model.inscricaoEstadual }}
      </a-descriptions-item>
      <a-descriptions-item label="Telefone" v-if="model.telefone">
        {{ model.telefone }}
      </a-descriptions-item>
      <a-descriptions-item label="E-mail" v-if="model.email">
        {{ model.email }}
      </a-descriptions-item>
    </a-descriptions>
  </a-list-item>
</template>

<style scoped></style>

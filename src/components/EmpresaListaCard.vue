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
  <a-card :bodyStyle="{ padding: '1px' }">
    <a-descriptions layout="vertical" bordered>
      <a-descriptions-item label="CNPJ / CPF">
        {{ model.documento }}
      </a-descriptions-item>
      <a-descriptions-item label="IE" v-if="model.inscricaoEstadual">
        {{ model.inscricaoEstadual }}
      </a-descriptions-item>
      <a-descriptions-item label="Razão Social">
        {{ model.razaoSocial }}
      </a-descriptions-item>
      <a-descriptions-item label="Telefone" v-if="model.telefone">
        {{ model.telefone }}
      </a-descriptions-item>
      <a-descriptions-item label="E-mail" v-if="model.email">
        {{ model.email }}
      </a-descriptions-item>
    </a-descriptions>
    <template #actions>
      <EditOutlined key="edit" @click="onEditar()" />
    </template>
    <template #title>
      {{ model.codigo + ' - ' + model.nome }}
    </template>
    <template #extra>
      <a-popover trigger="click">
        <template #content>
          <a-popconfirm
            title="Deseja remover o registro selecionado?"
            ok-text="Sim"
            cancel-text="Não"
            @confirm="removerRegistro"
          >
            <a-button type="link" danger>Excluir</a-button>
          </a-popconfirm>
        </template>
        <a-button :icon="h(MoreOutlined)"></a-button>
      </a-popover>
    </template>
  </a-card>
</template>

<style scoped></style>

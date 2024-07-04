<script setup lang="ts">
import { Card, Descriptions, DescriptionsItem, Button, Popover } from 'ant-design-vue'
import { EditOutlined, MoreOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const prop = defineProps<{
  model: any
}>()

function onEditar() {
  router.push({ name: 'empresas_detalhe', params: { codigo: prop.model.codigo } })
}
</script>

<template>
  <Card :bodyStyle="{ padding: '1px' }">
    <Descriptions layout="vertical" bordered>
      <DescriptionsItem label="CNPJ / CPF">
        {{ model.documento }}
      </DescriptionsItem>
      <DescriptionsItem label="IE" v-if="model.inscricaoEstadual">
        {{ model.inscricaoEstadual }}
      </DescriptionsItem>
      <DescriptionsItem label="Razão Social">
        {{ model.razaoSocial }}
      </DescriptionsItem>
      <DescriptionsItem label="Telefone" v-if="model.telefone">
        {{ model.telefone }}
      </DescriptionsItem>
      <DescriptionsItem label="E-mail" v-if="model.email">
        {{ model.email }}
      </DescriptionsItem>
    </Descriptions>
    <template #actions>
      <EditOutlined key="edit" @click="onEditar()" />
    </template>
    <template #title>
      {{ model.codigo + ' - ' + model.nome }}
    </template>
    <template #extra>
      <Popover trigger="click">
        <template #content>
          <Button type="link" danger>Excluir</Button>
        </template>
        <Button :icon="h(MoreOutlined)"></Button>
      </Popover>
    </template>
  </Card>
</template>

<style scoped></style>

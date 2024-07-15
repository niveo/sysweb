<script setup lang="ts">
import { ClienteEnderecoServiceKey, NotificationServiceKey } from '@/service/key'
import { onMounted, defineExpose, inject, ref, reactive, h, computed } from 'vue'
import { EditOutlined, DeleteFilled } from '@ant-design/icons-vue'
import { MediaQuery, useBreakpoints } from '@/common/utils'
import {
  MSG_REGISTRO_REMOVER_ERRO,
  MSG_REGISTRO_REMOVIDO_SUCESSO,
  MSG_REGISTRO_OBTER_ERRO
} from '@/common/constantes'

const { mediaQuery } = useBreakpoints()

const service = inject(ClienteEnderecoServiceKey)!!
const notification = inject(NotificationServiceKey)!!
const registros: Record<string, string>[] = []
const props = defineProps<{
  cliente: number
}>()
const updateGridRegistros = ref(false)
const cadastroClienteEndereco = ref()

onMounted(() => {
  carregarRegistro()
})

function carregarRegistro() {
  registros.splice(0, registros.length + 1)
  service
    .obterRegistros(props.cliente)
    .then((data) => {
      registros.push(...data)
      updateGridRegistros.value = !updateGridRegistros.value
    })
    .catch((error) => {
      console.error(error)
      notification.error({
        message: 'Erro',
        description: MSG_REGISTRO_OBTER_ERRO,
        error: error
      })
    })
}

function novoRegistro() {
  cadastroClienteEndereco.value.editarRegistro({ cliente: props.cliente })
}

function editarRegistro(value: any) {
  cadastroClienteEndereco.value.editarRegistro(value)
}

function removerRegistro(registro: any) {
  service
    .remover(registro.codigo)
    .then(() => {
      notification.success({
        description: MSG_REGISTRO_REMOVIDO_SUCESSO
      })
      carregarRegistro()
    })
    .catch((error) => {
      console.error(error)
      notification.error({
        message: 'Erro',
        description: MSG_REGISTRO_REMOVER_ERRO,
        error: error
      })
    })
}

const layoute = computed(() => {
  return mediaQuery.value < MediaQuery.lg ? 'vertical' : 'horizontal'
})

defineExpose({ novoRegistro })
</script>

<template>
  <a-list
    item-layout="vertical"
    :data-source="registros"
    :pagination="{ pageSize: 3 }"
    :key="updateGridRegistros"
  >
    <template #renderItem="{ item }">
      <a-list-item key="item.codigo">
        <template #actions>
          <a-button type="primary" :icon="h(EditOutlined)" @click="editarRegistro(item)"></a-button>
          <PopConfirmarRemoverRegistro @confirm="removerRegistro(item)">
            <a-button type="primary" danger :icon="h(DeleteFilled)"></a-button>
          </PopConfirmarRemoverRegistro>
        </template>
        <a-descriptions bordered :layout="layoute">
          <a-descriptions-item label="Logradouro" :span="2">
            {{ item.endereco.logradouro }}</a-descriptions-item
          >
          <a-descriptions-item label="Número"> {{ item.endereco.numero }}</a-descriptions-item>

          <a-descriptions-item label="Bairro" :span="2">
            {{ item.endereco.bairro.descricao }}</a-descriptions-item
          >
          <a-descriptions-item label="Cidade" :span="2">
            {{ item.endereco.cidade.descricao }}</a-descriptions-item
          >
          <a-descriptions-item label="Estado">
            {{ item.endereco.cidade.estado.descricao }} -
            {{ item.endereco.cidade.estado.sigla }}</a-descriptions-item
          >
        </a-descriptions>
      </a-list-item>
    </template>
  </a-list>
  <CadastroClienteEndereco ref="cadastroClienteEndereco" @outRegistro="carregarRegistro" />
</template>

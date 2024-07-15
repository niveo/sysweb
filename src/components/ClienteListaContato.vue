<script setup lang="ts">
import { ClienteContatoServiceKey, NotificationServiceKey } from '@/service/key'
import { onMounted, defineExpose, inject, ref, reactive, h, computed } from 'vue'
import { EditOutlined, DeleteFilled } from '@ant-design/icons-vue'
import { MediaQuery, useBreakpoints } from '@/common/utils'
import {
  MSG_REGISTRO_REMOVER_ERRO,
  MSG_REGISTRO_REMOVIDO_SUCESSO,
  MSG_REGISTRO_OBTER_ERRO
} from '@/common/constantes'

const { mediaQuery } = useBreakpoints()

const service = inject(ClienteContatoServiceKey)!!
const notification = inject(NotificationServiceKey)!!
const registros: Record<string, string>[] = []
const props = defineProps<{
  cliente: number
}>()
const updateGridRegistros = ref(false)
const cadastroClienteContato = ref()

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
  cadastroClienteContato.value.editarRegistro({ cliente: props.cliente })
}

function editarRegistro(value: any) {
  cadastroClienteContato.value.editarRegistro(value)
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
        <a-descriptions bordered :layout="layoute" :column="2">
          <a-descriptions-item label="Nome"> {{ item.nome }}</a-descriptions-item>
          <a-descriptions-item label="Cargo"> {{ item.cargo }}</a-descriptions-item>
          <a-descriptions-item label="Telefones" :span="2">
            {{ item.telefones?.join(' / ') }}</a-descriptions-item
          >
          <a-descriptions-item label="E-mails" :span="2">
            {{ item.emails?.join(' / ') }}</a-descriptions-item
          >
          <a-descriptions-item label="Observação" :span="2">
            {{ item.observacao }}</a-descriptions-item
          >
        </a-descriptions>
      </a-list-item>
    </template>
  </a-list>
  <CadastroClienteContato ref="cadastroClienteContato" @outRegistro="carregarRegistro" />
</template>

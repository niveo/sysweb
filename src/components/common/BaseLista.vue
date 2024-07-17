<script setup lang="ts">
import { NotificationServiceKey } from '../../service/key'
import { onMounted, defineExpose, inject, ref, h, computed } from 'vue'
import { EditOutlined, DeleteFilled } from '@ant-design/icons-vue'
import { MediaQuery, useBreakpoints } from '../../common/utils'
import {
  MSG_REGISTRO_REMOVER_ERRO,
  MSG_REGISTRO_REMOVIDO_SUCESSO,
  MSG_REGISTRO_OBTER_ERRO
} from '../../common/constantes'
import api from '@/api'

const props = defineProps<{
  codigo: number
  componenteCastro: any
  path: string
  descriptions: any[]
}>()

const { mediaQuery } = useBreakpoints()
const notification = inject<any>(NotificationServiceKey)!!
const registros: Record<string, string>[] = []
const updateGridRegistros = ref(false)
const refView = ref()

onMounted(() => {
  carregarRegistro()
})

function carregarRegistro() {
  registros.splice(0, registros.length + 1)
  api
    .get(`${props.path}/${props.codigo}`)
    .then((response: any) => {
      registros.push(...response.data)
      updateGridRegistros.value = !updateGridRegistros.value
    })
    .catch((error: any) => {
      console.error(error)
      notification.error({
        message: 'Erro',
        description: MSG_REGISTRO_OBTER_ERRO,
        error: error
      })
    })
}

function novoRegistro() {
  refView.value.editarRegistro({ codigoReferencia: props.codigo })
}

function editarRegistro(value: any) {
  refView.value.editarRegistro(value)
}

function removerRegistro(registro: any) {
  api
    .delete(`${props.path}/${registro.codigo}`)
    .then(() => {
      notification.success({
        description: MSG_REGISTRO_REMOVIDO_SUCESSO
      })
      carregarRegistro()
    })
    .catch((error: any) => {
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
          <a-descriptions-item
            :label="description.label"
            :span="description.span"
            v-for="description of descriptions"
            :key="description"
          >
            {{ description.data(item) }}
          </a-descriptions-item>
        </a-descriptions>
      </a-list-item>
    </template>
  </a-list>
  <component :is="componenteCastro" ref="refView" @outRegistro="carregarRegistro"></component>
</template>

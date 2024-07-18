<script setup lang="ts">
import { NotificationServiceKey } from '../../service/key'
import { onMounted, defineExpose, inject, ref, h, computed, reactive } from 'vue'
import { EditOutlined, DeleteFilled } from '@ant-design/icons-vue'
import { MediaQuery, useBreakpoints } from '../../common/utils'
import {
  MSG_REGISTRO_REMOVER_ERRO,
  MSG_REGISTRO_REMOVIDO_SUCESSO,
  MSG_REGISTRO_OBTER_ERRO
} from '../../common/constantes'
import api from '@/api'
import { PagedModel } from '../../model/PagedModel'
import PaginationPageModel from '../PaginationPageModel.vue'

const props = defineProps<{
  codigo: number
  componenteCastro: any
  path: string
  descriptions: any[]
}>()

const { mediaQuery } = useBreakpoints()
const notification = inject<any>(NotificationServiceKey)!!
const updateGridRegistros = ref(false)
const refView = ref()
const page = reactive<PagedModel>({})

onMounted(() => {
  onCarregarRegistros(1)
})

function onCarregarRegistros(currentPage = 1) {
  console.log(currentPage)

  api
    .get(`${props.path}/${props.codigo}`, {
      params: {
        page: currentPage
      }
    })
    .then((response: any) => {
      page.page = response.data.page
      page.content = response.data.content
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
  refView.value.editarRegistro({ ...value, codigoReferencia: props.codigo })
}

function removerRegistro(registro: any) {
  api
    .delete(`${props.path}/${registro.codigo}`)
    .then(() => {
      notification.success({
        description: MSG_REGISTRO_REMOVIDO_SUCESSO
      })
      onCarregarRegistros()
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
  <PaginationPageModel
    :page="page.page"
    @onChange="onCarregarRegistros"
    v-if="page.page"
    size="small"
  />
  <a-list item-layout="vertical" :data-source="page.content" :key="updateGridRegistros">
    <template #renderItem="{ item }">
      <a-list-item key="item.codigo">
        <a-descriptions bordered :layout="layoute" size="small">
          <template #extra>
            <a-space>
              <a-button
                type="primary"
                size="small"
                :icon="h(EditOutlined)"
                @click="editarRegistro(item)"
              ></a-button>
              <PopConfirmarRemoverRegistro @confirm="removerRegistro(item)">
                <a-button type="primary" size="small" danger :icon="h(DeleteFilled)"></a-button>
              </PopConfirmarRemoverRegistro>
            </a-space>
          </template>
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
  <component :is="componenteCastro" ref="refView" @outRegistro="onCarregarRegistros(1)"></component>
</template>

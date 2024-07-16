<script setup lang="ts">
import { ref, inject, toRaw, defineEmits, reactive, onMounted, h } from 'vue'
import { NotificationServiceKey } from '../service/key'
import {
  PlusCircleOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import { lancarPaginaErro } from '../common/utils'
import type { PagedModel } from '../model/PagedModel'
import { useRouter } from 'vue-router'
import { MSG_REGISTRO_REMOVER_ERRO, MSG_REGISTRO_REMOVIDO_SUCESSO } from '../common/constantes'

const props = defineProps({
  serviceKey: {
    type: Symbol,
    required: true
  },
  componenteCadastro: {
    type: Object,
    required: false
  },
  descricao: {
    type: String,
    required: true
  },
  registro: {
    type: Object,
    required: false
  },
  tipoEdicao: {
    type: Boolean,
    required: false,
    default: false
  },
  tipoCadastro: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['outRegistro'])

const router = useRouter()
const page = reactive<PagedModel>({})
const service = inject<any>(props.serviceKey)!!
const notification = inject<any>(NotificationServiceKey)!!
const dialogPesquisaVisible = ref(false)
const dialogCadastroVisible = ref(false)
const loadingPesquisa = ref(false)
const valorPesquisa = ref('')
const registroEdicao = ref()

const onFiltrar = (currentPage = 1) => {
  service
    .obterTodos(currentPage, { descricao: valorPesquisa.value })
    .then((response: any) => {
      page.page = response.page
      page.content = response.content
    })
    .catch((error: any) => {
      console.error(error)
      lancarPaginaErro(router, error)
    })
}

function onRowSelected(e: any) {
  if (!props.tipoEdicao) {
    emit('outRegistro', toRaw(e))
    dialogCadastroVisible.value = false
    dialogPesquisaVisible.value = false
  }
}

function onNovoRegistro() {
  registroEdicao.value = {}
  dialogCadastroVisible.value = true
}

function onEditarRegistro(registro: any) {
  registroEdicao.value = toRaw(registro)
  dialogCadastroVisible.value = true
}

function onRemoverRegistro(registro: any) {
  service
    .remover(registro.codigo)
    .then(() => {
      notification.success({
        description: MSG_REGISTRO_REMOVIDO_SUCESSO
      })
      onFiltrar()
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

onMounted(() => {
  if (props.tipoEdicao) onFiltrar(1)
})
</script>

<template>
  <a-input
    :value="registro?.descricao"
    readonly
    @click="dialogPesquisaVisible = true"
    v-if="!tipoEdicao"
  >
    <template #suffix>
      <SearchOutlined />
    </template>
  </a-input>
  <a-button v-if="tipoEdicao" @click="dialogPesquisaVisible = true">{{ descricao }}</a-button>

  <a-drawer
    v-model:open="dialogPesquisaVisible"
    :title="'Pesquisa ' + descricao"
    placement="right"
    :bodyStyle="{ padding: '5px' }"
  >
    <template #extra v-if="tipoCadastro">
      <a-tooltip placement="bottom">
        <template #title>
          <span>Cadastrar {{ descricao }}</span>
        </template>
        <a-button type="primary" @click="onNovoRegistro">
          <template #icon>
            <PlusCircleOutlined />
          </template>
        </a-button>
      </a-tooltip>
    </template>

    <template #footer>
      <PaginationPageModel :page="page.page" @onChange="onFiltrar" size="small" />
    </template>

    <div style="display: flex; flex-direction: column; gap: 5px">
      <a-input-search
        v-model:value="valorPesquisa"
        autofocus
        :loading="loadingPesquisa"
        enter-button
        @search="onFiltrar()"
      >
      </a-input-search>

      <a-list :data-source="page.content">
        <template #renderItem="{ item }">
          <a-list-item
            style="cursor: pointer; border-bottom: 1px solid #d9d9d9"
            @click="onRowSelected(item)"
          >
            <template #actions v-if="tipoEdicao">
              <a-button @click="onEditarRegistro(item)" :icon="h(EditOutlined)"> </a-button>

              <PopConfirmarRemoverRegistro @confirm="onRemoverRegistro(item)">
                <a-button danger :icon="h(DeleteOutlined)"> </a-button>
              </PopConfirmarRemoverRegistro>
            </template>

            {{ item.descricao }}</a-list-item
          >
        </template>
      </a-list>
    </div>

    <a-drawer
      v-model:open="dialogCadastroVisible"
      :title="'Cadastrar ' + descricao"
      placement="right"
      :destroyOnClose="true"
    >
      <component
        v-if="componenteCadastro"
        :is="componenteCadastro"
        @outRegistro="onFiltrar()"
        :registro="registroEdicao"
      ></component>
    </a-drawer>
  </a-drawer>
</template>

<style scoped></style>

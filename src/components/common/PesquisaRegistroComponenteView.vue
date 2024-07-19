<script setup lang="ts">
import { ref, inject, toRaw, defineEmits, reactive, onMounted, h } from 'vue'
import { ConfiguracaoPesquisaServiceKey, NotificationServiceKey } from '../../service/key'
import {
  PlusCircleOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import { lancarPaginaErro } from '../../common/utils'
import type { PagedModel } from '../../model/PagedModel'
import { useRouter } from 'vue-router'
import { MSG_REGISTRO_REMOVER_ERRO, MSG_REGISTRO_REMOVIDO_SUCESSO } from '../../common/constantes'
import api from '@/api'
import type { ConfiguracaoPesquisaService } from '@/service'
import type { SelectProps } from 'ant-design-vue'

const props = defineProps({
  codigo: {
    type: Number,
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
    default: false
  }
})
const emit = defineEmits(['outRegistro'])

const router = useRouter()
const page = reactive<PagedModel>({})
const notification = inject<any>(NotificationServiceKey)!!
const dialogPesquisaVisible = ref(false)
const dialogCadastroVisible = ref(false)
const loadingPesquisa = ref(false)
const valorPesquisa = ref('')
const registroEdicao = ref()
const serviceConfiguracao = inject<ConfiguracaoPesquisaService>(ConfiguracaoPesquisaServiceKey)!!
const campoPesquisarSelecionado = ref()

const optionsCampoPesquisar = ref<SelectProps['options']>([])

let config: any = null
const descricao = ref()
const componenteCadastro = ref()

const onFiltrar = (currentPage = 1) => {
  const obPesquisa: any = {}
  if (campoPesquisarSelecionado.value)
    obPesquisa[campoPesquisarSelecionado.value] = valorPesquisa.value

  api
    .get(config.caminho, {
      params: {
        page: currentPage,
        condicoes: JSON.stringify(obPesquisa)
      }
    })
    .then((response: any) => {
      page.page = response.data.page
      page.content = response.data.content
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
  api
    .delete(`${config.caminho}/${registro.codigo}`)
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
  serviceConfiguracao.obterCodigo(props.codigo).then((response) => {
    descricao.value = response.descricao
    optionsCampoPesquisar.value!!.push(...response.filtros)
    componenteCadastro.value = response.componenteCadastro
    config = response
  })
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
      <PaginationPageModel :page="page.page" @onChange="onFiltrar" size="small" v-if="page.page" />
    </template>

    <div style="display: flex; flex-direction: column; gap: 5px">
      <a-select
        v-model:value="campoPesquisarSelecionado"
        :options="optionsCampoPesquisar"
        v-bind="config"
        :field-names="{ label: 'descricao', value: 'campo' }"
      >
      </a-select>

      <a-input-search
        v-model:value="valorPesquisa"
        autofocus
        :loading="loadingPesquisa"
        enter-button
        @search="onFiltrar()"
      >
      </a-input-search>

      <a-list :data-source="page.content" v-if="page.page">
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

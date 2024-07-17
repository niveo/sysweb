<script setup lang="ts">
import { FilterOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { h, reactive, ref, inject, toRaw, onMounted } from 'vue'
import type { DrawerProps } from 'ant-design-vue'
import type { PagedModel } from '../../model/PagedModel'
import { useRouter } from 'vue-router'
import { lancarPaginaErro } from '@/common/utils'
import { ConfiguracaoGradeServiceKey } from '@/service/key/ConfiguracaoGradeServiceKey'
import api from '@/api'
const props = defineProps({
  codigo: {
    type: Number,
    require: true
  }
})

const router = useRouter()
const confService = inject<any>(ConfiguracaoGradeServiceKey)!!
const open = ref<boolean>(true)
const placement = ref<DrawerProps['placement']>('left')
const page = reactive<PagedModel>({})
const formRef = ref()
const formState = reactive<any>({})
const forcarBind = ref<Boolean>(false)
let config: any

const showDrawer = () => {
  open.value = true
}

const onClose = () => {
  open.value = false
}

const onCarregarRegistros = (currentPage = 1) => {
  onClose()

  const condicoes = JSON.stringify(toRaw(formState))

  api
    .get(`${config.caminho}`, {
      params: { page: currentPage, condicoes: condicoes }
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

function onIncluir() {
  router.push({ name: config.caminhoInserir })
}

let formItens: any[] = []

const onSubmit = (currentPage = 1) => {
  formRef.value
    .validate()
    .then(() => {
      onCarregarRegistros(currentPage)
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}

const onFiltrar = () => {
  onSubmit(1)
}

const onValueInput = (event: any, item: any) => {
  formState[item.campo] = event
}

onMounted(() => {
  confService
    .obterCodigo(props.codigo)
    .then((data: any) => {
      config = data
      formItens = data.filtros
      forcarBind.value = !forcarBind.value
    })
    .catch(console.error)
})
</script>

<template>
  <main>
    <div style="display: flex; flex-direction: row; gap: 5px; flex-wrap: wrap">
      <a-button
        type="primary"
        shape="circle"
        :icon="h(FilterOutlined)"
        @click="showDrawer"
      ></a-button>
      <a-button type="primary" shape="circle" :icon="h(PlusOutlined)" @click="onIncluir"></a-button>
      <PaginationPageModel :page="page.page" @onChange="onSubmit" v-if="page.page" />
    </div>

    <a-drawer
      title="Filtros"
      :placement="placement"
      :closable="false"
      :open="open"
      @close="onClose"
    >
      <template #extra>
        <a-button style="margin-right: 8px" @click="onClose">Sair</a-button>
        <a-button type="primary" @click="onFiltrar">Filtrar</a-button>
      </template>

      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        layout="vertical"
        ref="formRef"
        v-bind="forcarBind"
      >
        <a-form-item
          :label="item.descricao"
          :name="item.campo"
          v-for="item of formItens"
          :key="item.codigo"
          :rules="[{ required: item.required }]"
        >
          <component
            :is="item.componente"
            :modelValue="formState[item.campo]"
            @update:modelValue="onValueInput($event, item)"
            :type="item.tipo"
          />
        </a-form-item>
      </a-form>
    </a-drawer>

    <div style="width: 100%; height: 100%; background-color: rgb(236, 236, 236)">
      <a-list item-layout="vertical" size="large" :data-source="page.content">
        <template #renderItem="{ item }">
          <component :is="config.listaItem" :model="item" v-if="config" />
        </template>
      </a-list>
    </div>
  </main>
</template>

<script setup lang="ts">
import { FilterOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { h, reactive, ref, inject, toRaw } from 'vue'
import type { DrawerProps } from 'ant-design-vue'
import { EmpresaServiceKey } from '../service'
import type { PagedModel } from '../model/PagedModel'
import { useRouter } from 'vue-router'

const router = useRouter()
const service = inject(EmpresaServiceKey)!!
const open = ref<boolean>(true)
const placement = ref<DrawerProps['placement']>('left')
const page = reactive<PagedModel>({})

const showDrawer = () => {
  open.value = true
}

const onClose = () => {
  open.value = false
}

interface FormState {
  codigo?: number
  nome?: string
  razaoSocial?: string
  documento?: string
}

const formState = reactive<FormState>({})

const onFiltrar = () => {
  onClose()
  service.obterTodos(toRaw(formState)).then((response) => {
    page.page = response.page
    page.content = response.content
  })
}

function onIncluir() {
  router.push({ name: 'empresas_cadastrar' })
}
</script>

<template>
  <main>
    <div style="display: flex; flex-direction: row; justify-content: space-between">
      <a-button
        type="primary"
        shape="circle"
        :icon="h(FilterOutlined)"
        @click="showDrawer"
      ></a-button>
      <a-button type="primary" shape="circle" :icon="h(PlusOutlined)" @click="onIncluir"></a-button>
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

      <a-form :model="formState" name="basic" autocomplete="off" layout="vertical">
        <a-form-item label="Código" name="codigo">
          <a-input v-model:value="formState.codigo" />
        </a-form-item>

        <a-form-item label="Nome" name="nome">
          <a-input v-model:value="formState.nome" />
        </a-form-item>

        <a-form-item label="Razão Social" name="razaoSocial">
          <a-input v-model:value="formState.razaoSocial" />
        </a-form-item>

        <a-form-item label="CNPJ / CPF" name="documento">
          <a-input v-model:value="formState.documento" />
        </a-form-item>
      </a-form>
    </a-drawer>
    <EmpresaLista :page="page" @outRegistroRemovido="onFiltrar" />
  </main>
</template>

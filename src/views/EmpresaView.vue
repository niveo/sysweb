<script setup lang="ts">
import { Drawer, Button, Form, FormItem, Input } from 'ant-design-vue'
import { FilterOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { h, reactive, ref, inject, toRaw } from 'vue'
import type { DrawerProps } from 'ant-design-vue'
import { EmpresaServiceKey } from '../service'
import type { PagedModel } from '../model/PagedModel'
import EmpresaLista from '../components/EmpresaLista.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const empresaService = inject(EmpresaServiceKey)!!
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
  empresaService.obterTodos(toRaw(formState)).then((response) => {
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
      <Button type="primary" shape="circle" :icon="h(FilterOutlined)" @click="showDrawer"></Button>
      <Button type="primary" shape="circle" :icon="h(PlusOutlined)" @click="onIncluir"></Button>
    </div>

    <Drawer title="Filtros" :placement="placement" :closable="false" :open="open" @close="onClose">
      <template #extra>
        <Button style="margin-right: 8px" @click="onClose">Sair</Button>
        <Button type="primary" @click="onFiltrar">Filtrar</Button>
      </template>

      <Form :model="formState" name="basic" autocomplete="off" layout="vertical">
        <FormItem label="Código" name="codigo">
          <Input v-model:value="formState.codigo" />
        </FormItem>

        <FormItem label="Nome" name="nome">
          <Input v-model:value="formState.nome" />
        </FormItem>

        <FormItem label="Razão Social" name="razaoSocial">
          <Input v-model:value="formState.razaoSocial" />
        </FormItem>

        <FormItem label="CNPJ / CPF" name="documento">
          <Input v-model:value="formState.documento" />
        </FormItem>
      </Form>
    </Drawer>
    <EmpresaLista :page="page" />
  </main>
</template>

<script setup lang="ts">
import { ref, inject, toRaw, defineEmits, watch } from 'vue'
import { CidadeServiceKey } from '@/service'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons-vue'

defineProps({
  registro: {
    type: Object,
    required: false
  }
})
const emit = defineEmits(['outRegistro'])

const service = inject(CidadeServiceKey)!!

const dialogPesquisaVisible = ref(false)
const dialogCadastroVisible = ref(false)
const valorPesquisa = ref('')
const dataSource = ref<any[]>([])
const loadingPesquisa = ref(false)

const columns = [
  { title: 'Descrição', dataIndex: 'descricao', key: 'descricao' },
  { title: 'Estado', dataIndex: 'estado', key: 'estado' }
]

function onPesquisar(value: string) {
  loadingPesquisa.value = true
  service
    .pesquisarDescricao(value)
    .then((data) => {
      dataSource.value = data
    })
    .finally(() => (loadingPesquisa.value = false))
}

function onRowSelected(e: any) {
  emit('outRegistro', toRaw(e))
  dialogCadastroVisible.value = false
  dialogPesquisaVisible.value = false
}
</script>

<template>
  <a-input
    :value="registro?.descricao"
    :prefix="registro?.estado?.sigla"
    readonly
    @click="dialogPesquisaVisible = true"
  >
    <template #suffix>
      <SearchOutlined />
    </template>
  </a-input>

  <a-drawer v-model:open="dialogPesquisaVisible" title="Pesquisa Cidade" placement="right">
    <template #extra>
      <a-tooltip placement="bottom">
        <template #title>
          <span>Cadastrar Cidade</span>
        </template>
        <a-button type="primary" @click="dialogCadastroVisible = true">
          <template #icon>
            <PlusCircleOutlined />
          </template>
        </a-button>
      </a-tooltip>
    </template>

    <a-input-search
      v-model:value="valorPesquisa"
      autofocus
      :loading="loadingPesquisa"
      enter-button
      @search="onPesquisar"
    >
    </a-input-search>

    <a-table
      :dataSource="dataSource"
      :columns="columns"
      @selection="onRowSelected"
      :pagination="{ pageSize: 4 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'descricao'">
          <span @click="onRowSelected(record)" style="cursor: pointer">
            {{ record.descricao }}</span
          >
        </template>
        <template v-if="column.key === 'estado'">
          <span @click="onRowSelected(record)" style="cursor: pointer">
            {{ record.estado.sigla }}</span
          >
        </template>
      </template>
    </a-table>

    <a-drawer v-model:open="dialogCadastroVisible" title="Cadastrar" placement="right">
      <CadastroCidade @outRegistro="onRowSelected" />
    </a-drawer>
  </a-drawer>
</template>

<style scoped></style>

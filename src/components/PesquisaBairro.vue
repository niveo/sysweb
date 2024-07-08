<script setup lang="ts">
import { ref, inject, toRaw, defineEmits, watch } from 'vue'
import { BairroServiceKey } from '@/service'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons-vue'

defineProps({
  registro: {
    type: Object,
    required: false
  }
})
const emit = defineEmits(['outRegistro'])

const service = inject(BairroServiceKey)!!

const dialogPesquisaVisible = ref(false)
const dialogCadastroVisible = ref(false)
const valorPesquisa = ref('')
const dataSource = ref<any[]>([])

const columns = [{ title: 'Descrição', dataIndex: 'descricao', key: 'descricao' }]

watch(valorPesquisa, () => {
  service.pesquisarDescricao(valorPesquisa.value).then((data) => {
    dataSource.value = data
  })
})

function onRowSelected(e: any) {
  emit('outRegistro', toRaw(e))
  dialogCadastroVisible.value = false
  dialogPesquisaVisible.value = false
}
</script>

<template>
  <a-input :value="registro?.descricao" readonly @click="dialogPesquisaVisible = true">
    <template #suffix>
      <SearchOutlined />
    </template>
  </a-input>

  <a-modal v-model:open="dialogPesquisaVisible" title="Pesquisa Bairro" :footer="null">
    <div>
      <div style="padding: 5px; display: flex; flex-direction: row; gap: 5px">
        <a-input v-model:value.lazy="valorPesquisa" autofocus>
          <template #suffix>
            <SearchOutlined />
          </template>
        </a-input>

        <a-tooltip>
          <template #title>
            <span>Cadastrar Bairro</span>
          </template>
          <a-button type="primary" @click="dialogCadastroVisible = true">
            <template #icon>
              <PlusCircleOutlined />
            </template>
          </a-button>
        </a-tooltip>
      </div>
      <div>
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
          </template>
        </a-table>
      </div>
    </div>
  </a-modal>

  <a-modal v-model:open="dialogCadastroVisible" title="Bairro" :footer="null">
    <CadastroBairro @outRegistro="onRowSelected" />
  </a-modal>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref, inject, toRaw, defineProps, defineEmits } from 'vue'
import { Search, CirclePlus } from '@element-plus/icons-vue'
import { BairroServiceKey } from '@/service'
import { debounce } from '@/common/utils'
defineProps({
  registro: {
    type: Object,
    required: false
  }
})
const emit = defineEmits(['outRegistro'])

const service = inject(BairroServiceKey)!!

const dialogVisible = ref(false)
const valorPesquisa = ref()
const gridData = ref<any[]>([])

const valueChanged = debounce(() => {
  service.pesquisarDescricao(valorPesquisa.value).then((data) => {
    gridData.value = data
  })
}, 500)

function onRowSelected(e) {
  emit('outRegistro', toRaw(e))
  dialogVisible.value = false
}

function onCarregarDialog() {
  dialogVisible.value = true
  setTimeout(() => {
    const node = document.getElementsByClassName('el-dialog__body')!!.item(0)
    if (node) node!!.classList.add('el-dialog__content')
  }, 300)
}
</script>

<template>
  <el-input :value="registro?.descricao" readonly :suffix-icon="Search" @click="onCarregarDialog" />
  <el-dialog v-model="dialogVisible" fullscreen class="el-dialog__content">
    <template #header><span style="padding: 10px">Pesquisa Bairro</span></template>
    <div class="el-dialog__content">
      <div style="padding: 5px; display: flex; flex-direction: row; gap: 5px">
        <el-input v-model="valorPesquisa" :suffix-icon="Search" @input="valueChanged" />
        <el-button type="primary" :icon="CirclePlus" circle />
      </div>
      <div class="el-dialog__content_table">
        <el-table
          :data="gridData"
          row-key="codigo"
          @row-click="onRowSelected"
          style="cursor: pointer"
        >
          <el-table-column prop="descricao" label="Bairro"> </el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped></style>

<script setup lang="ts">
import type { PagedModel } from '../model/PagedModel'
defineProps<{
  page: PagedModel
}>()
const emit = defineEmits(['outRegistroRemovido'])
function outRegistroRemovido(codigo: number) {
  emit('outRegistroRemovido', codigo)
}
const onChange = (page: number) => {
  console.log(page)
}
</script>

<template>
  <div style="width: 100%; height: 100%; background-color: rgb(236, 236, 236)">
    <!--div v-for="n in page.content" :key="n" style="padding: 5px; width: 100%; overflow: hidden">
      <ClienteListaCard :model="n" @outRegistroRemovido="outRegistroRemovido" />
    </!--div-->
    {{ page.page }}
    <a-pagination
      @change="onChange"
      :total="page.page?.totalElements"
      :defaultPageSize="page.page?.size"
    />
    <a-list item-layout="vertical" size="large" :data-source="page.content">
      <template #renderItem="{ item }">
        <a-list-item key="item.codigo">
          <a-list-item-meta :description="item.nome"> </a-list-item-meta>
          <ClienteListaCard :model="item" @outRegistroRemovido="outRegistroRemovido" />
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped></style>

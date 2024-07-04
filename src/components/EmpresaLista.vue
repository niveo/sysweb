<script setup lang="ts">
import type { PagedModel } from '../model/PagedModel'
import EmpresaListaCard from '../components/EmpresaListaCard.vue'
defineProps<{
  page: PagedModel
}>()
</script>

<template>
  <div style="width: 100%; background-color: rgb(236, 236, 236)">
    <div v-for="n in page.content" :key="n" style="padding: 5px; width: 100%; overflow: hidden">
      <EmpresaListaCard :model="n" />
    </div>
  </div>
</template>

<style scoped></style>

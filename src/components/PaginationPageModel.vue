<script setup lang="ts">
defineProps({
  page: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    required: false
  }
})
const emits = defineEmits(['onChange'])

const changePage = (page: number) => {
  emits('onChange', page)
}
</script>

<template>
  <a-pagination
    v-if="page"
    :current="page?.number + 1"
    @change="changePage"
    :total="page?.totalElements - 1"
    :pageSize="page?.size"
    :showSizeChanger="false"
    show-quick-jumper
    :size="size"
  />
</template>

<style scoped></style>

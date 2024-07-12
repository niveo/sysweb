<script setup lang="ts">
import { defineEmits } from 'vue'
defineEmits(['confirm'])
</script>
<template>
  <a-popconfirm
    title="Deseja remover o registro selecionado?"
    ok-text="Sim"
    cancel-text="Não"
    @confirm="$emit('confirm')"
  >
    <slot></slot>
  </a-popconfirm>
</template>

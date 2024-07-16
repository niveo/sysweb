<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <a-input :value="modelValue" @input="emit('update:modelValue', $event.target.value)" />
</template>

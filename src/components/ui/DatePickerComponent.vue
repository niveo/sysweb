<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import locale from 'ant-design-vue/es/date-picker/locale/pt_BR'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <a-date-picker
    :show-time="{ format: 'HH:mm' }"
    format="DD/MM/YYYY HH:mm"
    :value="modelValue"
    :locale="locale"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

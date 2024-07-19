<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import locale from 'ant-design-vue/es/date-picker/locale/pt_BR'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const change = (e: any) => {
  emit('update:modelValue', e)
}
const dateFormat = 'DD/MM/YYYY HH:mm:ss'
</script>
<template>
  <a-date-picker
    show-time
    :value="modelValue"
    :locale="locale"
    @change="change"
    :format="dateFormat"
  />
</template>

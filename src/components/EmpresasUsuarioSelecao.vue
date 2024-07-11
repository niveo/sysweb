<script setup lang="ts">
import { UsuarioServiceKey } from '@/service'
import type { SelectProps } from 'ant-design-vue'
import { ref, inject, onMounted } from 'vue'

const service = inject(UsuarioServiceKey)!!

const value = ref()
const disabled = ref(false)
const options = ref<SelectProps['options']>([])

const handleChange = (value: number) => {
  localStorage.setItem('EMPRESA', String(value))
}

onMounted(() => {
  service.empresas().then((data) => {
    options.value = data
    if (options.value.length === 1) {
      const empresa = options.value[0].codigo
      localStorage.setItem('EMPRESA', String(empresa))
      value.value = empresa
      disabled.value = true
      return
    } else {
      try {
        const empresa = Number(localStorage.getItem('EMPRESA'))
        if (empresa) value.value = empresa
      } catch (e) {
        console.error(e)
      }
    }
  })
})
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <label>Empresa</label>
    <a-select
      :disabled="disabled"
      ref="select"
      v-model:value="value"
      style="width: 100%"
      @change="handleChange"
      :options="options"
      :fieldNames="{ label: 'nome', value: 'codigo' }"
    >
      <template #option="{ nome, documento }"> {{ nome }} <br />{{ documento }}</template>
    </a-select>
  </div>
</template>

<style scoped></style>

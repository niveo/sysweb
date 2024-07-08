<script setup lang="ts">
import { reactive, inject, ref, h, defineEmits } from 'vue'
import { BairroServiceKey } from '../service'
import { SaveOutlined } from '@ant-design/icons-vue'
const bairroService = inject(BairroServiceKey)!!

const emit = defineEmits(['outRegistro'])

interface FormState {
  descricao: string
}

const msgError = ref()

const formState = reactive<FormState>({
  descricao: ''
})
const onFinish = (values: FormState) => {
  console.log('Success:', values)
  msgError.value = ''
  bairroService
    .salvar(values.descricao)
    .then((data) => emit('outRegistro', data))
    .catch((error) => {
      console.error(error)
      msgError.value = error.response.data.properties.description
    })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
  msgError.value = ''
}
</script>

<template>
  <main>
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Descrição"
        name="descricao"
        :rules="[{ required: true, message: 'Por favor informe a descrição!' }]"
      >
        <a-input v-model:value="formState.descricao" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" :icon="h(SaveOutlined)">Salvar</a-button>
      </a-form-item>
    </a-form>
    <a-alert v-if="msgError" :description="msgError" type="error" />
  </main>
</template>

<style scoped></style>

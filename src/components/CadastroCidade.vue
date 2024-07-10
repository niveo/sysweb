<script setup lang="ts">
import { reactive, inject, onMounted, ref, h, defineEmits } from 'vue'
import { EstadoServiceKey, CidadeServiceKey } from '../service'
import { SaveOutlined } from '@ant-design/icons-vue'
const estadoService = inject(EstadoServiceKey)!!
const cidadeService = inject(CidadeServiceKey)!!

const emit = defineEmits(['outRegistro'])

interface FormState {
  descricao: string
  estado?: any
}

const msgError = ref()
const estados = ref([])

const formState = reactive<FormState>({
  descricao: ''
})
const onFinish = (values: FormState) => {
  console.log('Success:', values)
  msgError.value = ''
  cidadeService
    .salvar(values.descricao, values.estado)
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

onMounted(() => {
  estadoService.obterTodos().then((data) => {
    estados.value = data
  })
})
</script>

<template>
  <main>
    <a-form
      layout="vertical"
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

      <a-form-item
        label="Estado"
        name="estado"
        :rules="[{ required: true, message: 'Por favor informe o estado!' }]"
      >
        <a-select v-model:value="formState.estado">
          <a-select-option :value="item.codigo" v-for="item of estados" :key="item.codigo">{{
            item.descricao
          }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" :icon="h(SaveOutlined)">Salvar</a-button>
      </a-form-item>
    </a-form>
    <a-alert v-if="msgError" :description="msgError" type="error" />
  </main>
</template>

<style scoped></style>

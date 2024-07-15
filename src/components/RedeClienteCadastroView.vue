<script setup lang="ts">
import { reactive, inject, h, defineEmits, onMounted } from 'vue'
import { NotificationServiceKey, RedeClienteServiceKey } from '../service/key'
import { SaveOutlined } from '@ant-design/icons-vue'
import { MSG_REGISTRO_SALVAR_ERRO, MSG_REGISTRO_SALVO_SUCESSO } from '@/common/constantes'
const service = inject(RedeClienteServiceKey)!!
const notification = inject(NotificationServiceKey)!!
const emit = defineEmits(['outRegistro'])

const props = defineProps({
  registro: {
    type: Object,
    required: false
  }
})

interface FormState {
  descricao: string
}

const formState = reactive<FormState>({
  descricao: ''
})

const onFinish = (values: FormState) => {
  console.log('Success:', values)
  service
    .salvar({ descricao: values.descricao, codigo: props.registro?.codigo })
    .then((data) => {
      notification.success({
        description: MSG_REGISTRO_SALVO_SUCESSO
      })
      emit('outRegistro', data)
    })
    .catch((error) => {
      console.error(error)
      notification.error({
        message: 'Erro',
        description: MSG_REGISTRO_SALVAR_ERRO,
        error: error
      })
    })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

onMounted(() => {
  formState.descricao = props.registro?.descricao
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

      <a-form-item>
        <a-button type="primary" html-type="submit" :icon="h(SaveOutlined)">Salvar</a-button>
      </a-form-item>
    </a-form>
  </main>
</template>

<style scoped></style>

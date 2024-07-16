<script setup lang="ts">
import { reactive, inject, onMounted, ref, h, defineEmits } from 'vue'
import { EstadoServiceKey, CidadeServiceKey, NotificationServiceKey } from '../service/key'
import { SaveOutlined } from '@ant-design/icons-vue'
import { MSG_REGISTRO_SALVAR_ERRO, MSG_REGISTRO_SALVO_SUCESSO } from '../common/constantes'
const estadoService = inject(EstadoServiceKey)!!
const notification = inject(NotificationServiceKey)!!
const service = inject(CidadeServiceKey)!!

const emit = defineEmits(['outRegistro'])

const props = defineProps({
  registro: {
    type: Object,
    required: false
  }
})

interface FormState {
  descricao: string
  estado?: any
}

const estados = ref<any[]>([])

const formState = reactive<FormState>({
  descricao: ''
})
const onFinish = (values: FormState) => {
  console.log('Success:', values)
  service
    .salvar({ descricao: values.descricao, estado: values.estado, codigo: props.registro?.codigo })
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
  </main>
</template>

<style scoped></style>

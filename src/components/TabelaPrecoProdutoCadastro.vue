<script setup lang="ts">
import { TabelaPrecoProdutoServiceKey } from '../service/key'
import { defineEmits, defineExpose, inject, ref, reactive, h, toRaw } from 'vue'
import { SaveOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'
import { validateMessagesForm } from '../common/utils'
import { NotificationServiceKey } from '../service/key/NotificationServiceKey'
import { MSG_REGISTRO_SALVAR_ERRO, MSG_REGISTRO_SALVO_SUCESSO } from '../common/constantes'
import PesquisaRegistroComponenteView from '../components/common/PesquisaRegistroComponenteView.vue'

const emits = defineEmits(['outRegistro'])

interface FormState {
  valor?: number
  produto?: any
}

const service = inject(TabelaPrecoProdutoServiceKey)!!
const notification = inject<any>(NotificationServiceKey)!!
const open = ref<boolean>(false)
const validateMessages = validateMessagesForm
const formState = reactive<FormState>({})
const codigoRegistro = ref()
const codigoReferencia = ref()
const formRef = ref()

const afterOpenChange = (bool: boolean) => {
  if (!bool) {
    formRef.value.resetFields()
  }
}

const editarRegistro = (registro: any) => {
  codigoRegistro.value = registro.codigo
  codigoReferencia.value = registro.codigoReferencia
  formState.valor = registro.valor
  formState.produto = registro.produto

  open.value = true
}

const novoRegistro = () => {
  editarRegistro({ codigoReferencia: codigoReferencia.value })
}

function salvarRegistro(values: any) {
  service
    .salvar({
      codigo: codigoRegistro.value,
      lancamento: codigoReferencia.value,
      valor: values.valor,
      produto: values.produto.codigo
    })
    .then((data) => {
      codigoRegistro.value = data.codigo
      codigoReferencia.value = data.lancamento
      notification.success({
        description: MSG_REGISTRO_SALVO_SUCESSO
      })
      emits('outRegistro', data)
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

const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      salvarRegistro(toRaw(formState))
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}

const onProduto = (produto: any) => {
  formState.produto = produto
}

defineExpose({ editarRegistro })
</script>

<template>
  <a-drawer
    v-model:open="open"
    title="Cadastro"
    placement="right"
    @after-open-change="afterOpenChange"
  >
    <template #extra>
      <a-button type="primary" :icon="h(PlusCircleOutlined)" @click="novoRegistro"> </a-button>
    </template>
    <template #footer>
      <a-button type="primary" :icon="h(SaveOutlined)" @click="onSubmit">Salvar</a-button>
    </template>
    <a-form
      ref="formRef"
      layout="vertical"
      :model="formState"
      name="basic"
      autocomplete="off"
      :validate-messages="validateMessages"
    >
      <a-form-item label="Produto" name="produto" :rules="[{ required: true }]">
        <PesquisaRegistroComponenteView
          :codigo="1"
          :registro="formState.produto"
          @outRegistro="onProduto"
        />
      </a-form-item>

      <a-form-item label="Valor" name="valor" :rules="[{ required: true }]">
        <a-input-number v-model:value="formState.valor" :min="0" :step="0.01" string-mode />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<style scoped></style>

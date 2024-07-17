<script setup lang="ts">
import { ProdutoUnidadeServiceKey } from '../service/key'
import { defineEmits, defineExpose, inject, ref, reactive, h, toRaw } from 'vue'
import {
  SaveOutlined,
  MinusCircleOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons-vue'
import { validateMessagesForm } from '../common/utils'
import { NotificationServiceKey } from '../service/key/NotificationServiceKey'
import { MSG_REGISTRO_SALVAR_ERRO, MSG_REGISTRO_SALVO_SUCESSO } from '../common/constantes'

const emits = defineEmits(['outRegistro'])

interface FormState {
  barra?: string
  unidade?: any
  tipoOperacao?: string
  quantidade?: number
  valor?: number
  tipoBarra?: string
}

const service = inject(ProdutoUnidadeServiceKey)!!
const notification = inject<any>(NotificationServiceKey)!!
const open = ref<boolean>(false)
const validateMessages = validateMessagesForm
const formState = reactive<FormState>({
  barra: '',
  unidade: {},
  tipoOperacao: 'MULTIPLICA',
  tipoBarra: 'EAN13'
})
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
  formState.barra = registro.barra
  formState.unidade = registro.unidade
  formState.tipoOperacao = registro.tipoOperacao || 'MULTIPLICA'
  formState.quantidade = registro.quantidade
  formState.valor = registro.valor
  formState.tipoBarra = registro.tipoBarra || 'EAN13'

  open.value = true
}

function salvarRegistro(values: any) {
  service
    .salvar({
      codigo: codigoRegistro.value,
      produto: codigoReferencia.value,
      barra: values.barra,
      unidade: values.unidade.codigo,
      tipoOperacao: values.tipoOperacao,
      quantidade: values.quantidade,
      valor: values.valor,
      tipoBarra: values.tipoBarra
    })
    .then((data) => {
      codigoRegistro.value = data.codigo
      codigoReferencia.value = data.cliente
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

const onUnidade = (unidade: any) => {
  formState.unidade = unidade
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
      <a-form-item label="Unidade" name="unidade" :rules="[{ required: true }]">
        <UnidadePesquisaView :registro="formState.unidade" @outRegistro="onUnidade" />
      </a-form-item>

      <a-form-item label="Operação" name="tipoOperacao">
        <a-radio-group v-model:value="formState.tipoOperacao">
          <a-radio value="MULTIPLICA" :checked="true">Multiplica</a-radio>
          <a-radio value="DIVITE">Divide</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="Quantidade"
        name="quantidade"
        :rules="[{ required: true, type: 'number' }]"
      >
        <a-input-number v-model:value="formState.quantidade" type="number" />
      </a-form-item>

      <a-form-item label="Valor" name="valor" :rules="[{ required: true, type: 'number' }]">
        <a-input-number v-model:value="formState.valor" type="number" />
      </a-form-item>

      <a-form-item label="Tipo" name="tipoBarra">
        <a-radio-group v-model:value="formState.tipoBarra">
          <a-radio value="EAN13" :checked="true">EAN13</a-radio>
          <a-radio value="EAN14">EAN14</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="Barra" name="barra" :rules="[{ required: true }]">
        <a-input v-model:value="formState.barra" :maxlength="14" />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<style scoped></style>

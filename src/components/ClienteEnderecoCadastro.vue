<script setup lang="ts">
import { defineEmits, defineExpose, inject, ref, reactive, h, toRaw } from 'vue'
import { SaveOutlined } from '@ant-design/icons-vue'
import { validateMessagesForm } from '../common/utils'
import { vMaska } from 'maska/vue'
import { CepServiceKey, NotificationServiceKey, ClienteEnderecoServiceKey } from '../service/key'
import {
  MSG_REGISTRO_OBTER_ERRO,
  MSG_REGISTRO_SALVAR_ERRO,
  MSG_REGISTRO_SALVO_SUCESSO
} from '../common/constantes'

const emits = defineEmits(['outRegistro'])

interface FormState {
  logradouro?: string
  numero?: string
  cep?: string
  complemento?: string
  cidade?: {
    codigo?: number
    descricao?: string
  }
  bairro?: {
    codigo?: number
    descricao?: string
  }
  observacao?: string
}

const loadingPesquisaCep = ref(false)
const service = inject(ClienteEnderecoServiceKey)!!
const cepService = inject(CepServiceKey)!!
const notification = inject(NotificationServiceKey)!!
const open = ref<boolean>(false)
const validateMessages = validateMessagesForm
const formState = reactive<FormState>({
  bairro: {},
  cep: '',
  cidade: {},
  complemento: '',
  logradouro: '',
  numero: '',
  observacao: ''
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
  formState.observacao = registro.observacao

  if (registro.endereco) {
    formState.bairro = registro.endereco.bairro
    formState.cep = registro.endereco.cep
    formState.cidade = registro.endereco.cidade
    formState.complemento = registro.endereco.complemento
    formState.logradouro = registro.endereco.logradouro
    formState.numero = registro.endereco.numero
  }
  open.value = true
}

function onPesquisarCep(cep: string) {
  loadingPesquisaCep.value = true
  cepService
    .pesquisar(cep)
    .then((data) => {
      if (data) {
        formState.logradouro = data.logradouro
        formState.cidade = data.cidade
        formState.bairro = data.bairro
      }
    })
    .catch((error) => {
      notification.error({
        message: 'Erro',
        description: MSG_REGISTRO_OBTER_ERRO,
        error: error
      })
    })
    .finally(() => (loadingPesquisaCep.value = false))
}

const onCidade = (cidade: any) => {
  formState.cidade = cidade
}
const onBairro = (bairro: any) => {
  formState.bairro = bairro
}

function salvarRegistro(values: any) {
  service
    .salvar({
      codigo: codigoRegistro.value,
      cliente: codigoReferencia.value,
      observacao: values.observacao,
      endereco: { ...toRaw(values) }
    })
    .then((data: any) => {
      codigoRegistro.value = data.codigo
      codigoReferencia.value = data.cliente
      notification.success({
        description: MSG_REGISTRO_SALVO_SUCESSO
      })
      emits('outRegistro', data)
    })
    .catch((error: any) => {
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
      <a-form-item label="CEP" name="cep" :rules="[{ required: true }]">
        <a-input-search
          v-model:value="formState.cep"
          :maxlength="9"
          v-maska="'#####-###'"
          :loading="loadingPesquisaCep"
          enter-button
          @search="onPesquisarCep"
        />
      </a-form-item>

      <a-form-item label="Logradouro" name="logradouro" :rules="[{ required: true }]">
        <a-input v-model:value="formState.logradouro" :maxlength="255" />
      </a-form-item>

      <a-form-item label="Número" name="numero" :rules="[{ required: true }]">
        <a-input v-model:value="formState.numero" :maxlength="15" />
      </a-form-item>

      <a-form-item label="Cidade" name="cidade" :rules="[{ required: true }]">
        <PesquisaRegistroComponenteView
          :codigo="6"
          :registro="formState.cidade"
          @outRegistro="onCidade"
        />
      </a-form-item>

      <a-form-item label="Bairro" name="bairro" :rules="[{ required: true }]">
        <PesquisaRegistroComponenteView
          :codigo="5"
          :registro="formState.bairro"
          @outRegistro="onBairro"
        />
      </a-form-item>

      <a-form-item label="Complemento" name="complemento">
        <a-textarea
          v-model:value="formState.complemento"
          :rows="4"
          :maxlength="255"
          type="textarea"
        ></a-textarea>
      </a-form-item>

      <a-form-item label="Observação" name="observacao">
        <a-textarea
          v-model:value="formState.observacao"
          :rows="4"
          :maxlength="255"
          type="textarea"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<style scoped></style>

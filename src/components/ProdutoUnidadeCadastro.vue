<script setup lang="ts">
import { ProdutoUnidadeServiceKey } from '../service/key'
import { defineEmits, defineExpose, inject, ref, reactive, h, toRaw, computed } from 'vue'
import { SaveOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'
import { validateMessagesForm } from '../common/utils'
import { NotificationServiceKey } from '../service/key/NotificationServiceKey'
import { MSG_REGISTRO_SALVAR_ERRO, MSG_REGISTRO_SALVO_SUCESSO } from '../common/constantes'
import { TipoUnidadeBarra, TipoUnidadeOperacao } from '../enuns'
import { RadioGroupProps } from 'ant-design-vue'

const emits = defineEmits(['outRegistro'])

interface FormState {
  barra?: string
  unidade?: any
  tipoOperacao?: TipoUnidadeOperacao
  quantidade?: number
  valor?: number
  tipoBarra?: TipoUnidadeBarra
}

const service = inject(ProdutoUnidadeServiceKey)!!
const notification = inject<any>(NotificationServiceKey)!!
const open = ref<boolean>(false)
const validateMessages = validateMessagesForm
const formState = reactive<FormState>({
  barra: '',
  unidade: {},
  tipoOperacao: TipoUnidadeOperacao.MULTIPLICA,
  tipoBarra: TipoUnidadeBarra.EAN13
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
  formState.tipoOperacao = registro.tipoOperacao || TipoUnidadeOperacao.MULTIPLICA
  formState.quantidade = registro.quantidade
  formState.valor = registro.valor
  formState.tipoBarra = registro.tipoBarra || TipoUnidadeBarra.EAN13

  open.value = true
}

const novoRegistro = () => {
  editarRegistro({ codigoReferencia: codigoReferencia.value })
}

function salvarRegistro(values: any) {
  service
    .salvar({
      codigo: codigoRegistro.value,
      produto: codigoReferencia.value,
      barra: values.barra,
      unidade: values.unidade,
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

const lengthCodigoBarra = computed(() => {
  return formState.tipoBarra === TipoUnidadeBarra.EAN13 ? 13 : 14
})

const optionsTipoOperacao: RadioGroupProps['options'] = [
  { label: 'Multiplica', value: TipoUnidadeOperacao.MULTIPLICA },
  { label: 'Divide', value: TipoUnidadeOperacao.DIVITE }
]

const optionsTipoBarra: RadioGroupProps['options'] = [
  { label: 'EAN13', value: TipoUnidadeBarra.EAN13 },
  { label: 'EAN14', value: TipoUnidadeBarra.EAN14 }
]

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
      <a-form-item label="Unidade" name="unidade" :rules="[{ required: true }]">
        <PesquisaRegistroComponenteView
          :codigo="7"
          :registro="formState.unidade"
          @outRegistro="onUnidade"
        />
      </a-form-item>

      <a-form-item label="Operação" name="tipoOperacao">
        <a-radio-group v-model:value="formState.tipoOperacao" :options="optionsTipoOperacao">
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
        <a-radio-group v-model:value="formState.tipoBarra" :options="optionsTipoBarra">
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="Código de Barra"
        name="barra"
        :rules="[{ required: true, min: lengthCodigoBarra, max: lengthCodigoBarra }]"
      >
        <a-input v-model:value="formState.barra" />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<style scoped></style>

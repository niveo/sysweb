<script setup lang="ts">
import { TabelaPrecoLancamentoServiceKey } from '../service/key'
import { defineEmits, defineExpose, inject, ref, reactive, h, toRaw, computed } from 'vue'
import { SaveOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'
import { validateMessagesForm } from '../common/utils'
import { NotificationServiceKey } from '../service/key/NotificationServiceKey'
import { MSG_REGISTRO_SALVAR_ERRO, MSG_REGISTRO_SALVO_SUCESSO } from '../common/constantes'
import { DateUtil } from '../common/DateUtil'
import DatePickerComponent from '../components/ui/DatePickerComponent.vue'

const emits = defineEmits(['outRegistro'])

interface FormState {
  vigor?: Date
  percentual?: number
}

const service = inject(TabelaPrecoLancamentoServiceKey)!!
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
  formState.vigor = DateUtil.toDate(registro.vigor)
  formState.percentual = registro.percentual

  open.value = true
}

const novoRegistro = () => {
  editarRegistro({ codigoReferencia: codigoReferencia.value })
}

function salvarRegistro(values: any) {
  service
    .salvar({
      codigo: codigoRegistro.value,
      tabela: codigoReferencia.value,
      vigor: values.vigor,
      percentual: values.percentual
    })
    .then((data) => {
      codigoRegistro.value = data.codigo
      codigoReferencia.value = data.tabela
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
      <a-form-item label="Data Vigor" name="vigor" :rules="[{ required: true, type: 'date' }]">
        <a-date-picker
          :show-time="{ format: 'HH:mm' }"
          format="DD/MM/YYYY HH:mm"
          v-model:value="formState.vigor"
        />
      </a-form-item>

      <a-form-item label="Data Vigor" name="vigor" :rules="[{ required: true, type: 'date' }]">
        <DatePickerComponent v-model:value="formState.vigor" />
      </a-form-item>

      <a-form-item
        label="Percentual"
        name="percentual"
        :rules="[{ required: true, type: 'number' }]"
      >
        <a-input-number
          v-model:value="formState.percentual"
          :min="0"
          :max="100"
          :formatter="(value) => `${value}%`"
          :parser="(value) => value.replace('%', '')"
        />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<style scoped></style>

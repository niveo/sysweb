<script setup lang="ts">
import { ClienteContatoServiceKey } from '@/service'
import { defineEmits, defineExpose, inject, ref, reactive, h, toRaw } from 'vue'
import {
  SaveOutlined,
  MinusCircleOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons-vue'
import { validateMessagesForm } from '@/common/utils'
import { NotificationServiceKey } from '../service'
import {
  MSG_REGISTRO_OBTER_ERRO,
  MSG_REGISTRO_SALVAR_ERRO,
  MSG_REGISTRO_SALVO_SUCESSO
} from '@/common/constantes'

const emits = defineEmits(['outRegistro'])

interface FormState {
  observacao?: string
  nome?: string
  cargo?: string
  telefones: any[]
  emails: any[]
}

const service = inject(ClienteContatoServiceKey)!!
const notification = inject(NotificationServiceKey)!!
const open = ref<boolean>(false)
const validateMessages = validateMessagesForm
const formState = reactive<FormState>({
  observacao: '',
  nome: '',
  cargo: '',
  telefones: [],
  emails: []
})
const codigoRegistro = ref()
const codigoClienteRegistro = ref()
const formRef = ref()

const afterOpenChange = (bool: boolean) => {
  if (!bool) {
    formRef.value.resetFields()
  }
}

const tratarArrayInput = (registros: any[]) => {
  if (!registros) return []
  return registros.map((m) => {
    return {
      value: m
    }
  })
}

const editarRegistro = (registro: any) => {
  codigoRegistro.value = registro.codigo
  codigoClienteRegistro.value = registro.cliente
  formState.observacao = registro.observacao
  formState.nome = registro.nome
  formState.cargo = registro.cargo
  formState.telefones = tratarArrayInput(registro.telefones)
  formState.emails = tratarArrayInput(registro.emails)
  open.value = true
}

function salvarRegistro(values: any) {
  service
    .salvar({
      codigo: codigoRegistro.value,
      cliente: codigoClienteRegistro.value,
      observacao: values.observacao,
      nome: values.nome,
      cargo: values.cargo,
      telefones: values.telefones.map((m: any) => m.value),
      emails: values.emails.map((m: any) => m.value)
    })
    .then((data) => {
      codigoRegistro.value = data.codigo
      codigoClienteRegistro.value = data.cliente
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
    .catch((error) => {
      console.log('error', error)
    })
}

const removeTelefone = (item: any) => {
  const index = formState.telefones.findIndex((f) => f.value === item.value)
  if (index !== -1) {
    formState.telefones!!.splice(index, 1)
  }
}

const removeEmail = (item: any) => {
  const index = formState.emails.findIndex((f) => f.value === item.value)
  if (index !== -1) {
    formState.emails!!.splice(index, 1)
  }
}

const addTelefone = () => {
  formState.telefones!!.push({ value: '' })
}

const addEmail = () => {
  formState.emails!!.push({ value: '' })
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
      <a-form-item label="Nome" name="nome" :rules="[{ required: true }]">
        <a-input v-model:value="formState.nome" :maxlength="100" />
      </a-form-item>

      <a-form-item label="Cargo" name="cargo" :rules="[{ required: true }]">
        <a-input v-model:value="formState.cargo" :maxlength="15" />
      </a-form-item>

      <a-form-item
        v-for="(telefone, index) in formState.telefones"
        :key="telefone"
        :label="index === 0 ? 'Telefone' : ''"
        :name="['telefones', index, 'value']"
        :rules="{
          required: true,
          trigger: 'change'
        }"
      >
        <a-input
          v-model:value="telefone.value"
          placeholder="Informe um telefone"
          style="width: 60%; margin-right: 8px"
        />
        <MinusCircleOutlined
          v-if="formState.telefones.length > 1"
          @click="removeTelefone(telefone)"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="dashed" style="width: 60%" @click="addTelefone">
          <PhoneOutlined />
          Novo Telefone
        </a-button>
      </a-form-item>

      <a-form-item
        v-for="(email, index) in formState.emails"
        :key="email"
        :label="index === 0 ? 'E-mail' : ''"
        :name="['emails', index, 'value']"
        :rules="{
          required: true,
          trigger: 'change',
          type: 'email'
        }"
      >
        <a-input
          v-model:value="email.value"
          placeholder="Informe um e-mails"
          style="width: 90%; margin-right: 8px"
        />
        <MinusCircleOutlined v-if="formState.emails.length > 1" @click="removeEmail(email)" />
      </a-form-item>
      <a-form-item>
        <a-button type="dashed" style="width: 60%" @click="addEmail">
          <MailOutlined />
          Novo E-mail
        </a-button>
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

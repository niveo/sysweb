<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Form, FormItem, Input, Button, Radio, RadioGroup, Textarea } from 'ant-design-vue'
import { reactive, computed, h, onMounted, inject } from 'vue'
import { SaveOutlined } from '@ant-design/icons-vue'
import { TipoPessoa } from '../enuns/TipoPessoa'
import { vMaska } from 'maska/vue'
import { validateMessagesForm } from '@/common/utils'
import { EmpresaServiceKey } from '@/service'
const route = useRoute()
const empresaService = inject(EmpresaServiceKey)!!

console.log(route.params)

interface FormState {
  codigo?: number
  nome?: string
  documento?: string
  razaoSocial?: string
  telefone?: string
  email?: string
  inscricaoEstadual?: string
  tipoPessoa: string
  observacao?: string
  endereco: {
    logradouro?: string
    numero?: string
    cep?: string
    complemento?: string
  }
}

const formState = reactive<FormState>({
  tipoPessoa: 'JURIDICA',
  endereco: {}
})

const validateMessages = validateMessagesForm

const onFinish = (values: FormState) => {}

const onFinishFailed = (errorInfo: any) => {}

onMounted(() => {
  const codigo = route.params['codigo']
  if (codigo)
    empresaService.obterCodigo(codigo).then((data) => {
      console.log(data)

      formState.codigo = data.codigo
      formState.nome = data.nome
    })
})
</script>

<template>
  <main>
    <Form
      :model="formState"
      layout="horizontal"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      :validate-messages="validateMessages"
    >
      <FormItem>
        <Button type="primary" html-type="submit" :icon="h(SaveOutlined)">Salvar</Button>
      </FormItem>
      <FormItem label="Tipo" name="tipo">
        <RadioGroup v-model:value="formState.tipoPessoa">
          <Radio value="JURIDICA" :checked="true">Jurídica</Radio>
          <Radio value="FISICA">Fisica</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem
        :label="formState.tipoPessoa == 'JURIDICA' ? 'CNPJ' : 'CPF'"
        name="documento"
        :rules="[{ required: true }]"
      >
        <Input
          v-model:value="formState.documento"
          v-maska="formState.tipoPessoa == 'JURIDICA' ? '##.###.###/####-##' : '###.###.###-##'"
          :maxlength="14"
        />
      </FormItem>
      <FormItem label="IE" name="inscricaoEstadual">
        <Input v-model:value="formState.inscricaoEstadual" :maxlength="15" />
      </FormItem>

      <FormItem label="Nome" name="nome" :rules="[{ required: true }]">
        <Input v-model:value="formState.nome" :maxlength="255" />
      </FormItem>
      <FormItem label="Razão Social" name="razaoSocial" :rules="[{ required: true }]">
        <Input v-model:value="formState.razaoSocial" :maxlength="255" />
      </FormItem>
      <FormItem label="Telefone" name="telefone">
        <Input v-model:value="formState.telefone" :maxlength="15" />
      </FormItem>
      <FormItem label="E-mail" name="email" :rules="[{ type: 'email' }]">
        <Input v-model:value="formState.email" :maxlength="100" />
      </FormItem>
      <FormItem label="Observação" name="observacao">
        <Textarea v-model:value="formState.observacao" :rows="4" :maxlength="255"></Textarea>
      </FormItem>

      <h5>Endereço</h5>

      <FormItem label="Logradouro" name="logradouro" :rules="[{ required: true }]">
        <Input v-model:value="formState.endereco.logradouro" :maxlength="255" />
      </FormItem>

      <FormItem label="Número" name="numero" :rules="[{ required: true }]">
        <Input v-model:value="formState.endereco.numero" :maxlength="15" />
      </FormItem>

      <FormItem label="CEP" name="cep" :rules="[{ required: true }]">
        <Input v-model:value="formState.endereco.cep" :maxlength="8" v-maska="'#####-###'" />
      </FormItem>

      <FormItem label="Complemento" name="complemento">
        <Textarea
          v-model:value="formState.endereco.complemento"
          :rows="4"
          :maxlength="255"
        ></Textarea>
      </FormItem>
    </Form>
  </main>
</template>

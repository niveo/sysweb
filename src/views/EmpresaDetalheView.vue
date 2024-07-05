<script setup lang="ts">
import { useRoute } from 'vue-router'
import { reactive, computed, h, onMounted, inject, ref } from 'vue'
import { Check } from '@element-plus/icons-vue'
import { vMaska } from 'maska/vue'
import { EmpresaServiceKey } from '@/service'
import PesquisaCidade from '../components/PesquisaCidade.vue'
import PesquisaBairro from '../components/PesquisaBairro.vue'
import type { FormInstance, FormRules } from 'element-plus'
const route = useRoute()
const empresaService = inject(EmpresaServiceKey)!!

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
}

const formState = reactive<FormState>({
  tipoPessoa: 'JURIDICA'
})

const ruleFormRef = ref<FormInstance>()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', valid)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const baiscRules = (name: string) => {
  return [
    { required: true, message: 'Informe o ' + name, trigger: 'blur' },
    { min: 3, max: 255, message: 'Length should be 3 to 255', trigger: 'blur' }
  ]
}

const rules = reactive<FormRules<FormState>>({
  nome: baiscRules('Nome'),
  razaoSocial: baiscRules('Razão Social'),
  documento: [{ required: true, message: 'Informe o CNPJ', trigger: 'blur' }],
  email: [{ type: 'email', message: 'Informe um e-mail valido', trigger: ['blur', 'change'] }],
  logradouro: baiscRules('Logradouro'),
  numero: baiscRules('Número'),
  cep: baiscRules('CEP')
})

onMounted(() => {
  const codigo = route.params['codigo']
  if (codigo)
    empresaService.obterCodigo(codigo).then((data) => {
      console.log(data)

      formState.codigo = data.codigo
      formState.nome = data.nome
      formState.razaoSocial = data.razaoSocial
      formState.documento = data.documento
      formState.inscricaoEstadual = data.inscricaoEstadual
      formState.inscricaoEstadual = data.inscricaoEstadual
      formState.observacao = data.observacao
      formState.telefone = data.telefone
      formState.email = data.email
      formState.tipoPessoa = data.tipoPessoa

      if (data.endereco) {
        formState.logradouro = data.endereco.logradouro
        formState.numero = data.endereco.numero
        formState.cep = data.endereco.cep
        formState.complemento = data.endereco.complemento
        formState.cidade = {
          codigo: data.endereco.cidade?.codigo,
          descricao: data.endereco.cidade?.descricao
        }
      }
    })
})

const isTipoJuridico = computed(() => formState.tipoPessoa == 'JURIDICA')

const onCidade = (cidade: any) => {
  formState.cidade = cidade
}
const onBairro = (bairro: any) => {
  formState.bairro = bairro
}
</script>

<template>
  <main>
    <el-form :model="formState" ref="ruleFormRef" :rules="rules" label-position="top" status-icon>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" :icon="Check">Salvar</el-button>
        <el-button @click="resetForm(ruleFormRef)">Limpar</el-button>
      </el-form-item>

      <el-form-item label="Tipo" prop="tipo">
        <el-radio-group v-model="formState.tipoPessoa">
          <el-radio value="JURIDICA" :checked="true">Jurídica</el-radio>
          <el-radio value="FISICA">Fisica</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="isTipoJuridico ? 'CNPJ' : 'CPF'" prop="documento">
        <el-input
          v-model="formState.documento"
          v-maska="isTipoJuridico ? '##.###.###/####-##' : '###.###.###-##'"
          :maxlength="isTipoJuridico ? 18 : 14"
        />
      </el-form-item>

      <el-form-item label="IE" prop="inscricaoEstadual">
        <el-input v-model="formState.inscricaoEstadual" :maxlength="15" />
      </el-form-item>

      <el-form-item label="Nome" prop="nome">
        <el-input v-model="formState.nome" :maxlength="255" />
      </el-form-item>

      <el-form-item label="Razão Social" prop="razaoSocial">
        <el-input v-model="formState.razaoSocial" :maxlength="255" />
      </el-form-item>

      <el-form-item label="Telefone" prop="telefone">
        <el-input v-model="formState.telefone" :maxlength="15" />
      </el-form-item>

      <el-form-item label="E-mail" prop="email">
        <el-input v-model="formState.email" :maxlength="100" />
      </el-form-item>

      <el-form-item label="Observação" prop="observacao">
        <el-input
          v-model="formState.observacao"
          :rows="4"
          :maxlength="255"
          type="textarea"
        ></el-input>
      </el-form-item>

      <el-col class="text-center" :span="2">
        <span class="text-gray-500"> <h5>Endereço</h5></span>
      </el-col>

      <el-form-item label="CEP" prop="cep">
        <el-input v-model="formState.cep" :maxlength="9" v-maska="'#####-###'" />
      </el-form-item>

      <el-form-item label="Logradouro" prop="logradouro">
        <el-input v-model="formState.logradouro" :maxlength="255" />
      </el-form-item>

      <el-form-item label="Número" prop="numero">
        <el-input v-model="formState.numero" :maxlength="15" />
      </el-form-item>

      <el-form-item label="Cidade" prop="cidade">
        <PesquisaCidade :registro="formState.cidade" @outRegistro="onCidade" />
      </el-form-item>

      <el-form-item label="Bairro" prop="bairro">
        <PesquisaBairro :registro="formState.bairro" @outRegistro="onBairro" />
      </el-form-item>

      <el-form-item label="Complemento" prop="complemento">
        <el-input
          v-model="formState.complemento"
          :rows="4"
          :maxlength="255"
          type="textarea"
        ></el-input>
      </el-form-item>
    </el-form>
  </main>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { reactive, computed, h, onMounted, inject, ref, toRaw } from 'vue'
import { vMaska } from 'maska/vue'
import { SaveOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'
import { CepServiceKey, ClienteServiceKey, NotificationServiceKey } from '@/service'
import { lancarPaginaErro, validateMessagesForm } from '@/common/utils'
import {
  MSG_REGISTRO_SALVAR_ERRO,
  MSG_REGISTRO_SALVO_SUCESSO,
  MSG_REGISTRO_OBTER_ERRO
} from '@/common/constantes'

const router = useRouter()
const route = useRoute()
const clienteService = inject(ClienteServiceKey)!!
const cepService = inject(CepServiceKey)!!
const notification = inject(NotificationServiceKey)!!
const clienteListaContato = ref()
const clienteListaEndereco = ref()
const codigoRegistro = ref()
const loadingPesquisaCep = ref(false)
const activePanelKey = ref()

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
    cidade?: {
      codigo?: number
      descricao?: string
    }
    bairro?: {
      codigo?: number
      descricao?: string
    }
  }
}

const formState = reactive<FormState>({
  codigo: 0,
  tipoPessoa: 'JURIDICA',
  endereco: {}
})

const onFinish = (values: FormState) => {
  clienteService
    .salvar(Object.assign({ codigo: codigoRegistro.value }, toRaw(values)))
    .then((data) => {
      codigoRegistro.value = data.codigo
      notification.success({
        description: MSG_REGISTRO_SALVO_SUCESSO
      })
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

const onFinishFailed = (errorInfo: any) => {}

onMounted(() => {
  const codigo = route.params['codigo']
  if (codigo)
    clienteService
      .obterCodigo(Number(codigo))
      .then((data) => {
        codigoRegistro.value = data.codigo
        formState.codigo = data.codigo
        formState.nome = data.nome
        formState.razaoSocial = data.razaoSocial
        formState.documento = data.documento
        formState.inscricaoEstadual = data.inscricaoEstadual
        formState.observacao = data.observacao
        formState.telefone = data.telefone
        formState.email = data.email
        formState.tipoPessoa = data.tipoPessoa

        if (data.endereco) {
          formState.endereco = data.endereco
        }
      })
      .catch((error) => {
        console.error(error)
        lancarPaginaErro(router, error)
      })
})

const validateMessages = validateMessagesForm

const isTipoJuridico = computed(() => formState.tipoPessoa == 'JURIDICA')

const onCidade = (cidade: any) => {
  formState.endereco!!.cidade = cidade
}
const onBairro = (bairro: any) => {
  formState.endereco!!.bairro = bairro
}

function onPesquisarCep(cep: string) {
  loadingPesquisaCep.value = true
  cepService
    .pesquisar(cep)
    .then((data) => {
      if (data) {
        formState.endereco.logradouro = data.logradouro
        formState.endereco.cidade = data.cidade
        formState.endereco.bairro = data.bairro
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

function handleNovoContato(event: MouseEvent) {
  clienteListaContato.value.novoRegistro()
  event.stopPropagation()
}

function handleNovoEndereco(event: MouseEvent) {
  clienteListaEndereco.value.novoRegistro()
  event.stopPropagation()
}
</script>

<template>
  <main>
    <a-form
      layout="vertical"
      :model="formState"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      :validate-messages="validateMessages"
    >
      <a-form-item>
        <a-button type="primary" html-type="submit" :icon="h(SaveOutlined)">Salvar</a-button>
      </a-form-item>

      <a-form-item label="Tipo" name="tipoPessoa">
        <a-radio-group v-model:value="formState.tipoPessoa">
          <a-radio value="JURIDICA" :checked="true">Jurídica</a-radio>
          <a-radio value="FISICA">Fisica</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        :label="isTipoJuridico ? 'CNPJ' : 'CPF'"
        name="documento"
        :rules="[{ required: true }]"
      >
        <a-input
          v-model:value="formState.documento"
          v-maska="isTipoJuridico ? '##.###.###/####-##' : '###.###.###-##'"
          :maxlength="isTipoJuridico ? 18 : 14"
        />
      </a-form-item>

      <a-form-item label="IE" name="inscricaoEstadual">
        <a-input v-model:value="formState.inscricaoEstadual" :maxlength="15" />
      </a-form-item>

      <a-form-item label="Nome" name="nome" :rules="[{ required: true }]">
        <a-input v-model:value="formState.nome" :maxlength="255" />
      </a-form-item>

      <a-form-item label="Razão Social" name="razaoSocial" :rules="[{ required: true }]">
        <a-input v-model:value="formState.razaoSocial" :maxlength="255" />
      </a-form-item>

      <a-form-item label="Telefone" name="telefone">
        <a-input v-model:value="formState.telefone" :maxlength="15" />
      </a-form-item>

      <a-form-item label="E-mail" name="email">
        <a-input v-model:value="formState.email" :maxlength="100" />
      </a-form-item>

      <a-form-item label="Observação" name="observacao">
        <a-textarea
          v-model:value="formState.observacao"
          :rows="4"
          :maxlength="255"
          type="textarea"
        ></a-textarea>
      </a-form-item>

      <h5>Endereço</h5>

      <a-form-item label="CEP" :name="['endereco', 'cep']" :rules="[{ required: true }]">
        <a-input-search
          v-model:value="formState.endereco.cep"
          :maxlength="9"
          v-maska="'#####-###'"
          :loading="loadingPesquisaCep"
          enter-button
          @search="onPesquisarCep"
        />
      </a-form-item>

      <a-form-item
        label="Logradouro"
        :name="['endereco', 'logradouro']"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.endereco.logradouro" :maxlength="255" />
      </a-form-item>

      <a-form-item label="Número" :name="['endereco', 'numero']" :rules="[{ required: true }]">
        <a-input v-model:value="formState.endereco.numero" :maxlength="15" />
      </a-form-item>

      <a-form-item label="Cidade" :name="['endereco', 'cidade']" :rules="[{ required: true }]">
        <PesquisaCidade :registro="formState.endereco.cidade" @outRegistro="onCidade" />
      </a-form-item>

      <a-form-item label="Bairro" :name="['endereco', 'bairro']" :rules="[{ required: true }]">
        <PesquisaBairro :registro="formState.endereco.bairro" @outRegistro="onBairro" />
      </a-form-item>

      <a-form-item label="Complemento" :name="['endereco', 'complemento']">
        <a-textarea
          v-model:value="formState.endereco.complemento"
          :rows="4"
          :maxlength="255"
          type="textarea"
        ></a-textarea>
      </a-form-item>
      <a-collapse v-model:activeKey="activePanelKey" accordion v-if="codigoRegistro">
        <a-collapse-panel key="1" header="Contatos">
          <template #extra>
            <a-button
              @click="handleNovoContato"
              :icon="h(PlusCircleOutlined)"
              type="primary"
              v-if="activePanelKey == 1"
              >{{
            }}</a-button>
          </template>
          <ClienteListaContato :cliente="codigoRegistro" ref="clienteListaContato" />
        </a-collapse-panel>
        <a-collapse-panel key="2" header="Endereços">
          <template #extra>
            <a-button
              @click="handleNovoEndereco"
              :icon="h(PlusCircleOutlined)"
              type="primary"
              v-if="activePanelKey == 2"
              >{{
            }}</a-button>
          </template>
          <ClienteListaEndereco :cliente="codigoRegistro" ref="clienteListaEndereco" />
        </a-collapse-panel>
      </a-collapse>

      <a-form-item>
        <a-button type="primary" html-type="submit" :icon="h(SaveOutlined)">Salvar</a-button>
      </a-form-item>
    </a-form>
  </main>
</template>

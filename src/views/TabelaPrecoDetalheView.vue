<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { reactive, h, onMounted, inject, ref, toRaw } from 'vue'
import { SaveOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'
import { TabelaPrecoServiceKey, NotificationServiceKey } from '@/service/key'
import { validateMessagesForm } from '@/common/utils'
import { MSG_REGISTRO_SALVAR_ERRO, MSG_REGISTRO_SALVO_SUCESSO } from '@/common/constantes'

const route = useRoute()
const router = useRouter()
const service = inject<any>(TabelaPrecoServiceKey)!!
const notification = inject<any>(NotificationServiceKey)!!
const activePanelKey = ref()
const tabelaPrecoLancamentoLista = ref()

interface FormState {
  descricao?: string
  observacao?: string
  ativo: boolean
}

const formState = reactive<FormState>({ ativo: false })

let codigoRegistro = ref()

const onFinish = (values: FormState) => {
  service
    .salvar(Object.assign({ codigo: codigoRegistro.value }, toRaw(values)))
    .then((data: any) => {
      codigoRegistro.value = data.codigo
      notification.success({
        description: MSG_REGISTRO_SALVO_SUCESSO
      })
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

onMounted(() => {
  const codigo = route.params['codigo']
  if (codigo)
    service
      .obterCodigo(Number(codigo))
      .then((data: any) => {
        codigoRegistro.value = data.codigo
        formState.descricao = data.descricao
        formState.observacao = data.observacao
        formState.ativo = data.ativo
      })
      .catch((error: any) => {
        router.push({ name: 'error', params: { error: error } })
      })
})

function handleNovoTabelaPrecoLancamento(event: MouseEvent) {
  tabelaPrecoLancamentoLista.value.novoRegistro()
  event.stopPropagation()
}

const validateMessages = validateMessagesForm
</script>

<template>
  <main>
    <a-form
      layout="vertical"
      :model="formState"
      @finish="onFinish"
      :validate-messages="validateMessages"
    >
      <a-form-item>
        <a-button type="primary" html-type="submit" :icon="h(SaveOutlined)">Salvar</a-button>
      </a-form-item>

      <a-form-item label="Descrição" name="descricao" :rules="[{ required: true }]">
        <a-input v-model:value="formState.descricao" :maxlength="255" />
      </a-form-item>

      <a-form-item label="Ativo" name="ativo" :rules="[{ required: true }]">
        <a-switch v-model:checked="formState.ativo" />
      </a-form-item>

      <a-form-item label="Observação" name="observacao">
        <a-textarea
          v-model:value="formState.observacao"
          :rows="4"
          :maxlength="255"
          type="textarea"
        ></a-textarea>
      </a-form-item>

      <a-collapse v-model:activeKey="activePanelKey" accordion v-if="codigoRegistro">
        <a-collapse-panel key="1" header="Barra">
          <template #extra>
            <a-button
              @click="handleNovoTabelaPrecoLancamento"
              :icon="h(PlusCircleOutlined)"
              type="primary"
              v-if="activePanelKey == 1"
              >{{
            }}</a-button>
          </template>

          <TabelaPrecoLancamentoLista :codigo="codigoRegistro" ref="tabelaPrecoLancamentoLista" />
        </a-collapse-panel>
      </a-collapse>

      <a-form-item>
        <a-button type="primary" html-type="submit" :icon="h(SaveOutlined)">Salvar</a-button>
      </a-form-item>
    </a-form>
  </main>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, defineModel, ref, inject } from 'vue'
import { MSG_REGISTRO_SALVAR_ERRO } from '../../common/constantes'
import { CepServiceKey, NotificationServiceKey } from '../../service/key'
import { vMaska } from 'maska/vue'
const model = defineModel()
const emit = defineEmits(['outRegistro'])
const cepService = inject(CepServiceKey)!!
const notification = inject(NotificationServiceKey)!!
let loading = ref(false)
function onPesquisa(cep: string) {
  loading.value = true
  cepService
    .pesquisar(cep)
    .then((data) => {
      if (data) {
        emit('outRegistro', data)
      }
    })
    .catch((error) => {
      notification.error({
        message: 'Erro',
        description: MSG_REGISTRO_SALVAR_ERRO,
        error: error
      })
    })
    .finally(() => (loading.value = false))
}
</script>
<template>
  <a-input-search
    v-model="model"
    :maxlength="9"
    v-maska="'#####-###'"
    :loading="loading"
    enter-button
    @search="onPesquisa"
  />
</template>

<script setup lang="ts">
import { Button, Form, FormItem, Input, InputPassword, Card, Alert } from 'ant-design-vue'
import { UsuarioServiceKey } from '../service/UsuarioService'
import { reactive, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const injected = inject(UsuarioServiceKey)!!

const loading = ref<boolean>(false)

const msgError = reactive<{ detail: string; description: string }>({
  detail: '',
  description: ''
})

interface FormState {
  email: string
  senha: string
}

const formState = reactive<FormState>({
  email: 'teste@gmail.com',
  senha: '123456'
})

const onFinish = (values: FormState) => {
  msgError.detail = ''
  loading.value = true
  injected
    .login(values.email, values.senha)
    .finally(() => (loading.value = false))
    .then(() => {
      router.push({ path: '/' })
    })
    .catch((error) => {
      msgError.detail = error.response.data.detail
      msgError.description = error.response.data.description
    })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
  msgError.detail = ''
  loading.value = false
}

const recuperarSenha = () => {}
</script>

<template>
  <main>
    <Card title="Logando no Sistema" class="ccard">
      <Form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        layout="vertical"
      >
        <FormItem
          label="E-mail"
          name="email"
          :rules="[{ required: true, message: 'Por favor informe um e-mail!' }]"
        >
          <Input v-model:value="formState.email" />
        </FormItem>

        <FormItem
          label="Senha"
          name="senha"
          :rules="[{ required: true, message: 'Por favor informe uma senha!' }]"
        >
          <InputPassword v-model:value="formState.senha" />
        </FormItem>

        <FormItem
          ><a class="login-form-forgot" href="" @click="recuperarSenha"
            >Esqueci minha senha</a
          ></FormItem
        >

        <FormItem>
          <Button type="primary" html-type="submit" :loading="loading">Logar</Button>
        </FormItem>
        <Alert
          v-if="msgError.detail"
          :message="msgError.detail"
          :description="msgError.description"
          type="error"
        />
      </Form>
    </Card>
  </main>
</template>
<style>
main {
  padding: 10px;
}
.ccard {
  width: 50%;
}
@media only screen and (max-width: 600px) {
  .ccard {
    width: 100%;
  }
}
</style>

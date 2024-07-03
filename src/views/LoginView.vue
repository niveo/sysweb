<script setup lang="ts">
import { Button, Form, FormItem, Input, InputPassword, Card } from 'ant-design-vue'
import { UsuarioServiceKey } from '../service/UsuarioService'
import { reactive, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const injected = inject(UsuarioServiceKey)!!

const loading = ref<boolean>(false)

interface FormState {
  email: string
  senha: string
}

const formState = reactive<FormState>({
  email: 'teste@gmail.com',
  senha: '123456'
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onFinish = (values: FormState) => {
  loading.value = true
  injected
    .login(values.email, values.senha)
    .finally(() => (loading.value = false))
    .then(() => {
      router.push({ path: '/' })
    })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
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

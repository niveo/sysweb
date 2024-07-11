<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, toRaw } from 'vue'

const route = useRoute()

const message = ref()
const code = ref()
const data = ref()

onMounted(() => {
  code.value = route.query['code']
  message.value = route.query['message']
  if (route.query['data']) data.value = JSON.parse(route.query['data'])
})
</script>
<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
      <code>{{ message }}</code
      ><br /><br />
      <code>{{ code }}</code
      ><br /><br />

      <a-collapse>
        <a-collapse-panel header="Show Error Message">
          <code>{{ data }}</code>
        </a-collapse-panel>
      </a-collapse>
    </template>
  </a-result>
</template>

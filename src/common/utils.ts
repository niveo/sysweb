export const validateMessagesForm = {
  required: '${label} é obrigatório!',
  types: {
    email: '${label} não é um e-mail valido!',
    number: '${label} não é um numero valido!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
}

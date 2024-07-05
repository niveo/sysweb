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

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timeoutID: any | null = null

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  } as T
}

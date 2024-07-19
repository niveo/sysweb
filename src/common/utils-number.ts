export class UtilsNumber {
  static numberFixedLen(num, len) {
    len = parseInt(len, 10)
    if (isNaN(num) || isNaN(len)) {
      return num
    }
    num = '' + num
    while (num.length < len) {
      num = '0' + num
    }
    return num
  }

  static isNumber = (value: any) => typeof value === 'number'

  static roundNumber(value: number, precision = 2): number {
    try {
      if (!Number.isNaN(value) && value > 0) {
        const multiplier = Math.pow(10, precision || 0)
        return Math.round(value * multiplier) / multiplier
      } else {
        return 0
      }
    } catch (erro) {
      return 0
    }
  }

  static format(value: number, digitos = 2, currencyDisplay = 'code'): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      currency: 'BRL',
      maximumFractionDigits: digitos,
      minimumFractionDigits: digitos,
      currencyDisplay: currencyDisplay
    }).format(value)
  }

  static formatFileSize(bytes): any {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let n = parseInt(bytes, 10) || 0,
      l = 0
    while (n >= 1024) {
      n = n / 1024
      l++
    }
    return n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]
  }
}

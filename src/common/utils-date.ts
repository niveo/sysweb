import dayjs from 'dayjs'
import arraySupport from 'dayjs/plugin/arraySupport'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')
dayjs.extend(arraySupport)
dayjs.extend(utc)
dayjs.extend(timezone)
//const tz = 'America/Sao_Paulo'
export class UtilsDate {
  static formatPTBR(date: any) {
    return UtilsDate.format(date, 'DD/MM/YYYY HH:mm:ss')
  }

  static format(date: any, format: string = 'YYYY-MM-DDTHH:mm:ss') {
    return new dayjs(date).tz('America/Sao_Paulo').format(format)
  }

  static toDate(date: any) {
    return date ? new dayjs(date || new Date()) : new dayjs()
  }
}

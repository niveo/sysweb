import dayjs from 'dayjs'
import arraySupport from 'dayjs/plugin/arraySupport'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')
dayjs.extend(arraySupport)
dayjs.extend(utc)
dayjs.extend(timezone)

const tz = 'America/Sao_Paulo'

export class DateUtil {
  static formatPTBR(date: any) {
    console.log(date)

    const dj = new dayjs(date)
    console.log(dj.locale())

    return dj.tz(tz).utc().format('DD/MM/YYYY HH:mm')
  }

  static toDate(date: any) {
    console.log(date)

    const dj = new dayjs(date)
    console.log(dj.locale())

    return dj.tz(tz).utc()
  }
}

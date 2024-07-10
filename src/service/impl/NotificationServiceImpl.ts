import type { NotificationService } from '../NotificationService'
import { notification } from 'ant-design-vue'
export class NotificationServiceImpl implements NotificationService {
  error({
    message,
    description,
    error
  }: {
    message: string
    description: string
    error: any
  }): void {
    console.log(error)

    notification.error({ message, description })
  }
  success({ description }: { description: string }): void {
    notification.success({ message: '', description })
  }
}

import type { InjectionKey } from 'vue'
export interface NotificationService {
  error({ message, description, error }: { message: string; description: string; error: any }): void
  success({ description }: { description: string }): void
}

export const NotificationServiceKey = Symbol() as InjectionKey<NotificationService>

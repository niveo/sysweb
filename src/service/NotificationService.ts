export interface NotificationService {
  error({ message, description, error }: { message: string; description: string; error: any }): void
  success({ description }: { description: string }): void
}

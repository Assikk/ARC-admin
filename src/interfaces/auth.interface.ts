import { z } from "zod"

export interface loginInterface {
  email: string,
  password: string,
}
export const loginSchema = z.object({
  email: z.email('Неправильный формат почты').min(1, 'Введите почту'),
  password: z.string().min(6, 'Пароль должен содержать как минимум 6 символов')
})
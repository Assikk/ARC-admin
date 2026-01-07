import { z } from "zod"

export interface loginInterface {
  email: string,
  password: string,
}
export const loginSchema = z.object({
  email: z.email('Неправильный формат почты').min(1, 'Введите почту'),
  password: z.string().min(6, 'Пароль должен содержать как минимум 6 символов')
})

export interface authInterface {
  email: string,
  password: string,
  fullName: string,
  phone: string,
  city: string,
  role: string,
  deviceId: string
}
export const authSchema = z.object({
  email: z.email('Неправильный формат почты').min(1, 'Введите почту'),
  password: z.string().min(6, 'Пароль должен содержать как минимум 6 символов').min(1, 'Введите пароль'),
  fullName: z.string().min(1, 'Введите ФИО'),
  phone: z.string().regex(/^\+992\d+$/, { message: "Номер должен начинаться с +992 и содержать только цифры." }).min(9, { message: "Номер телефона должен содержать минимум 9 символов." }).min(1, 'Введите телефон'),
  city: z.string().min(1, 'Введите город'),
  role: z.string().min(1, 'Введите роль'),
  deviceId: z.string()
})
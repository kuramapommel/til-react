import { z } from 'zod'

export const validationSchema = z.object({
  username: z
    .string()
    .min(1, 'ユーザー名は必須です')
    .min(4, 'ユーザー名は4文字以上で入力してください'),
  password: z
    .string()
    .min(1, 'パスワードは必須です')
    .min(8, 'ユーザー名は8文字以上で入力してください'),
})

export type LoginFormInputs = z.infer<typeof validationSchema>

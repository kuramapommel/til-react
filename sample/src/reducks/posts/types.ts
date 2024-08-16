import { RaRecord } from 'react-admin'
import { z } from 'zod'

export const validationSchema = z.object({
  title: z.string().min(1, {
    message: '記事タイトルは必須です',
  }),
  body: z.string().min(1, {
    message: '記事内容は必須です',
  }),
})
export type Post = z.infer<typeof validationSchema> & RaRecord<string>

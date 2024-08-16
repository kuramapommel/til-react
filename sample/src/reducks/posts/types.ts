import { z } from 'zod'

export const validationSchema = z.object({
  id: z.string(),
  title: z.string().min(1, '記事タイトルは必須です'),
  body: z.string().min(1, '記事内容は必須です'),
})
export type Post = z.infer<typeof validationSchema>

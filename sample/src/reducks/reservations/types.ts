import { RaRecord } from 'react-admin'
import { z } from 'zod'

export const validationSchema = z.object({
  name: z.string().min(1, '部屋名は必須です'),
  availables: z.array(z.boolean().default(false)),
})

export type Room = Readonly<z.infer<typeof validationSchema> & RaRecord<string>>

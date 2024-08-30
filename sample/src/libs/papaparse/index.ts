import { parse as papaparse, ParseResult } from 'papaparse'
import { z } from 'zod'

export function parse<Schema extends z.ZodArray<z.ZodObject<z.ZodRawShape>>>(
  file: File,
  schema: Schema,
): Promise<z.infer<Schema>> {
  return new Promise((resolve, reject) => {
    if ([...file.name.split('.')].pop() !== 'csv' || file.type !== 'text/csv') {
      reject(new Error('CSV ファイルを選択してください'))
      return
    }

    papaparse(file, {
      complete: (results: ParseResult<z.infer<Schema>>) => {
        if (!results) {
          reject(new Error('ファイルの読み込みに失敗しました'))
          return
        }

        const parsed = schema.safeParse(results.data)
        if (!parsed.success || !parsed.data) {
          reject(new Error('ファイルのパースに失敗しました'))
          return
        }

        resolve(parsed.data)
      },
      error: () => reject(new Error('ファイルの読み込みに失敗しました')),
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    })
  })
}

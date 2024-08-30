import { parse } from '@/libs/papaparse'
import { describe, expect, test } from 'vitest'
import { z } from 'zod'

describe('libs/papaparse', () => {
  describe('parse', () => {
    test('csv を渡すと指定したオブジェクトの型にパース変換する', async () => {
      const schema = z.array(
        z.object({
          hoge: z.coerce.string(),
          fuga: z.number().min(0).max(120),
          piyo: z.coerce.string(),
        }),
      )

      const data = ['hoge,fuga,piyo', 'a,1,3', 'a,4,piyo'].join('\r\n')
      const file = new File([data], 'foo.csv', {
        type: 'text/csv',
      })

      const result = await parse(file, schema)
      expect(result).toEqual([
        { hoge: 'a', fuga: 1, piyo: '3' },
        { hoge: 'a', fuga: 4, piyo: 'piyo' },
      ])
    })

    test('拡張子が csv 以外のファイルを渡すとエラーになる', async () => {
      const schema = z.array(
        z.object({
          hoge: z.coerce.string(),
          fuga: z.number().min(0).max(120),
          piyo: z.coerce.string(),
        }),
      )

      const data = ['non defined header'].join('\r\n')
      const file = new File([data], 'foo.txt', {
        type: 'text/csv',
      })

      await expect(parse(file, schema)).rejects.toThrowError(
        'CSV ファイルを選択してください',
      )
    })

    test('ファイルタイプが text/csv 以外のファイルを渡すとエラーになる', async () => {
      const schema = z.array(
        z.object({
          hoge: z.coerce.string(),
          fuga: z.number().min(0).max(120),
          piyo: z.coerce.string(),
        }),
      )

      const data = ['non defined header'].join('\r\n')
      const file = new File([data], 'foo.csv', {
        type: 'text/plain',
      })

      await expect(parse(file, schema)).rejects.toThrowError(
        'CSV ファイルを選択してください',
      )
    })

    test('カンマ区切りではないファイルを渡すとエラーになる', async () => {
      const schema = z.array(
        z.object({
          hoge: z.coerce.string(),
          fuga: z.number().min(0).max(120),
          piyo: z.coerce.string(),
        }),
      )

      // 一行目はヘッダーとして認識されるため、パースエラーは二行以上必要
      const data = ['/', '/'].join('\r\n')
      const file = new File([data], 'foo.csv', {
        type: 'text/csv',
      })

      await expect(parse(file, schema)).rejects.toThrowError(
        'ァイルのパースに失敗しました',
      )
    })
  })
})

import { parse } from '@/libs/papaparse'
import { describe, expect, test } from 'vitest'

describe('libs/papaparse', () => {
  describe('parse', () => {
    test('csv を渡すと指定したオブジェクトの型にパース変換する', async () => {
      type CSVRecord = {
        hoge: string
        fuga: number
      }

      const data = ['hoge,fuga', 'a,1', 'a,4'].join('\r\n')
      const file = new File([data], 'foo.csv', {
        type: 'text/csv',
      })

      const result = await parse<CSVRecord>(file)
      expect(result).toEqual([
        { hoge: 'a', fuga: 1 },
        { hoge: 'a', fuga: 4 },
      ])
    })
  })
})

import { range } from '@/libs/arrays'
import { describe, expect, test } from 'vitest'

describe('libs/arrays', () => {
  describe('range', () => {
    test('start を始点とし、end 数分インクリメントした要素を持つ配列を返す', () => {
      const result = [...range(0, 4)]
      expect(result).toEqual([0, 1, 2, 3])
    })

    test('end を負の数にした場合 error が投げられる', () => {
      expect(() => [...range(0, -1)]).toThrowError(
        /^end に負の数を指定することはできません$/,
      )
    })
  })
})

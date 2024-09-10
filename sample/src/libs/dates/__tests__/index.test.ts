import '@/libs/dates'
import { describe, expect, test } from 'vitest'

describe('libs/dates', () => {
  describe('between', () => {
    test('デフォルト状態では、以上かつ以下に含まれるとき true', async () => {
      expect(
        new Date('2021-01-01 00:01:00').between({
          start: new Date('2021-01-01 00:01:00'),
          end: new Date('2021-01-01 00:01:00'),
        }),
      ).toBe(true)
    })

    test('デフォルト状態では、以上かつ以下に含まれないとき false：下限', async () => {
      expect(
        new Date('2021-01-01 00:00:59').between({
          start: new Date('2021-01-01 00:01:00'),
          end: new Date('2021-01-01 00:01:00'),
        }),
      ).toBe(false)
    })

    test('デフォルト状態では、以上かつ以下に含まれないとき false：上限', async () => {
      expect(
        new Date('2021-01-01 00:01:01').between({
          start: new Date('2021-01-01 00:01:00'),
          end: new Date('2021-01-01 00:01:00'),
        }),
      ).toBe(false)
    })

    test('isOrMore=false では、超過かつ以下に含まれるとき true', async () => {
      expect(
        new Date('2021-01-01 00:01:00').between({
          start: new Date('2021-01-01 00:00:59'),
          end: new Date('2021-01-01 00:01:00'),
          isOrMore: true,
        }),
      ).toBe(true)
    })

    test('isOrMore=false では、超過に含まれないとき false', async () => {
      expect(
        new Date('2021-01-01 00:00:59').between({
          start: new Date('2021-01-01 00:00:59'),
          end: new Date('2021-01-01 00:01:00'),
          isOrMore: false,
        }),
      ).toBe(false)
    })

    test('isOrLess=false では、未満に含まれないとき false', async () => {
      expect(
        new Date('2021-01-01 00:01:01').between({
          start: new Date('2021-01-01 00:01:00'),
          end: new Date('2021-01-01 00:01:01'),
          isOrLess: false,
        }),
      ).toBe(false)
    })
  })
})

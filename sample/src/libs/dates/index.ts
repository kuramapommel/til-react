declare global {
  interface Date {
    between(params: {
      start: Date
      end: Date
      isOrMore?: boolean
      isOrLess?: boolean
    }): boolean
  }
}

Date.prototype.between = function ({
  start,
  end,
  isOrMore = true,
  isOrLess = true,
}) {
  const baseTime = this.getTime()
  const startTime = start.getTime()
  const endTime = end.getTime()

  const startCompare = isOrMore ? baseTime >= startTime : baseTime > startTime
  const endCompare = isOrLess ? baseTime <= endTime : baseTime < endTime

  return startCompare && endCompare
}

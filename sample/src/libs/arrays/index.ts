export function* range(start: number, end: number) {
  if (end < 0) throw new Error('end に負の数を指定することはできません')
  for (let i = start; i < end; i++) {
    yield i
  }
}

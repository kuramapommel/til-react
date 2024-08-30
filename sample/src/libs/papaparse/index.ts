import { parse as papaparse, ParseResult } from 'papaparse'

export function parse<CSVRecord>(file: File): Promise<readonly CSVRecord[]> {
  return new Promise((resolve, reject) => {
    papaparse(file, {
      complete: (results: ParseResult<CSVRecord>) => {
        if (!results) reject(new Error('ファイルの読み込みに失敗しました'))

        resolve(results.data)
      },
      error: () => {
        reject(new Error('ファイルの読み込みに失敗しました'))
      },
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    })
  })
}

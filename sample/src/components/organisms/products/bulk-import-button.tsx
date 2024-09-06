import StandardButton from '@/components/atoms/buttons/standard-button'
import { parse } from '@/libs/papaparse'
import { validationSchema } from '@/reducks/products/types'
import React, { ChangeEvent, useCallback } from 'react'
import { z } from 'zod'

type Props = {
  acceptedFile?: File
}

const BulkImportButton = React.memo(function BulkImportButton({
  acceptedFile,
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const onChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const parsed = await parse(file, z.array(validationSchema))
    alert(JSON.stringify(parsed))
  }, [])

  const upload = useCallback(() => {
    if (acceptedFile) {
      alert(JSON.stringify(acceptedFile))
      // todo ファイルが登録されている場合はそのままアップロードする
      return
    }
    inputRef.current?.click()
  }, [acceptedFile])

  return (
    <div>
      <StandardButton onclick={upload} name="一括登録" />
      <input
        hidden
        type="file"
        accept=".csv"
        ref={inputRef}
        onChange={onChange}
      />
    </div>
  )
})

export default BulkImportButton

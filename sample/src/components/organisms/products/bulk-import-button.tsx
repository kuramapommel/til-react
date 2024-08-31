import StandardButton from '@/components/atoms/buttons/standard-button'
import { parse } from '@/libs/papaparse'
import { validationSchema } from '@/reducks/products/types'
import React, { ChangeEvent, useCallback } from 'react'
import { z } from 'zod'

const BulkImportButton = React.memo(function BulkImportButton() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const onChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const parsed = await parse(file, z.array(validationSchema))
    alert(JSON.stringify(parsed))
  }, [])

  const upload = useCallback(() => {
    inputRef.current?.click()
  }, [])

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

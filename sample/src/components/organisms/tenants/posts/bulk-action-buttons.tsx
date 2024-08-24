import React from 'react'
import {
  BulkDeleteButton,
  BulkExportButton,
  BulkUpdateButton,
} from 'react-admin'

const BulkActionButtons = React.memo(function BulkActionButtons() {
  return (
    <>
      <BulkDeleteButton />
      <BulkExportButton />
      <BulkUpdateButton label="Reset Title" data={{ title: '' }} />
    </>
  )
})

export default BulkActionButtons

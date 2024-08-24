import React from 'react'

import BulkActionButtons from '@/components/organisms/tenants/posts/bulk-action-buttons'
import { Datagrid, EditButton, List as RaList, TextField } from 'react-admin'

const List = React.memo(function List() {
  return (
    <RaList>
      <Datagrid bulkActionButtons={<BulkActionButtons />}>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="body" />
        <EditButton />
      </Datagrid>
    </RaList>
  )
})

export default List

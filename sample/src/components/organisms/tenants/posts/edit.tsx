import { Post, validationSchema } from '@/reducks/posts/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import {
  Edit as RaEdit,
  SimpleForm,
  TextInput,
  useRecordContext,
} from 'react-admin'

const validationResolver = zodResolver(validationSchema)
const Edit = React.memo(function Edit() {
  const Title = React.memo(function Title() {
    const record = useRecordContext<Post>()
    return <span>Post {record ? `"${record.id}"` : ''}</span>
  })

  return (
    <RaEdit title={<Title />}>
      <SimpleForm resolver={validationResolver} mode="onBlur">
        <TextInput disabled source="id" />
        <TextInput source="title" />
        <TextInput source="body" />
      </SimpleForm>
    </RaEdit>
  )
})

export default Edit

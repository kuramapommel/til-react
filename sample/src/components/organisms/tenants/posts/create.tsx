import { validationSchema } from '@/reducks/posts/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Create as RaCreate, SimpleForm, TextInput } from 'react-admin'

const validationResolver = zodResolver(validationSchema)
const Create = React.memo(function Create() {
  return (
    <RaCreate title="Create a Post">
      <SimpleForm resolver={validationResolver} mode="onBlur">
        <TextInput source="title" />
        <TextInput source="body" />
      </SimpleForm>
    </RaCreate>
  )
})

export default Create

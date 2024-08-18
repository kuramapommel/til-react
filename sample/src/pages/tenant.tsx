import { useDataProvider } from '@/hooks/use-data-provider'
import { Post, validationSchema } from '@/reducks/posts/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Admin,
  BulkDeleteButton,
  BulkExportButton,
  BulkUpdateButton,
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Resource,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from 'react-admin'

const validationResolver = zodResolver(validationSchema)

const BulkActionButtons = () => (
  <>
    <BulkDeleteButton />
    <BulkExportButton />
    <BulkUpdateButton label="Reset Title" data={{ title: '' }} />
  </>
)

const PostList = () => (
  <List>
    <Datagrid bulkActionButtons={<BulkActionButtons />}>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="body" />
      <EditButton />
    </Datagrid>
  </List>
)

const PostTitle = () => {
  const record = useRecordContext<Post>()
  return <span>Post {record ? `"${record.id}"` : ''}</span>
}

export const PostEdit = () => (
  <Edit title={<PostTitle />}>
    <SimpleForm resolver={validationResolver} mode="onBlur">
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <TextInput source="body" />
    </SimpleForm>
  </Edit>
)

const PostCreate = () => (
  <Create title="Create a Post">
    <SimpleForm resolver={validationResolver} mode="onBlur">
      <TextInput source="title" />
      <TextInput source="body" />
    </SimpleForm>
  </Create>
)

const Tenant: React.FC = () => {
  // todo Admin コンポーネントと一緒に上位階層（ BrowserRouter 直下）に移管する
  const dataProvider = useDataProvider()
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
      />
    </Admin>
  )
}

export default Tenant

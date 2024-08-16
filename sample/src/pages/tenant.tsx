import { Post } from '@/reducks/posts/types'
import {
  Admin,
  BulkDeleteButton,
  BulkExportButton,
  BulkUpdateButton,
  Create,
  CreateResult,
  Datagrid,
  DataProvider,
  DeleteResult,
  Edit,
  EditButton,
  GetOneResult,
  List,
  Resource,
  SimpleForm,
  TextField,
  TextInput,
  UpdateManyParams,
  UpdateParams,
  UpdateResult,
  useRecordContext,
} from 'react-admin'

let posts: Post[] = [
  {
    id: 'id-test',
    title: 'aaaaaaa',
    body: 'description',
  },
]

const dataProvider: DataProvider = {
  create: (_resource, params) => {
    const { title, body } = params.data
    if (!title || !body) return Promise.resolve<CreateResult>({ data: null })

    const post = { id: String(posts.length + 1), title, body }
    posts = [...posts, post]
    return Promise.resolve<CreateResult>({
      data: post,
    })
  },
  delete: (_resource, params) => {
    const post = posts.find((p) => p.id === params.id)
    if (!post) return Promise.resolve<DeleteResult>({ data: null })

    posts = posts.filter((p) => p.id !== post.id)
    return Promise.resolve<DeleteResult>({ data: post })
  },
  deleteMany: (_resource, params) => {
    posts = posts.filter((p) => !params.ids.includes(p.id))
    return Promise.resolve({ data: posts.map((p) => p.id) })
  },
  getList: () => Promise.resolve({ data: posts as [], total: posts.length }),
  getMany: (_resource, params) =>
    Promise.resolve({
      data: posts.filter((p) => params.ids.includes(p.id)) as [],
    }),
  getManyReference: () =>
    Promise.resolve({ data: posts as [], total: posts.length }),
  getOne: (_resource, params) =>
    Promise.resolve<GetOneResult>({
      data: posts.find((p) => p.id === params.id) || null,
    }),
  update: (_resource, params: UpdateParams<Post>) => {
    const updated = {
      ...params.previousData,
      ...params.data,
      id: params.previousData.id,
    }

    posts = posts.map((p) => (p.id === params.id ? updated : p))
    return Promise.resolve<UpdateResult>({ data: updated })
  },
  updateMany: (_resource, params: UpdateManyParams<Post>) => {
    const targets = posts.filter((p) => params.ids.includes(p.id))
    if (!targets.length) return Promise.resolve({ data: [] })

    const updateds = targets.map((p) => ({ ...p, ...params.data }))
    posts = posts.map((p) => {
      const updated = updateds.find((u) => u.id === p.id)
      return updated || p
    })
    return Promise.resolve({ data: updateds as [] })
  },
}

const BulkActionButtons = () => (
  <>
    <BulkDeleteButton />
    <BulkExportButton />
    <BulkUpdateButton
      label="Reset Title"
      data={{ title: '' }}
    ></BulkUpdateButton>
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
  const record = useRecordContext()
  return <span>Post {record ? `"${record.title}"` : ''}</span>
}

export const PostEdit = () => (
  <Edit title={<PostTitle />}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <TextInput source="body" />
    </SimpleForm>
  </Edit>
)

const PostCreate = () => (
  <Create title="Create a Post">
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="body" />
    </SimpleForm>
  </Create>
)

const Tenant: React.FC = () => {
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

import PostCreate from '@/components/organisms/tenants/posts/create'
import PostEdit from '@/components/organisms/tenants/posts/edit'
import PostList from '@/components/organisms/tenants/posts/list'
import { Admin, DataProvider, Resource } from 'react-admin'

type Props = {
  dataProvider: DataProvider
}

const Tenant: React.FC<Props> = ({ dataProvider }: Props) => {
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

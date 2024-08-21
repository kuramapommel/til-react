import React from 'react'
import { Admin } from 'react-admin'
import { useDataProvider } from './hooks/use-data-provider'

type Props = {
  children: React.ReactNode
}

const Providers = React.memo(function Providers({ children }: Props) {
  const dataProvider = useDataProvider()
  return (
    <Admin basename="/tenant" dataProvider={dataProvider}>
      {children}
    </Admin>
  )
})

export default Providers

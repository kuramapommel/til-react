import Footer from '@/components/organisms/footer'
import Header from '@/components/organisms/header'

type TenantsTemplateProps = {
  children: React.ReactNode
}

const TenantsTemplate = ({ children }: TenantsTemplateProps) => (
  <div className="flex flex-col min-h-screen">
    <Header />

    <main className="text-gray-900 border-b border-gray-200 flex-grow">
      <div className="container flex mx-auto p-5 flex-col items-center">
        {children}
      </div>
    </main>

    <Footer />
  </div>
)

export default TenantsTemplate

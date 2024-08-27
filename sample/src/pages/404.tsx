import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <>
    <h1>404 NOT FOUND</h1>
    <p>お探しのページは見つかりませんでした。</p>
    <Link to="/">戻る</Link>
  </>
)

export default NotFoundPage

import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="container flex flex-col">
    <h1 className="text-3xl m-auto mt-5">404 NOT FOUND</h1>
    <p className="text-base text-red-600 mx-auto mt-5">
      お探しのページは見つかりませんでした。
    </p>
    <Link
      to="/"
      className="border-2 w-28 h-9 text-center rounded-md bg-blue-400 text-white mx-auto my-5 p-1"
    >
      戻る
    </Link>
  </div>
)

export default NotFoundPage

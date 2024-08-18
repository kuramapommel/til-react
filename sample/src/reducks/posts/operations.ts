import { Post } from './types'

// todo 本来はサーバ型で管理する
let _posts: Post[] = [
  {
    id: 'id-test',
    title: 'aaaaaaa',
    body: 'description',
  },
]

const create =
  (dispatch: (posts: Post) => void) => async (title: string, body: string) => {
    // todo id の採番はサーバ側の話なので今ここで考えることじゃない
    const post = { id: new Date().getTime().toString(), title, body }
    _posts = [..._posts, post]
    dispatch(post)
  }

const deleteBy = (dispatch: (post: Post) => void) => async (id: string) => {
  // todo 実際はサーバアクセスして削除処理完了したあとに id を dispatch する
  const post =
    _posts.find((p) => p.id !== id) ??
    (() => {
      throw new Error('not found')
    })()
  _posts = _posts.filter((p) => p.id !== id)
  dispatch(post)
}

const deleteMany =
  (dispatch: (ids: string[]) => void) => async (ids: string[]) => {
    // todo 実際はサーバアクセスして削除処理完了したあとに ids を dispatch する
    _posts = _posts.filter((p) => !ids.includes(p.id))
    dispatch(ids)
  }

const fetchBy =
  (dispatch: (posts: Post[]) => void) =>
  async (
    option: {
      ids: string[]
    } = {
      ids: [],
    },
  ) => {
    // todo 実際はサーバアクセスして取得したあとに posts を dispatch する
    dispatch(
      option.ids.length
        ? _posts.filter((p) => option.ids.includes(p.id))
        : _posts,
    )
  }

const getOne = (dispatch: (post: Post) => void) => (id: string) => {
  const post =
    _posts.find((p) => p.id === id) ??
    (() => {
      throw new Error('not found')
    })()
  dispatch(post)
}

const update = (dispatch: (post: Post) => void) => async (post: Post) => {
  _posts = _posts.map((p) => (p.id === post.id ? post : p))
  dispatch(post)
}

const updateMany =
  (dispach: (posts: Post[]) => void) =>
  (ids: string[], post: Partial<Post>) => {
    const updateds = _posts
      .filter((p) => ids.includes(p.id))
      .map((p) => ({ ...p, ...post }))
    _posts = _posts.map((p) => {
      const updated = updateds.find((u) => u.id === p.id)
      return updated || p
    })
    dispach(updateds)
  }

export { create, deleteBy, deleteMany, fetchBy, getOne, update, updateMany }

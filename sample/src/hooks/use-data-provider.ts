import { Post } from '@/reducks/posts/types'
import * as PostOperations from '@/reducks/posts/operations'
import { useCallback } from 'react'
import {
  combineDataProviders,
  CreateParams,
  CreateResult,
  DeleteManyParams,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  GetOneResult,
  QueryFunctionContext,
  UpdateManyParams,
  UpdateParams,
  UpdateResult,
} from 'react-admin'

export const useDataProvider = () => {
  const create = useCallback(
    async (_resource: string, params: CreateParams<Post>) => {
      const { title, body } = params.data
      if (!title || !body) return Promise.resolve<CreateResult>({ data: null })

      const post = await new Promise<Post>((resolve) => {
        const createPost = PostOperations.create(resolve)
        createPost(title, body)
      })
      return await Promise.resolve<CreateResult>({
        data: post,
      })
    },
    [],
  )
  const deleteBy = useCallback(
    async (_resource: string, params: DeleteParams) => {
      const post = await new Promise<Post>((resolve) => {
        const deletePost = PostOperations.deleteBy(resolve)
        deletePost(params.id)
      })
      return await Promise.resolve<DeleteResult>({ data: post })
    },
    [],
  )

  const deleteMany = useCallback(
    async (_resource: string, params: DeleteManyParams) => {
      const ids_1 = await new Promise<string[]>((resolve) => {
        const deletePosts = PostOperations.deleteMany(resolve)
        deletePosts(params.ids)
      })
      return await Promise.resolve({ data: ids_1 })
    },
    [],
  )

  const getList = useCallback(
    async (
      _resource: string,
      _params: GetListParams & QueryFunctionContext,
    ) => {
      const posts = await new Promise<Post[]>((resolve) => {
        const fetchPosts = PostOperations.fetchBy(resolve)
        fetchPosts()
      })
      return await Promise.resolve({ data: posts as [], total: posts.length })
    },
    [],
  )

  const getMany = useCallback(
    async (_resource: string, params: GetManyParams & QueryFunctionContext) => {
      const posts = await new Promise<Post[]>((resolve) => {
        const fetchPosts = PostOperations.fetchBy(resolve)
        fetchPosts({ ids: params.ids })
      })
      return await Promise.resolve({
        data: posts as [],
      })
    },
    [],
  )

  const getManyReference = useCallback(
    async (
      _resource: string,
      _params: GetManyReferenceParams & QueryFunctionContext,
    ) => {
      const posts = await new Promise<Post[]>((resolve) => {
        const fetchPosts = PostOperations.fetchBy(resolve)
        // todo 絞り込みとか使うようなら実装する
        fetchPosts()
      })
      return await Promise.resolve({
        data: posts as [],
      })
    },
    [],
  )

  const getOne = useCallback(
    async (_resource: string, params: GetOneParams & QueryFunctionContext) => {
      const post = await new Promise<Post>((resolve) => {
        const getPost = PostOperations.getOne(resolve)
        getPost(params.id)
      })
      return await Promise.resolve<GetOneResult>({
        data: post,
      })
    },
    [],
  )

  const update = useCallback(
    async (_resource: string, params: UpdateParams) => {
      const post = await new Promise<Post>((resolve) => {
        const updatePost = PostOperations.update(resolve)
        updatePost({
          ...params.previousData,
          ...params.data,
          id: params.previousData.id,
        })
      })
      return await Promise.resolve<UpdateResult>({ data: post })
    },
    [],
  )

  const updateMany = useCallback(
    async (_resource: string, params: UpdateManyParams) => {
      const updateds = await new Promise<Post[]>((resolve) => {
        const updatePosts = PostOperations.updateMany(resolve)
        updatePosts(
          params.ids.map((id) => id.toString()),
          params.data,
        )
      })
      return await Promise.resolve({ data: updateds as [] })
    },
    [],
  )

  const combiner = useCallback(
    (resource: string) => {
      switch (resource) {
        case 'posts':
          return {
            create,
            delete: deleteBy,
            deleteMany,
            getList,
            getMany,
            getManyReference,
            getOne,
            update,
            updateMany,
          }
        default:
          throw new Error(`Unknown resource: ${resource}`)
      }
    },
    [
      create,
      deleteBy,
      deleteMany,
      getList,
      getMany,
      getManyReference,
      getOne,
      update,
      updateMany,
    ],
  )

  return combineDataProviders(combiner)
}

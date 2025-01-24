// src\payload-types.ts 是payload自动生成的
// 这里添加一些payload没有自动生成的类型

import { Media, User } from './payload-types'

export type Result = {
  exp?: number
  token?: string
  user?: User
}

export type UpdatePassword = {
  newPassword: string
  currentPassword: string
}

export type UploadMediaResult = {
  doc: Media
  message: string
}

export type GetOrCreateCollectionsResult<T> = {
  doc: T
  message: string
}

export type GetListCollectionsResult<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

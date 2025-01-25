import { Prescription, Tmc } from '@/payload-types'
import { fetchAPIBuild } from './fetchAPI'
import { stringify } from 'qs-esm'
import type { Where } from 'payload'

import {
  GetListCollectionsResult,
  GetOrCreateCollectionsResult,
  // UploadMediaResult,
} from '@/payload-types-more'
import { or } from '@payloadcms/db-vercel-postgres/drizzle'
import { SearchParams } from '@/hooks/use-search'

const API_BASE_URL = '/api'

const fetchApi = fetchAPIBuild(API_BASE_URL)
// const fetchApiUpload = fetchAPIBuild(API_BASE_URL, true)

export const getPrescription = (
  id: string,
): Promise<GetOrCreateCollectionsResult<Prescription>> => {
  return fetchApi(`/prescription/${id}`)
}

export const getPrescriptions = (page: number): Promise<GetListCollectionsResult<Prescription>> => {
  const params = new URLSearchParams()
  params.set('depth', '0')
  params.set('page', page.toString())
  params.set('limit', '9')
  return fetchApi(`/prescription?${params.toString()}`)
}

export const createPrescription = (data: Partial<Prescription>) =>
  fetchApi<GetOrCreateCollectionsResult<Prescription>>('/prescription', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const getTmcs = (page: number): Promise<GetListCollectionsResult<Tmc>> => {
  const params = new URLSearchParams()
  params.set('depth', '0')
  params.set('page', page.toString())
  params.set('limit', '9')
  return fetchApi(`/tmc?${params.toString()}`)
}

export const search = ({
  query,
  fields,
  page,
  limit,
  collection,
}: SearchParams): Promise<GetListCollectionsResult<Prescription | Tmc>> => {
  const query2: Where = {
    and: [
      {
        'doc.relationTo': {
          equals: collection,
        },
      },
      ...query.map((keyword) => ({
        or: [
          ...fields.map((field) => ({
            [field]: {
              like: keyword,
            },
          })),
        ],
      })),
    ],
  }
  const params = stringify({
    where: query2,
    page,
    limit,
  })

  return fetchApi(`/search?${params}`)
}

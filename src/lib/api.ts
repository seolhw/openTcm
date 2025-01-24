import { Prescription } from '@/payload-types'
import { fetchAPIBuild } from './fetchAPI'
// import { stringify } from 'qs-esm'
// import type { Where } from 'payload'
import {
  GetListCollectionsResult,
  GetOrCreateCollectionsResult,
  // UploadMediaResult,
} from '@/payload-types-more'

const API_BASE_URL = '/api'

const fetchApi = fetchAPIBuild(API_BASE_URL)
// const fetchApiUpload = fetchAPIBuild(API_BASE_URL, true)

export const getPrescription = (
  id: string,
): Promise<GetOrCreateCollectionsResult<Prescription>> => {
  return fetchApi(`/prescription/${id}`)
}

export const getPrescriptions = (): Promise<GetListCollectionsResult<Prescription>> => {
  return fetchApi(`/prescription?depth=0`)
}

export const createPrescription = (data: Partial<Prescription>) =>
  fetchApi<GetOrCreateCollectionsResult<Prescription>>('/prescription', {
    method: 'POST',
    body: JSON.stringify(data),
  })

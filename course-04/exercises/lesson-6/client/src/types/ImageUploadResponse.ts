import { ImageModel } from './ImageModel'

export interface ImageUploadResponse {
  newItem: ImageModel
  uploadUrl: string
}

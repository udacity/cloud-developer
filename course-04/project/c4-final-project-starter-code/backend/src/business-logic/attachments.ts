import { AttachmentAccess } from '../data-layer/attachmentsAccess'

const attachmentsAccess = new AttachmentAccess()

export function getUploadUrl(todoId: string) : string {
  return attachmentsAccess.getUploadUrl(todoId)
}

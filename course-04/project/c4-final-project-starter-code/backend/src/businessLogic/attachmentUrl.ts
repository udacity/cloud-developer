
import AttachmentsStorage from '../dataLayer/attachmentsStorage'


const attachmentStorage = new AttachmentsStorage()

export async function getAttachmentUrl(todoId: string): Promise<string> {
    return await attachmentStorage.getAttachmentUrl(todoId)
}

export function getPresignedUrl(todoId: string): string | null {
    return attachmentStorage.getPresignedUrl(todoId)
}
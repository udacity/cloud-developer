import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export function setUpdates(updatesMap: DocumentClient.ExpressionAttributeValueMap) {
  const updates = Object.keys(updatesMap)
    .map(attr => updatesMap[attr] && `${attr.slice(1)} = ${attr}`)
    .filter(v => !!v)
    .join(',')
  return `SET ${updates}`
}

export function chunk(arr, chunkSize = 25, cache = []) {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}
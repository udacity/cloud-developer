import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export function getUpdateExpression(
  values: DocumentClient.ExpressionAttributeValueMap,
  names: DocumentClient.ExpressionAttributeNameMap = {}
) {
  const aliases = Object.values(names)
  const updates = Object.keys(values)
    .map(attr => {
      const key = attr.slice(1);
      const index = aliases.indexOf(key);
      const alias = index > -1 ? aliases[index] : key;
      return values[attr] && `${alias} = ${attr}`
    })
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
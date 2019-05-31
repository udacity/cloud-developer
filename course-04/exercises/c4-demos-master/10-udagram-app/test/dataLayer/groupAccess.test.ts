import { GroupAccess } from '../../src/dataLayer/groupsAccess'

const group = {
  id: 'group-id',
  name: 'group-name',
  description: 'group-description',
  userId: 'user-id'
}

const getPromise = jest.fn()

const dynamoDbClient: any = {
  get: jest.fn(() => { return {
      promise: getPromise
    }
  }),
}

const groupAccess = new GroupAccess(dynamoDbClient)

test('test get group when it does not exist', async () => {
  getPromise.mockResolvedValue({
    Item: group
  })

  const result = await groupAccess.getGroup('group-id')

  expect(result).toEqual(group)
})

test('test get group when it does not exist', async () => {
  getPromise.mockResolvedValue({
    Item: null
  })

  const result = await groupAccess.getGroup('group-id')

  expect(result).toEqual(null)
})

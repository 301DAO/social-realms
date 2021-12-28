import { userAddress } from '@/wallet/utils'
import { Client, PrivateKey, ThreadID, UserAuth, Where } from '@textile/hub'
import { createDB, findUserDB } from './textile'

// Docs: https://docs.textile.io/
/**
 * To create a new DB:
 * 1. Auth and get Client
 * 2. Setup new ThreadID and Database
 * 3. use the client to generate a new token using the newToken() function,
 * 4. after creating new token, call createDB() to create a new DB.
 * one DB is created, you can call listUserThreads() to get the list of threads.
 */

declare const window: any

// const GROUP_KEY = 'be6a6xkfn2ogzuh4uye7r4xnv4a'
// const GROUP_SECRET = 'blzig2hkki3cgxurowion2tsneugfszc42vdr77q'
// const KEY = 'bshxu43my5rghzflk4pren446fa'

export const auth: UserAuth = {
  msg: 'test msg1',
  sig: 'test sig1',
  token: 'SECRET1',
  key: process.env.NEXT_PUBLIC_TEXTILE_KEY || '',
}

// const keyInfo: KeyInfo = {
//   key: GROUP_KEY,
// }

// https://docs.textile.io/tutorials/hub/pki-identities/
export const generateNewIdentity = async () => PrivateKey.fromRandom()

export const stringToIdentity = async (str: string) =>
  PrivateKey.fromString(str)

const storedLocalStorage = async () => localStorage.getItem('identity')

/**
 * find stored identity in localStorage and return it
 * if not found then generate new one.
 */
const identity = async () => {
  const storedId =
    (await storedLocalStorage()) || process.env.TEXTILE_HUB_IDENTITY
  if (storedId) return PrivateKey.fromString(storedId)
  const identity = PrivateKey.fromRandom()
  localStorage.setItem('identity', identity.toString().toLowerCase())
  //fs.appendFileSync('.env', `TEXTILE_HUB_IDENTITY=${identity.toString()}`)
  // console.log(`new identity: ${identity.toString()}`)
  return identity
}

/**
 * find user's database threadId, if not found create new one.
 */
export const getThreadId = async (client: Client, address: string) => {
  const existing = await findUserDB(client, address)
  // console.log(`existing: ${existing?.id}`)
  if (existing) {
    window.threadId = existing.id
    return existing.id
  }
  const threadId = await createDB(client, address.toLowerCase())
  window.threadId = threadId.toString()
  localStorage.setItem('threadId', threadId.toString())
  return threadId.toString()
}

/**
 * Creating a new Thread API client
 */
export const setup = async () => {
  const address = await userAddress()
  const client = Client.withUserAuth(auth)
  await client.getToken(await identity())
  const threadId = await getThreadId(client, await address)
  // @ts-ignore
  client['threadId'] = threadId
  const ThreadId = ThreadID.fromString(threadId)
  //console.log(`ThreadId: ${threadId}`)

  const hasFollowingCollection = await userHasCollection(
    client,
    ThreadId,
    'following'
  )
  const hasFavoritesCollection = await userHasCollection(
    client,
    ThreadId,
    'favorite'
  )
  const followingList = await getFollowingList(client, threadId)
 // console.log( followingList);

  // TODO
  // const signature = await signMessage('TODO')
  // if (hasFollowingCollection === false)
  //   await createNewCollection(client, threadId, 'following')

  // if (!hasFavoritesCollection === false)
  //   await createNewCollection(client, threadId, 'favorites')

  //window.client = client
  return client
}
interface EthUser {
  _id: string
  address: string
}

interface TxHsah {
  _id: string
  hash: string
}

export const isFollowing = async (
  client: Client,
  threadId: string,
  address: string
) => {
  const threadID = ThreadID.fromString(threadId)
  const query = new Where('address').eq(address)
  try {
    const result = await client.find<EthUser>(threadID, 'following', query)
    return result.length > 0
  } catch (error: any) {
    console.log(error)
  }
}

export const follow = async (
  client: Client,
  threadId: string,
  address: string
) => {
  const threadID = ThreadID.fromString(threadId)
  const query = new Where('address').eq(address)
  const result = await client.find<EthUser>(threadID, 'following', query)
  if (result.length !== 0) return 'already following'
  const follow = await client.create(threadID, 'following', [
    {
      _id: '',
      address,
    },
  ])
  console.log(`followed new address: ${follow}`)
  return follow
}

export const unfollow = async (
  client: Client,
  threadId: string,
  address: string
) => {
  const threadID = ThreadID.fromString(threadId)
  const query = new Where('address').eq(address)
  const result = await client.find<EthUser>(threadID, 'following', query)
  if (result.length < 1) return
  const ids = result.map(instance => instance._id)
  return await client.delete(threadID, 'following', ids)
}

interface Transaction {
  _id: string
  hash: string
}

export const favoriteTransaction = async (
  client: Client,
  threadId: string,
  hash: string
): Promise<'already favorited' | string[]> => {
  const threadID = ThreadID.fromString(threadId)
  const query = new Where('hash').eq(hash)
  const result = await client.find<TxHsah>(threadID, 'favorites', query)
  if (result.length !== 0) return 'already favorited'
  return await client.create(threadID, 'favorites', [
    {
      _id: '',
      hash,
    },
  ])
}

export const unfavorite = async (
  client: Client,
  threadId: string,
  hash: string
) => {
  const threadID = ThreadID.fromString(threadId)
  const query = new Where('hash').eq(hash)
  const result = await client.find<TxHsah>(threadID, 'favorites', query)
  if (result.length < 1) return
  const ids = result.map(instance => instance._id)
  return await client.delete(threadID, 'favorites', ids)
}

/**
 * This is a hacky way to get all entries in a collection
 */
export const getAllEntitiesInCollection = async (
  client: Client,
  threadId: ThreadID,
  collectionName: string
) => {
  const query = new Where('_id').ne(new Date().toISOString())
  return await client.find(threadId, collectionName, query)
}

interface Following {
  address: string
  _id: string
}

export const getFollowingList = async (client: Client, threadId: string) => {
  const query = new Where('_id').ne(new Date().toISOString())

  const response = await client.find<Following>(
    ThreadID.fromString(threadId),
    'following',
    query
  )

  return response.map(instance => instance.address)
  // return await client.find<Following>(
  //   ThreadID.fromString(threadId),
  //   'following',
  //   query
  // )
}

interface Favorite {
  hash: string
  _id: string
}

export const getFavoritesList = async (client: Client, threadId: string) => {
  const query = new Where('_id').ne(new Date().toISOString())
  return await client.find<Favorite[]>(
    ThreadID.fromString(threadId),
    'favorites',
    query
  )
}

async function userHasCollection(
  client: Client,
  threadId: ThreadID,
  collectionName: string
): Promise<boolean> {
  try {
    const has = await client.has(threadId, collectionName, [])
    if (has) return true
  } catch (error: any) {
    if (`${error}`.includes('collection not found')) return false
    throw new Error(error)
  }
  return false
}

/**
 * Creating new collection
 */

const following = {
  title: 'Following',
  type: 'object',
  required: ['_id', 'address'],
  properties: {
    _id: {
      type: 'string',
      description: "The instance's id.",
    },
    address: {
      type: 'string',
      description: 'The followee address.',
    },
  },
}

interface Following {
  _id: string
  address: string
}

const favorites = {
  title: 'Favorites',
  type: 'object',
  required: ['_id', 'hash'],
  properties: {
    _id: {
      type: 'string',
      description: "The instance's id.",
    },
    address: {
      type: 'hash',
      description: 'The transaction hash.',
    },
  },
}

async function createNewCollection(
  client: Client,
  threadId: string,
  collectionName: 'following' | 'favorites'
) {
  const threadID = ThreadID.fromString(threadId)
  const collection = await client.newCollection(threadID, {
    name: collectionName,
    schema: collectionName === 'following' ? following : favorites,
  })
  return collection
}

import {
  Client,
  CollectionConfig,
  Identity,
  KeyInfo,
  PrivateKey,
  ThreadID,
} from '@textile/hub'

// Docs: https://docs.textile.io/

declare global {
  interface Window {
    textile: Client
  }
}

// https://docs.textile.io/tutorials/hub/pki-identities/
export const generateUserIdentity = async () => {
  const identity = PrivateKey.fromRandom()
  return identity
}

const getSeed = async (identity: PrivateKey) => {
  const seed = identity.seed
}

export const stringToIdentity = async (str: string) => {
  return PrivateKey.fromString(str)
}

// Authorize a new user to use your Hub API
export const newToken = async ({
  client,
  user,
}: {
  client: Client
  user: PrivateKey
}) => {
  const token = await client.getToken(user)
  return token
}

// List a user's existing Threads
export const listUserThreads = async (client: Client) => {
  const threads = await client.listThreads()
  return threads
}

/**
 * Create a new DB by name and return the ThreadID
 */
export const createDB = async ({
  client,
  name,
}: {
  client: Client
  name: string
}) => {
  const threadID: ThreadID = await client.newDB(undefined, name)
  return threadID
}

/**
 * Find user's DB
 */
export const findUserDB = async ({
  client,
  address,
}: {
  client: Client
  address: string
}) => {
  const dbs = await client.listDBs()
  return dbs.find(db => db.name?.toLowerCase() === address.toLowerCase())
}

/**
 * List all DBs for a specific ThreadID
 */
export const dbInfo = async (client: Client, threadId: string) => {
  const info = await client.getDBInfo(ThreadID.fromString(threadId))
  return info
}

export const deleteAllDBs = async (client: Client) => {
  const threads = await listUserThreads(client)
  for (const thread of threads) {
    await client.deleteDB(ThreadID.fromString(thread.id))
  }
}

/**
 * create a new collection under a specific DB
 */
export const createCollection = async ({
  client,
  threadID,
  config,
}: {
  client: Client
  threadID: ThreadID
  config: CollectionConfig
}) => {
  const collection = await client.newCollection(threadID, config)
  return collection
}

/**
 * Create collection from object
 */
export const createCollectionFromObject = async ({
  client,
  threadID,
  object,
  collectionName,
}: {
  client: Client
  threadID: ThreadID
  object: any
  collectionName: string
}) => {
  const collection = await client.newCollectionFromObject(threadID, object, {
    name: collectionName,
  })
  return collection
}

/**
 * create new entity under a specific collection
 */
export const createCollectionEntity = async ({
  client,
  threadId,
  name,
  jsonData,
}: {
  client: Client
  threadId: ThreadID
  name: string
  jsonData: any
}) => {
  const ids = await client.create(threadId, name, [jsonData])
  return ids
}

/**
 * List all collections for a specific ThreadID
 */
export const listCollections = async ({
  client,
  threadId,
}: {
  client: Client
  threadId: ThreadID
}) => {
  const collections = await client.listCollections(threadId)
  return collections
}

// create a KeyInfo object above to connect to the API.
export const authorize = async ({
  key,
  identity,
}: {
  key: KeyInfo
  identity: Identity
}) => {
  const client = await Client.withKeyInfo(key)
  await client.getToken(identity)
  return client
}

export const sign = async ({
  identity,
  message,
}: {
  identity: PrivateKey
  message: string
}) => {
  const challenge = Buffer.from(message)
  const credentials = identity.sign(challenge)
  return credentials
}

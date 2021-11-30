import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';

import CeramicClient from '@ceramicnetwork/http-client';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { DID } from 'dids';

import detectEthereumProvider from '@metamask/detect-provider';

const CLAY_TESTNET_ENDPOINT = 'https://ceramic-clay.3boxlabs.com';

/**
 * Obtain an authenticated ceramic client
 * @returns ceramic client
 */
export const authenticateAndGetClient = async function() {
  const provider = await detectEthereumProvider();
  if (provider) {
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const addresses = await provider.enable();
    const authProvider = new EthereumAuthProvider(provider, addresses[0]);
    const threeIdConnect = new ThreeIdConnect();
    await threeIdConnect.connect(authProvider);

    const ceramic = new CeramicClient(CLAY_TESTNET_ENDPOINT);
    const did = new DID({
      provider: threeIdConnect.getDidProvider(),
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'CeramicClient' is not assignable... Remove this comment to see the full error message
      resolver: ThreeIdResolver.getResolver(ceramic),
    });

    await did.authenticate();
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ceramic' does not exist on type 'Window ... Remove this comment to see the full error message
    window.ceramic = ceramic;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'did' does not exist on type 'Window & ty... Remove this comment to see the full error message
    window.did = did.id;

    ceramic.setDID(did);
    return ceramic;
  }

  return null;
}

const waitMs = (ms: any) => new Promise((res) => setTimeout(res, ms));

// @ts-expect-error ts-migrate(7024) FIXME: Function implicitly has return type 'any' because ... Remove this comment to see the full error message
export const detectFollowListChange = async (ceramicClient: any, forAddress: any, knownFollowingList: any, timeoutMs: any) => {
  const timestamp = Date.now();
	const response = await loadFollowingForAddress(ceramicClient, forAddress);
  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  if (response.following.length !== knownFollowingList.length) {
    return response;
  } else {
    if (timeoutMs <= Date.now() - timestamp) {
      throw new Error('No change detected');
    }

    await waitMs(1000);

    return detectFollowListChange(ceramicClient, forAddress, knownFollowingList, timeoutMs - (Date.now() - timestamp));
  }
}


/**
 * Follow an address. This call needs authentication
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ceramicClient' implicitly has an 'any' ... Remove this comment to see the full error message
export const follow = async function(ceramicClient, followingAddress) {
  // deterministic entry, family: <authenticated address>, tags: [following]
  // https://developers.ceramic.network/streamtypes/tile-document/api/#create-a-deterministic-tiledocument

  await add(ceramicClient, 'following', followingAddress);
}

/**
 * Unfollow an address. This call needs authentication
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ceramicClient' implicitly has an 'any' ... Remove this comment to see the full error message
export const unfollow = async function(ceramicClient, unfollowAddress) {
  // update stream, family: <authenticated address>, tags: [following]
  // https://developers.ceramic.network/streamtypes/tile-document/api/#update-a-tiledocument

  await remove(ceramicClient, 'following', unfollowAddress);
}

/**
 * Load all addresses the authenticated wallet itself is following
 */
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ceramicClient' implicitly has an 'any' ... Remove this comment to see the full error message
 export const loadFollowing = async function(ceramicClient) {
  // load stream, family: <any address>, tags: [following]
  // https://developers.ceramic.network/streamtypes/tile-document/api/#query-a-deterministic-tiledocument

  return await getList(ceramicClient, 'following', ceramicClient.signedInEthAddress);
}

/**
 * Load all addresses a particular address is following. This call does not require authentication
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ceramicClient' implicitly has an 'any' ... Remove this comment to see the full error message
export const loadFollowingForAddress = async function(ceramicClient, forAddress) {
  // load stream, family: <any address>, tags: [following]
  // https://developers.ceramic.network/streamtypes/tile-document/api/#query-a-deterministic-tiledocument

  return await getList(ceramicClient, 'following', forAddress);
}

/**
 * Favorite a transaction. This call needs authentication
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ceramicClient' implicitly has an 'any' ... Remove this comment to see the full error message
export const favoriteTransaction = async function(ceramicClient, transactionHash) {
  // deterministic entry, family: <authenticated address>, tags: [favorite]

  await add(ceramicClient, 'favorite', transactionHash);
}

/**
 * Un-favorite a transaction. This call needs authentication
 */
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ceramicClient' implicitly has an 'any' ... Remove this comment to see the full error message
 export const unfavoriteTransaction = async function(ceramicClient, transactionHash) {
  // update entry, family: <authenticated address>, tags: [favorite]

  await remove(ceramicClient, 'favorite', transactionHash);
}

/**
 * Load all favorite transactions for wallet itself. This call needs authentication
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ceramicClient' implicitly has an 'any' ... Remove this comment to see the full error message
export const loadAllFavoriteTransactions = async function(ceramicClient) {
  // load stream, family: <any address>, tags: [favorite]

  return await getList(ceramicClient, 'favorite', ceramicClient.signedInEthAddress);
}

/**
 * Load all favorite transactions for a particular address. This call needs authentication
 */
 // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ceramicClient' implicitly has an 'any' ... Remove this comment to see the full error message
 export const loadAllFavoriteTransactionsForAddress = async function(ceramicClient, forAddress) {
  // load stream, family: <any address>, tags: [favorite]

  return await getList(ceramicClient, 'favorite', forAddress);
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ceramicClient' implicitly has an 'any' ... Remove this comment to see the full error message
const add = async function(ceramicClient, tag, item) {
  const retrievedDoc = await TileDocument.deterministic(
    ceramicClient,
    { family: ceramicClient.signedInEthAddress, tags: [tag]},
    { pin: true }
  );

  if (!retrievedDoc.content
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    || Object.keys(retrievedDoc.content).length === 0
  ) {
    if (ceramicClient.signedInEthAddress === item) {
      throw new Error('You cannot follow yourself');
    }

    return await retrievedDoc.update(
      { [tag]: [item]},
      { family: ceramicClient.signedInEthAddress, tags: [tag]},
      { pin: true }
    );
  } else {
    return await retrievedDoc.update(
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      { [tag]: [...new Set([...retrievedDoc.content[tag], item])]},
      { family: ceramicClient.signedInEthAddress, tags: [tag]},
      { pin: true }
    );
  }
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ceramicClient' implicitly has an 'any' ... Remove this comment to see the full error message
const remove = async function(ceramicClient, tag, item) {
  const retrievedDoc = await TileDocument.deterministic(
    ceramicClient,
    { family: ceramicClient.signedInEthAddress, tags: [tag]},
    { pin: true }
  );

  if (retrievedDoc.content === undefined || retrievedDoc.content === null) {
    return;
  } else {
    return await retrievedDoc.update(
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      { [tag]: retrievedDoc.content[tag].filter(x => x !== item)},
      { family: ceramicClient.signedInEthAddress, tags: [tag]},
      { pin: true }
    );
  }
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ceramicClient' implicitly has an 'any' ... Remove this comment to see the full error message
const getList = async function(ceramicClient, tag, forAddress) {
  try {
    const retrievedDoc = await TileDocument.deterministic(
      ceramicClient,
      { family: forAddress, tags: [tag]},
      { pin: true }
    );

    return retrievedDoc.content;
  } catch (error) {
    console.error(error);

    throw new Error('Error getting data');
  }
}

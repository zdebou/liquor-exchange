import asyncRestClient from './asyncRestClient';

const restBasePath = '/api';

export enum Collection {
	Auctions = '/auctions',
	AuctionsView = '/views/auctions',
	Countries = '/countries',
}

/**
 * Loads all documents from a collection
 * @param collection Name/identifier of a collection.
 */
export const loadDocuments = (collection: Collection) =>
	asyncRestClient({method: 'GET', path: `${restBasePath}${collection}`});

/**
 * Loads a single document from a collection
 * @param collection Name/identifier of a collection.
 * @param id Document unique identifier.
 */
export const loadDocument = (collection: Collection, id: string) =>
	asyncRestClient({method: 'GET', path: `${restBasePath}${collection}/${id}`});

/**
 * Inserts new document into a collection
 * @param collection Name/identifier of a collection.
 * @param data Document data to be inserted.
 */
export const insertDocument = (collection: Collection, data: object) =>
	asyncRestClient({
		method: 'POST',
		path: `${restBasePath}${collection}`,
		entity: data,
		headers: {'Content-Type': 'application/json'},
	});

/**
 * Updates a document in a collection
 * @param collection Name/identifier of a collection.
 * @param data Document data to be updated.
 * @param id Document unique identifier.
 */
export const updateDocument = (collection: Collection, data: object, id: string) =>
	asyncRestClient({
		method: 'PUT',
		path: `${restBasePath}${collection}/${id}`,
		entity: data,
		headers: {'Content-Type': 'application/json'},
	});

/**
 * Inserts new document into a collection
 * @param collection Name/identifier of a collection.
 * @param id Document unique identifier.
 */
export const deleteDocument = (collection: Collection, id: string) =>
	asyncRestClient({method: 'DELETE', path: `${restBasePath}${collection}/${id}`});

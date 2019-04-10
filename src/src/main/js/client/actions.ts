import asyncRestClient from './asyncRestClient';

const restBasePath = '/api';

export enum Collection {
	Auctions = '/auctions',
	AuctionsView = '/views/auctions',
	Countries = '/countries',
}

export enum SortOrder {
	Asc = 'asc',
	Desc = 'desc',
}

export interface ISortParams {
	column: string;
	order?: SortOrder;
}

export interface IRequestParams {
	sort?: ISortParams;
	size?: number;
	page?: number;
	[key: string]: any;
}

const encodeParams = (params: IRequestParams) =>
	Object.entries(params)
		.filter(([_, value]) => value !== undefined)
		.reduce((result, [key, value]) => {
			let finalValue;
			if (key === 'sort') {
				finalValue = value.column;
				if (value.order) {
					finalValue += `,${value.order}`;
				}
			} else {
				finalValue = value;
			}
			result.append(key, finalValue);
			return result;
		}, new URLSearchParams())
		.toString();

/**
 * Loads all documents from a collection
 * @param collection Name/identifier of a collection.
 * @param params URL parameters for filtering
 */
export const loadDocuments = (collection: Collection, params: IRequestParams = {}) =>
	asyncRestClient({method: 'GET', path: `${restBasePath}${collection}?${encodeParams(params)}`});

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

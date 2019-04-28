import asyncRestClient from './asyncRestClient';
import store from './store';

const restBasePath = '/api';

export enum Collection {
	Auctions = '/auctions',
	AuctionsByCountry = '/auctions/search/findByCountryCode',
	Countries = '/countries',
	Categories = '/categories',
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
		.filter(([_, value]) => value !== undefined && value !== null && value !== '')
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

/**
 * MOCKED: Logs in user.
 * @param user User credentials.
 */
export const logIn = ({email, password}: {email: string; password: string}) => {
	if (email !== 'user@email.cz' || password !== 'password') {
		return Promise.reject(Error('Log in failed.'));
	}

	store.dispatch.auth.setUser({email});
	return Promise.resolve();
};

/**
 * MOCKED: Logs out user.
 */
export const logOut = () => {
	store.dispatch.auth.setUser(null);
	return Promise.resolve();
};

import asyncRestClient from './asyncRestClient';
import store from './store';

const restBasePath = '/api';

export enum Collection {
	Auctions = '/auctions',
	AuctionsByCountry = '/auctions/search/findByCountryCode',
	Countries = '/countries',
	Categories = '/categories',
	SignIn = '/auth/signin',
	SignUp = '/auth/signup',
	ChangePassword = '/auth/changepass',
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

/**
 * Encodes params object into URL-encoded query string
 * @param params Params object to be encoded
 * @return string String with URL-encoded params
 */
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

const authorizationHeader = () => {
	const loggedUser = store.getState().auth.user;
	if (loggedUser) {
		return 'Bearer ' + loggedUser.accessToken;
	} else {
		return 'Anonymous';
	}
};

const httpHeaders = (contentType?: string) => {
	return {
		'Content-Type': contentType ? contentType : 'application/json',
		Authorization: authorizationHeader(),
	};
};
/**
 * Loads all documents from a collection
 * @param collection Name/identifier of a collection.
 * @param params URL parameters for filtering
 */
export const loadDocuments = (collection: Collection, params: IRequestParams = {}) =>
	asyncRestClient({
		method: 'GET',
		path: `${restBasePath}${collection}?${encodeParams(params)}`,
		headers: httpHeaders(),
	});

/**
 * Loads a single document from a collection
 * @param collection Name/identifier of a collection.
 * @param id Document unique identifier.
 */
export const loadDocument = (collection: Collection, id: string) =>
	asyncRestClient({
		method: 'GET',
		path: `${restBasePath}${collection}/${id}`,
		headers: httpHeaders(),
	});

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
		headers: httpHeaders(),
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
		headers: httpHeaders(),
	});

/**
 * Inserts new document into a collection
 * @param collection Name/identifier of a collection.
 * @param id Document unique identifier.
 */
export const deleteDocument = (collection: Collection, id: string) =>
	asyncRestClient({
		method: 'DELETE',
		path: `${restBasePath}${collection}/${id}`,
		headers: httpHeaders(),
	});

/**
 * Logs in user.
 * @param user User credentials - {email, password}.
 */
export const logIn = ({email, password}: {email: string; password: string}) => {
	return asyncRestClient({
		method: 'POST',
		path: `${restBasePath}/auth/signin`,
		entity: {email, password},
		headers: httpHeaders(),
	}).then(
		success => {
			const accessToken: string = success.entity.accessToken;
			store.dispatch.auth.setUser({email, accessToken});
			return Promise.resolve();
		},
		failure => {
			return Promise.reject(Error(failure.message));
		},
	);
};

/**
 * Logs out user.
 */
export const logOut = () => {
	store.dispatch.auth.setUser(null);
	return Promise.resolve();
};

/**
 * Register new user.
 */
export const signUp = ({
	email,
	password,
	firstName,
	lastName,
	identityCardNumber,
	birthDate,
	address,
	companyAddress,
	companyName,
	companyIdentificationNumber,
	VATNumber,
}: {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	identityCardNumber: string;
	birthDate: string;
	address: string;
	companyAddress: string;
	companyName: string;
	companyIdentificationNumber: bigint;
	VATNumber: bigint;
}) => {
	return asyncRestClient({
		method: 'POST',
		path: `${restBasePath}/auth/signup`,
		entity: {
			email,
			password,
			firstName,
			lastName,
			identityCardNumber,
			birthDate,
			address,
			companyAddress,
			companyName,
			companyIdentificationNumber,
			VATNumber,
		},
		headers: httpHeaders(),
	}).then(
		success => {
			if (!success.entity.success) {
				return Promise.reject(Error(success.message));
			}
			return Promise.resolve();
		},
		failure => {
			return Promise.reject(Error(failure.message));
		},
	);
};

interface IPasswordChangeData {
	oldPassword: string;
	newPassword: string;
	newPasswordConfirm: string;
}

/**
 * Change user password
 * @param data IPasswordChangeData New password data.
 */
export const changePassword = (data: IPasswordChangeData) =>
	insertDocument(Collection.ChangePassword, data);

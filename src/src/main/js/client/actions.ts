import asyncRestClient from './asyncRestClient';

/**
* Loads all documents from a collection
* @param collection Name of a collection.
*/
export const loadDocuments = (collection: string) => asyncRestClient({method: 'GET', path: `/api/${collection}`});

/**
* Loads all data from a specified REST URI
* @param view Name of a view
*/
export const loadFromView = (view: string) => asyncRestClient({method: 'GET', path: `/api/views/${view}`});

/**
* Loads a single document from a collection
* @param collection Name of a collection.
* @param id Document unique identifier.
*/
export const loadDocument = (collection: string, id: string) =>
	asyncRestClient({method: 'GET', path: `/api/${collection}/${id}`});

/**
* Inserts new document into a collection
* @param collection Name of a collection.
* @param data Document data to be inserted.
*/
export const insertDocument = (collection: string, data: object) =>
	asyncRestClient({
		method: 'POST',
		path: `/api/${collection}`,
		entity: data,
		headers: {'Content-Type': 'application/json'},
	});

/**
* Updates a document in a collection
* @param collection Name of a collection.
* @param data Document data to be updated.
* @param id Document unique identifier.
*/
export const updateDocument = (collection: string, data: object, id: string) =>
	asyncRestClient({
		method: 'PUT',
		path: `/api/${collection}/${id}`,
		entity: data,
		headers: {'Content-Type': 'application/json'},
	});

/**
* Inserts new document into a collection
* @param collection Name of a collection.
* @param id Document unique identifier.
*/
export const deleteDocument = (collection: string, id: string) =>
	asyncRestClient({method: 'DELETE', path: `/api/${collection}/${id}`});

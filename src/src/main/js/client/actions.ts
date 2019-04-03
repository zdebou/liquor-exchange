import asyncRestClient from './asyncRestClient';

export const loadAuctions = () => asyncRestClient({method: 'GET', path: '/api/views/auctions'});

export const loadAuction = (id: string) =>
	asyncRestClient({method: 'GET', path: `/api/auctions/${id}`});

export const insertAuction = (auction: object) =>
	asyncRestClient({
		method: 'POST',
		path: '/api/auctions',
		entity: auction,
		headers: {'Content-Type': 'application/json'},
	});

export const updateAuction = (auction: object, id: string) =>
	asyncRestClient({
		method: 'PUT',
		path: `/api/auctions/${id}`,
		entity: auction,
		headers: {'Content-Type': 'application/json'},
	});

export const deleteAuction = (id: string) =>
	asyncRestClient({method: 'DELETE', path: `/api/auctions/${id}`});

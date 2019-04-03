import {Request} from 'rest';

import restClient from './restClient';

const asyncRestClient = (request: Request): Promise<any> =>
	new Promise(resolve => restClient(request).done(resolve));

export default asyncRestClient;

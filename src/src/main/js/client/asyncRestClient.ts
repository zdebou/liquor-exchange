import {Request} from 'rest';

import restClient from './restClient';

const asyncRestClient = (request: Request): Promise<any> =>
	new Promise((resolve, reject) =>
		restClient(request).then(resolve, response => {
			if (response.entity) {
				reject(response.entity);
			} else {
				reject(response);
			}
		}),
	);

export default asyncRestClient;

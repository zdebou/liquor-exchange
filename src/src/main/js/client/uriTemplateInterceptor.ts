import interceptor from 'rest/interceptor';

/** If the URI is a URI Template per RFC 6570 (http://tools.ietf.org/html/rfc6570), trim out the template part */
const uriTemplateInterceptor = interceptor({
	request(request) {
		if (request.path.indexOf('{') !== -1) {
			request.path = request.path.split('{')[0];
		}
		return request;
	},
});

export default uriTemplateInterceptor;

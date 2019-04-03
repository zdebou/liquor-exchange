import rest from 'rest';
import baseRegistry, {Registry} from 'rest/mime/registry';
import defaultRequest from 'rest/interceptor/defaultRequest';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';
import hal from 'rest/mime/type/application/hal';

import uriListConverter from './uriListConverter';
import uriTemplateInterceptor from './uriTemplateInterceptor';

const registry = (baseRegistry as any).child() as Registry;

registry.register('text/uri-list', uriListConverter);
registry.register('application/hal+json', hal);

export default rest
	.wrap(mime, {registry})
	.wrap(uriTemplateInterceptor)
	.wrap(errorCode)
	.wrap(defaultRequest, {headers: {Accept: 'application/hal+json'}});

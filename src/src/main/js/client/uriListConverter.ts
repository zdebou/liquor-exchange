import {MIMEConverter} from 'rest/mime/registry';

/** Extracts URIs of returned entity or entities */
const uriListConverter: MIMEConverter = {
	read(str) {
		return str.split('\n');
	},
	write(obj) {
		if (obj instanceof Array) {
			// If this is an Array, extract the self URI and then join using a newline
			return obj.map(resource => resource._links.self.href).join('\n');
		} else {
			// Otherwise just return the self URI
			return obj._links.self.href;
		}
	},
};

export default uriListConverter;

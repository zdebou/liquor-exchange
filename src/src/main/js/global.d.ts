// Fix missing declaration in @types/rest
declare module 'rest/mime/type/application/hal' {
	const halConverter: {
		read: (value: any) => string;
		write: (value: any) => string;
	};
	export = halConverter;
}

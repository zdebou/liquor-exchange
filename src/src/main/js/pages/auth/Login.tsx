import React, {FC} from 'react';
import * as yup from 'yup';

import Container from '../../components/Container';
import Box from '../../components/Box';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';

const USER_SCHEMA = yup.object().shape({
	name: yup
		.string()
		.strict(true)
		.trim("Login can't start or end with spaces.")
		.required('This is a required field'),
	password: yup.string().required('This is a required field'),
});

interface IUser {
	name: string;
	password: string;
}

const Login: FC = () => {
	const handleSubmit = (user: IUser) => {
		// tslint:disable-next-line: no-console
		console.log('LOG IN', user);
	};

	return (
		<Container>
			<Box title="Log In">
				<Form
					initialValues={{name: '', password: ''}}
					schema={USER_SCHEMA}
					onSubmit={handleSubmit}
				>
					<Input id="name" label="Name" />
					<Input id="password" label="Password" type="password" />
					<Button type="submit" label="Submit" primary />
				</Form>
			</Box>
		</Container>
	);
};

export default Login;

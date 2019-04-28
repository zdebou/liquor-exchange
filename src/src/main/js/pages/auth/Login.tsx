import React, {FC, useState} from 'react';
import {Redirect} from 'react-router';
import * as yup from 'yup';

import {logIn} from '../../client/actions';
import {useStore} from '../../client/store';
import Container from '../../components/Container';
import Box from '../../components/Box';
import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';

const USER_SCHEMA = yup.object({
	email: yup.string().required('This is a required field.'),
	password: yup.string().required('This is a required field.'),
});

interface IUser {
	email: string;
	password: string;
}

const Login: FC = () => {
	const [error, setError] = useState<string>();
	const loggedUser = useStore(state => state.auth.user);

	const onFail = (errorObject: Error) => {
		setError(errorObject.message);
	};

	const handleSubmit = (user: IUser) => {
		logIn(user).then(undefined, onFail);
	};

	if (loggedUser) {
		return <Redirect to="/" />;
	}

	return (
		<Container>
			<Box title="Sign In">
				<Form
					initialValues={{email: '', password: ''}}
					schema={USER_SCHEMA}
					onSubmit={handleSubmit}
				>
					{error && <FormGroup error={error} />}
					<Input id="email" label="Email" />
					<Input id="password" label="Password" type="password" />
					<ButtonGroup>
						<Button type="submit" label="Submit" primary />
					</ButtonGroup>
				</Form>
			</Box>
		</Container>
	);
};

export default Login;

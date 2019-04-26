import React, {FC} from 'react';
import {Redirect} from 'react-router';
import * as yup from 'yup';

import {useStore} from '../../client/store';
import Container from '../../components/Container';
import Box from '../../components/Box';
import Form from '../../components/Form';
import Input from '../../components/Input';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';

const NEW_PASSWORD_SCHEMA = yup.object({
	old: yup.string().required('This is a required field.'),
	new: yup
		.string()
		.required('Choose a new password.')
		.min(8, 'Provide at least 8 characters.'),
	new2: yup
		.string()
		.required('Please retype your password.')
		.oneOf([yup.ref('new')], 'Passwords do not match'),
});

interface IPasswordChangeData {
	old: string;
	new: string;
	new2: string;
}

const PasswordChange: FC = () => {
	const loggedUser = useStore(state => state.auth.user);

	const handleSubmit = (data: IPasswordChangeData) => {
		// tslint:disable-next-line: no-console
		console.log('CHANGE PASSWORD', data);
	};

	if (!loggedUser) {
		return <Redirect to="/" />;
	}

	return (
		<Container>
			<Box title="Password Change">
				<Form
					initialValues={{old: '', new: '', new2: ''}}
					schema={NEW_PASSWORD_SCHEMA}
					onSubmit={handleSubmit}
				>
					<Input type="password" id="old" label="Current Password" />
					<Input type="password" id="new" label="New Password" />
					<Input type="password" id="new2" label="Confirm Password" />
					<ButtonGroup>
						<Button type="submit" label="Submit" primary />
					</ButtonGroup>
				</Form>
			</Box>
		</Container>
	);
};

export default PasswordChange;

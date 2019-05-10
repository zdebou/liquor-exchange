import React, {FC, useState} from 'react';
import {Redirect} from 'react-router';
import * as yup from 'yup';

import {useStore} from '../../client/store';
import {changePassword, IPasswordChangeData} from '../../client/actions';
import Container from '../../components/Container';
import Box from '../../components/Box';
import Form from '../../components/Form';
import Input from '../../components/Input';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';
import {Modal, ModalType, IModalMessage} from '../../components/Modal';

const NEW_PASSWORD_SCHEMA = yup.object({
	oldPassword: yup.string().required('This is a required field.'),
	newPassword: yup
		.string()
		.required('Choose a new password.')
		.min(8, 'Provide at least 8 characters.'),
	newPasswordConfirm: yup
		.string()
		.required('Please retype your password.')
		.oneOf([yup.ref('newPassword')], 'Passwords do not match'),
});

const PasswordChange: FC = () => {
	const loggedUser = useStore(state => state.auth.user);
	const [modalMessage, setModalMessage] = useState<IModalMessage | null>(null);

	const onFail = (response: {[key: string]: any}) => {
		setModalMessage({type: ModalType.Error, title: response.error || "Error", text: response.message});
	};

	const onChangePasswordSuccess = () => {
		return <Redirect to="/me" />;
	};

	const handleSubmit = (data: IPasswordChangeData) => {
		changePassword(data).then(onChangePasswordSuccess, onFail);
	};

	if (!loggedUser) {
		return <Redirect to="/" />;
	}

	return (
		<Container>
			<Box title="Password Change">
				<Form
					initialValues={{oldPassword: '', newPassword: '', newPasswordConfirm: ''}}
					schema={NEW_PASSWORD_SCHEMA}
					onSubmit={handleSubmit}
				>
					<Input type="password" id="oldPassword" label="Current Password" />
					<Input type="password" id="newPassword" label="New Password" />
					<Input type="password" id="newPasswordConfirm" label="Confirm Password" />
					<ButtonGroup>
						<Button type="submit" label="Submit" primary />
					</ButtonGroup>
				</Form>
			</Box>
			{modalMessage && <Modal message={modalMessage} />}
		</Container>
	);
};

export default PasswordChange;

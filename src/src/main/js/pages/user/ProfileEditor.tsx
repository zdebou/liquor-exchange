import React, {FC} from 'react';
import {Redirect} from 'react-router';
import * as yup from 'yup';

import {useStore} from '../../client/store';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Form from '../../components/Form';
import Input from '../../components/Input';
import ButtonGroup from '../../components/ButtonGroup';
import NavButton from '../../components/NavButton';
import Button from '../../components/Button';
import Select from '../../components/Select';

const USER_SCHEMA = yup.object({
	firstName: yup.string().required('Required'),
	lastName: yup.string().required('Required'),
	birthdate: yup.string().required('Required'),
	address: yup.string().required('Required'),
	identityCardNumber: yup.string().required('Required'),
});

interface IProfileData {
	type: string;
	firstName: string;
	lastName: string;
	birthdate: string;
	address: string;
	identityCardNumber: string;
}

const ProfileEditor: FC = () => {
	const loggedUser = useStore(state => state.auth.user);

	const user = {
		type: 'INDIVIDUAL',
		firstName: 'Lorem',
		lastName: 'Ipsum',
		birthdate: '1. 4. 2019',
		address: 'Lorem ipsum dolor sit amet',
		identityCardNumber: '0123456789ABC',
	};

	const handleSubmit = (data: IProfileData) => {
		// tslint:disable-next-line: no-console
		console.log('SAVE PROFILE', data);
	};

	if (!loggedUser) {
		return <Redirect to="/" />;
	}

	return (
		<Container>
			<div style={{maxWidth: '700px'}}>
				<Heading>About you</Heading>
				<Form initialValues={user} schema={USER_SCHEMA} onSubmit={handleSubmit}>
					<Select
						id="type"
						label="Type"
						idFieldName="value"
						labelFieldName="key"
						items={[
							{key: 'Individual', value: 'INDIVIDUAL'},
							{key: 'Company', value: 'COMPANY'},
						]}
					/>
					<Input id="firstName" label="First Name" />
					<Input id="lastName" label="Last Name" />
					<Input id="birthdate" label="Birthdate" />
					<Input id="address" label="Address" />
					<Input id="identityCardNumber" label="Identity Card Number" />
					<ButtonGroup>
						<NavButton label="Change Password" href="/my/password" />
					</ButtonGroup>
					<ButtonGroup>
						<Button label="Save Changes" type="submit" primary />
					</ButtonGroup>
				</Form>
			</div>
		</Container>
	);
};

export default ProfileEditor;

import React from 'react';
import * as yup from 'yup';

import Container from '../../components/Container';
import Box from '../../components/Box';
import Form from '../../components/Form';
import Input from '../../components/Input';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';
import {signUp} from '../../client/actions';
import FormGroup from '../../components/FormGroup';
import {Redirect} from 'react-router';

const REGISTRATION_SCHEMA = yup.object({
	email: yup
		.string()
		.required('Please provide a valid email address.')
		.email('Please provide a valid email address.'),
	password: yup
		.string()
		.required('This is a required field.')
		.min(8, 'Provide at least 8 characters'),
	firstName: yup.string().required('This is a required field.'),
	lastName: yup.string().required('This is a required field.'),
	identityCardNumber: yup.string(),
	birthDate: yup.date(),
	address: yup.string(),
	companyAddress: yup.string(),
	companyName: yup.string(),
	companyIdentificationNumber: yup.number(),
	VATNumber: yup.number(),
});

interface IRegistrationData {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	identityCardNumber: string;
	birthDate: string;
	address: string;
	companyAddress: string;
	companyName: string;
	companyIdentificationNumber: bigint;
	VATNumber: bigint;
}

class SignUp extends React.Component {
	public state = {
		success: false,
		error: '',
	};

	public render() {
		if (this.state.success) {
			return <Redirect to="/login" />;
		}

		return (
			<Container>
				<Box title="Sign Up">
					<Form
						initialValues={{email: '', password: ''}}
						schema={REGISTRATION_SCHEMA}
						onSubmit={this.handleSubmit}
					>
						{this.state.error && <FormGroup error={this.state.error} />}
						<Input id="email" label="Email" />
						<Input type="password" id="password" label="Password" />
						<Input id="firstName" label="First Name" />
						<Input id="lastName" label="Last Name" />
						<Input id="identityCardNumber" label="Identity Card Number" />
						<Input id="birthDate" label="Birth Date" type="date" />
						<Input id="address" label="Address" />
						<Input id="companyAddress" label="Company Address" />
						<Input id="companyName" label="Company Name" />
						<Input
							id="companyIdentificationNumber"
							label="Company Identification Number"
							type="number"
						/>
						<Input id="VATNumber" label="VAT Number" type="number" />
						<ButtonGroup>
							<Button label="Sign Up" type="submit" primary />
						</ButtonGroup>
					</Form>
				</Box>
			</Container>
		);
	}

	private handleSubmit = (data: IRegistrationData) => {
		signUp(data)
			.then(() => this.setState(() => ({success: true})))
			.catch(errorObject => this.setState({error: errorObject.message, success: false}));
	};
}

export default SignUp;

import React, {FC} from 'react';
import * as yup from 'yup';

import Container from '../../components/Container';
import Box from '../../components/Box';
import Form from '../../components/Form';
import Input from '../../components/Input';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';

const REGISTRAION_SCHEMA = yup.object({
	email: yup
		.string()
		.required('Please provide a valid email address.')
		.email('Please provide a valid email address.'),
	password: yup
		.string()
		.required('This is a required field.')
		.min(8, 'Provide at least 8 characters'),
	password2: yup
		.string()
		.required('Please retype your password.')
		.oneOf([yup.ref('password')], 'Passwords do not match.'),
	legalAge: yup.bool().oneOf([true], 'Sorry, you are not allowed to proceed.'),
});

interface IRegistrationData {
	email: string;
	password: string;
	password2: string;
	legalAge: boolean;
}

const SignUp: FC = () => {
	const handleSubmit = (data: IRegistrationData) => {
		// tslint:disable-next-line: no-console
		console.log('SIGN UP', data);
	};

	return (
		<Container>
			<Box title="Sign Up">
				<Form
					initialValues={{email: '', password: '', password2: '', legalAge: false}}
					schema={REGISTRAION_SCHEMA}
					onSubmit={handleSubmit}
				>
					<Input id="email" label="Email" />
					<Input type="password" id="password" label="Password" />
					<Input type="password" id="password2" label="Confirm Password" />
					<Checkbox
						id="legalAge"
						label="I confirm that I am of legal age to buy alcoholic beverages in my home country."
						validationPostponed
					/>
					<ButtonGroup>
						<Button label="Sign Up" type="submit" primary />
					</ButtonGroup>
				</Form>
			</Box>
		</Container>
	);
};

export default SignUp;

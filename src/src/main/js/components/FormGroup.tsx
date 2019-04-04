import React, {FC, ReactElement} from 'react';
import BSForm from 'react-bootstrap/Form';

interface IProps {
	label?: string;
}

const FormGroup: FC<IProps> = ({label, children}) => (
	<BSForm.Group>
		{label && <BSForm.Label>{label}</BSForm.Label>}
		{children}
	</BSForm.Group>
);

export default FormGroup;

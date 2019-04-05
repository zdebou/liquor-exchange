import React, {FC} from 'react';
import BSForm from 'react-bootstrap/Form';

interface IProps {
	label?: string;
	error?: string;
}

const FormGroup: FC<IProps> = ({label, error, children}) => (
	<BSForm.Group>
		{label && <BSForm.Label>{label}</BSForm.Label>}
		{children}
		{error && <div className="text-danger">{error}</div>}
	</BSForm.Group>
);

export default FormGroup;

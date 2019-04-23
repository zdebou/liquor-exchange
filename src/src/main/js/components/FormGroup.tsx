import React, {FC} from 'react';
import BSForm from 'react-bootstrap/Form';

interface IProps {
	label?: string;
	htmlId?: string;
	error?: string;
}

const FormGroup: FC<IProps> = ({label, htmlId, error, children}) => (
	<BSForm.Group>
		{label && <BSForm.Label htmlFor={htmlId}>{label}</BSForm.Label>}
		{children}
		{error && <div className="text-danger">{error}</div>}
	</BSForm.Group>
);

export default FormGroup;

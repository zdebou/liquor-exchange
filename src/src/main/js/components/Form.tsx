import React, {FC, FormEvent} from 'react';
import BSForm from 'react-bootstrap/Form';

interface IProps {
	onSubmit: () => void;
}

const Form: FC<IProps> = ({onSubmit, children}) => {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit();
	};

	return <BSForm onSubmit={handleSubmit}>{children}</BSForm>;
};

export default Form;

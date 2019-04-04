import React, {FC, useState, ChangeEvent} from 'react';
import BSForm from 'react-bootstrap/Form';

interface IProps {
	type: string;
	placeholder?: string;
	dataContext: {[key: string]: any};
	dataMember: string;
}

const Input: FC<IProps> = ({type, placeholder, dataContext, dataMember}) => {
	const [value, setValue] = useState(dataContext[dataMember] || '');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		dataContext[dataMember] = event.target.value;
		setValue(event.target.value);
	};

	return (
		<BSForm.Control
			type={type}
			value={value}
			placeholder={placeholder || ''}
			onChange={handleChange as any}
		/>
	);
};

export default Input;

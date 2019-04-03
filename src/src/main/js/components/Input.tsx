import React, {FC, useState, ChangeEvent} from 'react';

interface IProps {
	type: string;
	placeholder?: string;
	dataContext: object;
	dataMember: string;
}

const Input: FC<IProps> = ({type, placeholder, dataContext, dataMember}) => {
	const [value, setValue] = useState(dataContext[dataMember] || '');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		dataContext[dataMember] = event.target.value;
		setValue(event.target.value);
	};

	return (
		<input type={type} value={value} placeholder={placeholder || ''} onChange={handleChange} />
	);
};

export default Input;

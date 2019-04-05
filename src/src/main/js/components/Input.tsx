import React, {FC, useState, ChangeEvent} from 'react';
import BSForm from 'react-bootstrap/Form';
import {withForm} from './Form';

interface IProps {
	value?: string | null;
	onChange: (value: string) => void;
	isInvalid?: boolean;
	type?: string;
	placeholder?: string;
}

export const InputRaw: FC<IProps> = ({
	value,
	onChange,
	isInvalid = false,
	type = 'text',
	placeholder = '',
}) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	return (
		<BSForm.Control
			type={type}
			value={value || ''}
			placeholder={placeholder}
			onChange={handleChange as any}
			isInvalid={isInvalid}
		/>
	);
};

export default withForm(InputRaw);

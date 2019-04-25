import React, {FC, ChangeEvent} from 'react';
import BSForm from 'react-bootstrap/Form';

import useUniqueId from '../utils/useUniqueId';
import {withForm} from './Form';

interface IProps {
	value?: string | null;
	onChange: (value: string) => void;
	isInvalid?: boolean;
	htmlId?: string;
	type?: string;
	placeholder?: string;
}

export const InputRaw: FC<IProps> = ({
	value,
	onChange,
	isInvalid = false,
	htmlId,
	type = 'text',
	placeholder = '',
}) => {
	const id = useUniqueId(htmlId);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	return (
		<BSForm.Control
			id={id}
			type={type}
			value={value || ''}
			placeholder={placeholder}
			onChange={handleChange as any}
			isInvalid={isInvalid}
		/>
	);
};

const Input = withForm()(InputRaw);

export default Input;

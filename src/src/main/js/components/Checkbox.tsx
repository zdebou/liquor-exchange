import React, {FC, ChangeEvent} from 'react';
import BSForm from 'react-bootstrap/Form';

import useUniqueId from '../utils/useUniqueId';
import {withForm} from './Form';

interface IProps {
	value?: boolean;
	onChange: (value: boolean) => void;
	isInvalid?: boolean;
	htmlId?: string;
	label?: string;
}

export const CheckboxRaw: FC<IProps> = ({value, onChange, isInvalid = false, htmlId, label}) => {
	const id = useUniqueId(htmlId);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.checked);
	};

	return (
		<BSForm.Check
			type="checkbox"
			custom
			id={id}
			label={label}
			checked={value}
			onChange={handleChange}
			isInvalid={isInvalid}
		/>
	);
};

const Checkbox = withForm({customLabel: true})(CheckboxRaw);

export default Checkbox;

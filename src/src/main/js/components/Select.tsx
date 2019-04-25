import React, {FC, ChangeEvent} from 'react';
import BSForm from 'react-bootstrap/Form';

import useUniqueId from '../utils/useUniqueId';
import {withForm} from './Form';

interface IProps {
	value?: any | null;
	onChange: (value: any) => void;
	isInvalid?: boolean;
	htmlId?: string;
	items: Array<{[key: string]: any}> | null;
	idFieldName: string;
	labelFieldName: string;
}

export const SelectRaw: FC<IProps> = ({
	value,
	onChange,
	isInvalid = false,
	htmlId,
	items,
	idFieldName,
	labelFieldName,
}) => {
	const id = useUniqueId(htmlId);

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value);
	};

	if (items === null) {
		return <span>Loading...</span>;
	}

	if (items.length === 0) {
		return <span>No items available.</span>;
	}

	if (value === null || value === undefined || value === '') {
		const newValue = items[0][idFieldName];
		if (newValue !== value) {
			value = newValue;
			setTimeout(() => onChange(value));
		}
	}

	return (
		<BSForm.Control
			id={id}
			as="select"
			onChange={handleChange as any}
			value={value}
			isInvalid={isInvalid}
		>
			{items.map(item => (
				<option key={item[idFieldName]} value={item[idFieldName]}>
					{item[labelFieldName]}
				</option>
			))}
		</BSForm.Control>
	);
};

const Select = withForm()(SelectRaw);

export default Select;

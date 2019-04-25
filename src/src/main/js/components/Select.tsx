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
	assignObject?: boolean;
}

export const SelectRaw: FC<IProps> = ({
	value,
	onChange,
	isInvalid = false,
	htmlId,
	items,
	idFieldName,
	labelFieldName,
	assignObject = false,
}) => {
	const id = useUniqueId(htmlId);

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		if (!assignObject) {
			onChange(event.target.value);
			return;
		}
		if (!items) {
			return;
		}

		onChange(items.find(item => item[idFieldName] === event.target.value) || items[0]);
	};

	if (items === null) {
		return <span>Loading...</span>;
	}

	if (items.length === 0) {
		return <span>No items available.</span>;
	}

	let rawValue = value;
	if (value === null || value === undefined || value === '') {
		rawValue = '';
		const newValue = assignObject ? items[0] : items[0][idFieldName];
		if (newValue !== value) {
			setTimeout(() => onChange(newValue));
		}
	} else if (assignObject) {
		rawValue = value[idFieldName] || '';
	}

	return (
		<BSForm.Control
			id={id}
			as="select"
			onChange={handleChange as any}
			value={rawValue}
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

import React, {FC, useState, useEffect, ChangeEvent} from 'react';
import BSForm from 'react-bootstrap/Form';

interface IProps {
	dataContext?: object;
	dataMember?: string;
	items: array;
	idFieldName: string;
	labelFieldName: string;
	onChange?: () => any;
}

const Select: FC<IProps> = ({
	dataContext,
	dataMember,
	items,
	idFieldName,
	labelFieldName,
	onChange,
}) => {
	const [selectedValue, setSelectedValue] = useState(dataContext ? dataContext[dataMember] : '');

	const changeValue = (value: string) => {
		if (dataContext) {
			dataContext[dataMember] = value;
		}
		if (value != selectedValue) {
			setSelectedValue(value);
			if (onChange) {
				onChange(value);
			}
		}
	};

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		changeValue(event.target.value);
	};

	if (items === null) {
		return <span>Loading...</span>;
	}

	if (items.length == 0) {
		return <span>No items available.</span>;
	}

	if (selectedValue == null || selectedValue == '') {
		changeValue(items[0][idFieldName]);
	}

	return (
		<BSForm.Control as="select" onChange={handleChange as any} value={selectedValue}>
			{items.map((item: object) => (
				<option key={item[idFieldName]} value={item[idFieldName]}>
					{item[labelFieldName]}
				</option>
			))}
		</BSForm.Control>
	);
};

export default Select;

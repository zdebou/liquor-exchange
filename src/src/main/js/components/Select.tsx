import React, {FC, useState, useEffect, ChangeEvent} from 'react';

import client from '../client/asyncRestClient';

interface IProps {
	dataContext: object;
	dataMember: string;
	itemsPath: string;
	idFieldName: string;
	labelFieldName: string;
}

const Select: FC<IProps> = ({dataContext, dataMember, itemsPath, idFieldName, labelFieldName}) => {
	const [selectedValue, setSelectedValue] = useState(dataContext[dataMember] || '');
	const [items, setItems] = useState(null);

	const extractCollectionName = (path: string) => {
		const pieces = path.split('/');
		return pieces[pieces.length - 1];
	};

	const changeValue = (value: string) => {
		dataContext[dataMember] = value;
		setSelectedValue(value);
	};

	const loadItems = () => {
		client({method: 'GET', path: itemsPath}).then(response => {
			setItems(response.entity._embedded[extractCollectionName(itemsPath)]);
		});
	};

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		changeValue(event.target.value);
	};

	useEffect(loadItems, []);

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
		<select onChange={handleChange} value={selectedValue}>
			{items.map((item: object) => (
				<option key={item[idFieldName]} value={item[idFieldName]}>
					{item[labelFieldName]}
				</option>
			))}
		</select>
	);
};

export default Select;

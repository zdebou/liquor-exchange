import React, {FC, useState, useEffect} from 'react';

import client from '../client';

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

	const extractCollectionName = (path) => {
		const pieces = itemsPath.split('/');
		return pieces[pieces.length - 1];
	}

	const changeValue = (value) => {
		dataContext[dataMember] = value;
		setSelectedValue(value);
	}

	const loadItems = () => {
		client({method: 'GET', path: itemsPath}).done(response => {
			setItems(response.entity._embedded[extractCollectionName(itemsPath)]);
		});
	};

	useEffect(() => {
		loadItems();
	}, []);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		changeValue(event.target.value);
	};

	if (items === null) {
		return <span>Loading...</span>
	}

	if (items.length == 0) {
		return <span>No items available.</span>
	}

	if (selectedValue == null || selectedValue == '') {
		changeValue(items[0][idFieldName]);
	}

	return (
		<select onChange={handleChange} value={selectedValue}>
			{items.map((item) => (
				<option key={item[idFieldName]} value={item[idFieldName]} >{item[labelFieldName]}</option>
			))}
		</select>
	)
}

export default Select;

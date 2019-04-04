import React, {FC, useState, useEffect, ChangeEvent} from 'react';
import BSForm from 'react-bootstrap/Form';

import {Collection, loadDocuments} from '../client/actions';

interface IProps {
	dataContext: {[key: string]: any};
	dataMember: string;
	collection: Collection;
	idFieldName: string;
	labelFieldName: string;
}

const Select: FC<IProps> = ({dataContext, dataMember, collection, idFieldName, labelFieldName}) => {
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
		loadDocuments(collection).then(response => {
			setItems(response.entity._embedded[extractCollectionName(collection)]);
		});
	};

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		changeValue(event.target.value);
	};

	useEffect(loadItems, []);

	if (items === null) {
		return <span>Loading...</span>;
	}

	if (items.length === 0) {
		return <span>No items available.</span>;
	}

	if (selectedValue === null || selectedValue === '') {
		changeValue(items[0][idFieldName]);
	}

	return (
		<BSForm.Control as="select" onChange={handleChange as any} value={selectedValue}>
			{items.map((item: {[key: string]: any}) => (
				<option key={item[idFieldName]} value={item[idFieldName]}>
					{item[labelFieldName]}
				</option>
			))}
		</BSForm.Control>
	);
};

export default Select;

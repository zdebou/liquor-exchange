import React, {FC, useState, useEffect, ChangeEvent} from 'react';
import BSForm from 'react-bootstrap/Form';

import {Collection, loadDocuments} from '../client/actions';

import Select from './Select';

interface IProps {
	dataContext: object;
	dataMember: string;
	collection: Collection;
	idFieldName: string;
	labelFieldName: string;
}

const SelectFromCollection: FC<IProps> = ({dataContext, dataMember, collection, idFieldName, labelFieldName}) => {
	const [items, setItems] = useState(null);

	const extractCollectionName = (path: string) => {
		const pieces = path.split('/');
		return pieces[pieces.length - 1];
	};

	const loadItems = () => {
		loadDocuments(collection).then(response => {
			setItems(response.entity._embedded[extractCollectionName(collection)]);
		});
	};

	useEffect(loadItems, []);

	return (
		<Select
			dataContext={dataContext}
			dataMember={dataMember}
			items={items}
			idFieldName={idFieldName}
			labelFieldName={labelFieldName}
		/>
	);
};

export default SelectFromCollection;

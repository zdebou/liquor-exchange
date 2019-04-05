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
	allowEmpty?: boolean;
	emptyOptionName?: string;
	onChange?: () => any;
}

/**
 * Tato komponenta slouží k výběru dokumentu z kolekce - automaticky načte celou kolekci z REST API.
 */
const SelectDocument: FC<IProps> = ({
	dataContext,
	dataMember,
	collection,
	idFieldName,
	labelFieldName,
	allowEmpty,
	emptyOptionName,
	onChange,
}) => {
	const [items, setItems] = useState(null);

	const extractCollectionName = (path: string) => {
		const pieces = path.split('/');
		return pieces[pieces.length - 1];
	};

	const loadItems = () => {
		loadDocuments(collection).then(response => {
			let items = response.entity._embedded[extractCollectionName(collection)];
			if (allowEmpty) {
				if (!emptyOptionName) {
					emptyOptionName = 'None';
				}
				let emptyItem = {};
				emptyItem[idFieldName] = '';
				emptyItem[labelFieldName] = emptyOptionName;
				items.unshift(emptyItem);
			}
			setItems(items);
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
			onChange={onChange}
		/>
	);
};

export default SelectDocument;

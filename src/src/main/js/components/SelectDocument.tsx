import React, {FC, useState, useEffect} from 'react';

import {Collection, loadDocuments} from '../client/actions';

import Select from './Select';

interface IProps {
	dataContext?: object;
	dataMember?: string;
	collection: Collection;
	idFieldName: string;
	labelFieldName: string;
	allowEmpty?: boolean;
	emptyOptionName?: string;
	onChange?: (value: any) => void;
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
	allowEmpty = false,
	emptyOptionName = 'None',
	onChange,
}) => {
	const [items, setItems] = useState(null);

	const extractCollectionName = (path: string) => {
		const pieces = path.split('/');
		return pieces[pieces.length - 1];
	};

	const loadItems = () => {
		loadDocuments(collection).then(response => {
			const newItems: object[] = response.entity._embedded[extractCollectionName(collection)];
			if (allowEmpty) {
				newItems.unshift({
					[idFieldName]: '',
					[labelFieldName]: emptyOptionName,
				});
			}
			setItems(newItems);
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

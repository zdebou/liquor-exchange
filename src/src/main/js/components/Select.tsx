import React, {FC, useState, useEffect, ChangeEvent} from 'react';
import BSForm from 'react-bootstrap/Form';

import {Collection, loadDocuments} from '../client/actions';
import {withForm} from './Form';

interface IProps {
	value?: string | null;
	onChange: (value: string) => void;
	isInvalid?: boolean;
	collection: Collection;
	idFieldName: string;
	labelFieldName: string;
}

export const SelectRaw: FC<IProps> = ({
	value,
	onChange,
	collection,
	isInvalid = false,
	idFieldName,
	labelFieldName,
}) => {
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

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value);
	};

	useEffect(loadItems, []);

	if (items === null) {
		return <span>Loading...</span>;
	}

	if (items.length === 0) {
		return <span>No items available.</span>;
	}

	if (!value) {
		value = items[0][idFieldName];
		setTimeout(() => onChange(value));
	}

	return (
		<BSForm.Control
			as="select"
			onChange={handleChange as any}
			value={value}
			isInvalid={isInvalid}
		>
			{items.map((item: {[key: string]: any}) => (
				<option key={item[idFieldName]} value={item[idFieldName]}>
					{item[labelFieldName]}
				</option>
			))}
		</BSForm.Control>
	);
};

export default withForm(SelectRaw);

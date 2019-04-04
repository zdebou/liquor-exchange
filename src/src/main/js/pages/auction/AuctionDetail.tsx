import React, {FC, useEffect, useState} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';

import {Collection, loadDocument, insertDocument, updateDocument} from '../../client/actions';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';

const AuctionDetail: FC<RouteChildrenProps<{id: string}>> = ({match, history}) => {
	const id = match.params.id === 'new' ? null : match.params.id;
	const [auction, setAuction] = useState(null);

	const init = () => {
		if (id === null) {
			setAuction({auction: {}});
		} else {
			loadDocument(Collection.Auctions, id).then(response => setAuction(response.entity));
		}
	};

	const handleSubmit = async () => {
		if (id === null) {
			await insertDocument(Collection.Auctions, auction);
		} else {
			await updateDocument(Collection.Auctions, auction, id);
		}
		history.push('/');
	};

	useEffect(init, []);

	if (auction === null) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Name:</label>
					<Input type="text" placeholder="Name" dataContext={auction} dataMember="name" />
				</div>
				<div>
					<label>Country:</label>
					<Select
						dataContext={auction}
						dataMember="countryCode"
						collection={Collection.Countries}
						idFieldName="code"
						labelFieldName="name"
					/>
				</div>
				<Button label="Save" />
			</form>
			<Link to="/">Back</Link>
		</div>
	);
};

export default AuctionDetail;

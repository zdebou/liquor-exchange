import React, {FC, useEffect, useState} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';

import client from '../../client';
import Button from '../../components/Button';
import Input from '../../components/Input';

async function insertAuction(auction) {
	return new Promise(resolve =>
		client({
			method: 'POST',
			path: '/api/auctions',
			entity: auction,
			headers: {'Content-Type': 'application/json'},
		}).done(resolve),
	);
}

async function updateAuction(auction, id) {
	return new Promise(resolve =>
		client({
			method: 'PUT',
			path: `/api/auctions/${id}`,
			entity: auction,
			headers: {'Content-Type': 'application/json'},
		}).done(resolve),
	);
}

const AuctionDetail: FC<RouteChildrenProps<{id: string}>> = ({match, history}) => {
	const id = match.params.id === 'new' ? null : match.params.id;
	const [auction, setAuction] = useState(null);

	useEffect(() => {
		if (id === null) {
			setAuction({auction: {name: ''}});
		} else {
			client({method: 'GET', path: `/api/auctions/${id}`}).done(response =>
				setAuction(response.entity),
			);
		}
	}, []);

	const handleSubmit = async () => {
		if (id === null) {
			await insertAuction(auction);
		} else {
			await updateAuction(auction, id);
		}
		history.push('/');
	};

	if (auction === null) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Input type="text" placeholder="Name" dataContext={auction} dataMember="name" />
				<Button label="Save" />
			</form>
			<Link to="/">Back</Link>
		</div>
	);
};

export default AuctionDetail;

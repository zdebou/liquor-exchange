import React, {FC, useState, useEffect} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';

import client from '../../client';
import Button from '../../components/Button';

const AuctionList: FC<RouteChildrenProps> = ({history}) => {
	const [rows, setRows] = useState(null);

	const loadAuctions = () => {
		client({method: 'GET', path: '/api/views/auctions'}).done(response => {
			setRows(response.entity);
		});
	};

	useEffect(() => {
		loadAuctions();
	}, []);

	const handleAddAuction = () => {
		history.push('/auction/new');
	};

	const deleteAuction = (id) => {
		client({method: 'DELETE', path: `/api/auctions/${id}`}).done(response => {
			loadAuctions();
		});
	};

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Auction name</th>
						<th>Country</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{rows === null ? (
						<tr>
							<td colSpan={3}>Loading...</td>
						</tr>
					) : (
						rows.length == 0 ? (
							<tr>
								<td colSpan={3}>No auctions available.</td>
							</tr>
						) : (
							rows.map((row) => (
								<tr key={row.auction.id}>
									<td>
										<Link to={`/auction/${row.auction.id}`}>{row.auction.name}</Link>
									</td>
									<td>{row.country.name}</td>
									<td><Button label="Delete" onClick={() => {deleteAuction(row.auction.id)}} /></td>
								</tr>
							))
						)
					)}
				</tbody>
			</table>
			<Button label="Add auction" onClick={handleAddAuction} />
		</div>
	);
};

export default AuctionList;

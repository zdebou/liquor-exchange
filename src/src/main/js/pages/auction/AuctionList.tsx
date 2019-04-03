import React, {FC, useState, useEffect} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';

import client from '../../client';
import Button from '../../components/Button';

const AuctionList: FC<RouteChildrenProps> = ({history}) => {
	const [rows, setRows] = useState(null);

	useEffect(() => {
		client({method: 'GET', path: '/api/views/auctions'}).done(response => {
			setRows(response.entity);
		});
	}, []);

	const handleAddAuction = () => {
		history.push('/auction/new');
	};

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Auction name</th>
						<th>Country</th>
					</tr>
				</thead>
				<tbody>
					{rows === null ? (
						<tr>
							<td colSpan={2}>Loading...</td>
						</tr>
					) : (
						rows.map((row) => (
							<tr key={row.auction.id}>
								<td>
									<Link to={`/auction/${row.auction.id}`}>{row.auction.name}</Link>
								</td>
								<td>{row.country.name}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			<Button label="Add auction" onClick={handleAddAuction} />
		</div>
	);
};

export default AuctionList;

import React, {FC, useState, useEffect, useCallback, useImperativeHandle} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';

import {loadAuctions, deleteAuction} from '../../client/actions';
import Button from '../../components/Button';

const AuctionList: FC<RouteChildrenProps> = ({history}) => {
	const [rows, setRows] = useState(null);

	const fetchAuctions = () => {
		loadAuctions().then(response => setRows(response.entity));
	};

	const handleAddAuction = () => {
		history.push('/auction/new');
	};

	const handleDeleteAuction = (id: string) => {
		deleteAuction(id).then(fetchAuctions);
	};

	useEffect(fetchAuctions, []);

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Auction name</th>
						<th>Country</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{rows === null ? (
						<tr>
							<td colSpan={3}>Loading...</td>
						</tr>
					) : rows.length == 0 ? (
						<tr>
							<td colSpan={3}>No auctions available.</td>
						</tr>
					) : (
						rows.map(row => (
							<tr key={row.auction.id}>
								<td>
									<Link to={`/auction/${row.auction.id}`}>
										{row.auction.name}
									</Link>
								</td>
								<td>{row.country.name}</td>
								<td>
									<Button
										label="Delete"
										onClick={() => handleDeleteAuction(row.auction.id)}
									/>
								</td>
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

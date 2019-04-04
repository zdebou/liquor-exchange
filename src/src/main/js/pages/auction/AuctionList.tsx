import React, {FC, useState, useEffect, useCallback, useImperativeHandle} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';

import {Collection, loadDocuments, deleteDocument} from '../../client/actions';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Table from '../../components/Table';
import Button from '../../components/Button';

const AuctionList: FC<RouteChildrenProps> = ({history}) => {
	const [rows, setRows] = useState(null);

	const fetchAuctions = () => {
		loadDocuments(Collection.AuctionsView).then(response => setRows(response.entity));
	};

	const handleAddAuction = () => {
		history.push('/auction/new');
	};

	const handleDeleteAuction = (id: string) => {
		deleteDocument(Collection.Auctions, id).then(fetchAuctions);
	};

	useEffect(fetchAuctions, []);

	return (
		<Container>
			<Heading>All Auctions</Heading>
			<Table
				cols={['Auction name', 'Country', '']}
				data={rows}
				loading={rows === null}
				emptyMessage="No auctions available."
			>
				{row => (
					<tr key={row.auction.id}>
						<td>
							<Link to={`/auction/${row.auction.id}`}>{row.auction.name}</Link>
						</td>
						<td>{row.country.name}</td>
						<td>
							<Button
								label="Delete"
								onClick={() => handleDeleteAuction(row.auction.id)}
							/>
						</td>
					</tr>
				)}
			</Table>
			<Button label="Add auction" primary onClick={handleAddAuction} />
		</Container>
	);
};

export default AuctionList;

import React, {FC, useState, useEffect} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';

import {Collection, loadDocuments, ISortParams} from '../../client/actions';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Table from '../../components/Table';
import {Modal, ModalType, IModalMessage} from '../../components/Modal';

const ActiveAuctions: FC<RouteChildrenProps> = () => {
	const [rows, setRows] = useState<Array<{[key: string]: any}> | null>(null);
	const [modalMessage, setModalMessage] = useState<IModalMessage | null>(null);

	const onFail = (response: {[key: string]: any}) => {
		setModalMessage({type: ModalType.Error, title: response.error, text: response.message});
	};

	const onLoadSuccess = (response: {[key: string]: any}) => {
		setRows(response.entity._embedded.auctions);
	};

	const fetchAuctions = () => {
		loadDocuments(Collection.Auctions, {
			sort: {column: 'start', order: 'desc'},
			size: 5,
			page: 1,
		}).then(onLoadSuccess, onFail);
	};

	useEffect(fetchAuctions, []);

	return (
		<Container className="mt-5">
			<h2>Active Auctions</h2>
			<Table
				cols={[{title: 'Auction name'}, {title: 'Country'}, {title: 'Seller'}, null]}
				data={rows}
				loading={rows === null}
				emptyMessage="No auctions available."
			>
				{row => (
					<tr key={row.id}>
						<td>
							<Link to={`/auction/${row.id}`}>{row.name}</Link>
						</td>
						<td>{row.country.name}</td>
						<td>
							{row.seller.firstName} {row.seller.lastName}
						</td>
						<td>
							<Link to={`/auction/${row.id}`}>view detail</Link>
						</td>
					</tr>
				)}
			</Table>
			{modalMessage && <Modal message={modalMessage} />}
		</Container>
	);
};

export default ActiveAuctions;

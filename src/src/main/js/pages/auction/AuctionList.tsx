import React, {FC, useState, useEffect} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';

import {Collection, loadDocuments, deleteDocument, ISortParams} from '../../client/actions';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Table from '../../components/Table';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';
import {SelectDocumentRaw} from '../../components/SelectDocument';
import {Modal, ModalType, IModalMessage} from '../../components/Modal';

const AuctionList: FC<RouteChildrenProps> = ({history}) => {
	const [rows, setRows] = useState<Array<{[key: string]: any}> | null>(null);
	const [country, setCountry] = useState<string>('');
	const [sorting, setSorting] = useState<ISortParams>();
	const [modalMessage, setModalMessage] = useState<IModalMessage | null>(null);

	const onFail = (response: {[key: string]: any}) => {
		setModalMessage({type: ModalType.Error, title: response.error, text: response.message});
	};

	const onLoadSuccess = (response: {[key: string]: any}) => {
		setRows(response.entity.content);
	};

	const onDeleteSuccess = () => {
		fetchAuctions(country);
	};

	const fetchAuctions = (
		countryCode: string | undefined = country,
		sortingValue: ISortParams | undefined = sorting,
	) => {
		loadDocuments(Collection.AuctionsView, {countryCode, sort: sortingValue}).then(
			onLoadSuccess,
			onFail,
		);
	};

	const handleAddAuction = () => {
		history.push('/auction/new');
	};

	const handleSortChange = (sortingValue: ISortParams) => {
		setSorting(sortingValue);
		fetchAuctions(country, sortingValue);
	};

	const handleDeleteAuction = (id: string) => {
		deleteDocument(Collection.Auctions, id).then(onDeleteSuccess, onFail);
	};

	const handleCountryChange = (countryCode: string) => {
		setCountry(countryCode);
		fetchAuctions(countryCode);
	};

	useEffect(fetchAuctions, []);

	return (
		<Container>
			<Heading>Auctions</Heading>
			<SelectDocumentRaw
				value={country}
				onChange={handleCountryChange}
				collection={Collection.Countries}
				allowEmpty={true}
				emptyOptionName="All"
				idFieldName="code"
				labelFieldName="name"
			/>
			<br />
			<Table
				cols={[
					{title: 'Auction name', sortColumn: 'name'},
					{title: 'Country', sortColumn: 'countryCode'},
					null,
				]}
				data={rows}
				loading={rows === null}
				emptyMessage="No auctions available."
				sortDescription={sorting}
				onSortChange={handleSortChange}
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
			<ButtonGroup>
				<Button label="Add auction" primary onClick={handleAddAuction} />
			</ButtonGroup>
			{modalMessage && <Modal message={modalMessage} />}
		</Container>
	);
};

export default AuctionList;

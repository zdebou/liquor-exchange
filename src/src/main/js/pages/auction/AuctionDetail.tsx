import React, {FC, useEffect, useState} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';

import {bidAuction, Collection, IBidData, loadDocument} from '../../client/actions';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import {IModalMessage, Modal, ModalType} from '../../components/Modal';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import * as yup from 'yup';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';
import Form from '../../components/Form';

interface ICategory {
	name: string;
}

interface IUserInfo {
	firstName: string;
	lastName: string;
}

interface IAuction {
	id: string;
	name: string;
	seller: IUserInfo;
	category: ICategory;
	productState: string;
	quantity: number;
	auctionState: string;
	winner: IUserInfo;
	volume: number;
	description: string;
	start: string;
	end: string;
	initialValue: number;
	minimumBid: number;
	lastValue: number;
}

const BID_SCHEMA = yup.object({
	amount: yup.number().required('This is a required field.'),
});

const AuctionDetail: FC<RouteChildrenProps<{id: string}>> = ({match, history}) => {
	const id = !match || match.params.id === 'new' ? null : match.params.id;
	const [auction, setAuction] = useState<IAuction | null>(null);
	const [modalMessage, setModalMessage] = useState<IModalMessage | null>(null);

	const onBidFail = (response: {[key: string]: any}) => {
		setModalMessage({type: ModalType.Error, title: response.error, text: response.message});
	};

	const onBidSuccess = (response: {[key: string]: any}) => {
		if (response.entity.success) {
			init();
		} else {
			setModalMessage({type: ModalType.Error, title: "Sorry, bid failed!", text: response.entity.message});
		}
	};

	const onFail = (response: {[key: string]: any}) => {
		setModalMessage({type: ModalType.Error, title: response.error, text: response.message});
	};

	const onLoadSuccess = (response: {[key: string]: any}) => {
		setAuction(response.entity);
	};

	const handleSubmit = (bidData: IBidData) => {
		bidAuction(bidData, auction.id).then(onBidSuccess, onBidFail);
	};

	const init = () => {
		if (id === null) {
			setAuction(null);
		} else {
			loadDocument(Collection.Auctions, id).then(onLoadSuccess, onFail);
		}
	};

	useEffect(init, []);

	if (auction === null) {
		return <Container>Loading...</Container>;
	}

	const bidAmount = {amount: auction.lastValue + auction.minimumBid};

	return (
		<Container>
			<Heading>{auction.name}</Heading>
			<div className="row">
				<div className="col-6">
					<p>Category: {auction.category.name}</p>
					<p>
						Seller: {auction.seller.firstName} {auction.seller.lastName}
					</p>
					<p>Product state: {auction.productState}</p>
					<p className="font-italic">Product description:</p>
					<p>{auction.description}</p>
					<p>Quantity: {auction.quantity}pcs</p>
					<p>Volume: {auction.volume}l</p>
					<p>Minimum value: {auction.initialValue} CZK</p>
					<p>Minimum bid value: {auction.minimumBid} CZK</p>
					<p>Start datetime: {new Date(auction.start).toLocaleDateString()}</p>
					{auction.winner && auction.auctionState !== 'ACTIVE' && (
						<p>
							Winner: {auction.winner.firstName} {auction.winner.lastName}
						</p>
					)}
				</div>
				<div className="col-6 text-right">
					<Image src="img/rum-bottle.jpg" width={250} />
				</div>
			</div>
			<Card>
				<Card.Header as="h5" className="bg-dark text-white">
					Bid to auction
				</Card.Header>
				<Card.Body>
					<p className="lead">
						Highest bid:{' '}
						<span className="badge badge-primary">{auction.lastValue} CZK</span>
					</p>
					<p className="lead">
						This auction ends:{' '}
						<span className="badge badge-primary">
							{new Date(auction.end).toLocaleDateString()}
						</span>
					</p>
					<Card.Title>Bid Amount:</Card.Title>
					<Form initialValues={bidAmount} schema={BID_SCHEMA} onSubmit={handleSubmit}>
						<Input name="amount" id="amount" />
						<Button type="submit" label="Bid" primary className="d-block w-100" />
					</Form>
				</Card.Body>
			</Card>

			{modalMessage && <Modal message={modalMessage} />}
		</Container>
	);
};

export default AuctionDetail;

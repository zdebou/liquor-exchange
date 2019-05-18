import React, {FC, useEffect, useState} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';

import {Collection, loadDocument} from '../../client/actions';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import {IModalMessage, Modal, ModalType} from '../../components/Modal';
import Image from 'react-bootstrap/Image';

interface ICategory {
	name: string;
}

interface IUserInfo {
	firstName: string;
	lastName: string;
}

interface IAuction {
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

const AuctionDetail: FC<RouteChildrenProps<{id: string}>> = ({match, history}) => {
	const id = !match || match.params.id === 'new' ? null : match.params.id;
	const [auction, setAuction] = useState<IAuction | null>(null);
	const [modalMessage, setModalMessage] = useState<IModalMessage | null>(null);

	const onFail = (response: {[key: string]: any}) => {
		setModalMessage({type: ModalType.Error, title: response.error, text: response.message});
	};

	const onLoadSuccess = (response: {[key: string]: any}) => {
		// tslint:disable-next-line:no-console
		console.log(response.entity);
		setAuction(response.entity);
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
			<p className="lead">
				Highest bid: <span className="badge badge-primary">{auction.lastValue} CZK</span>
			</p>
			<p className="lead">
				End datetime:{' '}
				<span className="badge badge-primary">
					{new Date(auction.end).toLocaleDateString()}
				</span>
			</p>
			<p className="mt-3">
				<Link to="/">Back</Link>
			</p>

			{modalMessage && <Modal message={modalMessage} />}
		</Container>
	);
};

export default AuctionDetail;

import React, {FC, useEffect, useState} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';

import {Collection, loadDocument} from '../../client/actions';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import {IModalMessage, Modal, ModalType} from '../../components/Modal';
import Image from 'react-bootstrap/Image';

const AuctionDetail: FC<RouteChildrenProps<{id: string}>> = ({match, history}) => {
	const id = !match || match.params.id === 'new' ? null : match.params.id;
	const [auction, setAuction] = useState<object | null>(null);
	const [modalMessage, setModalMessage] = useState<IModalMessage | null>(null);

	const onFail = (response: {[key: string]: any}) => {
		setModalMessage({type: ModalType.Error, title: response.error, text: response.message});
	};

	const onLoadSuccess = (response: {[key: string]: any}) => {
		setAuction(response.entity);
		// tslint:disable-next-line:no-console
		console.log(response.entity);
	};

	const init = () => {
		if (id === null) {
			setAuction({});
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
			<p>Category: {auction.category.name}</p>
			<p>
				Seller: {auction.seller.firstName} {auction.seller.lastName}
			</p>
			<p>Product state: {auction.productState}</p>
			<p>Quantity: {auction.quantity}pcs</p>
			<p>Auction state: {auction.auctionState}pcs</p>
			{auction.winner && (
				<p>
					Winner: {auction.winner.firstName} {auction.winner.lastNamex}
				</p>
			)}
			<Image src="img/rum-bottle.jpg" float-right width={250} />
			<p className="mt-3">
				<Link to="/">Back</Link>
			</p>

			{modalMessage && <Modal message={modalMessage} />}
		</Container>
	);
};

export default AuctionDetail;

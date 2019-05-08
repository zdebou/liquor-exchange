import React, {FC, useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {Collection, loadDocuments, ISortParams} from '../../client/actions';
import Carousel from 'react-bootstrap/Carousel';
import {Modal, ModalType, IModalMessage} from '../../components/Modal';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';

const AuctionsSlider: FC<RouteChildrenProps> = ({history}) => {
	const [rows, setRows] = useState<Array<{[key: string]: any}> | null>(null);
	const [modalMessage, setModalMessage] = useState<IModalMessage | null>(null);

	const seeOtherAuctions = () => {
		history.push('/auctions');
	};

	const bidNow = id => {
		history.push('/auction/' + id);
	};

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
			page: 0,
		}).then(onLoadSuccess, onFail);
	};

	useEffect(fetchAuctions, []);

	let items;

	if (rows != null && rows.length > 0) {
		items = rows.map((row, index) => (
			<Carousel.Item className="text-light text-center" key={index}>
				<div className="px-5">
					<h2 className="h3-responsive">{row.name}</h2>
					<p>
						<span className="text-muted">Origin:</span> {row.country.name},{' '}
						<span className="text-muted">Description:</span> {row.description}
					</p>
					<p />
					<span className="text-muted">Current price:</span>
					<h3>{row.lastValue.toLocaleString()} CZK</h3>
					<ButtonGroup>
						<Button label="Bid now!" variant="light" onClick={() => bidNow(row.id)} />{' '}
						or{' '}
						<Button
							label="See other auctions"
							variant="light"
							onClick={seeOtherAuctions}
						/>
					</ButtonGroup>
				</div>
			</Carousel.Item>
		));
	} else {
		items = [];
	}

	return <Carousel className="p-5 mb-5 bg-dark rounded">{items.map(item => item)}</Carousel>;
};

export default withRouter(AuctionsSlider);

import React, {FC, useEffect, useState} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';
import * as yup from 'yup';

import {Collection, loadDocument, insertDocument, updateDocument} from '../../client/actions';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Form from '../../components/Form';
import Input from '../../components/Input';
import SelectDocument from '../../components/SelectDocument';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';
import {Modal, ModalType, IModalMessage} from '../../components/Modal';

const AUCTION_SCHEMA = yup.object({
	name: yup.string().required('Name cannot be empty'),
});

const AuctionDetail: FC<RouteChildrenProps<{id: string}>> = ({match, history}) => {
	const id = !match || match.params.id === 'new' ? null : match.params.id;
	const [auction, setAuction] = useState<object | null>(null);
	const [modalMessage, setModalMessage] = useState<IModalMessage | null>(null);

	const onFail = (response: {[key: string]: any}) => {
		setModalMessage({type: ModalType.Error, title: response.error, text: response.message});
	};

	const onSaveSuccess = () => {
		history.push('/');
	};

	const onLoadSuccess = (response: {[key: string]: any}) => {
		setAuction(response.entity);
	};

	const init = () => {
		if (id === null) {
			setAuction({});
		} else {
			loadDocument(Collection.Auctions, id).then(onLoadSuccess, onFail);
		}
	};

	const handleSubmit = async (data: object) => {
		if (id === null) {
			await insertDocument(Collection.Auctions, data).then(onSaveSuccess, onFail);
		} else {
			await updateDocument(Collection.Auctions, data, id).then(onSaveSuccess, onFail);
		}
	};

	useEffect(init, []);

	if (auction === null) {
		return <Container>Loading...</Container>;
	}

	return (
		<Container>
			<Heading>Auction</Heading>
			<Form schema={AUCTION_SCHEMA} onSubmit={handleSubmit} initialValues={auction}>
				<Input id="name" label="Name" />
				<SelectDocument
					id="countryCode"
					label="Country"
					collection={Collection.Countries}
					idFieldName="code"
					labelFieldName="name"
				/>
				<ButtonGroup>
					<Button label="Save" type="submit" primary />
				</ButtonGroup>
			</Form>
			<p className="mt-3">
				<Link to="/">Back</Link>
			</p>
			{modalMessage && <Modal message={modalMessage} />}
		</Container>
	);
};

export default AuctionDetail;

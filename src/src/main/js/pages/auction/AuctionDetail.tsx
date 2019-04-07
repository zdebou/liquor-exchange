import React, {FC, useEffect, useState} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';
import * as yup from 'yup';

import {Collection, loadDocument, insertDocument, updateDocument} from '../../client/actions';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import SelectDocument from '../../components/SelectDocument';
import Button from '../../components/Button';

const AUCTION_SCHEMA = yup.object().shape({
	name: yup.string().required('Name cannot be empty'),
});

const AuctionDetail: FC<RouteChildrenProps<{id: string}>> = ({match, history}) => {
	const id = match.params.id === 'new' ? null : match.params.id;
	const [auction, setAuction] = useState(null);

	const init = () => {
		if (id === null) {
			setAuction({});
		} else {
			loadDocument(Collection.Auctions, id).then(response => setAuction(response.entity));
		}
	};

	const handleSubmit = async (data: object) => {
		if (id === null) {
			await insertDocument(Collection.Auctions, data);
		} else {
			await updateDocument(Collection.Auctions, data, id);
		}
		setAuction(data);
		history.push('/');
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
				<FormGroup>
					<Button label="Save" type="submit" primary />
				</FormGroup>
			</Form>
			<Link to="/">Back</Link>
		</Container>
	);
};

export default AuctionDetail;

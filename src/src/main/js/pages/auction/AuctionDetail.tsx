import React, {FC, useEffect, useState} from 'react';
import {RouteChildrenProps} from 'react-router';
import {Link} from 'react-router-dom';

import {Collection, loadDocument, insertDocument, updateDocument} from '../../client/actions';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

const AuctionDetail: FC<RouteChildrenProps<{id: string}>> = ({match, history}) => {
	const id = match.params.id === 'new' ? null : match.params.id;
	const [auction, setAuction] = useState(null);

	const init = () => {
		if (id === null) {
			setAuction({auction: {}});
		} else {
			loadDocument(Collection.Auctions, id).then(response => setAuction(response.entity));
		}
	};

	const handleSubmit = async () => {
		if (id === null) {
			await insertDocument(Collection.Auctions, auction);
		} else {
			await updateDocument(Collection.Auctions, auction, id);
		}
		history.push('/');
	};

	useEffect(init, []);

	if (auction === null) {
		return <Container>Loading...</Container>;
	}

	return (
		<Container>
			<Heading>Auction</Heading>
			<Form onSubmit={handleSubmit}>
				<FormGroup label="Name">
					<Input type="text" placeholder="Name" dataContext={auction} dataMember="name" />
				</FormGroup>
				<FormGroup label="Country">
					<Select
						dataContext={auction}
						dataMember="country_code"
						collection={Collection.Countries}
						idFieldName="code"
						labelFieldName="name"
					/>
				</FormGroup>
				<FormGroup>
					<Button label="Save" type="submit" primary />
				</FormGroup>
			</Form>
			<Link to="/">Back</Link>
		</Container>
	);
};

export default AuctionDetail;

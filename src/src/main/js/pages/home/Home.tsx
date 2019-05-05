import React, {FC, useState} from 'react';
import {RouteChildrenProps} from 'react-router';

import {logIn} from '../../client/actions';
import {useStore} from '../../client/store';
import Container from '../../components/Container';
import Box from '../../components/Box';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';

import AuctionsSlider from './AuctionsSlider';
import ActiveAuctions from './ActiveAuctions';
import OurOffer from './OurOffer';

const Home: FC<RouteChildrenProps> = ({history}) => {
	const loggedUser = useStore(state => state.auth.user);

	const createAccount = () => {
		history.push('/signup');
	};

	const myAuctions = () => {
		history.push('/my/auctions');
	};

	return (
		<Container>
			<AuctionsSlider />
			<ActiveAuctions />
			<OurOffer />
			<div className="mt-4 text-center">
				{loggedUser ? (
					<Button onClick={myAuctions} label="See my auctions" />
				) : (
					<Button onClick={createAccount} label="Create account" />
				)}
			</div>
		</Container>
	);
};

export default Home;

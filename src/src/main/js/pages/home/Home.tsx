import React, {FC, useState} from 'react';
import {Redirect} from 'react-router';

import {logIn} from '../../client/actions';
import {useStore} from '../../client/store';
import Container from '../../components/Container';
import Box from '../../components/Box';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';

import AuctionsScroller from './AuctionsScroller';
import ActiveAuctions from './ActiveAuctions';
import OurOffer from './OurOffer';

const Home: FC = () => {
	const loggedUser = useStore(state => state.auth.user);

	return (
		<Container>
			<AuctionsScroller />
			<ActiveAuctions />
			<OurOffer />
		</Container>
	);
};

export default Home;

import React, {FC} from 'react';
import {RouteChildrenProps} from 'react-router';

import {useStore} from '../../client/store';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Table from '../../components/Table';
import Button from '../../components/Button';

const Profile: FC<RouteChildrenProps> = ({history}) => {
	const loggedUser = useStore(state => state.auth.user);

	const href = (path: string) => () => history.push(path);

	const user = {
		firstName: 'Lorem',
		lastName: 'Ipsum',
		totalAuctions: 13,
		runningAuctions: 4,
	};

	const auctions = [
		{
			id: 1,
			time: '3d 8h 20m',
			name: 'gtrgr',
			highestBid: '9 864 CZK',
		},
		{
			id: 2,
			time: '3d 8h 20m',
			name: 'rgrtg',
			highestBid: '19 864 CZK',
		},
		{
			id: 3,
			time: '3d 8h 20m',
			name: 'grtgr',
			highestBid: '9 864 CZK',
		},
		{
			id: 4,
			time: '3d 8h 20m',
			name: 'nghnghn',
			highestBid: '19 864 CZK',
		},
	];

	if (!loggedUser) {
		return (
			<Container>
				<div className="mt-5 text-center">
					<Heading>Seller Name</Heading>
					<p>For seeing seller profile you must be signed in.</p>
					<p className="mt-5 mb-5">
						<Button label="Sign In" size="lg" primary onClick={href('/login')} />
						<span style={{display: 'inline-block', minWidth: '3em'}}>or</span>
						<Button label="Sign Up" size="lg" primary onClick={href('/signup')} />
					</p>
				</div>
			</Container>
		);
	}

	return (
		<Container>
			<Heading>User</Heading>
			<p>
				<strong>First name:</strong> {user.firstName}
				<br />
				<strong>Last name:</strong> {user.lastName}
				<br />
				<strong>Number of auctions:</strong> {user.totalAuctions}
				<br />
				<strong>Number of running auctions:</strong> {user.runningAuctions}
			</p>
			<Table
				caption="Running Auctions"
				data={auctions}
				cols={[{title: 'Time to end'}, {title: 'Name'}, {title: 'Highest bid'}]}
				emptyMessage="No auctions available."
				compact
			>
				{auction => (
					<tr key={auction.id}>
						<td>{auction.time}</td>
						<td>{auction.name}</td>
						<td>{auction.highestBid}</td>
					</tr>
				)}
			</Table>
		</Container>
	);
};

export default Profile;

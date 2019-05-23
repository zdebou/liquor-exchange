import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import {StoreProvider} from 'easy-peasy';

import 'bootstrap/dist/css/bootstrap.min.css';

import {fetchUser} from './client/actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import {getCookie} from './utils/cookies';
import store, {useStore} from './client/store';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import AuctionList from './pages/auction/AuctionList';
import AuctionDetail from './pages/auction/AuctionDetail';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import SignUp from './pages/auth/SignUp';
import Profile from './pages/user/Profile';
import ProfileEditor from './pages/user/ProfileEditor';
import PasswordChange from './pages/user/PasswordChange';

const Header: FC = () => {
	const auth = useStore(state => state.auth);
	let loggedUser = auth.user;

	if (!loggedUser) {
		const token = getCookie('user-token');
		if (token) {
			fetchUser(token);
			loggedUser = auth.user;
		}
	}

	return (
		<Navbar
			brand="Liquor Exchange"
			menu={
				loggedUser
					? [
							{label: loggedUser.displayName, href: '/me'},
							{label: 'Sign Out', href: '/logout'},
					  ]
					: [{label: 'Sign In', href: '/login'}, {label: 'Sign Up', href: '/signup'}]
			}
		/>
	);
};

const Routes: FC = () => (
	<>
		<Route path="/" exact component={Home} />
		<Route path="/auctions" component={AuctionList} />
		<Route path="/auction/:id" component={AuctionDetail} />
		<Route path="/login" component={Login} />
		<Route path="/logout" component={Logout} />
		<Route path="/signup" component={SignUp} />
		<Route path="/user/:id" component={Profile} />
		<Route path="/me" component={ProfileEditor} />
		<Route path="/my/password" component={PasswordChange} />
	</>
);

const Footer: FC = () => {
	const loggedUser = useStore(state => state.auth.user);

	return (
		<Container className="mt-5">
			<hr />
			<Row>
				<Col>
					<p>
						<NavLink to="/">Home</NavLink>
					</p>
					<p>
						<NavLink to="/auctions">Active auctions</NavLink>
					</p>
				</Col>
				<Col>
					<div>
						<p>
							<strong>Contact</strong>
						</p>
						<hr />
						<p>
							email:{' '}
							<a href="mailto:info@liquor-exchange.com">info@liquor-exchange.com</a>
						</p>
						<p>mobile: +420 666 666 666</p>
					</div>
				</Col>
				<Col>
					<div>
						<p>
							<strong>Address</strong>
						</p>
						<hr />
						<address>
							Address 16
							<br />
							Town
							<br />
							Country
						</address>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

const App: FC = () => (
	<StoreProvider store={store}>
		<Router>
			<Header />
			<Routes />
			<Footer />
		</Router>
	</StoreProvider>
);

ReactDOM.render(<App />, document.getElementById('react'));

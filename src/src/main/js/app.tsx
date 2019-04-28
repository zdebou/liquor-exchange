import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import {StoreProvider} from 'easy-peasy';

import 'bootstrap/dist/css/bootstrap.min.css';

import store, {useStore} from './client/store';
import Navbar from './components/Navbar';
import AuctionList from './pages/auction/AuctionList';
import AuctionDetail from './pages/auction/AuctionDetail';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import SignUp from './pages/auth/SignUp';
import Profile from './pages/user/Profile';
import ProfileEditor from './pages/user/ProfileEditor';
import PasswordChange from './pages/user/PasswordChange';

const Header: FC = () => {
	const loggedUser = useStore(state => state.auth.user);

	return (
		<Navbar
			brand="Liquor Exchange"
			menu={
				loggedUser
					? [{label: loggedUser.email, href: '/me'}, {label: 'Sign Out', href: '/logout'}]
					: [{label: 'Sign In', href: '/login'}, {label: 'Sign Up', href: '/signup'}]
			}
		/>
	);
};

const Routes: FC = () => (
	<>
		<Route path="/" exact component={AuctionList} />
		<Route path="/auction/:id" component={AuctionDetail} />
		<Route path="/login" component={Login} />
		<Route path="/logout" component={Logout} />
		<Route path="/signup" component={SignUp} />
		<Route path="/user/:id" component={Profile} />
		<Route path="/me" component={ProfileEditor} />
		<Route path="/my/password" component={PasswordChange} />
	</>
);

const App: FC = () => (
	<StoreProvider store={store}>
		<Router>
			<Header />
			<Routes />
		</Router>
	</StoreProvider>
);

ReactDOM.render(<App />, document.getElementById('react'));

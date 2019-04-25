import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import AuctionList from './pages/auction/AuctionList';
import AuctionDetail from './pages/auction/AuctionDetail';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

import 'bootstrap/dist/css/bootstrap.min.css';

const App: FC = () => (
	<Router>
		<Navbar
			brand="Liquor Exchange"
			menu={[{label: 'Sign In', href: '/login'}, {label: 'Sign Up', href: '/signup'}]}
		/>
		<Route path="/" exact component={AuctionList} />
		<Route path="/auction/:id" component={AuctionDetail} />
		<Route path="/login" component={Login} />
		<Route path="/signup" component={SignUp} />
	</Router>
);

ReactDOM.render(<App />, document.getElementById('react'));

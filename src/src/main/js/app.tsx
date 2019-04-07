import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import AuctionList from './pages/auction/AuctionList';
import AuctionDetail from './pages/auction/AuctionDetail';
import Login from './pages/auth/Login';

import 'bootstrap/dist/css/bootstrap.min.css';

const App: FC = () => (
	<Router>
		<Navbar brand="Liquor Exchange" menu={[{label: 'Log In', href: '/login'}]} />
		<Route path="/" exact component={AuctionList} />
		<Route path="/auction/:id" component={AuctionDetail} />
		<Route path="/login" component={Login} />
	</Router>
);

ReactDOM.render(<App />, document.getElementById('react'));

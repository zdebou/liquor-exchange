import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import AuctionList from './pages/auction/AuctionList';
import AuctionDetail from './pages/auction/AuctionDetail';

import 'bootstrap/dist/css/bootstrap.min.css';

const App: FC = () => (
	<>
		<Navbar brand="Liquor Exchange" />
		<Router>
			<Route path="/" exact component={AuctionList} />
			<Route path="/auction/:id" component={AuctionDetail} />
		</Router>
	</>
);

ReactDOM.render(<App />, document.getElementById('react'));

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./classes/client');

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuctionList from './pages/auction/AuctionList';
import AuctionDetail from './pages/auction/AuctionDetail';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
	    <Router>
				<Route path="/" exact component={AuctionList} />
        <Route path="/auction/:id" component={AuctionDetail} />
			</Router>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)

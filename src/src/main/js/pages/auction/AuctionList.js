'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('../../classes/client');

import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from '../../components/Button.js';

class AuctionList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {auctions: []};
		this.onAddAuction = this.onAddAuction.bind(this);
	}

	loadAuctions() {
		client({method: 'GET', path: '/api/auctions'}).done(response => {
			this.setState({auctions: response.entity._embedded.auctions});
		});
	}

	componentDidMount() {
		this.loadAuctions();
	}

	onAddAuction() {
        this.props.history.push({
            pathname: '/auction',
            state: { auction_href: null }
        });
	}

	render() {
		if (this.state.auctions == null) {
			return (
				<div>Loading...</div>
			)
		} else {
			const data = this.state.auctions.map(auction =>
				<tr key={auction._links.self.href} >
					<td>
						<Link to={{
							pathname: '/auction',
							state: { auction_href: auction._links.self.href }
						}}>
							{auction.name}
						</Link>
					</td>
					<td>{auction.name}</td>
				</tr>
			);
			return (
	            <div>
	                <table>
	                    <thead>
	                        <tr>
	                            <th>Auction name</th>
	                            <th>Country</th>
	                        </tr>
	                    </thead>
	                    <tbody>
	                        {data}
	                    </tbody>
	                </table>
	                <Button label="Add auction" onClick={this.onAddAuction} />
	            </div>
			)
		}
	}
}

export default withRouter(AuctionList)
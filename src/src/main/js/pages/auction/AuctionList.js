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
		this.state = {rows: []};
		this.onAddAuction = this.onAddAuction.bind(this);
	}

	loadAuctions() {
		client({method: 'GET', path: '/api/views/auctions'}).done(response => {
		    console.log(response);
			this.setState({rows: response.entity});
		});
	}

	componentDidMount() {
		this.loadAuctions();
	}

	onAddAuction() {
        this.props.history.push({
            pathname: '/auction',
            state: { auction_id: null }
        });
	}

	render() {
		if (this.state.rows == null) {
			return (
				<div>Loading...</div>
			)
		} else {
		    console.log(this.state.rows);
			const data = this.state.rows.map(row =>
				<tr key={row.auction.id} >
					<td>
						<Link to={{
							pathname: '/auction',
							state: { auction_id: row.auction.id }
						}}>
							{row.auction.name}
						</Link>
					</td>
					<td>{row.country.name}</td>
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
'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('../../classes/client');

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from '../../components/Button.js';

export default class AuctionList extends React.Component{
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

  }

	render() {
		const data = this.state.auctions.map(auction =>
	    <tr key={auction._links.self.href} >
        <td><Link to="/auction/{auction._id}">{auction.name}</Link></td>
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

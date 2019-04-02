'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('../../classes/client');

import { withRouter } from "react-router";
import Button from '../../components/Button.js';
import Input from '../../components/Input.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AuctionDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {auction: null};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.insertAuction = this.insertAuction.bind(this);
		this.updateAuction = this.updateAuction.bind(this);
	}

	loadAuction(id) {
		client({method: 'GET', path: '/api/auctions/' + id}).done(response => {
			this.setState({auction: response.entity});
		});
	}

	componentDidMount() {
	    if (this.props.location.state.auction_id == null) {
	        // creating new auction
            this.setState({auction: {name: ''}});
        } else {
            this.loadAuction(this.props.location.state.auction_id);
        }
	}

	handleSubmit() {
	    if (this.props.location.state.auction_id == null) {
            this.insertAuction(this.state.auction);
	    } else {
            this.updateAuction(this.state.auction, this.props.location.state.auction_id);
	    }
	}

	insertAuction(auction) {
		return client({
			method: 'POST',
			path: '/api/auctions',
			entity: auction,
			headers: {'Content-Type': 'application/json'}
		}).done((result) => {
			this.props.history.push('/')
		});
	}

	updateAuction(auction, id) {
        return client({
            method: 'PUT',
            path: '/api/auctions/' + id,
            entity: auction,
            headers: {'Content-Type': 'application/json'}
        }).done((result) => {
            this.props.history.push('/')
        });
    }

	render() {
		if (this.state.auction == null) {
			return (
				<div>Loading...</div>
			)
		} else {
			return (
				<div>
					<form>
						<Input type="text" placeholder="Name" dataContext={this.state.auction} dataMember="name" />
						<Button onClick={this.handleSubmit} label="Save" />
					</form>
					<Link to="/">Back</Link>
				</div>
			)
		}
	}

}

export default withRouter(AuctionDetail)

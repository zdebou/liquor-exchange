'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('../../classes/client');

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class AuctionDetail extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.onCreateTest = this.onCreateTest.bind(this);
		this.reloadTests = this.reloadTests.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newTest = {};
		newTest['tst'] = ReactDOM.findDOMNode(this.refs["tst"]).value.trim();
		this.props.onCreate(newTest);
    ReactDOM.findDOMNode(this.refs['tst']).value = '';
		window.location = "#";
	}

  onCreateTest(newTest) {
      return client({
          method: 'POST',
          path: '/api/myTests',
          entity: newTest,
          headers: {'Content-Type': 'application/json'}
      }).done((result) => {
          this.reloadTests();
      });
  }

	render() {
		return (
			<div>
        <form>
          <input type="text" placeholder="test" ref="tst" />
          <button onClick={this.handleSubmit}>Create</button>
        </form>
			</div>
		)
	}

}

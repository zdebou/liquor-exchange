'use strict';

const React = require('react');

export default class Button extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
    if (typeof this.props.onClick == 'function') {
      this.props.onClick();
    }
	}

	render() {
		return (
		   <button onClick={this.handleClick}>{this.props.label}</button>
		)
	}

}

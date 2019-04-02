'use strict';

const React = require('react');

export default class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: this.getValue()};
		this.onChange = this.onChange.bind(this);
	}

	getValue() {
        return this.props.dataContext[this.props.dataMember];
    }

    setValue(value) {
        this.props.dataContext[this.props.dataMember] = value;
        this.setState({value: value});
    }

	onChange(e) {
	    this.setValue(e.target.value);
	}

	render() {
		return (
		    <input type={this.props.type} placeholder={this.props.placeholder || ''} value={this.state.value} onChange={this.onChange} />
		)
	}

}


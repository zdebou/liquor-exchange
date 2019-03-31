'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {tests: []};
		this.onCreateTest = this.onCreateTest.bind(this);
		this.reloadTests = this.reloadTests.bind(this);
	}

    reloadTests() {
        client({method: 'GET', path: '/api/myTests'}).done(response => {
            this.setState({tests: response.entity._embedded.myTests});
        });
    }

	componentDidMount() {
		this.reloadTests();
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
			    <MyList tests={this.state.tests} />
			    <CreateTest onCreate={this.onCreateTest}/>
			</div>
		)
	}
}

class CreateTest extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newTest = {};
		newTest['tst'] = ReactDOM.findDOMNode(this.refs["tst"]).value.trim();
		this.props.onCreate(newTest);
        ReactDOM.findDOMNode(this.refs['tst']).value = '';
		window.location = "#";
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

class MyList extends React.Component{
	render() {
		const data = this.props.tests.map(t =>
		    <tr key={t._links.self.href} >
		        <td>{t.id}</td>
		        <td>{t.tst}</td>
		    </tr>
		);
		return (
			<table>
			    <thead>
			        <tr>
			            <th>id</th>
			            <th>tst</th>
			        </tr>
			    </thead>
			    <tbody>
			        {data}
			     </tbody>
			</table>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
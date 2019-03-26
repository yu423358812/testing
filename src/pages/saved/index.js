import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';

class Saved extends PureComponent {
	render() {
		return (
			<div>Hello world</div>
		)
	}

}

const mapState = (state) => ({
	
});

const mapDispatch = (dispatch) => ({
	
});

export default connect(mapState, mapDispatch)(Saved);

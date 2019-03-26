import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	selectedPage: 'home'
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_PAGE:
			return state.set('selectedPage', action.selectedPage);
		default:
			return state;
	}
}
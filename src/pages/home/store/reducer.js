import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	lat: 40.6944277, 
	lng: -73.9845459,
	mLat: 40.6944277, 
	mLng: -73.9845459
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.SEARCH_PLACE:
			return state.merge({
				lat: action.latTemp,
				lng: action.lngTemp,
				mLat: action.latTemp,
				mLng: action.lngTemp
			});
		case constants.PLACE_MARKER:
			return state.merge({
				mLat: action.latTemp,
				mLng: action.lngTemp
			});
		default:
			return state;
	}
}
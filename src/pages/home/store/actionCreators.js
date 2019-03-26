import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

export const searchPlace = (latTemp, lngTemp) => ({
	type: constants.SEARCH_PLACE,
    latTemp, 
    lngTemp
});

export const placeMarker = (latTemp, lngTemp) => ({
	type: constants.PLACE_MARKER,
    latTemp, 
    lngTemp
});
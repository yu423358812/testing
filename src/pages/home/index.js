import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import 'antd/dist/antd.css';
import Geosuggest from 'react-geosuggest';
import {
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";
import { Row, Col, Button }  from 'antd';
import { 
	HomeWrapper,
	GoogleSearchMap
} from './style';

const MapWithAMarker = withGoogleMap(props =>
	<GoogleMap
		defaultZoom={12}
		defaultCenter={{ lat: props.lat, lng: props.lng }}
		onClick={props.placeMarker}
	>
		<Marker
		position={{ lat: props.mLat, lng: props.mLng }}
		/>
	</GoogleMap>
);

class Home extends PureComponent {

	latTemp = 0;
	lngTemp = 0;

	onSuggestSelect = (place) => {
		if(place){
			this.latTemp = place.location.lat;
			this.lngTemp = place.location.lng;
			this.props.searchPlace(this.latTemp, this.lngTemp);
		}
	}

	render() {
		return (
			<HomeWrapper>
				<Row type="flex" justify="center" align="middle">
					<Col xs={19} sm={19} md={8}>
						<Geosuggest
							placeholder="Search Place"
							initialValue=""
							onSuggestSelect={this.onSuggestSelect}
							location={new window.google.maps.LatLng(40.6944277 -73.9845459)}
							country={['us']}
							radius={20} 
						/>
					</Col>
					<Col xs={5} sm={5} md={3}>
						<Button type="primary" icon="search" className='searchBtn' onClick={() => this.props.searchPlace(this.latTemp, this.lngTemp)}>Search</Button>
					</Col>
				</Row>
				<GoogleSearchMap>
					<MapWithAMarker
						containerElement={<div style={{ height: `80vh` }} />}
						mapElement={<div style={{ height: `100%` }} />}
						lat = { this.props.lat }
						lng = { this.props.lng }
						mLat = { this.props.mLat }
						mLng = { this.props.mLng }
						placeMarker = {this.props.placeMarker}
					/>
				</GoogleSearchMap>
				<div>{this.props.lat}</div>
				<div>{this.props.lng}</div>
				<div>{this.props.mLat}</div>
				<div>{this.props.mLng}</div>
			</HomeWrapper>
		)
	}
	componentDidMount() {
		console.log(this.props.lat, this.props.lng);
		console.log(this.props.mLat, this.props.mLng);
		navigator.geolocation.getCurrentPosition(this.props.foundCurPlace, this.showError);
		console.log(new window.google.maps.LatLngBounds());
	}

	componentDidUpdate(){
		
	}

}

const mapStateToProps = (state) => ({
	lat: state.getIn(['home', 'lat']),
	lng: state.getIn(['home', 'lng']),
	mLat: state.getIn(['home', 'mLat']),
	mLng: state.getIn(['home', 'mLng'])
})

const mapDispathToProps = (dispatch) => {
	return {
		searchPlace(latTemp, lngTemp){
			console.log(latTemp, lngTemp);
			dispatch(actionCreators.searchPlace(latTemp, lngTemp));
		},
		foundCurPlace(place){
			dispatch(actionCreators.searchPlace(place.coords.latitude, place.coords.longitude));
		},
		showError(){
			console.log(Error);
		},
		placeMarker(e){
			console.log(e);
			dispatch(actionCreators.placeMarker(e.latLng.lat(), e.latLng.lng()));
		}
	}
};

export default connect(mapStateToProps, mapDispathToProps)(Home);

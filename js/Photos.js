/** @format */

import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { appStyles } from '../Styles';
import { connect } from 'react-redux';
import { fetchPhotos } from '../store/photos';

export class Photos extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchPhotos();
	}

	render() {
		console.log('photos', this.props.photos);
		return (
			<View style={appStyles.individualMenu}>
				<Text style={appStyles.centerText}>Photo Gallery</Text>

				<View>
					{this.props.photos.map((photo) => {
						return (
							<Image
								key={this.props.photos.indexOf(photo)}
								source={{ uri: photo.path }}
								style={{ width: 40, height: 40 }}
							/>
						);
					})}
				</View>
			</View>
		);
	}
}

const mapState = (state) => {
	return {
		photos: state.photos,
		user: state.user,
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchPhotos: () => dispatch(fetchPhotos()),
	};
};

export default connect(mapState, mapDispatch)(Photos);

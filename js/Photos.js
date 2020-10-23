/** @format */

import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { appStyles } from '../Styles';
import { connect } from 'react-redux';
import { fetchPhotos, deletePhoto } from '../store/photos';

export class Photos extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchPhotos();
	}

	render() {
		return (
			<View style={appStyles.individualMenu}>
				<Text style={appStyles.centerText}>Photo Gallery</Text>

				<View>
					{this.props.photos.map((photo) => {
						return (
							<View key={photo.id}>
								<Image
									source={{ uri: photo.path }}
									style={{ width: 40, height: 40 }}
								/>
								<TouchableOpacity
									onPress={() => {
										this.props.deletePhoto(photo.id);
									}}
								>
									<Text>delete</Text>
								</TouchableOpacity>
							</View>
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
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchPhotos: () => dispatch(fetchPhotos()),
		deletePhoto: (id) => dispatch(deletePhoto(id)),
	};
};

export default connect(mapState, mapDispatch)(Photos);

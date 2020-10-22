/** @format */

import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { appStyles } from '../Styles';
import CameraRoll from '@react-native-community/cameraroll';
import { connect } from 'react-redux';

export class Photos extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('user pics in db', this.props.user.photos);
		console.log('photos', this.props.photos);
		return (
			<View style={appStyles.individualMenu}>
				<Text style={appStyles.centerText}>Photo Gallery</Text>

				<View>
					{this.props.photos.map((photo) => {
						return (
							<Image
								key={this.props.photos.indexOf(photo)}
								source={{ uri: photo }}
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

export default connect(mapState)(Photos);

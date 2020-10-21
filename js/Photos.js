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

	// async componentDidMount() {
	// 	try {
	// 		await CameraRoll.getPhotos({
	// 			first: 20,
	// 			assetType: 'Photos',
	// 		});
	// 		this.setState({
	// 			photos: r.edges,
	// 		});
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

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
	};
};

export default connect(mapState)(Photos);

import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { appStyles } from '../Styles';
import { connect } from 'react-redux';

export class Photos extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={appStyles.individualMenu}>
				<Text style={appStyles.centerText}>Photo Gallery</Text>
				{this.props.photos.length ? (
					this.props.photos.map((photo) => <Image src={photo} />)
				) : (
					<Text style={appStyles.centerText}>No photos in your gallery!</Text>
				)}
				<Text style={appStyles.centerText}>
					Photos will eventually be here.
				</Text>
				<Text style={appStyles.centerText}>Thank you for your support</Text>
			</View>
		);
	}
}
// connect to redux
const mapState = (state) => {
	return {
		photos: state.photos,
	};
};

export default connect(mapState)(Photos);

/** @format */

import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import App from '../App';

class HomeAndroid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pressed: false,
		};
	}

	render() {

		return (
			<View style={styles.container}>
				{!this.state.pressed ? (
					<View>
						<Text>Welcome back, {this.props.user.email}!</Text>
						<Image
							style={styles.image}
							source={{ uri: this.props.user.imageUrl }}
						/>

						<Text>
							Your dog:{' '}
							{this.props.user.dog ? this.props.user.dog.name : 'cody'}
						</Text>
						{this.props.user.dog ? (
							<Image
								style={styles.image}
								source={{ uri: this.props.user.dog.imageUrl }}
							/>
						) : (
							<Text>No image</Text>
						)}

						<Text>Are these settings ok?</Text>
						<TouchableOpacity onPress={() => this.setState({ pressed: true })}>
							<Text>Yes!</Text>
						</TouchableOpacity>
					</View>
				) : (
					<App />
				)}
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		width: width,
		height: height,
		flexDirection: 'column',
		alignItems: 'center',
	},
	titleText: {
		paddingTop: 30,
		paddingBottom: 20,
		color: '#000',
		textAlign: 'center',
		fontSize: 25,
	},
	image: {
		width: 66,
		height: 58,
	},
});

// connect to redux
const mapState = (state) => {
	return {
		user: state.user,
	};
};

// const mapDispatch = (dispatch) => {
// 	return {
// 		me: () => dispatch(me()),
// 	};
// };

export default connect(mapState)(HomeAndroid);

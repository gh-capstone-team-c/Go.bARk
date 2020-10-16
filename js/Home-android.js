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
			dogName: '',
		};
	}

	render() {
		// console.log('dog in component', this.props.user.dog);
		return (
			<View style={styles.container}>
				{!this.state.pressed ? (
					<View>
						<Text>Welcome back, {this.props.user.email}!</Text>
						<Image
							style={styles.image}
							source={{ uri: this.props.user.imageUrl }}
						/>

						{this.props.user.dog ? (
							<Text>Your Dog: {this.props.user.dog.name}</Text>
						) : (
							<View>
									<TextInput
										style={styles.input}
									type="text"
									placeholder="dog name"
									onChangeText={(dogName) => {
										this.setState({ dogName });
										this.forceUpdate();
									}}
									value={this.state.dogName}
								/>
								<TouchableOpacity
									onPress={() => {
										this.props.myDog({ name: this.state.dogName });
									}}
								>
									<Text>Add my dog!</Text>
								</TouchableOpacity>
							</View>
						)}

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
					<AppIos />
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
	input: {
		margin: 15,
		height: 40,
		borderColor: '#7a42f4',
		borderWidth: 1,
		width: 250,
		padding: 10,
	},
});

// connect to redux
const mapState = (state) => {
	return {
		user: state.user,
	};
};

//this is associating the dog to the user but it isn't updating on state
const mapDispatch = (dispatch) => {
	return {
		myDog: (obj) => dispatch(myDog(obj)),
	};
};

export default connect(mapState, mapDispatch)(HomeAndroid);

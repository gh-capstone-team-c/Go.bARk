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
import { appStyles } from '../Styles';

class HomeAndroid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pressed: false,
		};
	}

	render() {
		return (
			<View>
				{!this.state.pressed ? (
					<View style={appStyles.homeContainer}>
						<Image
							style={appStyles.miniImage}
							source={{ uri: this.props.user.imageUrl }}
						/>
						<Text style={appStyles.homeGreeting}>
							Welcome back, {this.props.user.email}!
						</Text>
						<Text style={appStyles.homeText}>
							Your dog:{' '}
							{this.props.user.dog ? this.props.user.dog.name : 'cody'}
						</Text>
						{this.props.user.dog ? (
							<Image
								style={appStyles.miniImage}
								source={{ uri: this.props.user.dog.imageUrl }}
							/>
						) : (
							<Text style={appStyles.homeText}>No image</Text>
						)}
						<Text style={appStyles.homeText}>Are these settings ok?</Text>
						<TouchableOpacity
							onPress={() => this.setState({ pressed: true })}
							style={appStyles.rectButton}
						>
							<Text style={appStyles.buttonText}>Yes!</Text>
						</TouchableOpacity>
					</View>
				) : (
					<App />
				)}
			</View>
		);
	}
}

// connect to redux
const mapState = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapState)(HomeAndroid);

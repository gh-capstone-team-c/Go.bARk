/** @format */

import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import { login } from '../store/users';
import AppIos from '../App-ios';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
		};
	}

	render() {
		return (
			<View style={styles.container}>
				{!this.state.isLoggedIn ? (
					<View style={styles.inputContainer}>
						<TextInput style={styles.input} placeholder="email" />
						<TextInput style={styles.input} placeholder="password" />
						<TouchableOpacity
							onPress={() => {
								this.setState({ isLoggedIn: true });
							}}
						>
							<Text>Login</Text>
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
	input: {
		margin: 15,
		height: 40,
		borderColor: '#7a42f4',
		borderWidth: 1,
		width: 250,
		padding: 10,
	},
	inputContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		width: width,
		height: height,
		flexDirection: 'column',
		alignItems: 'center',
	},
});

// connect to redux
const mapState = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatch = (dispatch) => {
	return {
		login: (email, password) => dispatch(login(email, password)),
	};
};

export default connect(mapState, mapDispatch)(Login);

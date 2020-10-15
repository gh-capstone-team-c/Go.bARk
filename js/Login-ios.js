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
import { login, signup } from '../store/users';
import HomeIos from './Home-ios';

class LoginIos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			email: '',
			password: '',
		};
	}

	render() {
		return (
			<View style={styles.container}>
				{!this.state.isLoggedIn ? (
					<View style={styles.inputContainer}>
						<Text styles={styles.titleText}>go.bARk!</Text>
						<TextInput
							style={styles.input}
							type="text"
							onChangeText={(email) => this.setState({ email })}
							placeholder="email"
							value={this.state.email}
						/>
						<TextInput
							style={styles.input}
							type="password"
							placeholder="password"
							onChangeText={(password) => this.setState({ password })}
							value={this.state.password}
						/>
						<View styles={styles.options}>
							<TouchableOpacity
								onPress={() => {
									this.props.login(this.state.email, this.state.password);

									if (this.props.user) {
										this.setState({ isLoggedIn: true });
									}
								}}
							>
								<Text>Login</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									this.props.signup(this.state.email, this.state.password);

									if (this.props.user) {
										this.setState({ isLoggedIn: true });
									}
								}}
							>
								<Text>Sign up</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : (
					<HomeIos />
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
	options: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
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
		signup: (email, password) => dispatch(signup(email, password)),
	};
};

export default connect(mapState, mapDispatch)(LoginIos);

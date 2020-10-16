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
import { appStyles } from '../Styles';

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
			<View style={appStyles.containerApp}>
				{!this.state.isLoggedIn ? (
					<View style={appStyles.inputContainer}>
						<Text styles={appStyles.titleText}>go.bARk!</Text>
						<TextInput
							style={appStyles.input}
							type="text"
							onChangeText={(email) => this.setState({ email })}
							placeholder="email"
							value={this.state.email}
						/>
						<TextInput
							style={appStyles.input}
							type="password"
							placeholder="password"
							onChangeText={(password) => this.setState({ password })}
							value={this.state.password}
						/>
						<View style={appStyles.options}>
							<TouchableOpacity
								onPress={() => {
									if (
										this.state.email.trim() === '' ||
										this.state.password.trim() === ''
									) {
										return <Text>Email and password are required</Text>;
									} else {
										this.props.login(this.state.email, this.state.password);
									}
									if (this.props.user.email) {
										this.setState({ isLoggedIn: true });
									}
								}}
								style={appStyles.rectButton}
							>
								<Text style={appStyles.buttonText}>Login</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									if (
										this.state.email.trim() === '' ||
										this.state.password.trim() === ''
									) {
										return <Text>Email and password are required</Text>;
									} else {
										this.props.signup(this.state.email, this.state.password);
									}

									if (this.props.user) {
										this.setState({ isLoggedIn: true });
									}
								}}
								style={appStyles.rectButton}
							>
								<Text style={appStyles.buttonText}>Sign up</Text>
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

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
import HomeAndroid from './Home-android';
import { appStyles } from '../Styles';
import AwesomeAlert from 'react-native-awesome-alerts';

class LoginAndroid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			email: '',
			password: '',
			showAlert: false,
		};
	}

	showAlert = () => {
		this.setState({
			showAlert: true,
		});
	};

	hideAlert = () => {
		this.setState({
			showAlert: false,
		});
	};

	render() {
		const { showAlert } = this.state;
		return (
			<View style={appStyles.container}>
				{!this.state.isLoggedIn ? (
					<View style={appStyles.inputContainer}>
						<Text style={appStyles.titleText}>go.bARk!</Text>
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
								style={appStyles.rectButton}
								onPress={() => {
									this.props.login(this.state.email, this.state.password);

									//still debugging this
									this.props.user
										? this.setState({ isLoggedIn: true })
										: this.showAlert();
								}}
								style={appStyles.rectButton}
							>
								<Text style={appStyles.buttonText}>Login</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									this.props.signup(this.state.email, this.state.password);

									//still debugging this
									this.props.user
										? this.setState({ isLoggedIn: true })
										: this.showAlert();
								}}
								style={appStyles.rectButton}
							>
								<Text style={appStyles.buttonText}>Sign up</Text>
							</TouchableOpacity>
						</View>

						<AwesomeAlert
							show={showAlert}
							showProgress={false}
							title="Not Found"
							message="Invalid Email/Password!"
							closeOnTouchOutside={true}
							closeOnHardwareBackPress={false}
							showCancelButton={false}
							showConfirmButton={true}
							confirmText="Try Again"
							confirmButtonColor="#008080"
							onConfirmPressed={() => {
								this.hideAlert();
							}}
						/>
					</View>
				) : (
					<HomeAndroid />
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

export default connect(mapState, mapDispatch)(LoginAndroid);

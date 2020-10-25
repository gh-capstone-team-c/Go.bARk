/** @format */

import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { login, signup } from '../store/users';
import HomeAndroid from './Home-android';
import { appStyles } from '../Styles';
import AwesomeAlert from 'react-native-awesome-alerts';
import HowToPlay from './HowToPlay';

class LoginAndroid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			email: '',
			password: '',
			showAlert: false,
			howTo: false,
		};
		this.howTo = this.howTo.bind(this);
	}

	howTo() {
		this.setState({ howTo: !this.state.howTo });
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
		return this.state.howTo ? (
			<View style={appStyles.container}>
				<HowToPlay back={this.howTo} />
			</View>
		) : (
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
							secureTextEntry={true}
							placeholder="password"
							onChangeText={(password) => this.setState({ password })}
							value={this.state.password}
						/>
						<View style={appStyles.options}>
							<TouchableOpacity
								style={appStyles.rectButton}
								onPress={async () => {
									await this.props.login(this.state.email, this.state.password);

									if (this.props.user.id) {
										this.setState({ isLoggedIn: true });
									} else {
										this.showAlert();
									}
								}}
								style={appStyles.rectButton}
							>
								<Text style={appStyles.buttonText}>Login</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={async () => {
									await this.props.signup(
										this.state.email,
										this.state.password
									);

                  if (this.props.user.id) {
                    this.setState({ isLoggedIn: true });
                  } else {
                    this.showAlert();
                  }
                }}
                style={appStyles.rectButton}
              >
                <Text style={appStyles.buttonText}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.howTo}
                style={appStyles.howToButton}
              >
                <Text style={appStyles.buttonText}>How to Play</Text>
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

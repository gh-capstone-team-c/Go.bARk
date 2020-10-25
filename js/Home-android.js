/** @format */

import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
} from 'react-native';
import { connect } from 'react-redux';
import App from '../App';
import { appStyles } from '../Styles';
import { myDog } from '../store/users';
import RNPickerSelect from 'react-native-picker-select';
import AwesomeAlert from 'react-native-awesome-alerts';

class HomeAndroid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pressed: false,
			dogName: '',
			dogColor: 'red',
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
		return (
			<View>
				{!this.state.pressed ? (
					this.props.user.email ? (
						<View style={appStyles.homeContainer}>
							<Image
								style={appStyles.miniImage}
								source={{ uri: this.props.user.imageUrl }}
							/>
							<Text style={appStyles.homeGreeting}>
								Welcome back, {this.props.user.email}!
							</Text>

							{this.props.user.dog ? (
								<Text style={appStyles.homeText}>
									Your Dog: {this.props.user.dog.name}
								</Text>
							) : (
								<View style={appStyles.inputContainer}>
									<TextInput
										style={appStyles.input}
										type="text"
										placeholder="dog name"
										onChangeText={(dogName) => {
											this.setState({ dogName });
										}}
										value={this.state.dogName}
									/>
									<Text style={appStyles.homeText}>
										Choose dog's color: Red, Black/Tan, or Cream
									</Text>
									<RNPickerSelect
										value={this.state.dogColor}
										onValueChange={(value) => {
											this.setState({ dogColor: value });
										}}
										items={[
											{ label: 'Red', value: 'red' },
											{ label: 'Black & Tan', value: 'blackTan' },
											{ label: 'Cream', value: 'cream' },
										]}
										style={appStyles}
										placeholder={{}}
										useNativeAndroidPickerStyle={false}
									/>
									<TouchableOpacity
										style={appStyles.rectButton}
										onPress={() => {
											if (
												this.state.dogColor.trim() === '' ||
												this.state.dogName.trim() === ''
											) {
												this.showAlert();
											} else
												this.props.myDog({
													name: this.state.dogName,
													color: this.state.dogColor,
												});
										}}
									>
										<Text style={appStyles.buttonText}>Add my dog!</Text>
									</TouchableOpacity>
								</View>
							)}

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
								onPress={() => {
									if (this.props.user.dog) {
										this.setState({ pressed: true });
									} else {
										this.showAlert();
									}
								}}
								style={appStyles.rectButton}
							>
								<Text style={appStyles.buttonText}>Yes!</Text>
							</TouchableOpacity>
							<AwesomeAlert
								show={this.state.showAlert}
								showProgress={false}
								title="Not Found"
								message="Please fill out all your dog's details!"
								closeOnTouchOutside={true}
								closeOnHardwareBackPress={false}
								showCancelButton={false}
								showConfirmButton={true}
								confirmText="Try Again"
								confirmButtonColor="#008080"
								onConfirmPressed={() => {
									this.setState({ showAlert: false });
								}}
							/>
						</View>
					) : (
						<Text style={appStyles.homeGreeting}>
							🐶 Loading~ Please wait! 🐶
						</Text>
					)
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

//this is associating the dog to the user but it isn't updating on state
const mapDispatch = (dispatch) => {
	return {
		myDog: (obj) => dispatch(myDog(obj)),
	};
};

export default connect(mapState, mapDispatch)(HomeAndroid);

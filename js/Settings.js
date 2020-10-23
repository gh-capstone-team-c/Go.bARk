/** @format */

import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Points from './Points';
import { updateUser, updateDog } from '../store/users';
import { appStyles } from '../Styles';
import AwesomeAlert from 'react-native-awesome-alerts';
import RNPickerSelect from 'react-native-picker-select';

class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editSettings: false,
			email: '',
			name: '',
			color: '',
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
			<View style={appStyles.individualMenu}>
				{!this.state.editSettings ? (
					<>
						<Text style={appStyles.centerText}>
							Dog: {this.props.user.dog ? this.props.user.dog.name : 'Loading!'}
						</Text>
						{this.props.user ? (
							<View>
								<Text style={appStyles.centerText}>
									Email: {this.props.user.email}
								</Text>
								<Text style={appStyles.centerText}>
									Points: {this.props.user.points}
								</Text>
								<Points style={{ justifyContent: 'center' }} />
							</View>
						) : (
							<Text style={appStyles.centerText}>Happiness: 'Loading!'</Text>
						)}

						<TouchableOpacity>
							<Text
								style={appStyles.centerText}
								onPress={() => {
									this.setState({
										editSettings: true,
									});
								}}
							>
								Edit Profile
							</Text>
						</TouchableOpacity>
					</>
				) : (
					<>
						<Text style={appStyles.centerText}>Update Your Settings!</Text>
						<View style={appStyles.inputContainer}>
							<TextInput
								style={appStyles.input}
								type="text"
								onChangeText={(email) => this.setState({ email })}
								placeholder="email"
								value={this.state.email}
							/>
							<TextInput
								style={appStyles.input}
								type="text"
								onChangeText={(name) => this.setState({ name })}
								placeholder="dog name"
								value={this.state.name}
							/>

							<RNPickerSelect
								onValueChange={(value) => {
									this.setState({ color: value });
								}}
								items={[
									{ label: 'Red', value: 'red' },
									{ label: 'Black & Tan', value: 'blackTan' },
									{ label: 'Cream', value: 'cream' },
								]}
							/>
							<TouchableOpacity>
								<Text
									style={appStyles.centerText}
									onPress={() => {
										let name = this.state.name;
										let email = this.state.email;
										let color = this.state.color;

										if (
											email.trim() === '' ||
											name.trim() === '' ||
											color.trim() === ''
										) {
											this.showAlert();
										} else {
											this.props.update({ email, name });
											this.props.updateDog(
												{ name, color },
												this.props.user.dog.id
											);
											this.setState({
												editSettings: false,
											});
											alert(
												"Your dog's color will be reflected once you refresh the app"
											);
										}
									}}
								>
									Submit
								</Text>
							</TouchableOpacity>
						</View>
					</>
				)}
				<AwesomeAlert
					show={showAlert}
					showProgress={false}
					title="Uh Oh..."
					message="Please enter an email, dog name, and select a color!"
					closeOnTouchOutside={true}
					closeOnHardwareBackPress={false}
					showCancelButton={false}
					showConfirmButton={true}
					confirmText="Ok"
					confirmButtonColor="#008080"
					onConfirmPressed={() => {
						this.hideAlert();
					}}
				/>
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
		update: (obj) => dispatch(updateUser(obj)),
		updateDog: (nameObj, id) => dispatch(updateDog(nameObj, id)),
	};
};

export default connect(mapState, mapDispatch)(Settings);

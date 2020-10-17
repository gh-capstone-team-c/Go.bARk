/** @format */

import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Points from './Points';
import { updateUser } from '../store/users';
import { appStyles } from '../Styles';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editSettings: false,
			email: '',
			dog: { name: '' },
		};
	}

	render() {
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
							onChangeText={(name) => this.setState({ dog: { name } })}
							placeholder="dog name"
							value={this.state.dog.name}
						/>
						<TouchableOpacity>
							<Text
								style={appStyles.centerText}
								onPress={() => {
									let dog = this.state.dog;
									let email = this.state.email;
									console.log(dog, email);
									this.props.update({ email, dog });
									this.setState({
										editSettings: false,
									});
								}}
							>
								Submit
							</Text>
						</TouchableOpacity>
					</>
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
		update: (obj) => dispatch(updateUser(obj)),
	};
};

export default connect(mapState, mapDispatch)(Settings);

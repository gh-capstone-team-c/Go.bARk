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
									<TouchableOpacity
										style={appStyles.rectButton}
										onPress={() => {
											this.props.myDog({ name: this.state.dogName });
											this.forceUpdate();
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
								onPress={() => this.setState({ pressed: true })}
								style={appStyles.rectButton}
							>
								<Text style={appStyles.buttonText}>Yes!</Text>
							</TouchableOpacity>
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

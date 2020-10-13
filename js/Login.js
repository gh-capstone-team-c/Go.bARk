import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={loginStyle.container}>
				<TouchableOpacity>
					<Text>This is some test text</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>You have reached Login</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>Congratulations</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
var loginStyle = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'space-around',
		marginTop: 20,
	},
});

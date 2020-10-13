import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class Photos extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={photoStyle.container}>
				<TouchableOpacity>
					<Text>This is some test text</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>You have reached photos</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>Congratulations</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
var photoStyle = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'space-around',
		backgroundColor: '#fff',
	},
});

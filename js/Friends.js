import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class Friends extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={friendStyle.container}>
				<TouchableOpacity>
					<Text>This is some test text</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>You have reached friends</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>Congratulations</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
var friendStyle = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'space-around',
		backgroundColor: '#fff',
	},
});

import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class Settings extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={settings.container}>
				<TouchableOpacity>
					<Text>these are your settings</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>here they are</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>Settings!</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
var settings = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-around',
		backgroundColor: '#fff',
	},
});

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
					<Text>Friends</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>Photos</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>Settings</Text>
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
		marginTop: 20,
	},
});

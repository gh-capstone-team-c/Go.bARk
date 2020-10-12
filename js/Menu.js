import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

/**
 * Component for showing AR initialization UI to user to move device around until AR tracking is initialized
 */
export default class Menu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={menuStyles.container}>
				<TouchableOpacity>
					<Text>Account</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>Settings</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>Help</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
var menuStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-around',
		marginTop: 10,
		backgroundColor: '#fff',
	},
});

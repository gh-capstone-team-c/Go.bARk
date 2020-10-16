import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { appStyles } from '../Styles';

export default class Friends extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={appStyles.individualMenu}>
				<Text style={appStyles.centerText}>Friends List</Text>
				<Text style={appStyles.centerText}>
					This is where your friends will be listed.
				</Text>
				<Text style={appStyles.centerText}>Coming 2020?</Text>
			</View>
		);
	}
}

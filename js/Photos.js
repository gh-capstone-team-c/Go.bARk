import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { appStyles } from '../Styles';

export default class Photos extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={appStyles.individualMenu}>
				<Text style={appStyles.centerText}>Hello</Text>
				<Text style={appStyles.centerText}>
					Photos will eventually be here.
				</Text>
				<Text style={appStyles.centerText}>Thank you for your support</Text>]
			</View>
		);
	}
}

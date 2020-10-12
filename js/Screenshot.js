import React from 'react';
import {
	View,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	captureScreen,
} from 'react-native';

export default class Screenshot extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<TouchableOpacity>
					<Text style={{ fontSize: 30 }}>📷</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
var screenShot = StyleSheet.create({});

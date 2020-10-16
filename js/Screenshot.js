import React from 'react';
import {
	View,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	captureScreen,
} from 'react-native';
import { appStyles } from '../Styles';

export default class Screenshot extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<TouchableOpacity>
					<Text style={appStyles.menuButton}>📷</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

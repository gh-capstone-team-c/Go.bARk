import React from 'react';
import { Button } from 'react-native';
import {
	View,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	captureScreen,
	ViroNode,
	Viro3DObject,
	ViroScene,
} from 'react-native';
import { ViroARScene, ViroARSceneNavigator } from 'react-viro';
import { appStyles } from '../Styles';
import FoodTime from './FoodTime';

export default class DogBowl extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: false,
		};
		this._testPress = this._testPress.bind(this);
	}

	_testPress() {
		return !this.state.view ? (
			alert('you tapped the bone button')
		) : (
			// <View
			//   style={{
			//     position: 'absolute',
			//     top: 100,
			//     right: 0,
			//     bottom: 0,
			//     left: 0,
			//   }}
			// >
			<ViroARSceneNavigator initialScene={{ scene: FoodTime }} />
			// </View>
		);
	}

	render() {
		return (
			<View>
				<TouchableOpacity onPress={this.props.changeScene}>
					<Text style={appStyles.menuButton}>🦴</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

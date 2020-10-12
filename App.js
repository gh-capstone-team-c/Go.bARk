/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	Text,
	View,
	StyleSheet,
	PixelRatio,
	TouchableHighlight,
	Vibration,
	Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { ViroARSceneNavigator } from 'react-viro';
import Menu from './js/Menu';
import Screenshot from './js/Screenshot';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
	apiKey: 'API_KEY_HERE',
};

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/StartScreenAR');

export default class ViroSample extends Component {
	constructor() {
		super();

		this.state = {
			loggedIn: false,
			sharedProps: sharedProps,
		};
	}

	render() {
		return (
			<View style={localStyles.container}>
				{!this.state.loggedIn ? (
					<View style={localStyles.test}>
						<Text style={localStyles.titleText}>go</Text>

						<TouchableHighlight
							style={localStyles.buttons}
							onPress={() => {
								Vibration.vibrate();
								this.setState({ loggedIn: true });
							}}
							underlayColor={'transparent'}
						>
							<Text style={localStyles.buttonText}>start</Text>
						</TouchableHighlight>
						<Text style={localStyles.titleText}>bARk</Text>
					</View>
				) : (
					<View
						style={{ backgroundColor: '#green', width: width, height: height }}
					>
						<View style={{ flex: 1 }}>
							<Menu />
						</View>
						<View style={{ flex: 12 }}>
							<ViroARSceneNavigator
								{...this.state.sharedProps}
								initialScene={{ scene: InitialARScene }}
							/>
						</View>
						<View style={{ position: 'absolute', bottom: 25, right: 10 }}>
							<Screenshot />
						</View>
					</View>
				)}
			</View>
		);
	}
}

var localStyles = StyleSheet.create({
	viroContainer: {
		backgroundColor: 'darkseagreen',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		width: width,
		height: height,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	test: {
		backgroundColor: '#fff',
	},
	titleText: {
		paddingTop: 30,
		paddingBottom: 20,
		color: '#fff',
		textAlign: 'center',
		fontSize: 25,
	},
	buttonText: {
		color: '#000',
		textAlign: 'center',
		fontSize: 20,
	},
	buttons: {
		justifyContent: 'center',
		height: 150,
		width: 150,
		paddingTop: 20,
		paddingBottom: 20,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: '#ccff00',
		borderRadius: 100,
		borderWidth: 1,
		borderColor: '#fff',
	},
});

module.exports = ViroSample;

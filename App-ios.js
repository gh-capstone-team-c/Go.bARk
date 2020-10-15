/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @format
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	Text,
	View,
	StyleSheet,
	PixelRatio,
	TouchableHighlight,
	TouchableOpacity,
	Vibration,
	Dimensions,
	TextInput,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { ViroARSceneNavigator } from 'react-viro';

import Screenshot from './js/Screenshot';
import Photos from './js/Photos';
import Settings from './js/Settings';
import Friends from './js/Friends';
import DogBowl from './js/DogBowl';
import Points from './js/Points';

var InitialARScene = require('./js/BallThrowAR');

export default class AppIos extends Component {
	constructor() {
		super();

		this.state = {
			pressed: false,
			menuItem: null,
		};
		this.renderComponent = this.renderComponent.bind(this);
	}
	renderComponent() {
		if (this.state.menuItem === 'settings') return <Settings />;
		else if (this.state.menuItem === 'friends') return <Friends />;
		else if (this.state.menuItem === 'photos') return <Photos />;
	}
	render() {
		return (
			<View style={localStyles.container}>
				<View>
					{!this.state.pressed ? (
						<View>
							<Text style={localStyles.titleText}>go</Text>

							<TouchableHighlight
								style={localStyles.buttons}
								onPress={() => {
									Vibration.vibrate();
									this.setState({ pressed: true });
								}}
								underlayColor={'transparent'}
							>
								<Text style={localStyles.buttonText}>start</Text>
							</TouchableHighlight>
							<Text style={localStyles.titleText}>bARk</Text>
						</View>
					) : (
						<View
							style={{
								backgroundColor: '#green',
								width: width,
								height: height,
							}}
						>
							<View
								style={{
									position: 'absolute',
									top: 50,
									left: 0,
									right: 0,
									height: 50,
									backgroundColor: '#fff',
								}}
							>
								<View style={localStyles.menuContainer}>
									<TouchableOpacity
										onPress={() => {
											if (this.state.menuItem === 'settings')
												this.setState({ menuItem: null });
											else this.setState({ menuItem: 'settings' });
										}}
									>
										<Text>Settings</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											if (this.state.menuItem === 'friends')
												this.setState({ menuItem: null });
											else this.setState({ menuItem: 'friends' });
										}}
									>
										<Text>Friends</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											if (this.state.menuItem === 'photos')
												this.setState({ menuItem: null });
											else this.setState({ menuItem: 'photos' });
										}}
									>
										<Text>Photos</Text>
									</TouchableOpacity>
									<View>
										<Points />
									</View>
								</View>
							</View>

							<View
								style={{
									position: 'absolute',
									top: 100,
									right: 0,
									bottom: 0,
									left: 0,
								}}
							>
								<ViroARSceneNavigator
									{...this.state.sharedProps}
									initialScene={{ scene: InitialARScene }}
								/>
							</View>
							<View
								style={{
									position: 'absolute',
									left: 0,
									right: 0,
									top: 100,
								}}
							>
								{this.state.menuItem === 'settings' ? (
									<View>
										<Settings />
									</View>
								) : null}
								{this.state.menuItem === 'friends' ? (
									<View>
										<Friends />
									</View>
								) : null}
								{this.state.menuItem === 'photos' ? (
									<View>
										<Photos />
									</View>
								) : null}
							</View>

							<View style={{ position: 'absolute', bottom: 25, right: 10 }}>
								<Screenshot />
							</View>
							<View style={{ position: 'absolute', bottom: 25, left: 10 }}>
								<DogBowl />
							</View>
						</View>
					)}
				</View>
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
	},
	menuContainer: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-around',
		marginTop: 10,
		backgroundColor: '#fff',
	},

	titleText: {
		paddingTop: 30,
		paddingBottom: 20,
		color: '#000',
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

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
	ActivityIndicator,
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
// import Menu from './Menu';
import Screenshot from './js/Screenshot';
import Photos from './js/Photos';
import Settings from './js/Settings';
import Friends from './js/Friends';

export function renderIf(condition, renderedContent) {
	if (condition) {
		return renderedContent;
	} else {
		return null;
	}
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/BallThrowAR');

export default class App extends Component {
	constructor() {
		super();
		// // all code here for ray tracing
		// this._renderTrackingText = this._renderTrackingText.bind(this);
		// this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
		// this._onLoadStart = this._onLoadStart.bind(this);
		// this._onLoadEnd = this._onLoadEnd.bind(this);
		// //
		this.state = {
			pressed: false,
			menuItem: null,
			isLoggedIn: false,
			//adding in code to get ray tracing
			// viroAppProps: {
			// 	_onLoadEnd: this._onLoadEnd,
			// 	_onLoadStart: this._onLoadStart,
			// 	_onTrackingUpdated: this._onTrackingUpdated,
			// },
			// trackingInitialized: false,
			// isLoading: false,
		};
	}

	render() {
		return (
			<View style={localStyles.container}>
				{!this.state.isLoggedIn ? (
					<View style={localStyles.inputContainer}>
						<TextInput style={localStyles.input} placeholder="email" />
						<TextInput style={localStyles.input} placeholder="password" />
						<TouchableOpacity
							onPress={() => {
								this.setState({ isLoggedIn: true });
							}}
						>
							<Text style={{ color: '#fff' }}>Login</Text>
						</TouchableOpacity>
					</View>
				) : (
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
										top: 0,
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
												else {
													this.setState({ menuItem: 'settings' });
													console.log(this.state.menuItem, 'test');
												}
											}}
										>
											<Text>Settings</Text>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={() => {
												if (this.state.menuItem === 'friends')
													this.setState({ menuItem: null });
												else {
													this.setState({ menuItem: 'friends' });
													console.log(this.state.menuItem, 'test');
												}
											}}
										>
											<Text>Friends</Text>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={() => {
												if (this.state.menuItem === 'photos')
													this.setState({ menuItem: null });
												else this.setState({ menuItem: 'photos' });
												console.log(this.state.menuItem, 'test');
											}}
										>
											<Text>Photos</Text>
										</TouchableOpacity>
									</View>
								</View>

								<View
									style={{
										position: 'absolute',
										top: 50,
										right: 0,
										bottom: 0,
										left: 0,
									}}
								>
									{/* {this._renderTrackingText()}
									{renderIf(
										this.state.isLoading,
										<View
											style={{
												position: 'absolute',
												left: 0,
												right: 0,
												top: 0,
												bottom: 0,
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											<ActivityIndicator
												size="large"
												animating={this.state.isLoading}
												color="#ffffff"
											/>
										</View>
									)} */}
									<ViroARSceneNavigator
										initialScene={{
											scene: InitialARScene,
										}}
										// viroAppProps={this.state.viroAppProps}
									/>
								</View>
								<View>
									{renderIf(
										this.state.menuItem === 'settings',
										<View
											style={{
												position: 'absolute',
												left: 0,
												right: 0,
												top: 50,
											}}
										>
											<Settings />
										</View>
									)}
									{renderIf(
										this.state.menuItem === 'friends',
										<View
											style={{
												position: 'absolute',
												left: 0,
												right: 0,
												top: 50,
											}}
										>
											<Friends />
										</View>
									)}
									{renderIf(
										this.state.menuItem === 'photos',
										<View
											style={{
												position: 'absolute',
												left: 0,
												right: 0,
												top: 50,
											}}
										>
											<Photos />
										</View>
									)}
								</View>
								<View style={{ position: 'absolute', bottom: 25, right: 10 }}>
									<Screenshot />
								</View>
							</View>
						)}
					</View>
				)}
			</View>
		);
	}
	// functions from sample re: ray tracing, loading, etc
	// Invoked when a model has started to load, we show a loading indictator.
	_onLoadStart() {
		this.setState({
			isLoading: true,
		});
	}

	// Invoked when a model has loaded, we hide the loading indictator.
	_onLoadEnd() {
		this.setState({
			isLoading: false,
		});
	}

	_renderTrackingText() {
		if (this.state.trackingInitialized) {
			return (
				<View
					style={{
						position: 'absolute',
						backgroundColor: '#ffffff22',
						left: 30,
						right: 30,
						top: 30,
						alignItems: 'center',
					}}
				>
					<Text style={{ fontSize: 12, color: '#ffffff' }}>
						Tracking initialized.
					</Text>
				</View>
			);
		} else {
			return (
				<View
					style={{
						position: 'absolute',
						backgroundColor: '#ffffff22',
						left: 30,
						right: 30,
						top: 30,
						alignItems: 'center',
					}}
				>
					<Text style={{ fontSize: 12, color: '#ffffff' }}>
						Waiting for tracking to initialize.
					</Text>
				</View>
			);
		}
	}

	_onTrackingUpdated() {
		this.setState({
			trackingInitialized: true,
		});
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
	input: {
		margin: 15,
		height: 40,
		borderColor: '#7a42f4',
		borderWidth: 1,
		width: 250,
		padding: 10,
		color: '#fff',
	},
	inputContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

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
	Image,
	TextInput,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { ViroARSceneNavigator } from 'react-viro';
import { connect } from 'react-redux';
import { addPoints } from './store/users';

import Screenshot from './js/Screenshot';
import Photos from './js/Photos';
import Settings from './js/Settings';
import Friends from './js/Friends';
import DogBowl from './js/DogBowl';
import Points from './js/Points';

export function renderIf(condition, renderedContent) {
	if (condition) {
		return renderedContent;
	} else {
		return null;
	}
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/BallThrowAR');

class App extends Component {
	constructor(props) {
		super(props);
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
			toggle: false,
			viroAppProps: {
				user: this.props.user,
				addPoints: this.props.addPoints,
			},
			//adding in code to get ray tracing
			// viroAppProps: {
			//  _onLoadEnd: this._onLoadEnd,
			//  _onLoadStart: this._onLoadStart,
			//  _onTrackingUpdated: this._onTrackingUpdated,
			// },
			// trackingInitialized: false,
			// isLoading: false,
		};
	}
	render() {
		return (
			<View style={appStyles.containerApp}>
				<View>
					{!this.state.pressed ? (
						<View>
							<Text style={appStyles.titleText}>go</Text>​
							<TouchableOpacity
								style={appStyles.buttons}
								onPress={() => {
									Vibration.vibrate();
									this.setState({ pressed: true });
								}}
								underlayColor={'transparent'}
							>
								<Image
									style={appStyles.logo}
									source={require('./js/res/shibaFace.png')}
								/>
							</TouchableOpacity>
							<Text style={appStyles.titleText}>bARk</Text>
						</View>
					) : (
						<View
							style={{
								width: width,
								height: height,
							}}
						>
							<View style={appStyles.menuBar}>
								<View style={appStyles.menuContainer}>
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
									<View>
										<Points />
									</View>
								</View>
							</View>
							​
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
									viroAppProps={this.state.viroAppProps}
									// viroAppProps={this.state.viroAppProps}
								/>
							</View>
							​
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
							<View>
								{this.state.menuItem === 'settings' ? (
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
								) : null}
								{this.state.menuItem === 'friends' ? (
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
								) : null}
								{this.state.menuItem === 'photos' ? (
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
								) : null}
							</View>
							<View style={{ position: 'absolute', bottom: 25, right: 10 }}>
								<Screenshot />
							</View>
							<View style={{ position: 'absolute', bottom: 25, left: 10 }}>
								<TouchableOpacity
									onPress={() =>
										this.setState({ ...this.state, potato: !this.state.potato })
									}
								>
									<DogBowl />
								</TouchableOpacity>
							</View>
						</View>
					)}
				</View>
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

var appStyles = StyleSheet.create({
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
});

// connect to redux
const mapState = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatch = (dispatch) => {
	return {
		addPoints: (obj) => dispatch(addPoints(obj)),
	};
};

export default connect(mapState, mapDispatch)(App);

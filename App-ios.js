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
	Image,
	TouchableOpacity,
	Vibration,
	Dimensions,
	ScrollView,
	CameraRoll,
	Button,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { ViroARSceneNavigator } from 'react-viro';
import { connect } from 'react-redux';
import { addPoints } from './store/users';
import { addPhoto } from './store/photos';
import Screenshot from './js/Screenshot';
import Photos from './js/Photos';
import Settings from './js/Settings';
import Friends from './js/Friends';

import Points from './js/Points';

var InitialARScene = require('./js/BallThrowAR');

export function renderIf(condition, renderedContent) {
	if (condition) {
		return renderedContent;
	} else {
		return null;
	}
}

import { appStyles } from './Styles';

export class AppIos extends Component {
	constructor(props) {
		super(props);
		// // all code here for ray tracing
		this._renderTrackingText = this._renderTrackingText.bind(this);
		this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
		this._onLoadStart = this._onLoadStart.bind(this);
		this._onLoadEnd = this._onLoadEnd.bind(this);
		this.state = {
			pressed: false,
			menuItem: null,
			//trying to pass the addpoints redux function to AR scene
			viroAppProps: {
				user: this.props.user,
				addPoints: this.props.addPoints,
				_onLoadEnd: this._onLoadEnd,
				_onLoadStart: this._onLoadStart,
				_onTrackingUpdated: this._onTrackingUpdated,
			},
			trackingInitialized: false,
			isLoading: false,
			videoUrl: null,
			cameraNoise: true,
		};
		this._takeScreenshot = this._takeScreenshot.bind(this);
		this._setARNavigatorRef = this._setARNavigatorRef.bind(this);
	}

	_setARNavigatorRef(ARNavigator) {
		this._arNavigator = ARNavigator;
	}

	async _takeScreenshot() {
		this._arNavigator
			._takeScreenshot('screenshot' + this.state.screenshot_count, true)
			.then((retDict) => {
				console.log('hi');
				this.setState({
					videoUrl: 'file://' + retDict.url,
					cameraClick: !this.state.cameraNoise,
				});
				console.log('videourl', this.state.videoUrl);
				this.props.addPhoto(this.state.videoUrl);
			});
	}

	render() {
		return (
			<View style={appStyles.container}>
				<View>
					{/* checks to see if start button was pressed */}
					{!this.state.pressed ? (
						<View>
							<Text style={appStyles.titleText}>go</Text>
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
						// renders the game menu and the ARScene player
						<View
							style={{
								width: width,
								height: height,
							}}
						>
							{/* menubar toggles the different menu components */}

							<View style={appStyles.appleMenu}>
								<View style={appStyles.menuContainer}>
									<TouchableOpacity
										onPress={() => {
											if (this.state.menuItem === 'settings')
												this.setState({ menuItem: null });
											else {
												this.setState({ menuItem: 'settings' });
											}
										}}
									>
										<Text style={appStyles.menuHeadings}>My Profile</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											if (this.state.menuItem === 'friends')
												this.setState({ menuItem: null });
											else {
												this.setState({ menuItem: 'friends' });
											}
										}}
									>
										<Text style={appStyles.menuHeadings}>Friends</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											if (this.state.menuItem === 'photos')
												this.setState({ menuItem: null });
											else this.setState({ menuItem: 'photos' });
										}}
									>
										<Text style={appStyles.menuHeadings}>Photos</Text>
									</TouchableOpacity>
									<View style={{ top: -20 }}>
										<Points />
									</View>
								</View>
							</View>
							{/* scene navigator */}
							<View style={appStyles.appSceneNav}>
								<ViroARSceneNavigator
									initialScene={{ scene: InitialARScene }}
									viroAppProps={this.state.viroAppProps}
									ref={this._setARNavigatorRef}
								/>
								{this._renderTrackingText()}
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
								)}
							</View>
							{/* conditional renders based on whether that menu item was clicked */}
							<View>
								{renderIf(
									this.state.menuItem === 'settings',
									<View style={appStyles.appMenuDropDown}>
										<ScrollView>
											<Settings />
										</ScrollView>
									</View>
								)}
								{renderIf(
									this.state.menuItem === 'friends',
									<View style={appStyles.appMenuDropDown}>
										<ScrollView>
											<Friends />
										</ScrollView>
									</View>
								)}
								{renderIf(
									this.state.menuItem === 'photos',
									<View style={appStyles.appMenuDropDown}>
										<ScrollView>
											<Photos />
										</ScrollView>
									</View>
								)}
							</View>

							{/* screenshot */}
							<View
								key="screenshot_container"
								style={{
									flex: 1,
									position: 'absolute',
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center',
									width: 58,
									height: 58,
									// top: 0,
									bottom: 25,

									transform: [{ translate: [80, 0, 0] }],
								}}
							>
								<TouchableOpacity
									key="camera_button"
									title="screenshot"
									onPress={() => this._takeScreenshot()}
									style={{ position: 'absolute', bottom: 25, right: 10 }}
								>
									<Text style={appStyles.menuButton}>📷</Text>
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
						backgroundColor: '#ffffff',
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
// connect to redux
const mapState = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatch = (dispatch) => {
	return {
		addPoints: (obj) => dispatch(addPoints(obj)),
		addPhoto: (str, id) => dispatch(addPhoto(str, id)),
	};
};

export default connect(mapState, mapDispatch)(AppIos);

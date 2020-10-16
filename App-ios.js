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
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { ViroARSceneNavigator } from 'react-viro';

import Screenshot from './js/Screenshot';
import Photos from './js/Photos';
import Settings from './js/Settings';
import Friends from './js/Friends';
import DogBowl from './js/DogBowl';
import { appStyles } from './Styles';

export function renderIf(condition, renderedContent) {
	if (condition) {
		return renderedContent;
	} else {
		return null;
	}
}

var InitialARScene = require('./js/BallThrowAR');

export default class AppIos extends Component {
	constructor() {
		super();

		this.state = {
			pressed: false,
			menuItem: null,
		};
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
											else this.setState({ menuItem: 'settings' });
										}}
									>
										<Text style={appStyles.menuHeadings}>Settings</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											if (this.state.menuItem === 'friends')
												this.setState({ menuItem: null });
											else this.setState({ menuItem: 'friends' });
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
								</View>
							</View>
							{/* scene navigator */}
							<View style={appStyles.appSceneNav}>
								<ViroARSceneNavigator
									{...this.state.sharedProps}
									initialScene={{ scene: InitialARScene }}
								/>
							</View>
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

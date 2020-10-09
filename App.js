/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from "react";
import {
	AppRegistry,
	Text,
	View,
	StyleSheet,
	PixelRatio,
	TouchableHighlight,
	Vibration,
} from "react-native";

import { ViroARSceneNavigator } from "react-viro";
import Menu from "./js/Menu";

/*
 TODO: Insert your API key below
 */
var sharedProps = {
	apiKey: "API_KEY_HERE",
};

// Sets the default scene you want for AR and VR
var InitialARScene = require("./js/StartScreenAR");

var UNSET = "UNSET";

var AR_NAVIGATOR_TYPE = "AR";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
	constructor() {
		super();

		this.state = {
			login: false,
			sharedProps: sharedProps,
		};
		// this._getExperienceSelector = this._getExperienceSelector.bind(this);
		this._getARNavigator = this._getARNavigator.bind(this);
		this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
			this
		);
		this._exitViro = this._exitViro.bind(this);
	}

	// Replace this function with the contents of _getVRNavigator() or _getARNavigator()
	// if you are building a specific type of experience.
	render() {
		if (this.state.navigatorType == UNSET) {
			return this._getLogin();
		} else if (this.state.navigatorType === AR_NAVIGATOR_TYPE) {
			return this._getARNavigator();
		}
	}

	// Presents the user with a choice of an AR or VR experience
	_getLogin() {
		return (
			<View style={localStyles.outer}>
				<View style={localStyles.inner}>
					<Text style={localStyles.titleText}>go</Text>

					<TouchableHighlight
						style={localStyles.buttons}
						onPress={this._getARNavigator()}
						underlayColor={"transparent"}
					>
						<Text style={localStyles.buttonText}>start</Text>
					</TouchableHighlight>
					<Text style={localStyles.titleText}>bARk</Text>
				</View>
			</View>
		);
	}

	// Returns the ViroARSceneNavigator which will start the AR experience
	_getARNavigator() {
		Vibration.vibrate();
		return (
			<View>
				<Menu />
				<ViroARSceneNavigator
					{...this.state.sharedProps}
					initialScene={{ scene: InitialARScene }}
					onExitViro={this._exitViro}
				/>
			</View>
		);
	}
}

var localStyles = StyleSheet.create({
	viroContainer: {
		flex: 1,
		backgroundColor: "darkseagreen",
	},
	outer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		// backgroundColor: "darkseagreen",
	},
	inner: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		// backgroundColor: "darkseagreen",
	},
	titleText: {
		paddingTop: 30,
		paddingBottom: 20,
		color: "#fff",
		textAlign: "center",
		fontSize: 25,
	},
	buttonText: {
		color: "#000",
		textAlign: "center",
		fontSize: 20,
	},
	buttons: {
		display: "flex",
		justifyContent: "center",
		height: 150,
		width: 150,
		paddingTop: 20,
		paddingBottom: 20,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: "#ccff00",
		borderRadius: 100,
		borderWidth: 1,
		borderColor: "#fff",
	},
});

module.exports = ViroSample;

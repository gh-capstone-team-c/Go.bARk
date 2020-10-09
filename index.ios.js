import { AppRegistry } from "react-native";
import App from "./App.js";
import React, { Component } from "react";

export default class Root extends Component {
	render() {
		return <App />;
	}
}
AppRegistry.registerComponent("viroSample", () => Root);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent("ViroSample", () => Root);

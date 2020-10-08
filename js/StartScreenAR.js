import React, { Component } from "react";
import {
	ViroARScene,
	ViroText,
	ViroConstants,
	ViroBox,
	ViroScene,
} from "react-viro";
var createReactClass = require("create-react-class");
const HelloWorldSceneAR = require("./HelloWorldSceneAR copy");

export default StartScreenAR = createReactClass({
	render() {
		return (
			<ViroARScene>
				<ViroBox
					position={[0, -0.5, -1]}
					scale={[0.3, 0.3, 0.1]}
					materials={["grid"]}
					animation={{ name: "rotate", run: true, loop: true }}
					onDrag={this._pushNextScene}
				/>
				<ViroText
					text={"click me"}
					scale={[0.5, 0.5, 0.5]}
					position={[0, 0, -1]}
					onClick={this._pushNextScene}
				/>
			</ViroARScene>
		);
	},

	_pushNextScene() {
		this.props.sceneNavigator.push({ scene: HelloWorldSceneAR });
	},
});

module.exports = StartScreenAR;

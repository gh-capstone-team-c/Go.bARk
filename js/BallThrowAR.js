/** @format */

import React, { Component } from 'react';
import {
	ViroARScene,
	Viro3DObject,
	ViroAmbientLight,
	ViroSpotLight,
	ViroNode,
	ViroAnimations,
	ViroText,
} from 'react-viro';
var createReactClass = require('create-react-class');
const HelloWorldSceneAR = require('./HelloWorldSceneAR copy');

export default BallThrowAR = createReactClass({
	getInitialState() {
		return {
			currentAnimation: 'rotate',
		};
	},
	render: function () {
		return (
			<ViroARScene>
				<ViroText
					text={'Swipe for next!'}
					scale={[0.5, 0.5, 0.5]}
					position={[0, 0, -1]}
					onDrag={this._pushNextScene}
				/>
				<ViroAmbientLight color={'#aaaaaa'} />
				<ViroSpotLight
					innerAngle={5}
					outerAngle={90}
					direction={[0, -1, -0.2]}
					position={[0, 3, 1]}
					color="#ffffff"
					castsShadow={true}
				/>
				<ViroNode position={[0, -1, 0]}>
					<Viro3DObject
						source={require('./res/emoji_smile/emoji_smile.vrx')}
						resources={[
							require('./res/emoji_smile/emoji_smile_diffuse.png'),
							require('./res/emoji_smile/emoji_smile_normal.png'),
							require('./res/emoji_smile/emoji_smile_specular.png'),
						]}
						position={[0, -1, -2]}
						scale={[0.2, 0.2, 0.2]}
						type="VRX"
						onClick={this._onBallClick}
						animation={{
							name: this.state.currentAnimation,
							run: true,
							loop: true,
						}}
					/>
				</ViroNode>
			</ViroARScene>
		);
	},

	_onBallClick() {
		if (this.state.currentAnimation === 'rotate') {
			this.setState({
				currentAnimation: 'arc',
			});
		} else {
			this.setState({
				currentAnimation: 'rotate',
			});
		}
	},

	_pushNextScene() {
		this.props.sceneNavigator.push({ scene: HelloWorldSceneAR });
	},
});

ViroAnimations.registerAnimations({
	// moveLeft: {
	// 	properties: { positionX: '-=5.0', rotateZ: '+=45' },
	// 	duration: 10000,
	// },
	rotate: {
		properties: {
			rotateY: '+=90',
		},
		duration: 250, //.25 seconds
	},
	launch: {
		properties: {
			positionX: '-=5.0',
			positionY: '+=5.0',
		},
		duration: 5000,
	},
	fall: {
		properties: {
			positionX: '+=10.0',
			positionY: '-=5.0',
		},
		duration: 5000,
	},
	arc: [['launch', 'fall']],
});

module.exports = BallThrowAR;

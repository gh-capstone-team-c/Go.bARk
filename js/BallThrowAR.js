/** @format */

import React, { Component } from 'react';
import { TouchableHighlightBase } from 'react-native';
import {
	ViroARScene,
	Viro3DObject,
	ViroAmbientLight,
	ViroSpotLight,
	ViroNode,
	ViroAnimations,
	ViroText,
	ViroQuad,
} from 'react-viro';
var createReactClass = require('create-react-class');
const HelloWorldSceneAR = require('./HelloWorldSceneAR copy');

export default BallThrowAR = createReactClass({
	getInitialState() {
		return {
			currentAnimation: 'rotate',
			text: 'Swipe for next!',
			animation: true,
			dogAnimation: 'waiting',
		};
	},

	render() {
		return (
			<ViroARScene>
				<ViroText
					text={this.state.text}
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

				<ViroNode position={[0, -3, -4]}>
					<ViroSpotLight
						innerAngle={5}
						outerAngle={25}
						direction={[0, -1, 0]}
						position={[0, 5, 0]}
						color="#ffffff"
						castsShadow={true}
						shadowMapSize={2048}
						shadowNearZ={2}
						shadowFarZ={7}
						shadowOpacity={0.7}
					/>
					<Viro3DObject
						source={require('./res/Dog/TheDogThree.vrx')}
						position={[0, -4, -10]}
						scale={[0.06, 0.06, 0.06]}
						animation={{
							name: this.state.dogAnimation,
							run: true,
							loop: true,
							interruptible: true,
						}}
						ignoreEventHandling={true}
						type="VRX"
					/>
				</ViroNode>

        <ViroNode position={[0, -1, 0]}>
          <Viro3DObject
            source={require('./res/object_sphere.vrx')}
            resources={[
              require('./res/sphere_diffuse.png'),

              require('./res/sphere_specular.png'),
            ]}
            position={[0, -1, -2]}
            scale={[0.2, 0.2, 0.2]}
            type="VRX"
            // onClick={this._onBallClick}
            // animation={{
            //   name: this.state.currentAnimation,
            //   run: true,
            //   loop: true,
            // }}
            onClickState={this._onBallClick}
            animation={{
              name: this.state.currentAnimation,
              run: true,
              interruptible: true,
            }}
            onDrag={this._onBallDrag}
          />
        </ViroNode>

        {/* look at leash file format */}

        {/* Dog bowl used to be here, may replace */}
      </ViroARScene>
    );
  },

	_onBallClick(stateValue, position, source) {
		let track;
		if (stateValue === 1) {
			this.setState({
				dogAnimation: 'waiting',
			});
		} else if (stateValue === 2 || stateValue === 3) {
			this.setState({
				currentAnimation: 'arc',
			});

			setTimeout(() => {
				this.setState({
					currentAnimation: 'returnBall',
					dogAnimation: 'return',
				});
			}, 6000);
		}
		console.log('fetch!', position);
	},
	_onBallDrag() {
	
	},

  _pushNextScene() {
    this.props.sceneNavigator.push({ scene: HelloWorldSceneAR });
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: '+=90',
    },
    duration: 0, //0 seconds
  },
  lookLeft: {
    properties: {
      rotateY: '+=10',
    },
    duration: 500, //0 seconds
  },
  lookRight: {
    properties: {
      rotateY: '-=10',
    },
    duration: 500, //0 seconds
  },
  launch: {
    properties: {
      positionZ: '-=3.0',
      positionY: '+=3.0',
    },
    easing: 'EaseOut',
    duration: 2500,
  },
  fall: {
    properties: {
      positionZ: '-=3.0',
      positionY: '-=3.0',
    },
    duration: 2500,
    easing: 'EaseIn',
  },
  arc: [['launch', 'fall']],
  waiting: [
    [
      'lookLeft',
      'lookRight',
      'lookLeft',
      'lookRight',
      'lookLeft',
      'lookRight',
      'lookLeft',
      'lookRight',
    ],
  ],
  return: {
    properties: {
      positionX: 0,
      positionY: -2,
      positionZ: 0,
    },
    duration: 2000,
    easing: 'EaseOut',
  },
  returnBall: {
    properties: {
      positionX: 0,
      positionY: 0,
      positionZ: -1.2,
    },
    duration: 2000,
    easing: 'EaseOut',
  },
});

module.exports = BallThrowAR;

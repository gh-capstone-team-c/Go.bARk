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
	ViroARPlaneSelector,
} from 'react-viro';
var createReactClass = require('create-react-class');
const HelloWorldSceneAR = require('./HelloWorldSceneAR copy');

export default BallThrowAR = createReactClass({
	getInitialState() {
		return {
			currentAnimation: 'rotate',
			dogAnimation: null,
		};
	},

	// _renderDog() {
	//   return (
	//     <Viro3DObject
	//       source={require('./res/Doggo/dingo_obj/Dingo.obj')}
	//       resources={[
	//         require('./res/Doggo/dingo_obj/Dingo.mtl'),
	//         require('./res/Doggo/dingo_obj/Dingo_BaseColor.png'),
	//       ]}
	//       type="OBJ"
	//       scale={[0.5, 0.5, 0.5]}
	//       position={[0, -2, -4]}
	//     />
	//   );
	// },

	render() {
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
				<Viro3DObject
					source={require('./res/Doggo/dingo_obj/Dingo.obj')}
					resources={[
						require('./res/Doggo/dingo_obj/Dingo.mtl'),
						require('./res/Doggo/dingo_obj/Dingo_BaseColor.png'),
					]}
					animation={{ name: this.state.dogAnimation, run: true }}
					onFinish
					type="OBJ"
					scale={[0.5, 0.5, 0.5]}
					position={[0, -2, -4]}
				/>
				{/* <ViroARPlaneSelector minHeight={0.5} minWidth={0.5}>
          {this._renderDog()}
        </ViroARPlaneSelector> */}

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
						animation={{ name: this.state.currentAnimation, run: true }}
						onDrag={this._onBallDrag}
					/>
				</ViroNode>

				{/* leash but the file might be the wrong format */}
				{/* <ViroNode position={[0, -3, 0]}>
					<Viro3DObject
						source={require('./res/leash.max')}
						position={[0, -3, 0]}
						scale={[0.2, 0.2, 0.2]}
						type="VRX"
					/>
				</ViroNode> */}

				{/* dog bowl but i may be requiring the wrong files */}
				{/* <ViroNode position={[0, 0, -2]}>
					<Viro3DObject
						source={require('./res/Dog-Graphics/DogBowl_NoFood.fbx')}
						resources={[
							require('./res/Dog-Graphics/DogBowl_Noormals.png'),
							require('./res/Dog-Graphics/Dogbowl2_Specular.jpg'),
						]}
						position={[0, -1, -2]}
						scale={[0.2, 0.2, 0.2]}
						type="FBX"
					/>
				</ViroNode> */}
			</ViroARScene>
		);
	},

	_onBallClick(stateValue, position, source) {
		if (stateValue == 1) {
			this.setState({
				dogAnimation: 'waiting',
			});
		} else if (stateValue == 2) {
			if (this.state.currentAnimation === 'rotate') {
				this.setState({
					currentAnimation: 'arc',
					dogAnimation: 'track',
				});
			} else {
				this.setState({
					currentAnimation: 'rotate',
				});
			}
			console.log('fetch!', this.state.currentAnimation);
		} else if (stateValue == 3) {
			if (this.state.currentAnimation === 'rotate') {
				this.setState({
					currentAnimation: 'arc',
					dogAnimation: 'track',
				});
			} else {
				this.setState({
					currentAnimation: 'rotate',
				});
			}
		}
	},
	_onBallDrag() {},

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
	track: [
		[
			{
				properties: {
					positionZ: '-=4.0',
				},
				duration: 1000,
				easing: 'EaseOut',
			},
			'waiting',
		],
	],
});

module.exports = BallThrowAR;

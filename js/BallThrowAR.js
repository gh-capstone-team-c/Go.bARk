/** @format */

import React from 'react';
import {

	Viro3DObject,
	ViroAmbientLight,
	ViroSpotLight,
	ViroNode,
	ViroAnimations,
	ViroText,
	ViroQuad,
	ViroSound,

} from 'react-viro';

var createReactClass = require('create-react-class');

const dog = {
  red: require('./res/dogColors/redDog.vrx'),
  blackTan: require('./res/dogColors/blackTanDog.vrx'),
  cream: require('./res/dogColors/creamDog.vrx'),
};

export default BallThrowAR = createReactClass({
	getInitialState() {
		return {
			currentAnimation: 'rotate',
			text: 'Play with me!',
			dogPosition: [
				this.props.dogPosition[0],
				this.props.dogPosition[1] - 1,
				this.props.dogPosition[2] - 5,
			],
			ballPosition: [
				this.props.dogPosition[0],
				this.props.dogPosition[1] - 1.5,
				this.props.dogPosition[2] + 3,
			],
			playCount: 0,
			dogAnimation: 'waiting',
			dogScale: [0.025, 0.025, 0.025],
			rotation: [0, 0, 0],
			scale: [0.2, 0.2, 0.2],
			//sound effects
			playPoints: true,
			playBark: true,
			//passing redux function to AR component
			user: this.props.user,
			addPoints: this.props.addPoints,
		};
	},
	render() {
		const dogColor = this.state.user.dog.color;
		return (
			<ViroNode>
				{/****** scene items below ****** */}
				<ViroText
					text={this.state.text}
					scale={[1, 1, 1]}
					position={[0, 0, -4]}
				/>
				<ViroAmbientLight color={'#e8e0dc'} />
				{/* dog object */}
				<ViroNode position={this.state.dogPosition} scale={this.state.dogScale}>
					<ViroSpotLight
						innerAngle={5}
						outerAngle={40}
						direction={[0, -1, 0]}
						position={[
							this.state.dogPosition[0],
							this.state.dogPosition[1] + 3,
							this.state.dogPosition[2] + 1,
						]}
						color="#ffffff"
						intensity={10000}
						castsShadow={true}
						shadowNearZ={0.1}
						shadowFarZ={6}
						shadowOpacity={0.9}
					/>
					<Viro3DObject
						source={this.props.dog[dogColor]}
						animation={{
							name: this.state.dogAnimation,
							run: true,
							interruptible: true,
						}}
						ignoreEventHandling={true}
						type="VRX"
						position={this.state.dogPosition}
					/>
					<ViroQuad
						position={[
							this.state.dogPosition[0],
							this.state.dogPosition[1] - 4,
							this.state.dogPosition[2],
						]}
						width={7.5}
						height={7.5}
						arShadowReceiver={true}
						ignoreEventHandling={true}
					/>
				</ViroNode>
				{/* ball object */}
				<ViroNode position={this.state.ballPosition} scale={this.state.scale}>
					<ViroSpotLight
						innerAngle={5}
						outerAngle={20}
						direction={[0, -1, 0]}
						position={[
							this.state.ballPosition[0],
							this.state.ballPosition[1] + 5,
							this.state.ballPosition[2],
						]}
						color="#ffffff"
						castsShadow={true}
						shadowNearZ={0.1}
						shadowFarZ={6}
						shadowOpacity={0.9}
					/>
					<Viro3DObject
						position={this.state.ballPosition}
						key={'ball'}
						source={require('./res/object_sphere.vrx')}
						resources={[
							require('./res/sphere_diffuse.png'),

							require('./res/sphere_specular.png'),
						]}
						type="VRX"
						onClickState={this._onBallClick}
						animation={{
							name: this.state.currentAnimation,
							run: true,
							interruptible: false,
						}}
						onDrag={() => {}}
					/>
				</ViroNode>
				{/* points sound effects */}
				<ViroSound
					paused={this.state.playPoints}
					muted={false}
					source={require('./sounds/points.mp3')}
					loop={false}
					onFinish={() => {
						this.setState({
							playPoints: true,
						});
					}}
					volume={1.0}
				/>

				{/* dog bark sound effects--this only plays sometimes awkwardly... */}
				<ViroSound
					paused={this.state.playBark}
					muted={false}
					source={require('./sounds/tinydogbark.mp3')}
					loop={false}
					onFinish={() => {
						this.setState({
							playBark: true,
						});
					}}
					volume={1.0}
				/>
			</ViroNode>
		);
	},
	_onBallClick(stateValue, position, source) {
		//incremental counter to limit number of consecutive games of catch with dog
		if (
			stateValue === 1 &&
			this.state.currentAnimation !== ('arc' || 'rollAway')
		) {
			const play = this.state.playCount + 1;
			this.setState({ ...this.state, playCount: play });
			// let pts = this.state.user.points;
			this.state.addPoints({ points: this.state.user.points++ });
		}
		// capture when dog and ball are super close to user(already fetched) and returns gameplay loop to near start.
		if (position[2] >= -5 && this.state.playCount >= 3) {
			this.setState({
				...this.state,
				dogAnimation: 'dropBall',
				currentAnimation: 'rollAway',
			});
			// function that displays dog after dropping ball
			setTimeout(() => {
				if (this.state.dogAnimation === 'dropBall') {
					this.setState({
						...this.state,
						dogPosition: [
							this.props.dogPosition[0],
							this.props.dogPosition[1] - 1,
							this.props.dogPosition[2] + 2,
						],
						playCount: 0,
						dogAnimation: 'waiting',
						currentAnimation: 'rotate',
					});
				}
			}, 5000);
		} else if (stateValue === 1) {
			this.setState({
				dogAnimation: 'waiting',
			});
			//handler for play loop
		} else if (stateValue === 2 || stateValue === 3) {
			this.setState({
				currentAnimation: 'arc',
				dogAnimation: 'fetch',
			});
			//captures dog walking towards ball
			setTimeout(() => {
				if (this.state.currentAnimation === 'arc') {
					const dogZ = this.state.ballPosition[2] - 6;
					this.setState({
						...this.state,
						dogPosition: [
							this.state.ballPosition[0],
							this.state.ballPosition[1],
							dogZ,
						],
					});
				}
			}, 2000);
			// This timeout fires after the ball lands near the dog. It sets the dog and ball on a return course. The if statement stops it from refiring after the dog drops the ball.
			setTimeout(() => {
				if (this.state.currentAnimation === 'arc') {
					this.setState({
						...this.state,
						currentAnimation: 'returnBall',
						dogAnimation: 'return',
						ballPosition: [
							this.props.dogPosition[0],
							this.props.dogPosition[1] + 0.5,
							this.props.dogPosition[2] + 5.8,
						],
						dogPosition: [
							this.props.dogPosition[0],
							this.props.dogPosition[1] - 1,
							this.props.dogPosition[2] + 5,
						],
					});
				}
			}, 6500);
		}
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
		duration: 500,
	},
	lookRight: {
		properties: {
			rotateY: '-=20',
		},
		duration: 500,
	},
	launch: {
		properties: {
			positionZ: '-=10.0',
			positionY: '+=12.0',
		},
		easing: 'EaseOut',
		duration: 2500,
	},
	fall: {
		properties: {
			positionZ: '-=10.0',
			positionY: 0,
		},
		duration: 2300,
		easing: 'bounce',
	},
	dropBall: [
		[
			{
				properties: {
					rotateY: '-=180',
				},
				duration: 500, //0 seconds
			},
			{
				properties: {
					positionZ: '-=20',
				},
				duration: 2000,
			},
			{
				properties: {
					rotateY: '-=180',
				},
				duration: 180,
			},
			{
				properties: {
					rotateY: 0,
				},
				duration: 20,
			},
		],
	],
	rollAway: [
		[
			{
				properties: {
					positionX: '-=2',
					positionZ: '-=5',
				},
				duration: 250, //0 seconds
			},
			{
				properties: {
					positionX: '+=2',
					positionZ: '-=5',
				},
				duration: 250, //0 seconds
			},
			{
				properties: {
					positionZ: -20,
				},
				duration: 1000,
			},
			{
				properties: {
					positionY: -3,
				},
				duration: 1000,
				easing: 'Bounce',
			},
			{
				properties: {
					positionX: '-=5',
				},
				duration: 1000,
			},
		],
	],
	fetch: [
		[
			{
				properties: {
					rotateY: '+=180',
				},
				duration: 500,
				easing: 'Bounce',
			},
			{
				properties: {
					positionZ: '-=10',
				},
				duration: 1400,
				easing: 'Bounce',
			},
			{
				properties: {
					rotateY: '+=540',
				},
				duration: 1500,
				easing: 'Bounce',
			},
		],
	],
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
			positionY: 0,
			positionZ: 0,
			rotateY: 0,
		},
		duration: 2000,
		easing: 'EaseOut',
	},
	returnBall: {
		properties: {
			positionX: 0,
			positionY: 0,
			positionZ: 0,
			rotateY: 0,
		},
		duration: 1800,
		easing: 'EaseOut',
	},

});
module.exports = BallThrowAR;

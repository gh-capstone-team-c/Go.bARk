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

const dogStand = {
	red: require('./res/dogColors/redDog.vrx'),
	blackTan: require('./res/dogColors/blackTanDog.vrx'),
	cream: require('./res/dogColors/creamDog.vrx'),
};
const dogPose = {
	red: require('./res/dogPose/redDogEat.vrx'),
	blackTan: require('./res/dogPose/blackTanDogEat.vrx'),
	cream: require('./res/dogPose/creamDogEat.vrx'),
};
import socket from '../socket/socket';

export default BallThrowAR = createReactClass({
	getInitialState() {
		return {
			currentAnimation: 'rotate',
			text: 'Play with me!',
			dogPosition: [0, -2, -4],
			ballPosition: [0, -3, -1],
			playCount: 0,
			dogAnimation: 'waiting',
			dogScale: [0.025, 0.025, 0.025],
			scale: [0.2, 0.2, 0.2],
			getBall: false,
			//sound effects
			playPoints: true,
			playBark: true,
			//passing redux function to AR component
			user: {},
			addPoints: () => {},
		};
	},
	componentDidMount() {
		this.setState({ user: this.props.user, addPoints: this.props.addPoints });
	},
	render() {
		if (this.state.user.id) {
			const dogColor = this.state.user.dog.color;
			let dog;
			this.state.getBall
				? (dog = dogPose[dogColor])
				: (dog = dogStand[dogColor]);
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
					<ViroNode>
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
							source={dog}
							animation={{
								name: this.state.dogAnimation,
								run: true,
								interruptible: true,
							}}
							scale={this.state.dogScale}
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
					<ViroNode scale={this.state.scale}>
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
								onFinish: () => {
									if (this.state.currentAnimation === 'return') {
										this.setState({
											currentAnimation: 'rotate',
											dogAnimation: 'faceMe',
											dogPosition: [0, -2, -0.6],
											ballPosition: [0, -1.6, 3],
										});
									}
								},
							}}
							onDrag={() => {}}
						/>
					</ViroNode>

					{/* points sound effects */}
					<ViroSound
						paused={this.state.playPoints}
						muted={false}
						source={require('./sounds/points3.mp3')}
						loop={false}
						onFinish={() => {
							this.setState({
								playPoints: true,
							});
						}}
						volume={1.0}
					/>

					{/* dog bark sound effects*/}
					<ViroSound
						paused={this.state.playBark}
						muted={false}
						source={require('./sounds/smallBark.mp3')}
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
		} else
			return (
				<ViroNode>
					<ViroText
						text={'Loading, Please wait!'}
						scale={[3, 3, 3]}
						position={[0, 1, 0]}
						transformBehaviors={['billboardY']}
					/>
				</ViroNode>
			);
	},

	//socket
	updatePoints() {
		this.state.addPoints({ points: this.state.user.points++ });
		socket.emit('updatePoints');
	},

	_onBallClick(stateValue, position, source) {
		//incremental counter to limit number of consecutive games of catch with dog
		if (
			stateValue === 1 &&
			this.state.currentAnimation !== ('arc' || 'rollAway')
		) {
			const play = this.state.playCount + 1;
			this.setState({
				...this.state,
				playCount: play,
				playPoints: !this.state.playPoints,
			});
			// let pts = this.state.user.points;
			this.updatePoints();
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
				if (
					this.state.currentAnimation === 'arc' &&
					this.state.dogAnimation === 'fetch'
				) {
					const dogZ = this.state.ballPosition[2] - 6;
					this.setState({
						dogAnimation: 'faceMe',
						dogPosition: [this.state.ballPosition[0], -2, dogZ],
						getBall: true,
					});
				}
			}, 2000);
			// This timeout fires after the ball lands near the dog. It sets the dog and ball on a return course. The if statement stops it from refiring after the dog drops the ball.
			setTimeout(() => {
				if (
					this.state.currentAnimation === 'arc' &&
					this.state.dogAnimation === 'faceMe'
				) {
					const liftBall = [
						this.state.ballPosition[0],
						-0.5,
						this.state.ballPosition[2],
					];
					this.setState({
						ballPosition: liftBall,
						getBall: false,
						currentAnimation: 'return',
						dogAnimation: 'returnBall',
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
	faceMe: {
		properties: {
			rotateY: 0,
		},
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
			positionZ: '-=5.0',
			positionY: '+=12.0',
		},
		easing: 'EaseOut',
		duration: 2500,
	},
	fall: {
		properties: {
			positionZ: '-=5.0',
			positionY: -3,
		},
		duration: 2300,
		easing: 'bounce',
	},
	dropBall: [
		[
			{
				properties: {
					rotateY: 180,
				},
				duration: 500, //0 seconds
			},
			{
				properties: {
					positionZ: '-=5',
				},
				duration: 2000,
			},
			{
				properties: {
					rotateY: 0,
				},
				duration: 180,
			},
		],
	],
	rollAway: [
		[
			{
				properties: {
					positionX: '-=2',
					positionZ: '-=11',
				},
				duration: 250, //0 seconds
			},
			{
				properties: {
					positionX: '+=2',
					positionZ: '-=11',
				},
				duration: 250, //0 seconds
			},
			{
				properties: {
					positionZ: '-=10',
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
					rotateY: 180,
				},
				duration: 500,
				easing: 'Bounce',
			},
			{
				properties: {
					positionZ: '-=5',
				},
				duration: 1000,
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
	return: [
		[
			{
				properties: {
					positionX: 0,
					positionY: -1.6,
					positionZ: 3,
				},
				duration: 1800,

				easing: 'EaseOut',
			},
		],
	],
	returnBall: [
		[
			{
				properties: {
					positionX: 0,
					positionY: -2,
					positionZ: -0.6,
				},
				duration: 1350,

				easing: 'EaseOut',
			},
		],
	],
});
module.exports = BallThrowAR;

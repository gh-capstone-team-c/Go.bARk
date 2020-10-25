/** @format */

import React from 'react';
import {
	Viro3DObject,
	Viro360Image,
	ViroPortalScene,
	ViroPortal,
	ViroSound,
	ViroAmbientLight,
	ViroParticleEmitter,
	ViroAnimations,
	ViroMaterials,
	ViroNode,
	ViroText,
} from 'react-viro';
var createReactClass = require('create-react-class');

const dog = {
	red: require('./res/dogColors/redDog.vrx'),
	blackTan: require('./res/dogColors/blackTanDog.vrx'),
	cream: require('./res/dogColors/creamDog.vrx'),
};
const scenes = [
	{
		scene: require('./res/360_park.jpg'),
		particles: require('./res/fallleaf.png'),
		parkAnim: 'frolic',
		sound: require('./sounds/birdsPark.mp3'),
	},
	{
		scene: require('./res/360_lake.jpeg'),
		/***temp variables */
		particles: require('./res/fallleaf.png'),
		parkAnim: 'frolic',
		sound: require('./sounds/birdsPark.mp3'),
	},
];

import socket from '../socket/socket';

export default WalkPortal = createReactClass({
	getInitialState() {
		return {
			user: {},
			addPoints: () => {},
			currentAnimation: 'waiting',
			position: [0, -5, 5],
			playWhistle: true,
			playSound: true,
			scene: scenes[Math.floor(Math.random() * scenes.length)],
		};
	},
	componentDidMount() {
		this.setState({
			user: this.props.user,
			addPoints: this.props.addPoints,
		});
	},
	//socket
	updatePoints() {
		this.state.addPoints({ points: this.state.user.points++ });
		socket.emit('updatePoints');
	},

	render() {
		if (this.state.user.id && this.state.scene) {
			const dogColor = this.state.user.dog.color;
			return (
				<ViroPortalScene
					passable={true}
					onPortalEnter={() => {
						this.updatePoints();
						this.setState({
							playSound: !this.state.playSound,
							currentAnimation: 'run',
						});
						setTimeout(() => {
							if (this.state.currentAnimation === 'run')
								this.setState({ currentAnimation: this.state.scene.parkAnim });
						}, 1500);
					}}
					onPortalExit={() => {
						this.updatePoints();
						this.setState({
							playSound: !this.state.playSound,
							playWhistle: !this.state.playWhistle,
							currentAnimation: 'return',
						});
						setTimeout(() => {
							if (this.state.currentAnimation === 'return')
								this.setState({
									currentAnimation: 'waiting',
									scene: scenes[Math.floor(Math.random() * scenes.length)],
								});
						}, 3000);
					}}
				>
					{/* render the portal  */}
					<ViroPortal position={[0, 0, 0]} scale={[3, 3, 3]}>
						<Viro3DObject
							source={require('./res/door/portal_wood_frame.vrx')}
							transformBehavious={['billboardY']}
							scale={[1, 1, 1]}
							materials={'door'}
							type="VRX"
						/>
					</ViroPortal>
					<Viro360Image source={this.state.scene.scene} />

					<ViroAmbientLight color={'#e8e0dc'} />

					{/* dog */}
					<Viro3DObject
						position={this.state.position}
						scale={[0.03, 0.03, 0.03]}
						rotation={[0, 0, 0]}
						source={dog[dogColor]}
						animation={{
							name: this.state.currentAnimation,
							run: true,
							interruptible: true,
							loop: true,
						}}
						type="VRX"
					/>
					<ViroParticleEmitter
						position={[0, 4.5, 0]}
						duration={2000}
						visible={true}
						delay={0}
						run={true}
						loop={true}
						fixedToEmitter={true}
						image={{
							source: this.state.scene.particles,
							height: 0.1,
							width: 0.1,
							bloomThreshold: 1.0,
						}}
						spawnBehavior={{
							particleLifetime: [4000, 4000],
							emissionRatePerSecond: [150, 200],
							spawnVolume: {
								shape: 'box',
								params: [20, 1, 20],
								spawnOnSurface: false,
							},
							maxParticles: 800,
						}}
						particleAppearance={{
							opacity: {
								initialRange: [0.8, 1.0],
								factor: 'Time',
								interpolation: [
									{ endValue: 0.7, interval: [0, 500] },
									{ endValue: 0.0, interval: [4000, 5000] },
								],
							},

							rotation: {
								initialRange: [0, 360],
								factor: 'Time',
								interpolation: [{ endValue: 1080, interval: [0, 5000] }],
							},

							scale: {
								initialRange: [
									[5, 5, 5],
									[10, 10, 10],
								],
								factor: 'Time',
								interpolation: [
									{ endValue: [3, 3, 3], interval: [0, 4000] },
									{ endValue: [0, 0, 0], interval: [4000, 5000] },
								],
							},
						}}
						particlePhysics={{
							velocity: {
								initialRange: [
									[-2, -0.5, 0],
									[2, -3.5, 0],
								],
							},
						}}
					/>
					{/* nav */}
					<ViroSound
						paused={this.state.playSound}
						muted={false}
						source={this.state.scene.sound}
						loop={true}
						volume={1.0}
					/>

					{/* whistle sound effects */}
					<ViroSound
						paused={this.state.playWhistle}
						muted={false}
						source={require('./sounds/whistle.mp3')}
						loop={false}
						onFinish={() => {
							this.setState({
								playWhistle: true,
							});
						}}
						volume={1.0}
					/>
				</ViroPortalScene>
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
});
ViroMaterials.createMaterials({
	door: {
		lightingModel: 'Blinn',
		diffuseTexture: require('./res/door/portal_wood_frame_diffuse.png'),
		specularTexture: require('./res/door/portal_wood_frame_specular.png'),
	},
});
ViroAnimations.registerAnimations({
	rotate: {
		properties: {
			rotateY: '+=90',
		},
		duration: 0, //0 seconds
	},
	frolic: [
		[
			{
				properties: { rotateY: 210 },
				duration: 500,
			},
			{
				properties: { positionX: '-=6.5', positionZ: '-=3.25' },
				duration: 500,
			},
			{
				properties: { rotateY: 180 },
				duration: 500,
			},
			{
				properties: { positionZ: '-=7.5' },
				duration: 500,
			},
			{
				properties: { rotateY: 150 },
				duration: 500,
			},
			{
				properties: { positionX: '+=6.5', positionZ: '-=3.25' },
				duration: 500,
			},
			{
				properties: { rotateY: 30 },
				duration: 500,
			},
			{
				properties: { positionX: '+=6.5', positionZ: '+=3.25' },
				duration: 500,
			},
			{
				properties: { rotateY: 0 },
				duration: 500,
			},
			{
				properties: { positionZ: '+=7.5' },
				duration: 500,
			},
			{
				properties: { rotateY: 330 },
				duration: 500,
			},
			{
				properties: { positionX: '-=6.5', positionZ: '+=3.25' },
				duration: 500,
			},
		],
	],
	run: {
		properties: { rotateY: 0, positionX: 5, positionZ: 30 },
		duration: 3000,
	},
	lookLeft: {
		properties: {
			rotateY: '+=10',
		},
		duration: 500,
	},
	lookRight: {
		properties: {
			rotateY: '-=10',
		},
		duration: 500,
	},
	waiting: [['lookLeft', 'lookRight']],
	return: {
		properties: {
			rotateY: 180,
			positionX: 0,
			positionZ: 5,
		},
		duration: 1500,
	},
});
module.exports = WalkPortal;

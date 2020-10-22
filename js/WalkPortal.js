/** @format */

import React from 'react';
import {
	ViroARScene,
	ViroNode,
	Viro3DObject,
	Viro360Image,
	ViroPortalScene,
	ViroPortal,
	ViroImage,
	ViroSound,
	ViroText,
	ViroAmbientLight,
	ViroParticleEmitter,
	ViroAnimations,
	ViroMaterials,
} from 'react-viro';
var createReactClass = require('create-react-class');

const dog = {
	red: require('./res/dogColors/redDog.vrx'),
	blackTan: require('./res/dogColors/blackTanDog.vrx'),
	cream: require('./res/dogColors/creamDog.vrx'),
};

export default WalkPortal = createReactClass({
	getInitialState() {
		return {
			user: this.props.user,
			addPoints: this.props.addPoints,
			playSound: true,
			currentAnimation: 'frolic',
		};
	},

	render() {
		const dogColor = this.state.user.dog.color;
		return (
			<ViroPortalScene
				passable={true}
				onPortalEnter={() => {
					this.state.addPoints({ points: this.state.user.points++ });
					this.setState({
						playSound: !this.state.playSound,
					});
				}}
				onPortalExit={() => {
					this.state.addPoints({ points: this.state.user.points++ });
					this.setState({
						playSound: !this.state.playSound,
					});
				}}
				// dragType="FixedDistance"
				// onDrag={() => {}}
			>
				{/* render the portal on the other side of the user */}
				<ViroPortal position={[3, -1, 2]} scale={[3, 3, 3]}>
					<Viro3DObject
						source={require('./res/door/portal_wood_frame.vrx')}
						rotation={[0, 0, 0]}
						scale={[1, 1, 1]}
						// resources={[
						// 	require('./res/door/InteriorDoor_Diffuce.jpg'),
						// 	require('./res/door/InteriorDoor_NRM.jpg'),
						// 	require('./res/door/InteriorDoor_SPEC.jpg'),
						// ]}
						materials={'door'}
						type="VRX"
					/>
				</ViroPortal>
				<Viro360Image source={require('./res/360_park.jpg')} />

				<ViroAmbientLight color={'#e8e0dc'} />

				{/* dog */}
				<ViroNode
					position={[0, -5, 10]}
					scale={[0.03, 0.03, 0.03]}
					rotation={[0, 0, 0]}
				>
					<Viro3DObject
						source={dog[dogColor]}
						/* position={[0, -10, -10]}
			scale={[0.1, 0.1, 0.1]} */
						animation={{
							name: this.state.currentAnimation,
							run: true,
							interruptible: true,
							loop: true,
						}}
						type="VRX"
					/>
				</ViroNode>
				<ViroParticleEmitter
					position={[0, 4.5, 0]}
					duration={2000}
					visible={true}
					delay={0}
					run={true}
					loop={true}
					fixedToEmitter={true}
					image={{
						source: require('./res/fallleaf.png'),
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
				<ViroSound
					paused={this.state.playSound}
					muted={false}
					source={require('./sounds/birdsPark.mp3')}
					loop={true}
					volume={1.0}
				/>
			</ViroPortalScene>
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
				properties: { rotateY: 300 },
				duration: 500,
			},
			{
				properties: { positionX: '+=40', positionZ: '-=20' },
				duration: 500,
			},
			{
				properties: { rotateY: 300 },
				duration: 500,
			},
			{
				properties: { positionZ: '+=40' },
				duration: 500,
			},
			{
				properties: { rotateY: 0 },
				duration: 500,
			},
			{
				properties: { positionX: '-=20', positionZ: '+=20' },
				duration: 500,
			},
			{
				properties: { rotateY: 60 },
				duration: 500,
			},
			{
				properties: { positionX: '-=20', positionZ: '-=20' },
				duration: 500,
			},
			{
				properties: { rotateY: 120 },
				duration: 500,
			},
			{
				properties: { positionZ: '+=40' },
				duration: 500,
			},
			{
				properties: { rotateY: 180 },
				duration: 500,
			},
			{
				properties: { positionX: '+=20', positionZ: '+=20' },
				duration: 500,
			},
		],
	],
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
});
module.exports = WalkPortal;

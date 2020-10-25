/** @format */

import React from 'react';
import {
	ViroNode,
	Viro3DObject,
	ViroText,
	ViroAmbientLight,
	ViroSpotLight,
	ViroSound,
	ViroMaterials,
} from 'react-viro';
import { Vibration } from 'react-native';
var createReactClass = require('create-react-class');

const dogStand = {
	red: require('./res/dogColors/redDog.vrx'),
	blackTan: require('./res/dogColors/blackTanDog.vrx'),
	cream: require('./res/dogColors/creamDog.vrx'),
};

import socket from '../socket/socket';

export default TugOfWar = createReactClass({
	getInitialState() {
		return {
			user: this.props.user,
			addPoints: this.props.addPoints,
			tugging: false,
			//sound effects
			playPoints: true,
			playBark: true,
			dogPosition: [-1, -3, -1],
			rotation: [0, 90, 0],
		};
	},
	componentWillUnmount() {
		console.log('Tug of War has unmounted!');
	},
	render() {
		const dogColor = this.state.user.dog.color;
		return (
			<ViroNode>
				{/****** scene items below ****** */}

				<ViroAmbientLight color={'#e8e0dc'} />
				{/* wrestle with your dog to get points! */}
				<ViroNode>
					<ViroSpotLight
						innerAngle={5}
						outerAngle={25}
						direction={[0, 0, 0]}
						color="rgb(245, 224, 183)"
						intensity={10000}
						castsShadow={true}
						shadowMapSize={2048}
						shadowNearZ={2}
						shadowFarZ={7}
						shadowOpacity={0.7}
					/>
					<Viro3DObject
						scale={[0.5, 0.5, 0.5]}
						source={require('./res/dogtoy/ringToy.vrx')}
						materials={'chewy'}
						type="VRX"
						onDrag={(position) => {
							if (this.state.tugging) {
								this.setState({
									dogPosition: [
										position[0] + 1.9,
										position[1] - 1.011,
										position[2] + 1.9,
									],
									rotation: position[0] >= -2 ? [0, 75, 0] : [0, 90, 0],
								});
								Vibration.vibrate();
							}
						}}
						interruptible={true}
						onClickState={this._wrestle}
					/>
				</ViroNode>
				<ViroNode>
					{/* dog */}
					{/* NEED TO ADD SPOTLIGHT */}
					<ViroSpotLight
						innerAngle={5}
						outerAngle={25}
						direction={[0, 0, 0]}
						color="rgb(245, 224, 183)"
						castsShadow={true}
						shadowMapSize={2048}
						shadowNearZ={2}
						shadowFarZ={7}
						shadowOpacity={0.7}
					/>
					<Viro3DObject
						position={this.state.dogPosition}
						scale={[0.03, 0.03, 0.03]}
						source={dogStand[dogColor]}
						type="VRX"
						rotation={this.state.rotation}
					/>
				</ViroNode>

				<ViroText
					text={'Drag to play tug of war with your dog!'}
					scale={[1, 1, 1]}
					position={[0, 1, 0]}
					transformBehaviors={['billboardY']}
				/>
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
				{/* dog bark sound effects */}
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
	},

	//socket
	updatePoints() {
		this.state.addPoints({ points: this.state.user.points++ });
		socket.emit('updatePoints');
	},
	_wrestle(stateValue, position, source) {
		if (stateValue === 1) {
			this.setState({ tugging: true });
		} else this.setState({ tugging: false });
		if (stateValue === 3) this.updatePoints();
		this.setState({
			playPoints: !this.state.playPoints,
		});
	},
});
ViroMaterials.createMaterials({
	chewy: {
		lightingModel: 'Lambert',
		normalTexture: require('./res/dogtoy/pink-bumpy-plastic-texture.jpg'),
	},
});
module.exports = TugOfWar;

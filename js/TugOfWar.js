/** @format */

import React from 'react';
import {
	ViroARScene,
	ViroNode,
	Viro3DObject,
	ViroImage,
	ViroARCamera,
	ViroText,
	ViroAmbientLight,
	ViroAnimatedImage,
	ViroSpotLight,
	ViroMaterials,
} from 'react-viro';
import { Vibration } from 'react-native';
var createReactClass = require('create-react-class');
import BallThrowAR, { sceneConsts, RenderMenu } from './BallThrowAR';
import FoodTime from './FoodTime';
import Walk from './Walk';

const dogStand = {
	red: require('./res/dogColors/redDog.vrx'),
	blackTan: require('./res/dogColors/blackTanDog.vrx'),
	cream: require('./res/dogColors/creamDog.vrx'),
};

export default TugOfWar = createReactClass({
	getInitialState() {
		return {
			user: this.props.user,
			addPoints: this.props.addPoints,
			tugging: false,
			dogPosition: [
				// this.props.towPosition[0],
				// this.props.towPosition[1],
				// this.props.towPosition[2],
				0,
				this.props.towPosition[1],
				0,
			],
		};
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
										position[0] + 2.2,
										position[1],
										position[2] + 2.2,
									],
								});
								Vibration.vibrate();
							}
						}}
						interruptible={true}
						onClickState={this._wrestle}
					/>

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
						transformBehaviors={['billboardY']}
						position={this.state.dogPosition}
						scale={[0.03, 0.03, 0.03]}
						source={dogStand[dogColor]}
						type="VRX"
					/>
				</ViroNode>

				<ViroText
					text={'Drag to play tug of war with your dog!'}
					scale={[1, 1, 1]}
					position={[0, 1, 0]}
					transformBehaviors={['billboardY']}
				/>
			</ViroNode>
		);
	},
	_wrestle(stateValue, position, source) {
		if (stateValue === 1) {
			this.setState({ tugging: true });
		} else this.setState({ tugging: false });
		if (stateValue === 3)
			this.state.addPoints({ points: this.state.user.points++ });
	},
});
ViroMaterials.createMaterials({
	chewy: {
		lightingModel: 'Lambert',
		normalTexture: require('./res/dogtoy/pink-bumpy-plastic-texture.jpg'),
	},
});
module.exports = TugOfWar;

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
import BallThrowAR from './BallThrowAR';
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
			dogScale: this.props.dogScale,
			scale: this.props.scale,
			dogPosition: this.props.dogPosition,
			mainPosition: this.props.mainPosition,
			walkPosition: this.props.walkPosition,
			foodPosition: this.props.foodPosition,
			towPosition: this.props.towPosition,
		};
	},

	render() {
		const dogColor = this.state.user.dog.color;
		return (
			<ViroARScene>
				<ViroNode
					dragType="FixedToWorld"
					position={this.state.towPosition}
					transformBehaviors={['billboardY']}
					key={'home'}
					ref={this._setARNodeRef}
					onDrag={() =>
						this.props.arSceneNavigator.push({
							scene: BallThrowAR,
						})
					}
				>
					<ViroAnimatedImage
						scale={[0.7, 0.7, 0.7]}
						height={1}
						width={1}
						source={require('./res/ball-icon.gif')}
						animation={{
							run: this.state.playAnim,
							loop: true,
							delay: 0,
						}}
					/>
				</ViroNode>
				<ViroNode
					position={this.state.walkPosition}
					transformBehaviors={['billboardY']}
					dragType="FixedToWorld"
					onDrag={() =>
						this.props.arSceneNavigator.push({
							scene: Walk,
							passProps: {
								user: this.props.user,
								addPoints: this.props.addPoints,
							},
						})
					}
				>
					<ViroAnimatedImage
						scale={[0.7, 0.7, 0.7]}
						height={1}
						width={1}
						source={{
							uri: 'https://media.giphy.com/media/WqFXkK7CsTReoyGwWd/giphy.gif',
						}}
						animation={{
							run: this.state.playAnim,
							loop: true,
							delay: 0,
						}}
					/>
				</ViroNode>
				<ViroNode
					dragType="FixedToWorld"
					position={this.state.foodPosition}
					transformBehaviors={['billboardY']}
					key={'food'}
					ref={this._setARNodeRef}
					onDrag={() =>
						this.props.arSceneNavigator.push({
							scene: FoodTime,
							passProps: {
								user: this.state.user,
								addPoints: this.state.addPoints,
							},
						})
					}
				>
					<ViroAnimatedImage
						scale={[0.7, 0.7, 0.7]}
						height={1}
						width={1}
						source={require('./res/dogBowlIcon.gif')}
						animation={{
							run: this.state.playAnim,
							loop: true,
							delay: 0,
						}}
					/>
				</ViroNode>
				<ViroAmbientLight color={'#e8e0dc'} />
				{/* wrestle with your dog to get points! */}
				<ViroNode position={this.state.mainPosition} scale={[0.7, 0.7, 0.7]}>
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
						source={require('./res/dogtoy/ringToy.vrx')}
						materials={'chewy'}
						type="VRX"
						onDrag={(position) => {
							if (this.state.tugging) {
								this.setState({
									dogPosition: [
										position[0],
										position[1] - 6.6,
										position[2] - 6,
									],
								});
								Vibration.vibrate();
							}
						}}
						interruptible={true}
						onClickState={this._wrestle}
					/>
				</ViroNode>

				{/* dog */}
				<ViroNode position={this.state.dogPosition} scale={this.state.dogScale}>
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
						source={dogStand[dogColor]}
						type="VRX"
						ignoreEventHandling={true}
					/>
				</ViroNode>

				<ViroText
					text={'Tap the bowl to play tug of war with your dog!'}
					scale={[1, 1, 1]}
					position={[0, 1, -4]}
				/>
			</ViroARScene>
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

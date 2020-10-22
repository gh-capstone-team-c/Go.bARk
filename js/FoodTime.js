/** @format */

import React from 'react';
import {
	ViroARScene,
	ViroNode,
	Viro3DObject,
	ViroText,
	ViroAmbientLight,
	ViroAnimatedImage,
	ViroSpotLight,
} from 'react-viro';
import BallThrowAR, { locationConstants } from './BallThrowAR';
var createReactClass = require('create-react-class');

const dogPose = {
	red: require('./res/dogPose/redDogEat.vrx'),
	blackTan: require('./res/dogPose/blackTanDogEat.vrx'),
	cream: require('./res/dogPose/creamDogEat.vrx'),
};

const dogStand = {
	red: require('./res/dogColors/redDog.vrx'),
	blackTan: require('./res/dogColors/blackTanDog.vrx'),
	cream: require('./res/dogColors/creamDog.vrx'),
};

export default FoodTime = createReactClass({
	getInitialState() {
		return {
			user: this.props.user,
			addPoints: this.props.addPoints,
			changePose: false,
			bowlScale: [0.25, 0.25, 0.25],
		};
	},

	render() {
		const dogColor = this.state.user.dog.color;
		let dog;
		this.state.changePose
			? (dog = dogPose[dogColor])
			: (dog = dogStand[dogColor]);
		return (
			/* this.state.changePose ? */ <ViroARScene>
				<ViroNode
					dragType="FixedToWorld"
					position={locationConstants.foodPosition}
					transformBehaviors={['billboardY']}
					key={'food'}
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
					position={locationConstants.walkPosition}
					transformBehaviors={['billboardY']}
					dragType="FixedToWorld"
					onDrag={() =>
						this.props.arSceneNavigator.push({
							scene: require('./Walk'),
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
					position={locationConstants.towPosition}
					transformBehaviors={['billboardY']}
					key={'tow'}
					ref={this._setARNodeRef}
					onDrag={() =>
						this.props.arSceneNavigator.push({
							scene: TugOfWar,
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
						source={require('./res/ropetoy.gif')}
						animation={{
							run: this.state.playAnim,
							loop: true,
							delay: 0,
						}}
					/>
				</ViroNode>
				<ViroAmbientLight color={'#e8e0dc'} />

				{/* food bowl & clicking on food bowl to get user points */}
				<ViroNode
					position={[
						this.props.dogPosition[0],
						this.props.dogPosition[1],
						this.props.dogPosition[2] + 5,
					]}
					scale={this.state.bowlScale}
					onClickState={this._onBowlClicked}
				>
					<Viro3DObject source={require('./res/dogBowl.vrx')} type="VRX" />
				</ViroNode>

				{/* dog */}
				<ViroNode
					position={locationConstants.dogPosition}
					scale={locationConstants.dogScale}
				>
					{/* NEED TO ADD SPOTLIGHT */}
					{/* <ViroSpotLight
            innerAngle={5}
            outerAngle={25}
            direction={[0, 0, 0]}
            // position={[0, 0, 0]}
            color="rgb(245, 224, 183)"
            castsShadow={true}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={7}
            shadowOpacity={0.7}
          /> */}
					{/* <Viro3DObject
            source={dog[dogColor]}
            type="VRX"
          /> */}

					<Viro3DObject source={dog} type="VRX" ignoreEventHandling={true} />
				</ViroNode>

				<ViroText
					text={'Tap the bowl to feed your dog!'}
					scale={[1, 1, 1]}
					position={[0, 1, -4]}
				/>
			</ViroARScene>
		);
	},

	_onBowlClicked() {
		const currentPose = this.state.changePose;
		this.setState({ changePose: !currentPose });
		this.state.addPoints({ points: this.state.user.points++ });
	},
});

module.exports = FoodTime;

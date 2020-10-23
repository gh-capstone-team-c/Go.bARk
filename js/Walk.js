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
	ViroAnimatedImage,
	ViroText,
	ViroAmbientLight,
} from 'react-viro';
var createReactClass = require('create-react-class');
import WalkPortal from './WalkPortal';
import BallThrowAR, { locationConstants } from './BallThrowAR';
import FoodTime from './FoodTime';
import TugOfWar from './TugOfWar';

const dog = {
	red: require('./res/dogColors/redDog.vrx'),
	blackTan: require('./res/dogColors/blackTanDog.vrx'),
	cream: require('./res/dogColors/creamDog.vrx'),
};

export default Walk = createReactClass({
	getInitialState() {
		return {
			user: this.props.user,
			addPoints: this.props.addPoints,
		};
	},

	render() {
		const dogColor = this.state.user.dog.color;
		return (
			<ViroARScene>
				<ViroAmbientLight color={'#e8e0dc'} />

				<ViroNode
					dragType="FixedToWorld"
					position={locationConstants.mainPosition}
					transformBehaviors={['billboardY']}
					key={'ball'}
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
					position={locationConstants.foodPosition}
					transformBehaviors={['billboardY']}
					dragType="FixedToWorld"
					onDrag={() =>
						this.props.arSceneNavigator.push({
							scene: FoodTime,
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
						source={require('./res/dogBowlIcon.gif')}
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

				<WalkPortal user={this.state.user} addPoints={this.state.addPoints} />
			</ViroARScene>
		);
	},
});

module.exports = Walk;

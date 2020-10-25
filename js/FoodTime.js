/** @format */

import React from 'react';
import {
	ViroARScene,
	ViroNode,
	Viro3DObject,
	ViroText,
	ViroAmbientLight,
	ViroAnimatedImage,
	ViroSound,
	ViroSpotLight,
} from 'react-viro';

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
			bowlScale: [0.05, 0.05, 0.05],
			bowlPosition: [
				this.props.foodPosition[0] - 3,
				this.props.foodPosition[1] - 3,
				this.props.foodPosition[2],
			],
			dogScale: [0.03, 0.03, 0.03],
		};
	},
	render() {
		const dogColor = this.state.user.dog.color;
		let dog;
		this.state.changePose
			? (dog = dogPose[dogColor])
			: (dog = dogStand[dogColor]);
		return (
			<ViroNode transformBehaviors={['billboardY']}>
				{/****** scene items below ****** */}
				<ViroAmbientLight color={'#e8e0dc'} />

				{/* food bowl & clicking on food bowl to get user points */}
				<ViroNode
					position={this.state.bowlPosition}
					scale={this.state.bowlScale}
				>
					<Viro3DObject
						onClick={this._onBowlClicked}
						source={require('./res/dogBowl.vrx')}
						type="VRX"
					/>
				</ViroNode>

				{/* dog */}
				<ViroNode
					position={[
						this.state.bowlPosition[0] - 0.1,
						this.state.bowlPosition[1],
						this.state.bowlPosition[2] - 1.1,
					]}
					scale={this.state.dogScale}
					ignoreEventHandling={true}
				>
					<Viro3DObject source={dog} type="VRX" ignoreEventHandling={true} />
				</ViroNode>

				<ViroText
					text={'Tap the bowl to feed your dog!'}
					scale={[1, 1, 1]}
					position={[4, 1, 0]}
				/>

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

	_onBowlClicked() {
		const currentPose = this.state.changePose;
		this.setState({
			changePose: !currentPose,
			playPoints: !this.state.playPoints,
		});
		this.state.addPoints({ points: this.state.user.points++ });
	},
});

module.exports = FoodTime;

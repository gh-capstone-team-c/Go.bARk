/** @format */

import React from 'react';
import {
	ViroNode,
	Viro3DObject,
	ViroText,
	ViroAmbientLight,
	ViroSound,
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
import socket from '../socket/socket';

export default FoodTime = createReactClass({
	getInitialState() {
		return {
			user: {},
			addPoints: () => {},
			changePose: false,
			//sound effects
			playPoints: true,
			playBark: true,
			bowlScale: [0.05, 0.05, 0.05],
			bowlPosition: [0, 0, 0],
			dogScale: [0.03, 0.03, 0.03],
		};
	},
	componentDidMount() {
		this.setState({
			user: this.props.user,
			addPoints: this.props.addPoints,
			bowlPosition: [
				this.props.foodPosition[0] - 3,
				this.props.foodPosition[1] - 3,
				this.props.foodPosition[2],
			],
		});
	},
	render() {
		if (this.state.user.id !== undefined) {
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
	_onBowlClicked() {
		const currentPose = this.state.changePose;
		this.setState({
			changePose: !currentPose,
			playPoints: !this.state.playPoints,
		});
		this.updatePoints();
	},
});

module.exports = FoodTime;

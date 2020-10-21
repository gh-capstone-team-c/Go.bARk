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
				<ViroPortal position={[0, 0, 2]} scale={[1, 1, 1]}>
					<Viro3DObject
						source={require('./res/portal/portal_picture_frame.vrx')}
						resources={[
							require('./res/portal/portal_picture_frame_diffuse.png'),
							require('./res/portal/portal_picture_frame_normal.png'),
							require('./res/portal/portal_picture_frame_specular.png'),
						]}
						type="VRX"
					/>
				</ViroPortal>
				<Viro360Image source={require('./res/360_park.jpg')} />

				<ViroAmbientLight color={'#e8e0dc'} />

				{/* dog */}
				<ViroNode
					position={[0, -5, 10]}
					scale={[0.03, 0.03, 0.03]}
					rotation={[0, 180, 0]}
				>
					<Viro3DObject
						source={dog[dogColor]}
						/* position={[0, -10, -10]}
            scale={[0.1, 0.1, 0.1]} */
						type="VRX"
					/>
				</ViroNode>

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

module.exports = WalkPortal;

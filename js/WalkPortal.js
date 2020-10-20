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
		};
	},

	render() {
		const dogColor = this.state.user.dog.color;
		return (
			<ViroPortalScene
				passable={true}
				onPortalEnter={() =>
					this.state.addPoints({ points: this.state.user.points++ })
				}
				onPortalExit={() =>
					this.state.addPoints({ points: this.state.user.points++ })
				}
				// dragType="FixedDistance"
				// onDrag={() => {}}
			>
				{/* render the portal on the other side of the user */}
				<ViroPortal position={[0, 0, 3]} scale={[1, 1, 1]}>
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
					position={[0, -10, 50]}
					scale={[0.1, 0.1, 0.1]}
					rotation={[0, 180, 0]}
				>
					<Viro3DObject
						source={dog[dogColor]}
						/* position={[0, -10, -10]}
            scale={[0.1, 0.1, 0.1]} */
						type="VRX"
					/>
				</ViroNode>
			</ViroPortalScene>
		);
	},
});

module.exports = WalkPortal;

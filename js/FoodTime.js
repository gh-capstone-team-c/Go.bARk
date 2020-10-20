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
} from 'react-viro';
var createReactClass = require('create-react-class');

const dog = {
	red: require('./res/dogColors/redDog.vrx'),
	blackTan: require('./res/dogColors/blackTanDog.vrx'),
	cream: require('./res/dogColors/creamDog.vrx'),
};

export default FoodTime = createReactClass({
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
				{/* <ViroARCamera>
          <ViroNode>
            <ViroImage
              height={0.04}
              width={0.04}
              source={require('./res/camera.png')}
              position={[0.08, -0.16, -0.3]}
            />
          </ViroNode>

          <ViroNode
            dragType="FixedToWorld"
            onDrag={() =>
              this.props.arSceneNavigator.push({
                scene: require('./BallThrowAR'),
              })
            }
          >
            <ViroImage
              height={0.05}
              width={0.05}
              source={require('./res/bone.png')}
              position={[-0.08, -0.16, -0.3]}
            />
          </ViroNode>
        </ViroARCamera> */}
				<ViroAmbientLight color={'#e8e0dc'} />
				{/* dog */}
				<ViroNode position={[0, -10, -20]} scale={[0.1, 0.1, 0.1]}>
					<Viro3DObject
						source={dog[dogColor]}
						/* position={[0, -10, -10]}
            scale={[0.1, 0.1, 0.1]} */
						type="VRX"
					/>
				</ViroNode>
				{/* food bowl & clicking on food bowl to get user points */}
				<ViroNode
					position={[0, -7, -10]}
					scale={[0.2, 0.2, 0.2]}
					onClick={() =>
						this.state.addPoints({ points: this.state.user.points++ })
					}
				>
					<Viro3DObject
						source={require('./res/Dog-Graphics/DogBowl_Food.vrx')}
						resources={[
							require('./res/Dog-Graphics/DogBowl_C.jpg'),
							// require('./res/Dog-Graphics/DogBowl_AO.png'),
							// require('./res/Dog-Graphics/DogBowl_Noormals.png'),
							// require('./res/Dog-Graphics/Dogbowl2_Specular.jpg'),
						]}
						type="VRX"
					/>
				</ViroNode>
				<ViroText
					text={'Tap the bowl to feed your dog!'}
					scale={[1, 1, 1]}
					position={[0, 1, -4]}
				/>
			</ViroARScene>
		);
	},
});

module.exports = FoodTime;

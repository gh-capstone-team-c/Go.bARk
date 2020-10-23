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
      dogPosition: [0, -10, -20],
      dogScale: [0.1, 0.1, 0.1],
      bowlScale: [0.25, 0.25, 0.25],
      bowlPosition: [0, -10, -15],
      walkPosition: [0, -1, 1.7],
      foodPosition: [2, -1, -0.7],
      towPosition: [-2, -1, -0.7],
  //sound effects
			playPoints: true,
			playBark: true,
    };
  },

  render() {
    const dogColor = this.state.user.dog.color;
    let dog;
    this.state.changePose
      ? (dog = dogPose[dogColor])
      : (dog = dogStand[dogColor]);
    return (
      <ViroARScene>
        {/* ballThrow R Arrow */}
        <ViroNode
          transformBehaviors={['billboardY']}
          position={[0.8, -0.5, -0.7]}
        >
          <ViroAnimatedImage
            scale={[0.7, 0.7, 0.7]}
            height={1}
            width={1}
            source={require('./res/gifs/ballThrowRArrow.gif')}
            position={[0, 0, 0]}
            animation={{
              loop: true,
              delay: 0,
            }}
          />
        </ViroNode>
        {/* ballThrow gif */}
        <ViroNode
          position={this.state.foodPosition}
          transformBehaviors={['billboardY']}
          dragType="FixedToWorld"
          onDrag={() => {
            this.setState({ ...this.state, playBark: !this.state.playBark });
            this.props.arSceneNavigator.push({
              scene: require('./BallThrowAR'),
              passProps: {
                user: this.state.user,
                addPoints: this.state.addPoints,
              },
            })
          }}
        >
          <ViroAnimatedImage
            scale={[0.7, 0.7, 0.7]}
            height={1}
            width={1}
            source={require('./res/gifs/ballThrowGif.gif')}
            position={[0, 0, 0]}
            animation={{
              loop: true,
              delay: 0,
            }}
          />
        </ViroNode>
        {/* walk L Arrow */}
        <ViroNode
          transformBehaviors={['billboardY']}
          position={[-1, -0.4, 0.3]}
        >
          <ViroAnimatedImage
            scale={[0.7, 0.7, 0.7]}
            height={1}
            width={1}
            source={require('./res/gifs/walkLArrow.gif')}
            position={[0, 0, 0]}
            animation={{
              loop: true,
              delay: 0,
            }}
          />
        </ViroNode>
        {/* walk R Arrow */}
        <ViroNode transformBehaviors={['billboardY']} position={[1, -0.4, 0.6]}>
          <ViroAnimatedImage
            scale={[0.7, 0.7, 0.7]}
            height={1}
            width={1}
            source={require('./res/gifs/walkRArrow.gif')}
            position={[0, 0, 0]}
            animation={{
              loop: true,
              delay: 0,
            }}
          />
        </ViroNode>
        {/* walk gif */}
        <ViroNode
          position={this.state.walkPosition}
          transformBehaviors={['billboardY']}
          dragType="FixedToWorld"
          onDrag={() =>
            this.props.arSceneNavigator.push({
              scene: require('./Walk'),
              passProps: {
                user: this.state.user,
                addPoints: this.state.addPoints,
              },
            })
          }
        >
          <ViroAnimatedImage
            scale={[0.8, 0.8, 0.8]}
            height={1}
            width={1}
            source={require('./res/gifs/walkGif.gif')}
            position={[0, 0, 0]}
            animation={{
              loop: true,
              delay: 0,
            }}
          />
        </ViroNode>
        {/* tugOfWar L Arrow */}
        <ViroNode
          transformBehaviors={['billboardY']}
          position={[-0.7, -0.5, -0.7]}
        >
          <ViroAnimatedImage
            scale={[0.7, 0.7, 0.7]}
            height={1}
            width={1}
            source={require('./res/gifs/tugOfWarLArrow.gif')}
            position={[0, 0, 0]}
            animation={{
              loop: true,
              delay: 0,
            }}
          />
        </ViroNode>
        {/* tugOfWar gif */}
        <ViroNode
          position={this.state.towPosition}
          transformBehaviors={['billboardY']}
          dragType="FixedToWorld"
          onDrag={() =>
            this.props.arSceneNavigator.push({
              scene: require('./TugOfWar'),
              passProps: {
                user: this.state.user,
                addPoints: this.state.addPoints,
              },
            })
          }
        >
          <ViroAnimatedImage
            scale={[0.8, 0.8, 0.8]}
            height={1}
            width={1}
            source={require('./res/gifs/towGif.gif')}
            position={[0, 0, 0]}
            animation={{
              loop: true,
              delay: 0,
            }}
          />
        </ViroNode>
        <ViroAmbientLight color={'#e8e0dc'} />

				{/* food bowl & clicking on food bowl to get user points */}
				<ViroNode
					position={this.state.bowlPosition}
					scale={this.state.bowlScale}
					onClickState={this._onBowlClicked}
				>
					<Viro3DObject source={require('./res/dogBowl.vrx')} type="VRX" />
				</ViroNode>

				{/* dog */}
				<ViroNode position={this.state.dogPosition} scale={this.state.dogScale}>
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

					<Viro3DObject
						position={[0, -10, -20]}
						source={dog}
						type="VRX"
						ignoreEventHandling={true}
					/>
				</ViroNode>

				<ViroText
					text={'Tap the bowl to feed your dog!'}
					scale={[1, 1, 1]}
					position={[0, 1, -4]}
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
			</ViroARScene>
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

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
    };
  },

  render() {
    const dogColor = this.state.user.dog.color;
    return (
      <ViroARScene>
        <ViroARCamera>
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
            <ViroAnimatedImage
              height={0.05}
              width={0.05}
              source={require('./res/dogBowlIcon.gif')}
              // source={require('./res/bone.png')}
              position={[-0.07, -0.16, -0.3]}
            />
          </ViroNode>
        </ViroARCamera>
        <ViroAmbientLight color={'#e8e0dc'} />

        {/* food bowl & clicking on food bowl to get user points */}
        <ViroNode
          position={[0, -7, -10]}
          scale={[0.19, 0.19, 0.19]}
          onClick={() =>
            this.state.addPoints({ points: this.state.user.points++ })
          }
        >
          <Viro3DObject source={require('./res/dogBowl.vrx')} type="VRX" />
        </ViroNode>

        {/* dog */}
        <ViroNode position={[0, -10, -20]} scale={[0.13, 0.13, 0.13]}>
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
          <Viro3DObject source={dogPose[dogColor]} type="VRX" />
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

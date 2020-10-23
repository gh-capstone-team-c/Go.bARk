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
var createReactClass = require('create-react-class');

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
      walkPosition: [0, -1, 1.7],
      foodPosition: [2, -1, -0.7],
      towPosition: [-2, -1, -0.7],
    };
  },

  render() {
    const dogColor = this.state.user.dog.color;
    return (
      <ViroARScene>
        {/* ballThrow L Arrow */}
        <ViroNode
          transformBehaviors={['billboardY']}
          position={[-0.6, -0.5, -0.7]}
        >
          <ViroAnimatedImage
            scale={[0.7, 0.7, 0.7]}
            height={1}
            width={1}
            source={require('./res/gifs/ballThrowArrow.gif')}
            position={[0, 0, 0]}
            animation={{
              loop: true,
              delay: 0,
            }}
          />
        </ViroNode>
        {/* ballThrow gif */}
        <ViroNode
          position={this.state.towPosition}
          transformBehaviors={['billboardY']}
          dragType="FixedToWorld"
          onDrag={() =>
            this.props.arSceneNavigator.push({
              scene: require('./BallThrowAR'),
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
          position={[-0.9, -0.4, 0.3]}
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
        {/* foodTime R Arrow */}
        <ViroNode
          transformBehaviors={['billboardY']}
          position={[0.7, -0.5, -0.7]}
        >
          <ViroAnimatedImage
            scale={[0.7, 0.7, 0.7]}
            height={1}
            width={1}
            source={require('./res/gifs/foodTimeRArrow.gif')}
            position={[0, 0, 0]}
            animation={{
              loop: true,
              delay: 0,
            }}
          />
        </ViroNode>
        {/* foodTime gif */}
        <ViroNode
          position={this.state.foodPosition}
          transformBehaviors={['billboardY']}
          dragType="FixedToWorld"
          onDrag={() =>
            this.props.arSceneNavigator.push({
              scene: require('./FoodTime'),
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
            source={require('./res/gifs/dogBowlIcon.gif')}
            position={[0, 0, 0]}
            animation={{
              loop: true,
              delay: 0,
            }}
          />
        </ViroNode>
        <ViroAmbientLight color={'#e8e0dc'} />

        {/* wrestle with your dog to get points! */}
        <ViroNode
          position={[0, -6, -13]}
          scale={[0.29, 0.29, 0.29]}
          onClickState={this._wrestle}
        >
          <Viro3DObject
            source={require('./res/obj/obj.obj')}
            resources={[require('./res/textures/fabric.jpg')]}
            materials={'fabric'}
            type="OBJ"
          />
        </ViroNode>

        {/* dog */}
        <ViroNode position={[0, -10, -30]} scale={[0.2, 0.2, 0.2]}>
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
            source={dogStand[dogColor]}
            type="VRX"
            ignoreEventHandling={true}
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
  _wrestle(stateValue, position, source) {
    if (stateValue === 1) {
      this.setState({ tugging: true });
    } else this.setState({ tugging: false });
  },
});
ViroMaterials.createMaterials({
  fabric: {
    lightingModel: 'Lambert',
    diffuseTexture: require('./res/textures/fabric.jpg'),
  },
});
module.exports = TugOfWar;

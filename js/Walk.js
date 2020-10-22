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
var WalkPortal = require('./WalkPortal');

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

        <ViroText
          text={'Hope you had a nice walk!'}
          scale={[1, 1, 1]}
          position={[0, 1, -4]}
        />

        <ViroText
          text={'Swipe to go home'}
          scale={[1, 1, 1]}
          position={[0, 0, -4]}
          onDrag={() =>
            this.props.arSceneNavigator.push({
              scene: require('./BallThrowAR'),
            })
          }
        />

        <ViroNode
          position={[-1, 0, 2]}
          // this.state.addPoints({ points: this.state.user.points++ });
          onDrag={() =>
            this.props.arSceneNavigator.push({
              scene: require('./BallThrowAR'),
            })
          }
          scale={[1, 1, 1]}
          transformBehaviors={['billboardY']}
        >
          <ViroAnimatedImage
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            animation={{
              run: this.state.playAnim,
              loop: true,
              delay: 0,
            }}
            height={1}
            width={1}
            source={require('./res/gifs/walkGif.gif')}
          />
        </ViroNode>

        <WalkPortal user={this.state.user} addPoints={this.state.addPoints} />
      </ViroARScene>
    );
  },
});

module.exports = Walk;

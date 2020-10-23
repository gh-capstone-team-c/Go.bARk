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
import BallThrowAR from './BallThrowAR';
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
      dogScale: this.props.dogScale,
      scale: this.props.scale,
      dogPosition: this.props.dogPosition,
      mainPosition: this.props.mainPosition,
      walkPosition: this.props.walkPosition,
      foodPosition: this.props.foodPosition,
      towPosition: this.props.towPosition,
    };
  },

  render() {
    const dogColor = this.state.user.dog.color;
    return (
      <ViroARScene>
        <ViroAmbientLight color={'#e8e0dc'} />
        {/* ballThrow R Arrow flipped */}
        <ViroAnimatedImage
          scale={[0.7, 0.7, 0.7]}
          height={1}
          width={1}
          source={require('./res/gifs/ballThrowRArrow.gif')}
          transformBehaviors={['billboardY']}
          position={[-0.6, -0.5, -0.7]}
          animation={{
            loop: true,
            delay: 0,
          }}
        />
        {/* ballThrow L Arrow  flipped*/}
        <ViroAnimatedImage
          scale={[0.7, 0.7, 0.7]}
          height={1}
          width={1}
          source={require('./res/gifs/ballThrowArrow.gif')}
          transformBehaviors={['billboardY']}
          position={[0.8, -0.5, -0.7]}
          animation={{
            loop: true,
            delay: 0,
          }}
        />
        <ViroNode
          dragType="FixedToWorld"
          position={[0, -1, -2]}
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
            source={require('./res/gifs/ballThrowGif.gif')}
            animation={{
              run: this.state.playAnim,
              loop: true,
              delay: 0,
            }}
          />
        </ViroNode>
        {/* foodTime L Arrow */}
        <ViroAnimatedImage
          scale={[0.7, 0.7, 0.7]}
          height={1}
          width={1}
          source={require('./res/gifs/foodTimeLArrow.gif')}
          position={[1, -0.4, 0.4]}
          transformBehaviors={['billboardY']}
          animation={{
            loop: true,
            delay: 0,
          }}
        />
        <ViroNode
          position={this.state.foodPosition}
          transformBehaviors={['billboardY']}
          dragType="FixedToWorld"
          onDrag={() =>
            this.props.arSceneNavigator.push({
              scene: FoodTime,
              passProps: {
                user: this.props.user,
                addPoints: this.props.addPoints,
                dogScale: this.props.dogScale,
                scale: this.props.scale,
                dogPosition: this.props.dogPosition,
                mainPosition: this.props.mainPosition,
                walkPosition: this.props.walkPosition,
                foodPosition: this.props.foodPosition,
                towPosition: this.props.towPosition,
              },
            })
          }
        >
          <ViroAnimatedImage
            scale={[0.7, 0.7, 0.7]}
            height={1}
            width={1}
            source={require('./res/gifs/dogBowlIcon.gif')}
            animation={{
              run: this.state.playAnim,
              loop: true,
              delay: 0,
            }}
          />
        </ViroNode>
        <ViroNode
          dragType="FixedToWorld"
          position={this.state.towPosition}
          transformBehaviors={['billboardY']}
          key={'tow'}
          ref={this._setARNodeRef}
          onDrag={() =>
            this.props.arSceneNavigator.push({
              scene: TugOfWar,
              passProps: {
                user: this.state.user,
                addPoints: this.state.addPoints,
                dogScale: this.props.dogScale,
                scale: this.props.scale,
                dogPosition: this.props.dogPosition,
                mainPosition: this.props.mainPosition,
                walkPosition: this.props.walkPosition,
                foodPosition: this.props.foodPosition,
                towPosition: this.props.towPosition,
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

        <WalkPortal
          user={this.state.user}
          addPoints={this.state.addPoints}
          walkPosition={this.state.walkPosition}
        />
      </ViroARScene>
    );
  },
});

module.exports = Walk;

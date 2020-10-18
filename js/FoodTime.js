import React, { Component } from 'react';
import { ViroARScene, ViroNode, Viro3DObject } from 'react-native';
var createReactClass = require('create-react-class');

export default FoodTime = createReactClass({
  render() {
    return (
      <ViroARScene>
        <ViroNode position={[0, -10, -20]} scale={[0.1, 0.1, 0.1]}>
          <Viro3DObject
            source={require('./res/dogColors/creamDog.vrx')}
            type="VRX"
          />
          {/* <Viro3DObject
            source={require('./res/Dog-Graphics/DogBowl_NoFood.vrx')}
            resources={[
              require('./res/Dog-Graphics/Dogbowl2_UV.png'),
              require('./res/Dog-Graphics/Dogbowl2_Specular.jpg'),
              require('./res/Dog-Graphics/DogBowl_Noormals.png'),
              require('./res/Dog-Graphics/DogBowl_AO.png'),
            ]}
            position={[0, 0, 0]}
            scale={[0.02, 0.02, 0.02]}
            type="VRX"
          /> */}
        </ViroNode>
      </ViroARScene>
    );
  },
});

module.exports = FoodTime;

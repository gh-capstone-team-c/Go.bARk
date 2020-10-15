import React, { Component } from 'react';
import { ViroScene, ViroNode, Viro3DObject } from 'react-native';

export default class FoodTime extends Component {
  render() {
    return (
      <ViroScene>
        <ViroNode position={[0, 0, 0]}>
          <Viro3DObject
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
          />
        </ViroNode>
      </ViroScene>
    );
  }
}

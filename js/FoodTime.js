import React from 'react';
import {
  ViroARScene,
  ViroNode,
  Viro3DObject,
  ViroImage,
  ViroARCamera,
  ViroText,
} from 'react-viro';
var createReactClass = require('create-react-class');

export default FoodTime = createReactClass({
  getInitialState() {
    return {
      //dog: this.props.dog,
      dog: '',
    };
  },

  render() {
    return (
      <ViroARScene>
        <ViroARCamera>
          <ViroImage
            height={0.5}
            width={0.5}
            source={require('./res/camera.png')}
            position={[1.8, -3.4, -6]}
            onDrag={this._onPress}
          />
          <ViroNode
            dragType="FixedToWorld"
            onDrag={() =>
              this.props.arSceneNavigator.push({
                scene: require('./BallThrowAR'),
              })
            }
          >
            <ViroImage
              height={0.5}
              width={0.5}
              source={require('./res/bone.png')}
              position={[-1.2, -2.8, -5]}
            />
          </ViroNode>
        </ViroARCamera>
        <ViroText
          text={'On Food Time Page'}
          scale={[1, 1, 1]}
          position={[0, 0, -4]}
        />
        {/* <ViroNode position={[0, -10, -20]} scale={[0.1, 0.1, 0.1]}> */}

        {/* <Viro3DObject
            source={this.props.dog}
            position={[0, -10, -20]}
            scale={[0.1, 0.1, 0.1]}
            type="VRX"
          /> */}
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
        {/* </ViroNode> */}
      </ViroARScene>
    );
  },
  // _onPress() {
  //   // alert('you pressed me');
  //   this.props.arSceneNavigator.push({ scene: require('./BallThrowAR') });
  // },
});

module.exports = FoodTime;

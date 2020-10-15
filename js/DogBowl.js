import React from 'react';
import { Button } from 'react-native';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  captureScreen,
  ViroNode,
  Viro3DObject,
  ViroScene,
} from 'react-native';
import { ViroARScene, ViroARSceneNavigator } from 'react-viro';
import FoodTime from './FoodTime';

export default class DogBowl extends React.Component {
  constructor(props) {
    super(props);
    this._testPress = this._testPress.bind(this);
  }

  _testPress() {
    // alert('it worked!');
    return (
      <View
        style={{
          position: 'absolute',
          top: 100,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <TouchableOpacity>
          <Button
            style={{ fontSize: 35 }}
            onPress={this._testPress}
            title="🦴"
          />
        </TouchableOpacity>
        <ViroARSceneNavigator initialScene={{ scene: FoodTime }} />
      </View>
    );
  }

  render() {
    return (
      <View>
        <TouchableOpacity>
          <Button
            style={{ fontSize: 35 }}
            onPress={this._testPress}
            title="🦴"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

var dogBowl = StyleSheet.create({});

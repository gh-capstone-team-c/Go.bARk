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
import { ViroARCamera, ViroImage } from 'react-viro';
import { appStyles } from '../Styles';
// import FoodTime from './FoodTime';
// var FoodTime = require('./FoodTime');

export default class DogBowl extends React.Component {
  constructor(props) {
    super(props);
    // this._testPress = this._testPress.bind(this);
  }

  // _testPress() {
  //   const type = typeof FoodTime;
  //   alert(type);
  // }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.changeScene}>
          <Text style={appStyles.menuButton}>🦴</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

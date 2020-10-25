import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { appStyles } from '../Styles';
import LoginIos from './Login-ios';
import LoginAndroid from './Login-android';

export default class HowToPlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFriends: false,
    };
  }

  render() {
    return this.state.back ? (
      returnLogin
    ) : (
      <View>
        {this.state.showFriends ? (
          <View style={appStyles.container}>
            <Text style={appStyles.titleText}>Friends</Text>
            {/* put directions on friends */}
            <TouchableOpacity
              onPress={() => {
                this.setState({ showFriends: false });
              }}
              style={appStyles.rectButton}
            >
              <Text style={appStyles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={appStyles.titleText}>
            <Text style={appStyles.titleText}>How To Play: </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({ showFriends: true });
              }}
              style={appStyles.rectButton}
            >
              <Text style={appStyles.buttonText}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.back}
              style={appStyles.rectButton}
            >
              <Text style={appStyles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

module.exports = HowToPlay;

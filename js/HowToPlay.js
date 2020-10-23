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
      back: false,
      showScreenInputs: false,
    };
  }

  render() {
    let returnLogin;
    this.props.phone === 'anroid'
      ? (returnLogin = (
          <View>
            <LoginAndroid />
          </View>
        ))
      : (returnLogin = (
          <View>
            <LoginIos />
          </View>
        ));
    return this.state.back ? (
      returnLogin
    ) : (
      <View>
        {this.state.showMaps ? (
          <View style={appStyles.container}>
            <Text style={appStyles.titleText}>How to Play in each Scene</Text>
            {/* put directions on how to interact with screen */}
            <TouchableOpacity
              onPress={() => {
                this.setState({ showScreenInputs: false });
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
                this.setState({ showScreenInputs: true });
              }}
              style={appStyles.rectButton}
            >
              <Text style={appStyles.buttonText}>Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ back: true });
              }}
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

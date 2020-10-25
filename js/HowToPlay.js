import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { appStyles } from '../Styles';
import { Friends, Activities, Points } from './Directions';

export default class HowToPlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFriends: false,
      showActivities: false,
      showPoints: false,
    };
    this.changeFriends = this.changeFriends.bind(this);
    this.changeActivities = this.changeActivities.bind(this);
    this.changePoints = this.changePoints.bind(this);
  }

  changeFriends() {
    this.setState({ showFriends: !this.state.showFriends });
  }

  changeActivities() {
    this.setState({ showActivities: !this.state.showActivities });
  }

  changePoints() {
    this.setState({ showPoints: !this.state.showPoints });
  }

  render() {
    return (
      <View>
        {this.state.showPoints ? (
          <View>
            <Points changePoints={this.changePoints} />
          </View>
        ) : this.state.showActivities ? (
          <View>
            <Activities changeActivities={this.changeActivities} />
          </View>
        ) : this.state.showFriends ? (
          <View>
            <Friends changeFriends={this.changeFriends} />
          </View>
        ) : (
          <View style={appStyles.container}>
            <Text style={appStyles.titleText}>How To Play: </Text>
            <TouchableOpacity
              onPress={this.changeActivities}
              style={appStyles.rectButton}
            >
              <Text style={appStyles.buttonText}>Care Tips</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.changePoints}
              style={appStyles.rectButton}
            >
              <Text style={appStyles.buttonText}>Happy Points</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.changeFriends}
              style={appStyles.rectButton}
            >
              <Text style={appStyles.buttonText}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.back}
              style={appStyles.howToButton}
            >
              <Text style={appStyles.buttonText}>Back to login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

module.exports = HowToPlay;

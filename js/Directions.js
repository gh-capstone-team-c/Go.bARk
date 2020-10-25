import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { appStyles } from '../Styles';

export class Friends extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={appStyles.container}>
        <Text style={appStyles.titleText}>Friends</Text>
        <View style={appStyles.centerDirectionsContainers}>
          <Text style={[{ fontSize: 20 }, appStyles.centerText]}>
            Using the friends option in the menu, connect with friends to show
            off how well you are taking care of your dog. If you click on
            following, you can see how many of your friends you are following
            and if you click on followers, you can see how many friends are
            following you. However, if you click on all users at the top of
            friends, you can see all the dog owners you have yet to make your
            new friend.
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.props.changeFriends}
          style={appStyles.rectButton}
        >
          <Text style={appStyles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export class Activities extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={appStyles.container}>
        <Text style={appStyles.titleText}>Care Tips</Text>
        <View style={appStyles.centerDirectionsContainers}>
          <Text style={[{ fontSize: 15 }, appStyles.centerText]}>
            Just like any other dog, your dog needs care! As you move your
            camera around you will see various icons representing the different
            care you can give to your dog. Tap on the icon to give your dog that
            care.
          </Text>
        </View>
        <Text
          style={[{ fontSize: 20, color: '#e8e0dc' }, appStyles.centerText]}
        >
          Fetch - Tennis Ball
        </Text>
        <View style={appStyles.centerDirectionsContainers}>
          <Text style={[{ fontSize: 15 }, appStyles.centerText]}>
            Tap the ball on the screen and watch as your dog fetches and brings
            the ball back to you!
          </Text>
        </View>

        <Text
          style={[{ fontSize: 20, color: '#e8e0dc' }, appStyles.centerText]}
        >
          Tug of War - Rope Toy
        </Text>
        <View style={appStyles.centerDirectionsContainers}>
          <Text style={[{ fontSize: 15 }, appStyles.centerText]}>
            Drag the pink ring toy around to play tug of war with your dog!
          </Text>
        </View>

        <Text
          style={[{ fontSize: 20, color: '#e8e0dc' }, appStyles.centerText]}
        >
          Walk - Leash
        </Text>
        <View style={appStyles.centerDirectionsContainers}>
          <Text style={[{ fontSize: 15 }, appStyles.centerText]}>
            Follow your dog outside to walk them around and give them time to
            stretch their legs!
          </Text>
        </View>

        <Text
          style={[{ fontSize: 20, color: '#e8e0dc' }, appStyles.centerText]}
        >
          Feed - Dog Bowl
        </Text>
        <View style={appStyles.centerDirectionsContainers}>
          <Text style={[{ fontSize: 15 }, appStyles.centerText]}>
            Tap the bowl to feed your dog. Remember dogs need to be fed
            regularly!
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.props.changeActivities}
          style={appStyles.rectButton}
        >
          <Text style={appStyles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export class Points extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={appStyles.container}>
        <Text style={appStyles.titleText}>Happy Points</Text>
        <View style={appStyles.centerDirectionsContainers}>
          <Text style={[{ fontSize: 20 }, appStyles.centerText]}>
            As you play and care for your dog, you may notice the heart in the
            upper left corner of your screen change color. This heart reflects
            your dog's happiness! The more you care for your dog, the happier
            your dog will be, which will strengthen the bond between you.
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.props.changePoints}
          style={appStyles.rectButton}
        >
          <Text style={appStyles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

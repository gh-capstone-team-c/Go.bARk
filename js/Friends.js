/** @format */

import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { appStyles } from '../Styles';
import { connect } from 'react-redux';
import { getUsers } from '../store/allUsers';
import { addFollowing, removeFollowing } from '../store/users';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      myFriends: true,
      following: true,
      friendIds: {},
    };
    this.filterUsers = this.filterUsers.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
    this.filterUsers();
    this.setState({
      loading: false,
    });
  }
  filterUsers() {
    let tempIDs = {};

    this.props.user.following &&
      this.props.user.following.map((user) => {
        if (!tempIDs[user.id]) tempIDs[user.id] = true;
      });
    this.setState({ ...this.state, friendIds: tempIDs });
  }

  render() {
    return (
      <View style={appStyles.individualMenu}>
        {this.state.loading && <Text>Loading!</Text>}
        <TouchableOpacity onPress={() => this.setState({ myFriends: true })}>
          <Text style={appStyles.centerText}>My Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ myFriends: false })}>
          <Text style={appStyles.centerText}>All Users</Text>
        </TouchableOpacity>

        {/* if my friends is true, display the following/followers */}
        {this.state.myFriends ? (
          <View>
            <View style={appStyles.followingFollowerContainer}>
              <TouchableOpacity
                onPress={() => this.setState({ following: true })}
              >
                <Text>Following</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ following: false })}
              >
                <Text>Followers</Text>
              </TouchableOpacity>
            </View>

            {/* toggle between following/followers */}
            {this.state.following ? (
              <View>
                <Text style={appStyles.centerText}>
                  Currently Viewing: Following
                </Text>

                <View>
                  {this.props.user.following &&
                    this.props.user.following
                      .sort((a, b) => {
                        return b.points - a.points;
                      })
                      .map((user) => {
                        let heart = '🤍';
                        if (user.points >= 5) heart = '🧡';
                        if (user.points >= 10) heart = '💛';
                        if (user.points >= 15) heart = '💚';
                        if (user.points >= 30) heart = '💖';

                        return (
                          <View
                            style={appStyles.friendsContainer}
                            key={user.id}
                          >
                            <View style={appStyles.friendInfo}>
                              <Image
                                style={appStyles.tinyImage}
                                source={{ uri: user.imageUrl }}
                              />
                              <Text style={appStyles.centerText}>
                                {user.email}
                              </Text>
                            </View>
                            <View style={appStyles.pointsAndRemove}>
                              <Text
                                style={[
                                  { fontSize: 20 },
                                  appStyles.centerTextLessPadding,
                                ]}
                              >
                                {heart} points: {user.points}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                </View>
              </View>
            ) : (
              <View>
                <Text style={appStyles.centerText}>
                  Currently Viewing: Followers
                </Text>

                <View>
                  {this.props.user.follower &&
                    this.props.user.follower
                      .sort((a, b) => {
                        return b.points - a.points;
                      })
                      .map((user) => {
                        let heart = '🤍';
                        if (user.points >= 5) heart = '🧡';
                        if (user.points >= 10) heart = '💛';
                        if (user.points >= 15) heart = '💚';
                        if (user.points >= 30) heart = '💖';

                        return (
                          <View
                            style={appStyles.friendsContainer}
                            key={user.id}
                          >
                            <View style={appStyles.friendInfo}>
                              <Image
                                style={appStyles.tinyImage}
                                source={{ uri: user.imageUrl }}
                              />
                              <Text style={appStyles.centerText}>
                                {user.email}
                              </Text>
                            </View>
                            <View style={appStyles.pointsAndRemove}>
                              <Text
                                style={[
                                  { fontSize: 20 },
                                  appStyles.centerTextLessPadding,
                                ]}
                              >
                                {heart} points: {user.points}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                </View>
              </View>
            )}
          </View>
        ) : (
          // if my friends is false, show all the users--need to make it so you only show the users who i don't follow
          <View>
            {this.props.allUsers
              .filter(
                (person) =>
                  !this.state.friendIds[person.id] &&
                  person.id !== this.props.user.id &&
                  person.id !== 1
              )
              .sort((a, b) => {
                return b.points - a.points;
              })
              .map((user) => {
                let heart = '🤍';
                if (user.points >= 5) heart = '🧡';
                if (user.points >= 10) heart = '💛';
                if (user.points >= 15) heart = '💚';
                if (user.points >= 30) heart = '💖';

                return (
                  <View styles={appStyles.friendContainer} key={user.id}>
                    <Image
                      style={appStyles.tinyImage}
                      source={{ uri: user.imageUrl }}
                    />
                    <Text style={appStyles.centerText}>{user.email}</Text>
										<Text style={[{ fontSize: 30 }, appStyles.centerText]}>
											{heart} points: {user.points}
										</Text>

										<TouchableOpacity
											onPress={() => {
												this.props.addFollowing(user.id, user);
												let newIds = this.state.friendIds;
												newIds[user.id] = true;
												this.setState({ ...this.state, friendIds: newIds });
											}}
										>
											<Text>Follow!</Text>
										</TouchableOpacity>
									</View>
								);
							})}
					</View>
				)}
			</View>
		);
	}
}

// connect to redux
const mapState = (state) => {
	return {
		allUsers: state.allUsers,
		user: state.user,
	};
};

const mapDispatch = (dispatch) => {
	return {
		getUsers: () => dispatch(getUsers()),
		addFollowing: (id, obj) => dispatch(addFollowing(id, obj)),
		removeFollowing: (id, obj) => dispatch(removeFollowing(id, obj)),
	};
};

export default connect(mapState, mapDispatch)(Friends);

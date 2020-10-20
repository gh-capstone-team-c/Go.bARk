/** @format */

import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Points from './Points';
import { updateUser, updateDog } from '../store/users';
import { appStyles } from '../Styles';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editSettings: false,
      email: '',
      name: '',
      color: '',
    };
  }

  render() {
    return (
      <View style={appStyles.individualMenu}>
        {!this.state.editSettings ? (
          <>
            <Text style={appStyles.centerText}>
              Dog: {this.props.user.dog ? this.props.user.dog.name : 'Loading!'}
            </Text>
            {this.props.user ? (
              <View>
                <Text style={appStyles.centerText}>
                  Email: {this.props.user.email}
                </Text>
                <Text style={appStyles.centerText}>
                  Points: {this.props.user.points}
                </Text>
                <Points style={{ justifyContent: 'center' }} />
              </View>
            ) : (
              <Text style={appStyles.centerText}>Happiness: 'Loading!'</Text>
            )}

            <TouchableOpacity>
              <Text
                style={appStyles.centerText}
                onPress={() => {
                  this.setState({
                    editSettings: true,
                  });
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={appStyles.centerText}>Update Your Settings!</Text>
            <View style={appStyles.inputContainer}>
              <TextInput
                style={appStyles.input}
                type="text"
                onChangeText={(email) => this.setState({ email })}
                placeholder="email"
                value={this.state.email}
              />
              <TextInput
                style={appStyles.input}
                type="text"
                onChangeText={(name) => this.setState({ name })}
                placeholder="dog name"
                value={this.state.name}
              />
              <TextInput
                style={appStyles.input}
                type="text"
                onChangeText={(color) => this.setState({ color })}
                placeholder="color: red, blackTan, cream"
                value={this.state.color}
              />
              <TouchableOpacity>
                <Text
                  style={appStyles.centerText}
                  onPress={() => {
                    let name = this.state.name;
                    let color = this.state.color;
                    let email = this.state.email;

                    this.props.update({ email, name });
                    this.props.updateDog(
                      { name, color },
                      this.props.user.dog.id
                    );
                    this.setState({
                      editSettings: false,
                    });
                    this.forceUpdate();
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }
}

// connect to redux
const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    update: (obj) => dispatch(updateUser(obj)),
    updateDog: (nameObj, id) => dispatch(updateDog(nameObj, id)),
  };
};

export default connect(mapState, mapDispatch)(Settings);

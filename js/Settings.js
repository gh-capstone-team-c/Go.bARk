/** @format */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Points from './Points';

import { appStyles } from '../Styles';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editSettings: false,
		};
	}

	render() {
		return (
			<View style={appStyles.individualMenu}>
				<Text style={appStyles.centerText}>
					Dog: {this.props.user.dog ? this.props.user.dog.name : 'Loading!'}
				</Text>
				{this.props.user ? (
					<View>
						<Text style={appStyles.centerText}>Happiness:</Text>
						<Text style={appStyles.centerText}>
							Points: {this.props.user.points}
						</Text>
						<Points style={{ justifyContent: 'center' }} />
					</View>
				) : (
					<Text style={appStyles.centerText}>Happiness: 'Loading!'</Text>
				)}

				<TouchableOpacity>
					<Text style={appStyles.centerText}>Edit Profile</Text>
				</TouchableOpacity>
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

export default connect(mapState)(Settings);

/** @format */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
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
				<View>
					<Text style={appStyles.centerText}>
						Points: {this.props.user.points}
					</Text>

					<Text style={appStyles.centerText}>
						Dog: {this.props.user.dog.name}
					</Text>
					<Text style={appStyles.centerText}>
						Happiness Level: {this.props.user.dog.happiness}
					</Text>
					<TouchableOpacity>
						<Text style={appStyles.centerText}>Edit Settings</Text>
					</TouchableOpacity>
				</View>
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

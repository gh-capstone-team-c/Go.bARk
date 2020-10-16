/** @format */

import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Points from './Points';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editSettings: false,
		};
	}

	render() {
		console.log('user in settings', this.props.user);
		return (
			<View style={settings.container}>
				<View>
					<TouchableOpacity>
						<Text>
							Dog:{' '}
							{this.props.user.dog ? this.props.user.dog.name : 'no dog yet!'}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>Points: {this.props.user.points}</Text>
					</TouchableOpacity>

					<TouchableOpacity>
						{this.props.user ? (
							<>
								<Text>Happiness:</Text>
								<Points />
							</>
						) : (
							<Text>Happiness: 'no happiness points yet!'</Text>
						)}
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>Edit Profile</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
var settings = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-around',
		backgroundColor: '#fff',
	},
});

// connect to redux
const mapState = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapState)(Settings);

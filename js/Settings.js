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
						<Text style={appStyles.centerText}>
							Dog:{' '}
							{this.props.user.dog ? this.props.user.dog.name : 'Loading!'}
						</Text>
						<Text style={appStyles.centerText}>Points: {this.props.user.points}</Text>

						{this.props.user ? (
							<>
								<Text style={appStyles.centerText}>Happiness:</Text>
								<Points />
							</>
						) : (
							<Text style={appStyles.centerText}>Happiness: 'Loading!'</Text>
						)}
					
					<TouchableOpacity>
						<Text style={appStyles.centerText}>Edit Profile</Text>
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

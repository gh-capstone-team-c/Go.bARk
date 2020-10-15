/** @format */

import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addPoints } from '../store/users';

class Points extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('user', this.props.user);
		let heart = '🤍';
		if (this.props.user.points >= 5) heart = '🧡';
		if (this.props.user.points >= 10) heart = '💛';
		if (this.props.user.points >= 15) heart = '💚';

		return (
			<View>
				<TouchableOpacity
					onPress={() => {
						this.props.addPoints({ points: this.props.user.points + 1 });
					}}
				>
					<Text style={{ fontSize: 30 }}>{heart}</Text>
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

const mapDispatch = (dispatch) => {
	return {
		addPoints: (obj) => dispatch(addPoints(obj)),
	};
};

export default connect(mapState, mapDispatch)(Points);

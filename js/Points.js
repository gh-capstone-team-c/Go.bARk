/** @format */

import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { addPoints } from '../store/users';
import { appStyles } from '../Styles';
class Points extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let heart = '🤍';
		if (this.props.user.points >= 5) heart = '🧡';
		if (this.props.user.points >= 10) heart = '💛';
		if (this.props.user.points >= 15) heart = '💚';
		if (this.props.user.points >= 30) heart = '💖';

		return (
			<View>
				<Text style={[{ fontSize: 30 }, appStyles.centerText]}>{heart}</Text>
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

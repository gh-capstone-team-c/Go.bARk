/** @format */

import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class Points extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<TouchableOpacity>
					<Text style={{ fontSize: 30 }}>🤍</Text>
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

export default connect(mapState)(Points);

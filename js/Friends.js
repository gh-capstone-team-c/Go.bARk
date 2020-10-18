/** @format */

import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { appStyles } from '../Styles';
import { connect } from 'react-redux';
import { getUsers } from '../store/allUsers';

class Friends extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	componentDidMount() {
		this.props.getUsers();
		this.setState({
			loading: false,
		});
	}

	render() {
		console.log(this.props.allUsers);
		return (
			<View style={appStyles.individualMenu}>
				{this.state.loading && <Text>Loading!</Text>}
				<Text style={appStyles.centerText}>All Users</Text>

				{this.props.allUsers.map((user) => {
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
							{/* <Image
								style={appStyles.miniImage}
								source={{ uri: user.dog.imageUrl }}
							/> */}
							<Text style={[{ fontSize: 30 }, appStyles.centerText]}>
								{heart}
							</Text>
						</View>
					);
				})}
			</View>
		);
	}
}

// connect to redux
const mapState = (state) => {
	return {
		allUsers: state.allUsers,
	};
};

const mapDispatch = (dispatch) => {
	return {
		getUsers: () => dispatch(getUsers()),
	};
};

export default connect(mapState, mapDispatch)(Friends);

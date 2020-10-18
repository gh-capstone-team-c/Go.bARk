/** @format */

import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { appStyles } from '../Styles';
import { connect } from 'react-redux';
import { getUsers } from '../store/allUsers';
import { addFollowing } from '../store/users';

class Friends extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			myFriends: true,
			following: true,
		};
	}

	componentDidMount() {
		this.props.getUsers();
		this.setState({
			loading: false,
		});
	}

	render() {
		console.log(this.props.user);
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

						{/* toggle between following/followers */}
						{this.state.following ? (
							<View>
								<Text>Following</Text>

								<View>
									{this.props.user.following.map((user) => {
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
							</View>
						) : (
							<View>
								<Text>Followers</Text>

								<View>
									{this.props.user.follower.map((user) => {
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
							</View>
						)}
					</View>
				) : (
					// if my friends is false, show all the users
					<View>
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

									<TouchableOpacity
										onPress={() => {
											this.props.addFollowing(user.id, user);
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
	};
};

export default connect(mapState, mapDispatch)(Friends);

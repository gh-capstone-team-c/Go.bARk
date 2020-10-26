/** @format */

import React from 'react';
import { ViroNode, ViroText } from 'react-viro';
var createReactClass = require('create-react-class');
import WalkPortal from './WalkPortal';

export default Walk = createReactClass({
	getInitialState() {
		return {
			user: {},
			addPoints: () => {},
		};
	},
	componentDidMount() {
		this.setState({
			user: this.props.user,
			addPoints: this.props.addPoints,
		});
	},
	render() {
		if (this.state.user.id)
			return (
				<ViroNode>
					{/****** scene items below ****** */}

					<WalkPortal
						user={this.state.user}
						addPoints={this.state.addPoints}
						position={this.props.walkPosition}
					/>
				</ViroNode>
			);
		else
			return (
				<ViroNode>
					<ViroText
						text={'Loading, Please wait!'}
						scale={[3, 3, 3]}
						position={[0, 1, 0]}
						transformBehaviors={['billboardY']}
					/>
				</ViroNode>
			);
	},
});

module.exports = Walk;

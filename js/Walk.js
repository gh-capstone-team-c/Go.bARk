/** @format */

import React from 'react';
import { ViroNode} from 'react-viro';
var createReactClass = require('create-react-class');
import WalkPortal from './WalkPortal';

export default Walk = createReactClass({
	getInitialState() {
		return {
			user: this.props.user,
			addPoints: this.props.addPoints,
		};
	},

	render() {
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
	},
});

module.exports = Walk;

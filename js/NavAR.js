/** @format */

import React from 'react';
import {
	ViroARScene,
	ViroAmbientLight,
	ViroNode,
	ViroAnimatedImage,
	ViroSound,
	ViroARPlane,
	ViroImage,
} from 'react-viro';
import BallThrowAR from './BallThrowAR';
import FoodTime from './FoodTime';
import TugOfWar from './TugOfWar';
import Walk from './Walk';
var createReactClass = require('create-react-class');

export default NavAR = createReactClass({
	getInitialState() {
		return {
			loading: true,
			currentAnimation: 'rotate',
			text: 'Play with me!',
			dogPosition: [0, -11, -21],
			ballPosition: [0, -11, -11],
			playCount: 0,
			rotation: [0, 0, 0],
			dogAnimation: 'waiting',
			dogScale: [0.1, 0.1, 0.1],
			scale: [1, 1, 1],
			walkPosition: [0, -1, 2],
			foodPosition: [4, -1, -2],
			towPosition: [-4, -1, -2],
			rotation: [0, 0, 0],
			offsetX: 2.5,
			offsetY: 0.3,
			currScene: 'ball',
			dog: {
				red: require('./res/dogColors/redDog.vrx'),
				blackTan: require('./res/dogColors/blackTanDog.vrx'),
				cream: require('./res/dogColors/creamDog.vrx'),
			},
			//sound effects
			playPoints: true,
			playBark: true,
			//passing redux function to AR component
			user: this.props.arSceneNavigator.viroAppProps.user,
			addPoints: this.props.arSceneNavigator.viroAppProps.addPoints,
		};
	},
	render() {
		const dogColor = this.state.user.dog.color;
		return (
			<ViroARScene
				ref="arscene"
				onTrackingUpdated={this.props.arSceneNavigator._onTrackingUpdated}
			>
				{/*******navigation items ***** */}
				<ViroNode ignoreEventHandling={true}>
					{/***All Arrows*** */}
					{/* tugOfWar L Arrow */}
					<ViroImage
						transformBehaviors={['billboardY']}
						position={[
							this.state.towPosition[0] + this.state.offsetX,
							this.state.towPosition[1] + this.state.offsetY,
							this.state.towPosition[2],
						]}
						scale={this.state.scale}
						height={1}
						width={1}
						source={require('./res/arrows/tugOfWarLArrow.png')}
					/>
					{/* tugOfWar R Arrow */}
					<ViroImage
						transformBehaviors={['billboardY']}
						position={[
							this.state.walkPosition[0] - this.state.offsetX / 2,
							this.state.walkPosition[1],
							this.state.walkPosition[2],
						]}
						scale={this.state.scale}
						height={1}
						width={1}
						source={require('./res/arrows/tugOfWarRArrow.png')}
					/>
					{/* foodTime R Arrow */}
					<ViroImage
						transformBehaviors={['billboardY']}
						position={[
							this.state.foodPosition[0] - this.state.offsetX,
							this.state.foodPosition[1] + this.state.offsetY,
							this.state.foodPosition[2],
						]}
						scale={this.state.scale}
						height={1}
						width={1}
						source={require('./res/arrows/foodTimeRArrow.png')}
					/>
					{/* foodTime L Arrow */}
					<ViroImage
						transformBehaviors={['billboardY']}
						position={[
							this.state.walkPosition[0] + this.state.offsetX / 2,
							this.state.walkPosition[1],
							this.state.walkPosition[2],
						]}
						scale={this.state.scale}
						height={1}
						width={1}
						source={require('./res/arrows/foodTimeLArrow.png')}
					/>
					{/* walk L Arrow */}
					<ViroImage
						transformBehaviors={['billboardY']}
						position={[
							this.state.towPosition[0] + this.state.offsetX / 2,
							this.state.towPosition[1] + this.state.offsetY,
							this.state.towPosition[2] + this.state.offsetX,
						]}
						scale={this.state.scale}
						height={1}
						width={1}
						source={require('./res/arrows/walkLArrow.png')}
					/>
					{/* walk R Arrow */}
					<ViroImage
						scale={this.state.scale}
						height={1}
						width={1}
						source={require('./res/arrows/walkRArrow.png')}
						transformBehaviors={['billboardY']}
						position={[
							this.state.foodPosition[0] - this.state.offsetX / 2,
							this.state.foodPosition[1] + this.state.offsetY,
							this.state.foodPosition[2] + this.state.offsetX,
						]}
					/>
					{/****All redirects**** */}
					{/* foodTime gif */}
					<ViroNode
						ref={this._setARNodeRef}
						onLoadEnd={() => this._onLoadEnd('food')}
						position={this.state.foodPosition}
						onLoadStart={this._onLoadStart}
					>
						{this.state.currScene === 'food' ? (
							<FoodTime
								user={this.state.user}
								addPoints={this.state.addPoints}
								foodPosition={this.state.foodPosition}
							/>
						) : (
							<ViroAnimatedImage
								transformBehaviors={['billboardY']}
								onClick={() => this.setState({ currScene: 'food' })}
								interruptible={true}
								scale={this.state.scale}
								height={1}
								width={1}
								source={require('./res/gifs/dogBowlIcon.gif')}
							/>
						)}
					</ViroNode>
					{/* tugOfWar gif */}
					<ViroNode
						ref={this._setARNodeRef}
						onLoadEnd={() => this._onLoadEnd('tow')}
						position={this.state.towPosition}
						onLoadStart={this._onLoadStart}
					>
						{this.state.currScene === 'tow' ? (
							<TugOfWar
								user={this.state.user}
								addPoints={this.state.addPoints}
								towPosition={this.state.towPosition}
							/>
						) : (
							<ViroAnimatedImage
								scale={this.state.scale}
								height={1}
								width={1}
								source={require('./res/gifs/towGif.gif')}
								interruptible={true}
								transformBehaviors={['billboardY']}
								onClick={() => this.setState({ currScene: 'tow' })}
							/>
						)}
					</ViroNode>
					{/* walk gif */}
					<ViroNode
						ref={this._setARNodeRef}
						onLoadEnd={() => this._onLoadEnd('walk')}
						position={this.state.walkPosition}
						onLoadStart={this._onLoadStart}
					>
						{this.state.currScene === 'walk' ? (
							<Walk
								addPoints={this.state.addPoints}
								user={this.state.user}
								walkPosition={this.state.walkPosition}
							/>
						) : (
							<ViroAnimatedImage
								scale={[0.8, 0.8, 0.8]}
								height={1}
								width={1}
								source={require('./res/gifs/walkGif.gif')}
								transformBehaviors={['billboardY']}
								onClick={() => this.setState({ currScene: 'walk' })}
							/>
						)}
					</ViroNode>
					{/* ball throw gif */}
					<ViroNode
						position={[
							this.state.walkPosition[0],
							this.state.walkPosition[1],
							this.state.walkPosition[2] * -1.5,
						]}
					>
						{this.state.currScene === 'ball' ? (
							<BallThrowAR
								user={this.state.user}
								addPoints={this.state.addPoints}
								dog={this.state.dog}
								dogPosition={[
									this.state.walkPosition[0],
									this.state.walkPosition[1],
									-1.5 * this.state.walkPosition[2],
								]}
							/>
						) : (
							<ViroAnimatedImage
								scale={this.state.scale}
								height={1}
								width={1}
								source={require('./res/gifs/ballThrowGif.gif')}
								transformBehaviors={['billboardY']}
								onClick={() => this.setState({ currScene: 'ball' })}
							/>
						)}
					</ViroNode>
				</ViroNode>
				{/****** scene items below ****** */}

				<ViroAmbientLight color={'#e8e0dc'} />

				{/* points sound effects */}
				<ViroSound
					paused={this.state.playPoints}
					muted={false}
					source={require('./sounds/points.mp3')}
					loop={false}
					onFinish={() => {
						this.setState({
							playPoints: true,
						});
					}}
					volume={1.0}
				/>

				{/* dog bark sound effects--this only plays sometimes awkwardly... */}
				<ViroSound
					paused={this.state.playBark}
					muted={false}
					source={require('./sounds/tinydogbark.mp3')}
					loop={false}
					onFinish={() => {
						this.setState({
							playBark: true,
						});
					}}
					volume={1.0}
				/>
			</ViroARScene>
		);
	},

	//Raycasting - hittracing
	_onLoadStart() {
		this.props.arSceneNavigator.viroAppProps._onLoadStart();
	},
	// Perform a hit test on load end to display object.
	_onLoadEnd(str) {
		this.refs['arscene'].getCameraOrientationAsync().then((orientation) => {
			this.refs['arscene']
				.performARHitTestWithRay(orientation.forward)
				.then((results) => {
					this._onArHitTestResults(
						orientation.position,
						orientation.forward,
						results,
						str
					);
				});
		});
		this.props.arSceneNavigator.viroAppProps._onLoadEnd();
	},
	_setARNodeRef(component) {
		this.arNodeRef = component;
	},
	_setSpotLightRef(component) {
		this.spotLight = component;
	},
	_onTrackingUpdated() {
		this.props.arSceneNavigator.viroAppProps._onTrackingUpdated();
	},
	_onArHitTestResults(position, forward, results, str) {
		// Default position is just 1.5 meters in front of the user.
		let newPosition = [forward[0] * 1.5, forward[1] * 1.5, forward[2] * 1.5];
		let hitResultPosition = undefined;
		// Filter the hit test results based on the position.
		if (results.length > 0) {
			for (var i = 0; i < results.length; i++) {
				let result = results[i];
				if (result.type == 'ExistingPlaneUsingExtent') {
					var distance = Math.sqrt(
						(result.transform.position[0] - position[0]) *
							(result.transform.position[0] - position[0]) +
							(result.transform.position[1] - position[1]) *
								(result.transform.position[1] - position[1]) +
							(result.transform.position[2] - position[2]) *
								(result.transform.position[2] - position[2])
					);
					if (distance > 0.2 && distance < 10) {
						// If we found a plane greater than .2 and less than 10 meters away then choose it!
						hitResultPosition = result.transform.position;
						break;
					}
				} else if (result.type == 'FeaturePoint' && !hitResultPosition) {
					// If we haven't found a plane and this feature point is within range, then we'll use it
					// as the initial display point.
					var distance = this._distance(position, result.transform.position);
					if (
						distance > 0.2 &&
						distance < 10 &&
						result.type === 'EstimatedHorizontalPlane'
					) {
						hitResultPosition = result.transform.position;
					}
				}
			}
		}
		if (hitResultPosition) {
			newPosition = hitResultPosition;
		}
		// Set the initial placement of the object using new position from the hit test.
		this._setInitialPlacement(newPosition, str);
	},

	_setInitialPlacement(position, str) {
		let key = `${str}Position`;
		let newVals = [
			this.state[key][0] + position[0],
			this.state[key][1] + position[1],
			this.state[key][2] + position[2],
		];
		this.setState({
			[key]: newVals,
		});
		this._updateInitialRotation();
	},

	// Update the rotation of the object to face the user after it's positioned.
	_updateInitialRotation() {
		this.arNodeRef.getTransformAsync().then((retDict) => {
			let rotation = retDict.rotation;
			let absX = Math.abs(rotation[0]);
			let absZ = Math.abs(rotation[2]);

			let yRotation = rotation[1];

			// If the X and Z aren't 0, then adjust the y rotation.
			if (absX > 1 && absZ > 1) {
				yRotation = 180 - yRotation;
			}

			this.setState({
				rotation: [0, yRotation, 0],
			});
		});
	},

	// Calculate distance between two vectors
	_distance(vectorOne, vectorTwo) {
		var distance = Math.sqrt(
			(vectorTwo[0] - vectorOne[0]) * (vectorTwo[0] - vectorOne[0]) +
				(vectorTwo[1] - vectorOne[1]) * (vectorTwo[1] - vectorOne[1]) +
				(vectorTwo[2] - vectorOne[2]) * (vectorTwo[2] - vectorOne[2])
		);
		return distance;
	},
});

module.exports = NavAR;

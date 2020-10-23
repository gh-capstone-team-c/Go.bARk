/** @format */

import React from 'react';
import {
	ViroARScene,
	Viro3DObject,
	ViroAmbientLight,
	ViroSpotLight,
	ViroNode,
	ViroAnimations,
	ViroAnimatedImage,
	ViroText,
	ViroQuad,
	ViroSound,
} from 'react-viro';
var createReactClass = require('create-react-class');
const dog = {
	red: require('./res/dogColors/redDog.vrx'),
	blackTan: require('./res/dogColors/blackTanDog.vrx'),
	cream: require('./res/dogColors/creamDog.vrx'),
};
export default BallThrowAR = createReactClass({
	getInitialState() {
		return {
			loading: true,
			currentAnimation: 'rotate',
			text: 'Play with me!',
			dogScale: [0.1, 0.1, 0.1],
			scale: [1, 1, 1],
			dogPosition: [0, -11, -21],
			mainPosition: [0, -11, -11],
			playCount: 0,
			rotation: [0, 0, 0],
			dogAnimation: 'waiting',
			walkPosition: [0, -1, 2],
			foodPosition: [4, -1, -2],
			towPosition: [-4, -1, -2],
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
				anchorDetectionTypes={'PlanesHorizontal'}
			>
				{/* tugOfWar L Arrow */}
				<ViroAnimatedImage
					transformBehaviors={['billboardY']}
					position={[
						this.state.towPosition[0] + 1.5,
						this.state.towPosition[1] + 0.25,
						this.state.towPosition[2],
					]}
					interruptible={true}
					scale={this.state.scale}
					height={1}
					width={1}
					source={require('./res/gifs/tugOfWarLArrow.gif')}
					animation={{
						loop: true,
						delay: 0,
					}}
				/>
				{/* tugOfWar gif */}

				<ViroAnimatedImage
					scale={[0.8, 0.8, 0.8]}
					height={1}
					width={1}
					source={require('./res/gifs/towGif.gif')}
					animation={{
						loop: true,
						delay: 0,
					}}
					interruptible={true}
					position={this.state.towPosition}
					transformBehaviors={['billboardY']}
					onDrag={() =>
						this.props.arSceneNavigator.push({
							scene: require('./TugOfWar'),
							passProps: {
								user: this.state.user,
								addPoints: this.state.addPoints,
								dogScale: this.state.dogScale,
								scale: this.state.scale,
								dogPosition: this.state.dogPosition,
								mainPosition: this.state.mainPosition,
								walkPosition: this.state.walkPosition,
								foodPosition: this.state.foodPosition,
								towPosition: this.state.towPosition,
							},
						})
					}
				/>
				{/* foodTime R Arrow */}
				<ViroAnimatedImage
					transformBehaviors={['billboardY']}
					position={[
						this.state.foodPosition[0] - 1.5,
						this.state.foodPosition[1] + 0.25,
						this.state.foodPosition[2],
					]}
					interruptible={true}
					scale={this.state.scale}
					height={1}
					width={1}
					source={require('./res/gifs/foodTimeRArrow.gif')}
					animation={{
						loop: true,
						delay: 0,
					}}
				/>
				{/* foodTime gif */}
				<ViroAnimatedImage
					position={this.state.foodPosition}
					transformBehaviors={['billboardY']}
					dragType="FixedToWorld"
					onClick={() => {
						this.setState({ ...this.state, playBark: !this.state.playBark });
						this.props.arSceneNavigator.push({
							scene: require('./FoodTime'),
							passProps: {
								user: this.state.user,
								addPoints: this.state.addPoints,
								dogScale: this.state.dogScale,
								scale: this.state.scale,
								dogPosition: this.state.dogPosition,
								mainPosition: this.state.mainPosition,
								walkPosition: this.state.walkPosition,
								foodPosition: this.state.foodPosition,
								towPosition: this.state.towPosition,
							},
						});
					}}
					interruptible={true}
					scale={this.state.scale}
					height={1}
					width={1}
					source={require('./res/gifs/dogBowlIcon.gif')}
					animation={{
						loop: true,
						delay: 0,
					}}
				/>
				{/* walk L Arrow */}
				<ViroNode
					transformBehaviors={['billboardY']}
					position={[
						this.state.walkPosition[0] - 1.5,
						this.state.walkPosition[1] + 0.25,
						this.state.walkPosition[2],
					]}
				>
					<ViroAnimatedImage
						scale={this.state.scale}
						height={1}
						width={1}
						source={require('./res/gifs/walkLArrow.gif')}
						animation={{
							loop: true,
							delay: 0,
						}}
					/>
				</ViroNode>
				{/* walk R Arrow */}
				<ViroNode
					transformBehaviors={['billboardY']}
					position={[
						this.state.walkPosition[0] + 1.5,
						this.state.walkPosition[1] + 0.25,
						this.state.walkPosition[2],
					]}
				>
					<ViroAnimatedImage
						scale={this.state.scale}
						height={1}
						width={1}
						source={require('./res/gifs/walkRArrow.gif')}
						animation={{
							loop: true,
							delay: 0,
						}}
					/>
				</ViroNode>
				{/* walk gif */}
				<ViroNode
					position={this.state.walkPosition}
					transformBehaviors={['billboardY']}
					dragType="FixedToWorld"
					onClick={() =>
						this.props.arSceneNavigator.push({
							scene: require('./Walk'),
							passProps: {
								user: this.state.user,
								addPoints: this.state.addPoints,
								dogScale: this.state.dogScale,
								scale: this.state.scale,
								dogPosition: this.state.dogPosition,
								mainPosition: this.state.mainPosition,
								walkPosition: this.state.walkPosition,
								foodPosition: this.state.foodPosition,
								towPosition: this.state.towPosition,
							},
						})
					}
				>
					<ViroAnimatedImage
						scale={[0.8, 0.8, 0.8]}
						height={1}
						width={1}
						source={require('./res/gifs/walkGif.gif')}
						position={[0, 0, 0]}
						animation={{
							loop: true,
							delay: 0,
						}}
					/>
				</ViroNode>
				<ViroText
					text={this.state.text}
					scale={[1, 1, 1]}
					position={[0, 0, -4]}
				/>
				<ViroAmbientLight color={'#e8e0dc'} />

				{/* dog object */}
				<ViroNode
					position={this.state.dogPosition}
					scale={this.state.dogScale}
					onClick={() => {}}
					key={'dog'}
					ref={this._setARNodeRef}
					//rotation={this.state.rotation}
				>
					<ViroSpotLight
						innerAngle={5}
						outerAngle={40}
						direction={[0, -1, 0]}
						position={[
							this.state.dogPosition[0],
							this.state.dogPosition[1] + 4,
							this.state.dogPosition[2] + 6,
						]}
						color="#ffffff"
						intensity={10000}
						castsShadow={true}
						shadowNearZ={0.1}
						shadowFarZ={6}
						shadowOpacity={0.9}
						ref={this._setSpotLightRef}
					/>
					<Viro3DObject
						source={dog[dogColor]}
						animation={{
							name: this.state.dogAnimation,
							run: true,
							interruptible: true,
						}}
						onLoadEnd={() => this._onLoadEnd('dog')}
						onLoadStart={this._onLoadStart}
						ignoreEventHandling={true}
						type="VRX"
						transformBehaviors={['billboardY']}
					/>
					<ViroQuad
						rotation={this.state.rotation}
						position={[
							this.state.dogPosition[0],
							this.state.dogPosition[1] - 4,
							this.state.dogPosition[2],
						]}
						width={7.5}
						height={7.5}
						arShadowReceiver={true}
						ignoreEventHandling={true}
					/>
				</ViroNode>
				{/* ball object */}
				<ViroNode
					position={this.state.mainPosition}
					key={'ball'}
					scale={this.state.scale}
					ref={this._setARNodeRef}
					// rotation={this.state.rotation}
				>
					<ViroSpotLight
						innerAngle={5}
						outerAngle={20}
						direction={[0, -1, 0]}
						position={[
							this.state.mainPosition[0],
							this.state.mainPosition[1] + 5,
							this.state.mainPosition[2],
						]}
						color="#ffffff"
						castsShadow={true}
						shadowNearZ={0.1}
						shadowFarZ={6}
						shadowOpacity={0.9}
						ref={this._setSpotLightRef}
					/>
					<Viro3DObject
						position={this.state.mainPosition}
						key={'ball'}
						source={require('./res/object_sphere.vrx')}
						resources={[
							require('./res/sphere_diffuse.png'),

							require('./res/sphere_specular.png'),
						]}
						type="VRX"
						onClickState={this._onBallClick}
						animation={{
							name: this.state.currentAnimation,
							run: true,
							interruptible: false,
						}}
						onLoadEnd={() => this._onLoadEnd('main')}
						onLoadStart={this._onLoadStart}
						onClick={this._onBallDrag}
					/>
				</ViroNode>
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
	_onBallClick(stateValue, position, source) {
		//incremental counter to limit number of consecutive games of catch with dog
		if (
			stateValue === 1 &&
			this.state.currentAnimation !== ('arc' || 'rollAway')
		) {
			const play = this.state.playCount + 1;
			this.setState({ ...this.state, playCount: play });
			// let pts = this.state.user.points;
			this.state.addPoints({ points: this.state.user.points++ });
		}
		// capture when dog and ball are super close to user(already fetched) and returns gameplay loop to near start.
		if (position[2] >= -5 && this.state.playCount >= 3) {
			this.setState({
				...this.state,
				dogAnimation: 'dropBall',
				currentAnimation: 'rollAway',
			});
			// function that displays dog after dropping ball
			setTimeout(() => {
				if (this.state.dogAnimation === 'dropBall') {
					this.setState({
						...this.state,
						dogPosition: [0, -9, -15],
						playCount: 0,
						dogAnimation: 'waiting',
						currentAnimation: 'rotate',
					});
				}
			}, 5000);
		} else if (stateValue === 1) {
			this.setState({
				dogAnimation: 'waiting',
			});
			//handler for play loop
		} else if (stateValue === 2 || stateValue === 3) {
			this.setState({
				currentAnimation: 'arc',
				dogAnimation: 'fetch',
			});
			//captures dog walking towards ball
			setTimeout(() => {
				if (this.state.currentAnimation === 'arc') {
					const dogZ = this.state.dogPosition[2] - 5;
					this.setState({ ...this.state, dogPosition: [0, -9, dogZ] });
				}
			}, 2000);
			// This timeout fires after the ball lands near the dog. It sets the dog and ball on a return course. The if statement stops it from refiring after the dog drops the ball.
			setTimeout(() => {
				if (this.state.currentAnimation === 'arc') {
					this.setState({
						...this.state,
						currentAnimation: 'returnBall',
						dogAnimation: 'return',
						mainPosition: [0, -2.4, -3],
						dogPosition: [0, -9, -9],
					});
				}
			}, 6500);
		}
	},
	//empty function enables drag.
	_onBallDrag() {},

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

ViroAnimations.registerAnimations({
	rotate: {
		properties: {
			rotateY: '+=90',
		},
		duration: 0, //0 seconds
	},
	lookLeft: {
		properties: {
			rotateY: '+=10',
		},
		duration: 500,
	},
	lookRight: {
		properties: {
			rotateY: '-=10',
		},
		duration: 500,
	},
	launch: {
		properties: {
			positionZ: '-=10.0',
			positionY: '+=12.0',
		},
		easing: 'EaseOut',
		duration: 2500,
	},
	fall: {
		properties: {
			positionZ: '-=10.0',
			positionY: 0,
		},
		duration: 2300,
		easing: 'bounce',
	},
	dropBall: [
		[
			{
				properties: {
					rotateY: '-=180',
				},
				duration: 500, //0 seconds
			},
			{
				properties: {
					positionZ: '-=20',
				},
				duration: 2000,
			},
			{
				properties: {
					rotateY: '-=180',
				},
				duration: 180,
			},
			{
				properties: {
					rotateY: 0,
				},
				duration: 20,
			},
		],
	],
	rollAway: [
		[
			{
				properties: {
					positionX: '-=5',
					positionZ: '-=5',
				},
				duration: 250, //0 seconds
			},
			{
				properties: {
					positionX: '+=5',
					positionZ: '-=5',
				},
				duration: 250, //0 seconds
			},
			{
				properties: {
					positionZ: -20,
				},
				duration: 1000,
			},
			{
				properties: {
					positionY: -9,
				},
				duration: 1000,
				easing: 'Bounce',
			},
			{
				properties: {
					positionX: '-=5',
				},
				duration: 1000,
			},
		],
	],
	fetch: [
		[
			{
				properties: {
					rotateY: '+=180',
				},
				duration: 500,
				easing: 'Bounce',
			},
			{
				properties: {
					positionZ: '-=10',
				},
				duration: 1400,
				easing: 'Bounce',
			},
			{
				properties: {
					rotateY: '+=540',
				},
				duration: 1500,
				easing: 'Bounce',
			},
		],
	],
	arc: [['launch', 'fall']],
	waiting: [
		[
			'lookLeft',
			'lookRight',
			'lookLeft',
			'lookRight',
			'lookLeft',
			'lookRight',
			'lookLeft',
			'lookRight',
		],
	],
	return: {
		properties: {
			positionX: 0,
			positionY: -9,
			positionZ: -9,
			rotateY: 0,
		},
		duration: 2000,
		easing: 'EaseOut',
	},
	returnBall: {
		properties: {
			positionX: 0,
			positionY: -2.4,
			positionZ: -3,
		},
		duration: 1800,
		easing: 'EaseOut',
	},
});
module.exports = BallThrowAR;

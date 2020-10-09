/** @format */

import React, { Component } from "react";
import {
	ViroARScene,
	Viro3DObject,
	ViroAmbientLight,
	ViroSpotLight,
	ViroNode,
	ViroAnimations,
	ViroText,
} from "react-viro";
var createReactClass = require("create-react-class");
const HelloWorldSceneAR = require("./HelloWorldSceneAR copy");

export default BallThrowAR = createReactClass({
	getInitialState() {
		return {
			currentAnimation: "rotate",
		};
	},
	render: function () {
		return (
			<ViroARScene>
				<ViroText
					text={"Swipe for next!"}
					scale={[0.5, 0.5, 0.5]}
					position={[0, 0, -1]}
					onDrag={this._pushNextScene}
				/>
				<ViroAmbientLight color={"#aaaaaa"} />
				<ViroSpotLight
					innerAngle={5}
					outerAngle={90}
					direction={[0, -1, -0.2]}
					position={[0, 3, 1]}
					color="#ffffff"
					castsShadow={true}
				/>
				<Viro3DObject
					source={require("./res/Doggo/dingo_obj/Dingo.obj")}
					resources={[
						require("./res/Doggo/dingo_obj/Dingo.mtl"),
						require("./res/Doggo/dingo_obj/Dingo_BaseColor.png"),
					]}
					type="OBJ"
					scale={[0.5, 0.5, 0.5]}
					position={[0, -2, -3]}
				/>
				<ViroNode position={[0, -1, 0]}>
					<Viro3DObject
						source={require("./res/object_sphere.vrx")}
						resources={[
							require("./res/sphere_diffuse.png"),

							require("./res/sphere_specular.png"),
						]}
						physicsBody={{
							type: "Dynamic",
							mass: 0.05,
							torque: [0.1, 0, 0],
							useGravity: true,
							friction: 0.3,
							restitution: 0.7,
							shape: { type: "Sphere", params: [0.2] },
						}}
						position={[0, -1, -2]}
						scale={[0.2, 0.2, 0.2]}
						type="VRX"
						onClick={this._onBallClick}
						animation={{
							name: this.state.currentAnimation,
							run: true,
							// loop: true,
						}}
					/>
				</ViroNode>

				{/* leash but the file might be the wrong format */}
				{/* <ViroNode position={[0, -3, 0]}>
					<Viro3DObject
						source={require('./res/leash.max')}
						position={[0, -3, 0]}
						scale={[0.2, 0.2, 0.2]}
						type="VRX"
					/>
				</ViroNode> */}

				{/* dog bowl but i may be requiring the wrong files */}
				{/* <ViroNode position={[0, 0, -2]}>
					<Viro3DObject
						source={require('./res/Dog-Graphics/DogBowl_NoFood.fbx')}
						resources={[
							require('./res/Dog-Graphics/DogBowl_Noormals.png'),
							require('./res/Dog-Graphics/Dogbowl2_Specular.jpg'),
						]}
						position={[0, -1, -2]}
						scale={[0.2, 0.2, 0.2]}
						type="FBX"
					/>
				</ViroNode> */}
			</ViroARScene>
		);
	},
	onCollision(collidedTag, collidedPoint, collidedNormal) {
		// collidedPoint - Point at which the collision had occured, in world coords.
		// collidedNormal - The normal at the point of collision.
		// collidedTag - The ViroTag of the collided object.
	},
	_onBallClick() {
		if (this.state.currentAnimation === "rotate") {
			this.setState({
				currentAnimation: "arc",
			});
		} else {
			this.setState({
				currentAnimation: "rotate",
			});
		}
	},

	_pushNextScene() {
		this.props.sceneNavigator.push({ scene: HelloWorldSceneAR });
	},
});

ViroAnimations.registerAnimations({
	// moveLeft: {
	// 	properties: { positionX: '-=5.0', rotateZ: '+=45' },
	// 	duration: 10000,
	// },
	rotate: {
		properties: {
			rotateY: "+=90",
		},
		duration: 250, //.25 seconds
	},
	launch: {
		properties: {
			positionX: "-=5.0",
			positionY: "+=5.0",
		},
		duration: 5000,
	},
	fall: {
		properties: {
			positionX: "+=10.0",
			positionY: "-=5.0",
		},
		duration: 5000,
	},
	arc: [["launch", "fall"]],
});

module.exports = BallThrowAR;

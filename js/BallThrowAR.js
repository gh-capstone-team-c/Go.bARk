/** @format */

import React from 'react';
import {
  ViroARScene,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  Viro360Image,
  ViroPortalScene,
  ViroPortal,
  ViroAnimations,
  ViroAnimatedImage,
  ViroText,
  ViroQuad,
  ViroARCamera,
  ViroImage,
} from 'react-viro';
var createReactClass = require('create-react-class');
var FoodTime = require('./FoodTime');
var Walk = require('./Walk');
const dog = {
  red: require('./res/dogColors/redDog.vrx'),
  blackTan: require('./res/dogColors/blackTanDog.vrx'),
  cream: require('./res/dogColors/creamDog.vrx'),
};

export default BallThrowAR = createReactClass({
  getInitialState() {
    return {
      currentAnimation: 'rotate',
      text: 'Play with me!',
      dogScale: [0.1, 0.1, 0.1],
      scale: [0.7, 0.7, 0.7],
      dogPosition: [0, -10, -20],
      ballPosition: [0, -2.6, -10],
      playCount: 0,
      rotation: [0, 0, 0],
      dogAnimation: 'waiting',
      showPortal: false,
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
        //  _onTrackingUpdated={this._onTrackingUpdated}
      >
        <ViroARCamera>
				<ViroNode
            dragType="FixedToWorld"
            onDrag={() =>
              this.props.arSceneNavigator.push({
                scene: FoodTime,
                passProps: {
                  user: this.state.user,
                  addPoints: this.state.addPoints,
                },
              })
            }
          >
            <ViroImage
              height={0.05}
              width={0.05}
              source={require('./res/dogBowlIcon.gif')}
              // source={require('./res/bone.png')}
              position={[-0.07, -0.16, -0.3] /* -1.2, -2.8, -5 */}
            />
          </ViroNode>
        </ViroARCamera>
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
          dragType="FixedToWorld"
          onDrag={() => {}}
          // key={this.props.arSceneNavigator.viroAppProps.displayObjectName}
          ref={'dog'}
          rotation={this.state.rotation}
        >
          <Viro3DObject
            source={dog[dogColor]}
            position={[0, -10, -20]}
            animation={{
              name: this.state.dogAnimation,
              run: true,
              //loop: true,
              interruptible: true,
            }}
            // onLoadEnd={this._onLoadEnd}
            // onLoadStart={this._onLoadStart}
            ignoreEventHandling={true}
            type="VRX"
          />
          <ViroQuad
            rotation={[-90, 0, 0]}
            position={[0, -0.001, 0]}
            width={2.5}
            height={2.5}
            arShadowReceiver={true}
            ignoreEventHandling={true}
          />
        </ViroNode>

        {/* ball object */}
        <ViroNode
          position={this.state.ballPosition}
          dragType="FixedToWorld"
          onDrag={() => {}}
          // key={this.props.arSceneNavigator.viroAppProps.displayObjectName}
          ref={'ball'}
          scale={this.state.scale}
          rotation={this.state.rotation}
        >
          <Viro3DObject
            source={require('./res/object_sphere.vrx')}
            resources={[
              require('./res/sphere_diffuse.png'),

              require('./res/sphere_specular.png'),
            ]}
            position={[0, -2.6, -10]}
            type="VRX"
            onClickState={this._onBallClick}
            animation={{
              name: this.state.currentAnimation,
              run: true,
              interruptible: true,
            }}
            // onLoadEnd={this._onLoadEnd}
            // onLoadStart={this._onLoadStart}
            onDrag={this._onBallDrag}
          />
        </ViroNode>

        {/* emoji next to the portal*/}
        <ViroNode
          position={[-1, 0, 2]}
          onDrag={() =>
            this.props.arSceneNavigator.push({
              scene: Walk,
              passProps: {
                user: this.state.user,
                addPoints: this.state.addPoints,
              },
            })
          }
          scale={[1, 1, 1]}
          transformBehaviors={['billboardY']}
        >
          <ViroAnimatedImage
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            animation={{
              run: this.state.playAnim,
              loop: true,
              delay: 0,
            }}
            height={1}
            width={1}
            source={{
              uri: 'https://media.giphy.com/media/WqFXkK7CsTReoyGwWd/giphy.gif',
            }}
          />
        </ViroNode>
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
            ballPosition: [0, -2.4, -3],
            dogPosition: [0, -9, -9],
          });
        }
      }, 6500);
    }
  },
  //empty function enables drag.
  _onBallDrag() {},

  //Ray - tracing
  _onLoadStart() {
    this.props.arSceneNavigator.viroAppProps._onLoadStart();
  },
  // Perform a hit test on load end to display object.
  _onLoadEnd() {
    this.refs['arscene'].getCameraOrientationAsync().then((orientation) => {
      this.refs['arscene']
        .performARHitTestWithRay(orientation.forward)
        .then((results) => {
          this._onArHitTestResults(
            orientation.position,
            orientation.forward,
            results
          );
        });
    });
    this.props.arSceneNavigator.viroAppProps._onLoadEnd();
  },
  _onTrackingUpdated() {
    this.props.sceneNavigator.viroAppProps._onTrackingUpdated();
  },
  _onArHitTestResults(position, forward, results) {
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
          if (distance > 0.2 && distance < 10) {
            hitResultPosition = result.transform.position;
          }
        }
      }
    }

    if (hitResultPosition) {
      newPosition = hitResultPosition;
    }

    // Set the initial placement of the object using new position from the hit test.
    this._setInitialPlacement(newPosition);
  },

  _setInitialPlacement(position) {
    let key = `${this.ref}Position`;
    this.setState({
      key: position,
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
      positionY: '+=8.0',
    },
    easing: 'EaseOut',
    duration: 2500,
  },
  fall: {
    properties: {
      positionZ: '-=10.0',
      positionY: -9,
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

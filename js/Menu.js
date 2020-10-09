import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

/**
 * Component for showing AR initialization UI to user to move device around until AR tracking is initialized
 */
export default class Menu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View
				pointerEvents={"none"}
				style={{
					position: "absolute",
					top: 100,
					left: 0,
					right: 0,
					width: "100%",
					height: "10%",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Text style={{ color: "blue" }}>Hello</Text>
			</View>
		);
	}
}

var localStyles = StyleSheet.create({
	arSceneInitializeSuccess: {
		height: 61,
		width: 35,
		alignSelf: "center",
	},
});

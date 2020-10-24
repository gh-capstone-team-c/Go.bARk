/** @format */

import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const palette = {
	lightest: '#e8e0dc',
	darkBrown: '#775d3b',
	highlight: '#90af1b',
	lightBrown: '#ccb9a2',
	midBrown: '#a8916b',
};
export const appStyles = StyleSheet.create({
	//all container pages
	container: {
		flex: 1,
		justifyContent: 'center',
		width: width,
		height: height,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: palette.midBrown,
		color: palette.lightest,
	},
	containerApp: {
		flex: 1,
		justifyContent: 'center',
		width: width,
		height: height,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: palette.highlight,
		color: palette.lightest,
	},

	//attempted to make the friend stuff into neat rows???
	friendContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	/******   misc styles ****** */
	logo: {
		position: 'absolute',
	},
	centerText: {
		paddingVertical: 10,
		textAlign: 'center',
	},
	/******   all menus styles ****** */
	menuBar: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 40,
		backgroundColor: palette.highlight,
	},
	appleMenu: {
		position: 'absolute',
		top: 50,
		left: 0,
		right: 0,
		height: 40,
		backgroundColor: palette.highlight,
	},
	menuContainer: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-around',
		marginTop: 10,
		height: 40,
	},
	menuDropDown: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 40,
		maxHeight: height / 5,
		backgroundColor: palette.lightest,
	},
	appMenuDropDown: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 90,
		maxHeight: height / 5,
		backgroundColor: palette.lightest,
	},
	individualMenu: {
		flexDirection: 'column',
		textAlign: 'center',
		alignContent: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: palette.lightest,
		paddingVertical: 5,
	},
	menuHeadings: {
		color: palette.lightest,
		fontSize: 14,
		fontWeight: 'bold',
	},
	menuButton: {
		fontSize: 35,
	},
	/******   Title styles ****** */
	titleText: {
		paddingTop: 10,
		paddingBottom: 10,
		color: palette.lightest,
		textAlign: 'center',
		fontSize: 36,
	},
	/******   scene navigator windows ****** */
	sceneNav: {
		position: 'absolute',
		top: 40,
		right: 0,
		bottom: 0,
		left: 0,
	},
	appSceneNav: {
		position: 'absolute',
		top: 90,
		right: 0,
		bottom: 0,
		left: 0,
	},
	/******   login form styles ****** */
	inputContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	input: {
		margin: 15,
		height: 60,
		borderColor: palette.lightest,
		borderWidth: 1,
		width: 250,
		padding: 10,
		backgroundColor: palette.lightBrown,
		color: palette.darkBrown,
		borderRadius: 10,
	},
	/******   button styles ****** */
	buttons: {
		justifyContent: 'center',
		height: 150,
		width: 150,
		paddingTop: 20,
		paddingBottom: 20,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: palette.highlight,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: palette.highlight,
	},
	buttonText: {
		color: palette.lightest,
		textAlign: 'center',
		fontSize: 20,
	},
	options: {
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'space-around',
		marginTop: 10,
	},
	rectButton: {
		justifyContent: 'center',
		height: 50,
		width: 150,
		paddingTop: 10,
		paddingBottom: 10,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: palette.highlight,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: palette.lightBrown,
	},
	/******   Home page styling ****** */
	miniImage: {
		width: 80,
		height: 70,
		borderRadius: 10,
	},
	tinyImage: {
		width: 30,
		height: 20,
		borderRadius: 10,
	},
	homeText: {
		paddingTop: 10,
		paddingBottom: 10,
		color: palette.darkBrown,
		fontSize: 18,
		justifyContent: 'center',
		alignContent: 'center',
	},
	homeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5,
		alignContent: 'center',
		width: width,
		paddingHorizontal: 20,
	},
	homeGreeting: {
		paddingTop: 10,
		paddingBottom: 30,
		color: palette.highlight,
		fontWeight: '600',
		textAlign: 'center',
		fontSize: 24,
	},
	homeContainer: {
		flex: 1,
		justifyContent: 'center',
		width: width,
		height: height,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: palette.lightBrown,
	},
	//for camera flash
	flashMessage: {
		position: 'absolute',
		backgroundColor: 'green',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		height: 40,
		bottom: 0,
	},
});

import { AppRegistry } from 'react-native';
import RootAndroid from './root-android';

AppRegistry.registerComponent('goBark', () => RootAndroid);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent('ViroSample', () => RootAndroid);

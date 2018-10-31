import * as React from 'react';
import { AppRegistry } from 'react-native';
import { AppLoading } from 'expo';

// Importing screen
import Swiper from './android/components/swiper';


/* ################################################################################################ */

export default class App extends React.Component {
  state = {
    isLoaded: false,
  }

  componentDidMount() {
    this.setState({ 
      isLoaded: true
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return <AppLoading />;
    }

    return (
      <Swiper />
    );
  }
}

AppRegistry.registerComponent('App', () => App);
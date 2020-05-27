import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../pages/HomePage';
import Chart from '../pages/ChartPage';
import Login from '../pages/LoginPage';

export default () => {
  let Navigation = createAppContainer(AppNavigator);
  return(
    <Navigation theme="light" />
  )
}

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false
      }
    },
    Chart: {
      screen: Chart,
      navigationOptions: {
        headerShown: true,
        headerTitle: "",
        headerStyle: {
          borderBottomColor: '#ffffff',
          borderBottomWidth: 0,
          shadowRadius: 0,
          shadowColor: 'transparent',
          elevation: 0
        },
      },
    },
  },
  {
    initialRouteName: 'Login',
  }
);
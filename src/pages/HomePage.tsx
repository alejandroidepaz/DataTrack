import React from 'react';
import { connect } from 'react-redux';

import Home from '../components/HomeComponent';

// The 'Home' page state maintains an array of all of the charts that a user has created
const mapStateToProps = (state : any) => {
  //console.log(JSON.stringify(state, null, 2))
  return {
    charts: state.charts,
    isFetching: state.isFetching
  }
}

export default connect(mapStateToProps)(Home); // pass the state constructed above as props to the Home component, and render the component. 
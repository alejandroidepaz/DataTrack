import React from 'react';
import { connect } from 'react-redux';

import Home from '../components/HomeComponent';

const mapStateToProps = (state : any) => {(
  {
    charts: state.charts
  }
)}

export default connect(mapStateToProps)(Home);
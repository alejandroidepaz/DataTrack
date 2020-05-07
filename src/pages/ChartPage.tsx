import React from 'react';
import { connect } from 'react-redux';

import { saveChart } from "../actions";
import Chart from '../components/ChartComponent';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch : any) => ({
    saveChart: chart => dispatch(saveChart(chart))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
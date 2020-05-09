import React from 'react';
import { connect } from 'react-redux';

import { saveChart, deleteChart } from "../actions";
import Chart from '../components/ChartComponent';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch : any) => ({
    saveChart: chart => dispatch(saveChart(chart)),
    deleteChart: id => dispatch(deleteChart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
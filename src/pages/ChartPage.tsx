import React from 'react';
import { connect } from 'react-redux';

import { saveUserChart, deleteUserChart } from "../actions";
import Chart from '../components/ChartComponent';

const mapStateToProps = (state : any) => {

    return {
        savingChart: state.savingChart,
        deletingChart: state.deletingChart
    }
};

// The Chart page takes two actions as props -- saveChart, which takes a Chart object and adds it to the array managed by the Home page. 
// The deleteChart action takes the id of the chart to be deleted, and removes this chart from the array managed by the Home page. 
const mapDispatchToProps = (dispatch : any) => ({
    saveUserChart: (chart : Chart) => dispatch(saveUserChart(chart)),
    deleteUserChart: (id : string) => dispatch(deleteUserChart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
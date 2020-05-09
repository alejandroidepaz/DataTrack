import { SAVE_CHART, DELETE_CHART } from './actionTypes';

export const saveChart = (chart : Chart ) => ({
    type: SAVE_CHART,
    id: chart.id,
    title: chart.title,
    xValues: chart.xValues,
    yValues: chart.yValues,
    chartType: chart.chartType
});

export const deleteChart = (chartId : String) => ({
    type: DELETE_CHART,
    id: chartId
});
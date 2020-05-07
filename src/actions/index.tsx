import { SAVE_CHART } from './actionTypes';

export const saveChart = (chart : Chart ) => ({
    type: SAVE_CHART,
    title: chart.title,
    xValues: chart.xValues,
    yValues: chart.yValues,
    chartType: chart.chartType
});
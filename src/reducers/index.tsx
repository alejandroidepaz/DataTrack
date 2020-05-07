import { SAVE_CHART } from '../actions/actionTypes';

const DEFAULT_STATE = {
    charts: []
}

const rootReducer = (state=DEFAULT_STATE, action) => {
    switch(action.type) {

        case SAVE_CHART :
            let updatedCharts = state.charts;
            updatedCharts.push({
                title: action.title,
                xValues: action.xValues,
                yValues: action.yValues,
                chartType: action.chartType
            });

            return {charts:updatedCharts};

        case "REMOVE_CHART":
            console.info("remove chart");
            return DEFAULT_STATE;
            
        default:
            return DEFAULT_STATE;
    }
}

export default rootReducer;
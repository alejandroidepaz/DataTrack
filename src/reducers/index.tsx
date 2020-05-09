import { SAVE_CHART, DELETE_CHART } from '../actions/actionTypes';

type IState = {
    charts: Array<Chart>
}

const DEFAULT_STATE : IState = {
    charts: []
}

const rootReducer = (state=DEFAULT_STATE, action : ChartAction) => {
    switch(action.type) {

        case SAVE_CHART :
            console.info(`Saving chart ${action.id}`);
            let c =  {
                id: action.id,
                title: action.title,
                xValues: action.xValues,
                yValues: action.yValues,
                chartType: action.chartType
            }

            // get index of chart if it's already in the list of charts
            let chartIdx = state.charts.findIndex(x => x.id === action.id);

            // if chart is already in the list, update its entry
            let updatedCharts = [];
            if (chartIdx >= 0) {
                state.charts[chartIdx] = c;
                updatedCharts = state.charts;
            }
            else {
                // if its not in the list, add it
                updatedCharts = state.charts.concat([c])
            }

            return {
                ...state,
                charts: updatedCharts
            }

        case DELETE_CHART:
            console.info(`Removing chart ${action.id}`);
            console.info(`In delete: ${state.charts.filter(c => c.id != action.id).length}`);

            return {
                ...state,
                charts: state.charts.filter(c => c.id != action.id)
            }
            
        default:
            console.info("Ooops, we're in the default action!");
            return DEFAULT_STATE;
    }
}

export default rootReducer;
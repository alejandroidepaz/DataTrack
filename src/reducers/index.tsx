import { SAVE_CHART, DELETE_CHART } from '../actions/actionTypes';
import { createReducer } from '@reduxjs/toolkit';

type IState = {
    charts: Array<Chart> // this should be an object of the form {id1: <Chart>, id2: <Chart>, id3: <Chart>}, this way we can update it via key values
}

const defaultState = {

    isFetching: false,
    savingChart: false,
    username: "adp_cudi",
    charts: {} //this is actually updated on startup by the store making a call to /getCharts
};

const DEFAULT_STATE : IState = {
    charts: []
}

// Everytime a saveChart or deleteChart action is envoked by our Chart component, this rootReducer function is called by redux. 
// It updates the current state based on the action invoked. 
// const rootReducer = (state=DEFAULT_STATE, action : ChartAction) => {
//     switch(action.type) {

//         case SAVE_CHART :
//             console.info(`Saving chart ${action.id}`);
//             let c =  {
//                 id: action.id,
//                 title: action.title,
//                 xValues: action.xValues,
//                 yValues: action.yValues,
//                 chartType: action.chartType
//             }

//             // get index of chart if it's already in the list of charts
//             let chartIdx = state.charts.findIndex(x => x.id === action.id);
            
//             //if chart is already in the list, update its entry
//             let updatedCharts = [];
//             if (chartIdx >= 0) {
//                 state.charts[chartIdx] = c;
//                 updatedCharts = state.charts;
//             }
//             else {
//                 // if its not in the list, add it
//                 updatedCharts = state.charts.concat([c])
//             }
            
//             return {
//                 charts: updatedCharts
//             }

//         case DELETE_CHART:
//             console.info(`Removing chart ${action.id}`);
//             //console.info(`In delete: ${state.charts.filter(c => c.id != action.id).length}`);
            
//             return {
//                 ...state,
//                 charts: state.charts.filter(c => c.id != action.id)
//             }
            
//         default:
//             console.info("Ooops, we're in the default action!");
//             return DEFAULT_STATE
//     }
// }

// createReducer gives us syntactic sugar for updating the state, allowing us to mock 'mutating it directly' without actually doing so. 
const rootReducer = createReducer(defaultState, {

    REQUEST_CHARTS: (state, action) => {

        console.log(`REQUESTING Charts for: ${action.username}`);
        state.username = action.username;
        state.isFetching = true;
    },

    RECEIVE_CHARTS: (state, action) => {

        console.log(`RECEVING Charts for ${action.username} | At time ${action.receivedAt}`)
        state.charts = action.charts;

    },

    SAVING_CHART: (state, action) => {
        console.info(`SAVING chart: ${action.id}`);
        state.savingChart = true;
    },

    SAVE_CHART: (state, action) => {
        console.info(`Chart with id: ${action.id} has been saved`);
        let c =  {
            id: action.id,
            title: action.title,
            xValues: action.xValues,
            yValues: action.yValues,
            chartType: action.chartType
        }

        state.charts[action.id] = c;
        state.savingChart = false;
        
        return state
    },

    DELETE_CHART: (state, action) => {
        console.info(`Removing chart ${action.id}`);
        //console.info(`In delete: ${state.charts.filter(c => c.id != action.id).length}`);
        delete state.charts[action.id];
        return state
    },
      
    default: () => {
        console.info("Ooops, we're in the default action!");
        return defaultState
    }
  })

export default rootReducer;
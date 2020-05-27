import { createReducer } from '@reduxjs/toolkit';

const defaultState = {

    isFetching: false,
    savingChart: false,
    deletingChart: false,
    username: "adp_cudi",
    charts: {} //this is actually updated on startup by the store making a call to /getCharts
};

// createReducer gives us syntactic sugar for updating the state, allowing us to mock 'mutating it directly' without actually doing so.
// Everytime a saveUserChart/deleteUserChart action is envoked by our Chart component, this rootReducer function is called by redux.  
const rootReducer = createReducer(defaultState, {

    REQUEST_CHARTS: (state, action) => {

        console.log(`REQUESTING Charts for: ${action.username}`);
        state.username = action.username;
        state.isFetching = true;

    },

    RECEIVE_CHARTS: (state, action) => {

        console.log(`RECEVING Charts for ${action.username} | At time ${action.receivedAt}`)
        state.charts = action.charts;
        state.isFetching = false;

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

    },

    DELETING_CHART: (state, action) => {

        console.info(`DELETING chart with id: ${action.id}`)
        state.deletingChart = true;

    },

    DELETE_CHART: (state, action) => {

        console.info(`DELETED chart with id: ${action.id}`);
        delete state.charts[action.id];
        state.deletingChart = false

    },
      
    default: () => {
        console.info("Ooops, we're in the default action!");

    }
  })

export default rootReducer;
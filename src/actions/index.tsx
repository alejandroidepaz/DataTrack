import { SAVE_CHART, DELETE_CHART, RECEIVE_CHARTS, REQUEST_CHARTS } from './actionTypes';
import { fetch } from 'cross-fetch';

export const saveChart = (chart : Chart ) => ({ // this action needs to include the statistics data as part of its payload
    type: SAVE_CHART,
    id: chart.id,
    title: chart.title,
    xValues: chart.xValues,
    yValues: chart.yValues,
    chartType: chart.chartType
});

export const deleteChart = (chartId : string) => ({
    type: DELETE_CHART,
    id: chartId
});

export const requestCharts = (username : string) => {

    return{
        type: REQUEST_CHARTS,
        username: username
    }
}

export const receiveCharts = (username : string, json) => {
    return {
      type: RECEIVE_CHARTS,
      username: username,
      charts: json,
      receivedAt: Date.now()
    }
  }

export function fetchCharts(username : string) {
// Thunk middleware knows how to handle functions.
// It passes the dispatch method as an argument to the function,
// thus making it able to dispatch actions itself.

    return function (dispatch) {
        // First dispatch: the app state is updated to inform that the API call is starting.
        dispatch(requestCharts(username))

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.
        return fetch('http://127.0.0.1:3000/getCharts')
                .then(
                    response => response.json(),
                    error => console.log(`The following error occured: ${error}`)
                )
                .then(data => {
                    //console.log("DATA IN FETCH: ", JSON.stringify(data, null, 2));
                    dispatch(receiveCharts(username, data));
                })
    }
}
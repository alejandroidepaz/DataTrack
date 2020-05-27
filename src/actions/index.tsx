import { SAVING_CHART, SAVE_CHART, DELETING_CHART, DELETE_CHART, RECEIVE_CHARTS, REQUEST_CHARTS } from './actionTypes';
import { fetch } from 'cross-fetch';

export const savingChart = (chartId : string) => {

    return {

        type: SAVING_CHART,
        id: chartId
    }
}

export const saveChart = (chart : Chart ) => ({ // this action needs to include the statistics data as part of its payload
    type: SAVE_CHART,
    id: chart.id,
    title: chart.title,
    xValues: chart.xValues,
    yValues: chart.yValues,
    chartType: chart.chartType
});

export const deletingChart = (chartId: string) => {

    return{
        type: DELETING_CHART,
        id: chartId
    }
}

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

export const receiveCharts = (username : string, json : object) => {
    return {
      type: RECEIVE_CHARTS,
      username: username,
      charts: json,
      receivedAt: Date.now()
    }
  }

// Action for getting all user charts
export function fetchCharts(username : string) {
// Thunk middleware knows how to handle functions.
// It passes the dispatch method as an argument to the function,
// thus making it able to dispatch actions itself.

    return function (dispatch) {
        // First dispatch: the app state is updated to inform that the API call is starting.
        dispatch(requestCharts(username))

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.
        let user = JSON.stringify({username:username});

        let postData = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: user
        };
        return fetch('http://127.0.0.1:3000/getCharts', postData)
                .then(
                    response => response.json(),
                    error => console.log(`The following error occured: ${error}`)
                )
                .then(data => {
                    //This function responsible for dispatching the official action once data is received from the API
                    if (!data){
                        console.info("Failed to Retrieve Charts For: ", username);
                    } else{
                        dispatch(receiveCharts(username, data));
                    }
                })
    }
}

// Action for saving user chart. It will update the state with the new chart, as well as insert/update the new chart in the DB
export function saveUserChart(chart : Chart, currentUser: string) {
    
        return function (dispatch) {

            // First dispatch: the app state is updated to inform that the API call is starting.
            dispatch(savingChart(chart.id))
            
            // build request payload
            let jsonChart = JSON.stringify({chart:chart, username:currentUser});
            let putData = {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: jsonChart
            }
            return fetch('http://127.0.0.1:3000/saveChart', putData)
                    .then(
                        response => response.json(),
                        error => console.log(`The following error occured: ${error}`)
                    )
                    .then(data => {
                        //This function responsible for dispatching the official action once data is received from the API.
                        // This adds the new chart (or updates an existing chart) in the 'charts' object held by state
                        if (!data){
                            console.info("Chart Failed to Save");
                        } else{
                            dispatch(saveChart(chart));
                        }
                    })
        }
    }


// Action for deleting a user chart. It will update the state by removing the specified chart, as well as delete the chart from the DB
export function deleteUserChart(id : string, currentUser: string) {
    
    return function (dispatch) {

        // First dispatch: the app state is updated to inform that the API call is starting.
        dispatch(deletingChart(id))

        // build request payload
        let chartToDelete = JSON.stringify({id:id, username:currentUser});

        let postData = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: chartToDelete
        }
        return fetch('http://127.0.0.1:3000/deleteChart', postData)
                .then(
                    response => response.json(),
                    error => console.log(`The following error occured: ${error}`)
                )
                .then(data => {
                    //This function responsible for dispatching the official action once data is received from the API.
                    // This adds the new chart (or updates an existing chart) in the 'charts' object held by state
                    dispatch(deleteChart(id));
                })
    }
}
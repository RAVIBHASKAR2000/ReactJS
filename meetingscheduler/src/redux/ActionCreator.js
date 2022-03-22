import * as ActionTypes from './ActionTypes';

import { baseUrl } from '../shared/baseUrl';






export const fetchMeetings = (date) => (dispatch) => {

    dispatch(MeetingsLoading(true));
   
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
       
        
       
      //  const value="17/07/2020";
       
    return fetch(proxyUrl+ baseUrl+date,{
      method:'GET',
     
      headers:{
          'Content-type':'application/json'
      },
      credentials:'same-origin',
  })
    .then(response => {
        if (response.ok) {
          console.log(response);
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(Meetings => dispatch(addMeetings(Meetings)))
    .catch(error => dispatch(MeetingsFailed(error.message)));
}

//fetchdishes is a thunk as its returning a function

export const MeetingsLoading=()=>({
 type :ActionTypes.MEETINGS_LOADING
});

export const MeetingsFailed = (errmess)=>({
    type:ActionTypes.MEETINGS_FAILED,  
    payload: errmess
});

export const addMeetings=(meetings)=>({
  
    type: ActionTypes.ADD_MEETINGS,
    payload:meetings
});

 
 //fetchdishes is a thunk as its returning a function
 

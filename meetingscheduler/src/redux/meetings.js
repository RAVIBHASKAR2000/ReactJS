import * as ActionTypes from './ActionTypes';


export const Meetings= (state={
    isLoading:true,
    errMess : null,
    meetings:[]
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_MEETINGS:
            return {...state, isLoading:false, errMess : null ,meetings: action
            .payload}
            //...state means current value of the state and whatever passed after 
            //this will be applied as a modification of the state 
        case ActionTypes.MEETINGS_LOADING:
            return {...state, isLoading:true, errMess : null , meetings: []}

        case ActionTypes.MEETINGS_FAILED:
            return{...state, isLoading:false, errMess:action.payload, meetings:[]}

        default:
            return state;
    }
}

import * as ActionTypes from './ActionTypes';

export const Leaders= (state={
    isLoading:true,
    errMess : null,
    leaders:[]
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_LEADERS:
            return {...state, isLoading:false, errMess : null , leaders: action
            .payload}
            //...state means current value of the state and whatever passed after 
            //this will be applied as a modification of the state 
        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading:true, errMess : null , leaders: []}

        case ActionTypes.LEADERS_FAILED:
            return{...state, isLoading:false, errMess:action.payload, leaders:[]}

        default:
            return state;
    }
}

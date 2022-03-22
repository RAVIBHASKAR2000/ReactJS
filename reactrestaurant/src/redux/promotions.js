
import * as ActionTypes from './ActionTypes';

export const Promotions= (state={
    isLoading:true,
    errMess:null,
    promotions:[]
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_PROMOS:
            return {...state, isLoading:false, errMess : null , promotions: action
            .payload}
            //...state means current value of the state and whatever passed after 
            //this will be applied as a modification of the state 
        case ActionTypes.PROMOS_LOADING:
            return {...state, isLoading:true, errMess : null , promotions: []}

        case ActionTypes.PROMOS_FAILED:
            return{...state, isLoading:false, errMess:action.payload, promotions:[]}

        default:
            return state;
    }
}
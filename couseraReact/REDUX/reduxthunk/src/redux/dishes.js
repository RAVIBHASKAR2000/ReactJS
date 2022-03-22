import * as ActionTypes from './ActionTypes';


export const Dishes= (state={
    isLoading:true,
    errMess : null,
    dishes:[]
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading:false, errMess : null , dishes: action
            .payload}
            //...state means current value of the state and whatever passed after 
            //this will be applied as a modification of the state 
        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading:true, errMess : null , dishes: []}

        case ActionTypes.DISHES_FAILED:
            return{...state, isLoading:false, errMess:action.payload, dishes:[]}

        default:
            return state;
    }
}

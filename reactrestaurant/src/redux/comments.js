
import * as ActionTypes from './ActionTypes';

export const Comments= (state={
    errMess:null,
    comments:[]
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading:false, errMess : null , comments: action
            .payload}
            //...state means current value of the state and whatever passed after 
            //this will be applied as a modification of the state 
       
        case ActionTypes.COMMENTS_FAILED:
            return{...state, isLoading:false, errMess:action.payload, comments:[]}


        case ActionTypes.ADD_COMMENT: 
             var comment = action.payload;
             return {...state, comments: state.comments.concat(comment)};

        default: 
            return state;
    }
}
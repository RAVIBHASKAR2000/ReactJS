import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Meetings} from './meetings';


export const ConfigureStore = () => {
    const store= createStore(
       combineReducers({
          meetings:Meetings
           

       }),
       applyMiddleware(thunk, logger)
      
    );

    return store;
}

import React,{ Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Home from './HomeComponent.js';
import Details from './EventDetails.js';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { EVENTS } from '../shared/events';


class Main extends Component{
  constructor(props){
    super(props);
    this.state= {
      events: EVENTS,
      selectedEventId:null
    };

  }


  onEventSelect(eventId){
    this.setState({
        selectedEventId:eventId
    });
    console.log(eventId);
}



    render(){

              
        const EventWithId = ({match}) =>{
          return(

            
            <Details event={this.state.events.filter((event) =>event.id===parseInt(match.params.eventId,10))[0]}/>
          );

        }
        return(
            <div className="App">
            <Header/>
            
            <Switch>
              <Route exact path="/home" component={()=> <Home events= {this.state.events}  />} />
              <Route path="/home/:eventId" component={EventWithId} />
              <Redirect to="/home" />

              
            </Switch>
            <Footer/>
             </div>
      )
    }

}

export default Main;
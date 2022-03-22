import React,{ Component } from 'react';
import { Switch, Route, Redirect,withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import AddMeeting from './AddMeeting'
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { fetchMeetings } from '../redux/ActionCreator';


const mapStateToProps=state =>{
  return{
    meetings:state.meetings
  };
} 


const mapDispatchToProps = (dispatch)=>({
  fetchMeetings: (date) => {dispatch(fetchMeetings(date))},
  

})

const date = new Date();  
var dd = date.getDate();
var mm = date.getMonth() + 1; //January is 0!

var yyyy = date.getFullYear();
if (dd < 10) {
 dd = '0' + dd;
 }
if (mm < 10) {
 mm = '0' + mm;
}
const ss =  dd + "/" + mm + "/" + yyyy;
const gg= ss.toString();

class Main extends Component{
   constructor(props){
     super(props);
    this.state={
      date:gg
    }; 
   }
   
  componentDidMount(){
    this.props.fetchMeetings(this.state.date);
    
  } 
  onDateChange(datechange){
    this.setState({
        date:datechange
    });
    this.props.fetchMeetings(this.state.date);
}

    render(){

      console.log(this.props.meetings);
        return(
        
            <div className="App">
            <Header/>
            
            <Switch>
            
              <Route path="/home" component={()=> <Home meetings={this.props.meetings.meetings}  
                isLoading = {this.props.meetings.isLoading}
              errMess={this.props.meetings.errMess}  date={this.state.date} onChangedate={(datechange)=> this.onDateChange(datechange)} />}  />
              
              <Route exact path="/addmeeting" component={()=>  <AddMeeting meetings={this.props.meetings.meetings} onChangedate={(datechange)=> this.onDateChange(datechange)} />}/>
              <Redirect to="/home" />

              
            </Switch>
            <Footer/>
             </div>
      )
    }

}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

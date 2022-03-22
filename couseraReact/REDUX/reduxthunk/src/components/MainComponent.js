import React,{ Component } from 'react';
import Home from './HomeComponent';
import Header from './headerComponent';
import Menu from './MenuComponents';

import  About from './AboutComponent';
import DishDetails from './DishdetailComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';

import { connect } from 'react-redux';
import { addComment,fetchDishes} from '../redux/ActionCreator';
import { actions, actionTypes }  from 'react-redux-form';

const mapStateToProps=state =>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
} 

const mapDispatchToProps = (dispatch)=>({
   addComment:(dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment)) ,
   fetchDishes: () => {dispatch(fetchDishes())},
   resetFeedbackForm: () =>{dispatch(actions.reset('feedback'))}
})
// in this maptodispatchprops dispatch comes as an parameters as we connnect the main component with the store
// here addComment(1st one) is a property of object , and it will reccive 4 parameters from form and send it to
// dispatch function which inturn has addComent(2nd comes from action cretor) and pas the values obtain by 1st add coment obejct property .
// this addComent(2nd ) will go to actioncreator and will make action and then will go to comment store and update the store
class Main extends Component{

  constructor(props){
    super(props);  
  }   


  componentDidMount(){
    this.props.fetchDishes();
  } 

  render(){
    const HomePage=() => {
      return(
        
        <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]} 
        dishesLoading = {this.props.dishes.isLoading}
        dishhErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.filter((promo)=> promo.featured)[0]}
        leader={this.props.leaders.filter((lead)=> lead.featured)[0]}
        />

      );
    }

    const DishWithId = ({match}) =>{
      return(
        <DishDetails dish={this.props.dishes.dishes.filter((dish)=> dish.id===parseInt(match.params.dishId,10))[0]} 
        isLoading = {this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess} 
        comments = {this.props.comments.filter((comment) => comment.dishId===parseInt(match.params.dishId,10))}
        addComment={this.props.addComment} />
        //1st addcomment will be passed as attribute to dishdetails component
      );

    }

    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=> <Menu dishes ={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path="/contactus" component = { () => <Contact resetFeedbackForm = {this.props.resetFeedbackForm}/>} />
          <Route exact path="/aboutus" component={()=> <About leaders={this.props.leaders} /> } />

          <Redirect to="/home" />

        </Switch>        
        <Footer/>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

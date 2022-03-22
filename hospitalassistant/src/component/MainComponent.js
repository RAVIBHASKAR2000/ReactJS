import React,{ Component } from 'react';
import Footer from './Footer';
import Homepage from './Homepage';
import Loginpage from './Loginpage';
import { Switch, Route, Redirect} from 'react-router-dom';
import Header from './Header';
class Main extends Component{
    constructor(props){
        super(props);
      
        this.state = {
        };
      }

      render(){
          return(
            <div>
               <Header/>
               <Switch>
                <Route path="/home" component={()=> <Homepage/>}/>
                <Route path="/loginpage" component ={()=><Loginpage/>}/>
                <Redirect to="/home" />
               
        </Switch>     
               <Footer/>
            </div>
          );
      }

}
export default Main;
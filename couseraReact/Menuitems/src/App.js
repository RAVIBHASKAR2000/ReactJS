import React, { Component } from 'react';
import logo from './logo.svg';
import {Navbar, NavbarBrand, Form}  from 'reactstrap';
import Menu from './components/MenuComponents';
import './App.css';
import { DISHES } from './shared/dishes';

class App extends Component {
   constructor(props){
    super(props);

    this.state={
      dishes: DISHES
    }

   }

  render(){
    return (
      <div >
       <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href ="/">Restro</NavbarBrand>
          </div>
       </Navbar>
        
       <Menu dishes={this.state.dishes}/>
      </div>
    );
  }
}

export default App;

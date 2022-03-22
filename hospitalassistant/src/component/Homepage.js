import React,{ Component} from 'react';
import { Navbar,NavbarBrand,Nav,NavbarToggler,Collapse,NavItem,Jumbotron, Form, FormGroup, Label, Input } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {Button,Modal,ModalHeader,ModalBody} from 'reactstrap';

class Homepage extends Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    };

    render(){
        return(
            <div className="container">
                <h2>Homepage</h2>
            </div>
        );
    }
}

export default Homepage;
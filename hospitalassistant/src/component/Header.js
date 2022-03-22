import React,{ Component} from 'react';
import { Navbar,NavbarBrand,Nav,NavbarToggler,Collapse,NavItem,Jumbotron, Form, FormGroup, Label, Input } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {Button,Modal,ModalHeader,ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            isNavOpen : false,
            
        }
        this.toggleNav = this.toggleNav.bind(this);
    };

    
    toggleNav(){
        this.setState({
            isNavOpen:!this.state.isNavOpen
        });
    }


    render(){
        return(
            <React.Fragment>
            <Navbar  dark expand="md" className="navbar">
                 
                    <NavbarToggler onClick={this.toggleNav}/>

                    <NavbarBrand className="navbarbrand" href="/">
                        <img src="assets/logo1.png" height="100" width="200" alt="Hospital Assistant"/>
                    </NavbarBrand>

                <Collapse isOpen={this.state.isNavOpen} navbar>

                        <Nav >
                        <NavItem>
                                <NavLink className="nav-link" to ="/home">
                                    <span className="fa fa-home fa-lg"></span> Home
                                </NavLink>
                        </NavItem>
                        
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem> 
                            <Link to="/Loginpage">
                                <Button outline >
                                <span className="fa fa-sign-in fa-lg"></span> Login/Register</Button>
                            </Link>
                            </NavItem>

                        </Nav>
                </Collapse>
                
            </Navbar>
            
            
            
       </React.Fragment>
        );
    }
}

export default Header;
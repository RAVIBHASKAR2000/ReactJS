import React,{Component} from 'react';
import { Navbar,Nav,NavItem} from 'reactstrap';
import { Link } from 'react-router-dom';


class Header extends Component{
    render(){
        return(
            <React.Fragment>
                <Navbar dark expand ="md">
                    <div className="container">
                    
                    <Nav className="mr-auto ml-auto" navbar>
                    <NavItem> 
                        <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <Link to='\home'>
                            <button class="navbtn btn btn-outline-success my-2 my-sm-0" type="submit">  <span className="fa fa-search fa-lg"></span> Search</button>
                            </Link>
                        </form>    
                    </NavItem>


                     </Nav>   

                   
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;
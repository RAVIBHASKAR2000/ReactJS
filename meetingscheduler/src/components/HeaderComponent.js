import React,{Component} from 'react';
import { Navbar,NavbarBrand} from 'reactstrap';


class Header extends Component{
    render(){
        return(
            <React.Fragment>
                <Navbar dark expand ="md">
                    <div className="container">
                    <NavbarBrand className="mr-auto" href="/">
                        <h1>Vector Agency</h1>
                     </NavbarBrand>
                    

                   
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;
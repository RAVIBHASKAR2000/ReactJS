import React,{Component} from 'react';
import {Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { IconContext } from "react-icons";
import { FaCocktail} from "react-icons/fa";
import { Link } from 'react-router-dom';

function RenderBar({show,event}){
    if(show){
        return(

            <div className="container">
            <div className="barcode">
                 <div>
                    <img height="200" width="150" src={event.promo} alt={event.name} />
                 </div>
                 
            </div>
             </div>
        );
    }
    else{
        return(
            <div>
            </div>
        );
    }
    
}



class Details extends Component{
    constructor(props){
        super(props);
        this.state={
            isShow: false
        }
        this.renderbar=this.renderbar.bind(this);
    }
    renderbar(){
        return(
            this.setState({ isShow: !this.state.isShow }) 
          
        );
        
       
    }
    render(){
        return(
            <div className="container">
            <Breadcrumb>

                    <BreadcrumbItem><Link to="/home" className="email"><h4>Home</h4></Link></BreadcrumbItem>
                    <BreadcrumbItem active><h4>{this.props.event.name}</h4></BreadcrumbItem>
                </Breadcrumb>
           <div className="promocard">
                <h2>{this.props.event.name}</h2>
                <h3>OFFER</h3>
                <IconContext.Provider value={{size:"6em"}}>
                                <div>
                                    <FaCocktail />
                                </div>
                </IconContext.Provider>
                <h3>Happy Hour </h3>
                <div className="date">
                <h5><span>SAT</span> 23rd JULY 09:00PM</h5>
                </div>

                <Button className="btn btn-primary redeem" onClick={()=>this.renderbar()}> REDEEM </Button>
                <RenderBar event={this.props.event} show={this.state.isShow}/>
           </div>
            </div>
        );
    }
}
export default Details ;
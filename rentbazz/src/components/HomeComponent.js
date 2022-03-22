import React,{ Component} from 'react';
import {Card, CardImg, CardBody,CardText,CardTitle ,Button, Container,Row,Col} from 'reactstrap';
import { IconContext } from "react-icons";
import { FaAngleDown,FaCocktail, FaCamera } from "react-icons/fa";
import { Link } from 'react-router-dom';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            isShow: false,
            object:{},
            selected: null
        };
        this.createText = this.createText.bind(this);
        this.createcontext=this.createcontext.bind(this);
        
        this.promoselect=this.promoselect.bind(this);
    }
    
  createText(event) {
      console.log(event);
    this.setState({ isShow: !this.state.isShow }) 
    this.setState({ object:event })
    this.setState({ selected :event.id })
    console.log(event.id)
    
  }

  promoselect(event,choose){
      console.log(choose);
      console.log(event);
     
  }

  createcontext({event}){
     
      if(this.state.isShow && this.state.selected===event.id){
          return( 
                
                    <Container className="promo">
                    <Row >
                    
                        <Col className="promo1" >
                        <Link to ={`/home/${event.id}`} >
                            <div className="cocktail">
                            <h4>OFFER</h4>
                            <IconContext.Provider value={{size:"4em"}}>
                                <div>
                                    <FaCocktail />
                                </div>
                            </IconContext.Provider>
                            </div>
                            <h5>Happy Hour</h5>
                            <div className="time"><h5>09:00 PM</h5></div>
                            </Link> 
                        </Col>
                    
                        <Col className="promo2" >
                        <Link to ={`/home/${event.id}`} >     
                            <div className="cocktail">
                                <h4>EVENTS</h4>
                                <IconContext.Provider value={{size:"3em"}}>
                                    <div>
                                        <FaCamera />
                                    </div>
                                </IconContext.Provider>
                            </div>
                            <span className="comedy"><h5>Comedy Night</h5></span>
                            
                            <div className="time"><h5>09:00 PM</h5></div>
                        </Link>    
                        </Col>
                        
                    </Row> 
                                       
                    </Container>
              );
         
      }
      else{
          return( <div></div>);
         
      }
  }




    render(){

        const menu = this.props.events.map((event)=>{
            return(
                <div key={event.id} className="col-12 col-md-4 mr-auto ml-auto mb-5">
                <Card className="cards">
                <CardImg width="100%" height="250" src={event.image} alt={event.name}>
                </CardImg>
                 <CardBody className="cardbody">
                    <CardTitle><h4>{event.name}</h4></CardTitle>
                    <CardText className="category"><span className="category-btn">{event.category1}</span> <span className="category-btn">{event.category2}</span>  <span className="category-btn">{event.category3}</span> </CardText>
                    <div>
                    <Button className="expand" onClick={()=>{this.createText(event); } } > <FaAngleDown /></Button>
                    </div>

                    </CardBody>
                    </Card> 
                    <this.createcontext event={event}/>
                </div>
            )
        })

        return(
            <div className="container mt-5">
            <div className="row">
                {menu}
            </div>
            
            </div>
            
        );
    }
}

export default Home;
import React , { Component} from 'react';
import { Card, CardImg,CardText,CardBody,CardTitle } from 'reactstrap';


class DishDetails extends Component{
    constructor(props){
        super(props);

        
    }
    
    renderDish(dish){
            if(dish!=null){
           
                   

             return(
                <div  className="col-12 col-md-5 m-1">
                    <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                     </CardBody>
                     </Card>

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


        renderComments(dish){
            if(dish!=null){
            const comm = dish.comments.map((Comment)=>{
                return (
                    <div key={Comment.id} >
                       <ul className="list-unstyled">
                         <li>{Comment.comment}</li>
                         <li>--{Comment.author}, {Comment.date}.</li>
                       </ul>
                    </div>
                );
            })
            return(
                <div  className="col-12 col-md-5 m-1">
                   <h1> Comments</h1>
                    {comm}
                </div>
                
            );
            }
            else{
                return(
                    <div></div>
                );
                
            }

        }

    render(){

       
        return(
            <div className="container">
                <div className="row">
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish)}
                </div>
            </div>  
        );
    }
}

export default DishDetails;
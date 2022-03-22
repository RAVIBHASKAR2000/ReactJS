import React,{ Component } from 'react';
import { FaChevronLeft,FaChevronRight} from "react-icons/fa";
import { IconContext } from "react-icons";
import { Row, Col, Button, Container,Breadcrumb,BreadcrumbItem  } from 'reactstrap';
import {Loading} from './LoadingComponent';
import { Link } from 'react-router-dom';


function RenderMeetItem ({meet}){
    const parti = meet.participants.map((parti)=>{
        return(
            <React.Fragment> {parti}</React.Fragment>

        );
    });


    
    return(
      <Container>
      <Row>
      <Col>
           {meet.start_time} {parseInt(meet.start_time)>=12 ? 'PM' : 'AM'} - {meet.end_time} {parseInt(meet.start_time)>=12 ? 'PM' : 'AM'}
      </Col>
      <Col>
          Meeting with {parti} for Porject {meet.description}
      </Col>
      
      </Row>
      </Container>
        
     
   );

}


class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            date:null
        };
        this.prevdate=this.prevdate.bind(this);
        this.nextdate=this.nextdate.bind(this);
    }
   componentDidMount(){
       this.setState({
           date:this.props.date
       })
   }
    prevdate(){
        const dates=this.state.date;

        console.log(dates);
        var dd= parseInt(dates.substring(0,2))-1;
        if(dd<10){
            dd='0'+dd;
        }
        var prevdate1=dd+dates.substring(2);
        this.setState({
            date:prevdate1
        })
        this.props.onChangedate(prevdate1);

        
    }
    nextdate(){
        const dates=this.state.date;

        console.log(dates);
        var dd= parseInt(dates.substring(0,2))+1;
        if(dd<10){
            dd='0'+dd;
        }
        var nextdate1=dd+dates.substring(2);
        this.setState({
            date:nextdate1
        })
        this.props.onChangedate(nextdate1);
        

        
    }

    render(){
        
            
          

        const meet = this.props.meetings.map((meet)=>{
            return (
                <div key={meet.id} className="meetingsdetailsbox">
                <RenderMeetItem meet={meet} />
                </div>
            )
        })


        if(this.props.isLoading){

            return (
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if(this.props.errMess){
            return (
                <div className="container">
                    <div className="row">
                        <h4> {this.props.errMess}</h4>
                    </div>
                </div>
            );
        }

        else{
            return(
            
                    <div className="container">
                        <Breadcrumb>
                                        <BreadcrumbItem>
                                            Vector Agency
                                        </BreadcrumbItem>
                                        <BreadcrumbItem active>Meetings</BreadcrumbItem>
                        </Breadcrumb>
                    <div className="topdate">
                    
                        <Row>
                            <Col>
                                <Button className="btndate" onClick={()=>this.prevdate(this.props.date)} >
                                <IconContext.Provider value={{color: 'blue',size:"2.5em"}}>
                                    <div>
                                        <FaChevronLeft/>
                                    </div>
                                </IconContext.Provider>
                                </Button>
                            </Col>

                            <Col>
                                <h4>{this.props.date}</h4>
                            </Col>

                            <Col>
                                <Button className="btndate"  onClick={()=>this.nextdate()}>
                                    <IconContext.Provider value={{color: 'blue',size:"2.5em"}}>
                                        <div>
                                            <FaChevronRight/>
                                        </div>
                                    </IconContext.Provider>
                                </Button> 
                            </Col> 
                        </Row>

                    </div>
                    
                    <div>
                        {meet}
                    </div>

                    <div>
                        <Link to="/addmeeting">
                                <Button className="addmeetings">ADD MEETINGS</Button>
                        </Link>
                    </div>

                </div>
                    
            );

        }
       

    }

    
}

export default Home;
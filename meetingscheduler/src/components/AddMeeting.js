import React,{ Component } from 'react';
import {Breadcrumb,BreadcrumbItem, Input, Button,Form, FormGroup, Label} from 'reactstrap';
import {Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import {Row,Col} from 'reactstrap';
import {Control} from 'react-redux-form';

class AddMeeting extends Component{
    constructor(props){
        super(props);
        this.state={
            starttime: '10:00',
            endtime: '11:00',
            meetingdate:null,
            description:null,
        }
        
        this.handleSubmit=this.handleSubmit.bind(this);

    }
    
    handleSubmit(event){
      
        alert("Meeting date: " + this.meetingdate.value+" start time: " +this.starttime.value+  "End Time: "+ this.endtime.value+"Desriptions: " +this.description.value);
        event.preventDefault();

         
        this.props.onChangedate(this.meetingdate.value);
      
           if(this.props.meetings.some((meet )=> meet.start_time=this.meetingdate.value)) 
           {
            alert('Slot not available');
           }
        else{
            alert('Slot available');
        }
        
 
    }
 
    render(){
        return(
                <div className="container">
                     <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to ='/home'>Meetings</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Add Meetings</BreadcrumbItem>
                    </Breadcrumb>
                   
                   
                    <Form model="feedback" onSubmit={this.handleSubmit}>
                            
                    <Row className="form-group">
                            <Label htmlFor="meeetingdate" md={2} >Meetings</Label>
                            <Col md={3}>
                                <Input type="date" className="form-control" id="meetingdate" name ="meetingdate"
                                innerRef={(input)=>this.meetingdate=input} />
                            
                                
                            </Col>
                            
                     </Row>

                     <Row className="form-group">
                            <Label htmlFor="starttime" md={2} >Start Time</Label>
                            <Col md={3}>
                                <Input type="time" className="form-control" id="starttime" name ="starttime"
                                innerRef={(input)=>this.starttime=input} />
                            
                                
                            </Col>
                     
                    </Row>

                    <Row className="form-group">
                    <Label htmlFor="endtime" md={2} >End Time</Label>
                    <Col md={3}>
                        <Input type="time" className="form-control" id="endtime" name ="endtime"
                        innerRef={(input)=>this.endtime=input} />
                    
                        
                    </Col>
             
                  </Row>

                        
                        

                    <Row className="form-group">
                            <Label htmlFor="description" md={2} >Description</Label>
                           
                            <Col md={10}>
                            <Input type="textarea" className="form-control" id="description" name ="description" rows="5"
                            innerRef={(input)=>this.description=input} />
                            </Col>
                      
                    </Row>
                    
                
                        <Row className="form-group">
                            <Col md={{size:10,offset:2}}>
                            <Button type="submit"  value="submit" color="primary" >Save</Button> 
                            </Col>
                        </Row>
                     </Form>
            </div>
           
        );
    }

}

export default AddMeeting;
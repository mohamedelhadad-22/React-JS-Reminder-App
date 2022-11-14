
import 'bootstrap/dist/css/bootstrap.min.css';
import  'bootstrap/dist/js/bootstrap.min.js';
import { connect } from 'react-redux';
import { add_reminder, remove_reminder, clear_reminders } from './actions';
import moment from 'moment'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, state } from 'react';


import './App.css';
import './reminder.css';



class App extends React.Component {

  state = {
    text: '',
    date: new Date()
  }

  render_reminders= () =>{
    const {reminders} = this.props;
    return(
      <ul className='list-group'>
        {
          reminders.map(reminder => {
            return(
              <li className='list-group-item' key={reminder.id}>
                <div className=''>{reminder.text}</div>
                <div className=''>{moment(new Date(reminder.date)).fromNow()}</div>
                <button className='closeicon btn btn-danger'
                onClick={()=> this.props.remove_reminder(reminder.id)}> X </button>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render(){
    console.log('to pros', this.props)
    return(

      <div className="App">
      
      <div className='container'>
          <div className="my-reminder">
            <img src='https://icons.iconarchive.com/icons/dtafalonso/ios8/512/Reminders-icon.png' alt='imag'/>
            <div className='rmindertitle'>
              <h2> What Should U Do ?  </h2>
            </div>

          <form onSubmit={(e) => {e.preventDefault()}}>
            <Form.Group className="mb-3" controlId="texttype">
              {/* <Form.Label>What Should U Do ?</Form.Label> */}
              <Form.Control type="text" 
              value={this.state.text}
              placeholder="What U think ...?" 
              onChange={(e) => this.setState({text: e.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              {/* <Form.Label>Your dat</Form.Label> */}
                    <DatePicker
                      className='form-control'
                      placeholderText='Enter Date'
                      value={this.state.date}
                      selected={this.state.date}
                      onChange={(date) => {this.setState({date})}}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
            </Form.Group>

            <Button variant="primary" className='d-block mb-2'
            onClick={() =>{ this.props.add_reminder (this.state.text, this.state.date)
              this.setState({text: '', date: ''})
            }}>
              Submit a Riminder
            </Button>

            {this.render_reminders()}

            <Button variant="danger" className='d-block clearReminder' 
            onClick={() => this.props.clear_reminders()}
            >
              Clear All Riminder's
            </Button>

          </form>
          </div>
      </div>
    </div>
    )
  }
}


// function mapDispatchToProps(dispach){
//   return{
//     add-reminder: () => dispach();
//   }
// }

// function mapStateToProps(state){
//   return{
//     reminders : state
//   }
// }

export default connect((state)=> {
  return{
    reminders : state
  }
}, {add_reminder, remove_reminder,clear_reminders})(App);

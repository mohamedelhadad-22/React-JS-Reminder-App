import { ADD_REMINDER, CLEAR_REMINDERS, REMOVE_REMINDER } from "../types";
import { bake_cookie, read_cookie } from 'sfcookies'


const Reminders = (state = [], action) => {
    let reminders = [];
    state = read_cookie('remindersCookies')
    if(action.type === ADD_REMINDER ){
        reminders = [...state, {text:action.text, date:action.date, id: Math.random()}];
        bake_cookie('remindersCookies', reminders)
        console.log('reducer', reminders)
        return reminders 
    }
    else if(action.type === REMOVE_REMINDER){
        reminders = state.filter(reminder => reminder.id !== action.id);
        bake_cookie('remindersCookies', reminders)
        return reminders
    }
    
    else if(action.type === CLEAR_REMINDERS){
        reminders = []
        console.log('femove all from reducer', reminders);
        bake_cookie('remindersCookies', reminders)
        return reminders
    }
    else{
        return state
    }
}


export default Reminders;
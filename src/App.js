import React,{Component} from 'react';
import './App.css';
// import Holiday from './Holiday/Holiday';
// import Today from './Today/Today';
// import { Switch, Route, Link } from "react-router-dom";


class App extends Component{

  state ={
    todayDate: '',
    response: 0,
    holiday: [],
    upcomingHolidays: [],
    passedHolidays: []
  };

  componentDidMount(){
    // console.log("component did mount");
    fetch("https://calendarific.com/api/v2/holidays?country=IN&year=2019&api_key=2b1fb94d06bf4d4659b4de58c2c66e87751d53a4", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        var passedHolidays =[];
        var holiday =[];
        var upcomingHolidays =[];
        const respCode=data.meta.code;
        const holidayArray = data.response.holidays;
        console.log(holidayArray[0]);
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year

        holidayArray.forEach(element => {
          // console.log(element.date.datetime.month);
          if(month<element.date.datetime.month){
            passedHolidays.push(element);
          }
          if(month === element.date.datetime.month)
          {
            if(date<element.date.datetime.day)
            {
              passedHolidays.push(element);
            }
            if(date === element.date.datetime.day)
            {
              holiday.push(element);
            }
            if(date>element.date.datetime.day)
            {
              upcomingHolidays.push(element);
            }
          }
          if(month > element.date.datetime.month)
          {
            upcomingHolidays.push(element);
          }
          
        });
        
        this.setState({
          response: respCode,
          todayDate: date + '/' + month + '/' + year,
          holiday : holiday,
          passedHolidays:passedHolidays,
          upcomingHolidays:upcomingHolidays
        });
      });
  }

  render(){

    const arr1 = this.state.passedHolidays.map( (item,i) => {
      return <li key={i}>{item.date.datetime.day + "/" + item.date.datetime.month+" :: "+item.name}</li>
    });
    const arr2 = this.state.upcomingHolidays.map( (item,i) => {
      return <li key={i}>{item.date.datetime.day + "/" + item.date.datetime.month+" :: "+item.name}</li>
    });
    if(this.state.holiday.length === 0)
    {
      
    }
    return( 
      <div>         
      <div>
        <div>
          <h2>--No Holiday Today--</h2>
              
        </div>
        <div>
          {/* <Link to="/" ><button>Upcoming Holidays</button></Link>
          <Link to="/passedHoliday"><button>Passed Holidays</button></Link> */}
        <h3>Passed Holidays</h3>
        <p>{arr2}</p>
        </div>
        <div>
          {/* <Holiday /> */}
          <h3>Upcoming Holidays</h3>
          <p>{arr1}</p>
         

        </div>
      </div>

      {/* <Switch>
        <Route path="/passedHoliday" exact render={()=> <Holiday holidayList={this.state.passedHolidays}/>
      }/>
        <Route path="/" exact render={() => <Holiday holidayList={this.state.upcomingHolidays} />
      }/>
      </Switch> */}
      </div>
    );
  }
}

export default App;
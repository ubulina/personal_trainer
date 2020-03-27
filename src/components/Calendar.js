import React, { useState, useEffect} from 'react';
import {Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment/min/moment-with-locales';
import style from 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const allViews = Object.keys(Views).map(k => Views[k])

const myEventsList = [

    {
        title: "02:00-06:59",
        start: "2020-03-03 02:00",
        end: "2020-03-03 06:59",
        up_down_ind: "N"
    },
   
    {
        title: "07:00-23:59",
        start: "2020-03-03 07:00",
        end: "2020-03-03 23:59",
        up_down_ind: "Y"
    },
    
    {
        title: "00:00-01:59",
        start: "2020-03-04 00:00",
        end: "2020-03-04 01:59",
        up_down_ind: "Y"
    },

]


export default function TrainingCalendar () {

    const [trainings, setTrainings] = useState ([]);

    useEffect( () => {

        fetchData()

    }, []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => data.map(row => mapData(row)))
        .then(data => setTrainings(data))
    }

    const mapData = (data) => {

        console.log(data)
        console.log(data.duration)

        moment.locale('fi');

        var startTime = moment(data.date).toISOString();
        var endTime = moment(data.date).add(data.duration, 'm').toISOString();

        console.log(startTime) 
        console.log(endTime)
        

        return {
            title: data.activity + " / " + data.customer.firstname + " " + data.customer.lastname,
            start: moment(data.date).toDate(),
            end: endTime = moment(data.date).add(data.duration, 'm').toDate()
        }
    }

 
    return (
        <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={trainings}
          views={{ month: true, week: true, day: true, agenda: true}}
          style={style}
          step={60}
          showMultiDayTimes

        />
      </div>

    );

}




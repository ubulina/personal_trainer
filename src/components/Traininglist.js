import React, { useState, useEffect} from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import moment from 'moment/min/moment-with-locales';


export default function Traininglist(){

    const [trainings, setTrainings] = useState([]);

    useEffect( () => {

        fetchData()

    }, []);

    const fetchData = () => {

        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }

    const deleteTraining = (link) => {

        if(window.confirm('Are you sure?')){

        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))

        }
    }


        const columns = [

            {
                id: 'date',
                Header: 'Date',
                accessor: row => {
                    moment.locale("fi");
                    return moment(row.date).format('DD.MM.YYYY HH:mm')
                }
                
            },
    
            {
                Header: 'Activity',
                accessor: 'activity'
            },

            {
                Header: 'Duration (min)',
                accessor: 'duration'
            },

            {
                id: 'customer',
                Header: 'Customer',
                accessor: row => {
                    return row.customer.firstname + ' ' + row.customer.lastname
                }
            },            

            {
                id: 'link',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: row => {
                    return "https://customerrest.herokuapp.com/api/trainings/" + row.id
                },
                Cell: row => <Button size= "small" variant="contained" color = "secondary" onClick={() => deleteTraining(row.value)}>Delete</Button>
                
            }
    
                
        ]
    
        return (

            <div>
            
            <ReactTable data={trainings} columns={columns} filterable={true}/>

            </div>


        );

}

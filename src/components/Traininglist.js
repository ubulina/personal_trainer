import React, { useState, useEffect} from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import AddTraining from './AddTraining';

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

    const deleteTraining = (id) => {

        if(window.confirm('Are you sure?')){

        fetch(id, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))

        }
    }


        const columns = [

            {
                id: 'date',
                Header: 'Date',
                accessor: d => {
                    return moment(d.date).format("D.MM.YYYY hh:mm")
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
                Header: 'Customer',
                accessor: 'customer.firstname' 
            },            

            {
                sortable: false,
                filterable: false,
                width: 100,
                accessor: 'id',
                Cell: row => <Button size= "small" variant="contained" color = "secondary" onClick={() => deleteTraining(row.value)}>Delete</Button>
                
            }
    
                
        ]
    
        return (

            <div>
            
            <ReactTable data={trainings} columns={columns} filterable={true}/>

            </div>


        );

}

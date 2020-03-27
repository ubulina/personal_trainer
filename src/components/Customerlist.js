import React, { useState, useEffect} from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';
import moment from 'moment';


export default function Customerlist(){

    const [customers, setCustomers] = useState ([]);

    useEffect( () => {

        fetchData()

    }, []);

    const fetchData = () => {

        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))


    }

    const deleteCustomer = (link) => {

        
        if(window.confirm ('You are deleting a customer. Are you sure?')){

        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))

        }
    }

    const saveCustomer = (customer) => {

        fetch('https://customerrest.herokuapp.com/api/customers', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)

        })
        .then(res => fetchData())
        .catch(err => console.error(err))

    }

    const updateCustomer = (customer, link) => {

        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const addTraining = (training) => {
        
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "date": moment(training.date).toISOString(),
                "activity": training.activity,
                "duration": training.duration,
                "customer": training.customer
            })
        })
        .then(res => fetchData())
        .catch(err => console.error(err))


    }

   
    const columns = [

        {
            sortable: false,
            filterable: false,
            
            Cell: row => <AddTraining addTraining={addTraining} customer={row.original}/>
            //siirretään asiakkaan tieto treeninlisäys-lomakkeelle
        },

        {
            Header: 'Firstname',
            accessor: 'firstname'
        },

        {
            Header: 'Lastname',
            accessor: 'lastname'
        },

        {
            Header: 'Streetaddress',
            accessor: 'streetaddress'
        },

        {
            Header: 'Postcode',
            accessor: 'postcode'
        },

        {
            Header: 'City',
            accessor: 'city'
        },

        {
            Header: 'Email',
            accessor: 'email'
        },

        {
            Header: 'Phone',
            accessor: 'phone'
        },

        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <EditCustomer updateCustomer={updateCustomer} customer={row.original}/>
        },

        
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[0].href',
            Cell: row => <Button size= "small" variant="contained" color = "secondary" onClick={() => deleteCustomer(row.value)}>Delete</Button>
        },


    ]

    return (

        <div>      
        <AddCustomer saveCustomer={saveCustomer}/>
        <ReactTable data={customers} columns={columns} filterable={true}/>

        </div>
    );
}

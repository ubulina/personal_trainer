import React, { useState }  from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Calendar from './Calendar';

const TabApp = () => {

    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {

        setValue(value);
    }

    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="Customers"/>
                <Tab value="two" label="Trainings"/>
                <Tab value="three" label="Calendar"/>
                </Tabs>
            </ AppBar>
            {value=== 'one'&& <div><Customerlist/></div>}
            {value=== 'two'&& <div><Traininglist/></div>}
            {value=== 'three'&& <div><Calendar/></div>}

        </div>
    );

}

export default TabApp;
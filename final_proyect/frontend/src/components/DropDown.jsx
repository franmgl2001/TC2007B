import React, { useState, useEffect } from 'react';
import { SelectInput } from 'react-admin';
import axios from 'axios';

const DropDown = ({ collection }) => {
    const [options, setOptions] = useState([]);
    const [categoria, setCategoria] = useState('');

    useEffect(() => {
        // Get the authentication token from localStorage
        const authToken = localStorage.getItem('auth');
        const apiUrl = `http://localhost:3011/dropdown/${collection}`

        // Fetch data from the API using Axios with the authentication header
        axios.get(apiUrl, {
            headers: {
                authentication: `${authToken}`,
                ContentType: 'application/json',
            }
        })
            .then(response => {
                // Set the fetched data to the options state
                setOptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array ensures the effect runs once after initial render

    const choices = options.map(option => ({
        id: option._id,
        name: option.name,
    }));

    const handleChange = (event) => {
        setCategoria(event.target.value);
    };

    return (
        <SelectInput
            label={collection}
            source="categoria"
            choices={[{ id: '', name: 'Seleccione un servicio' }, ...choices]}
            optionText="name"
            optionValue="id"
        />
    );
};


export default DropDown;


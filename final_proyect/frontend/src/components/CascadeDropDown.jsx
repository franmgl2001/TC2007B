import React, { useState, useEffect } from 'react';
import { SelectInput } from 'react-admin';
import axios from 'axios';

const CascadeDropDown = ({ collection, parentValue }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Get the authentication token from localStorage
        const authToken = localStorage.getItem('auth');

        const apiUrl = `http://localhost:3011/dropdown/${collection}`;

        // Fetch data from the API using Axios with the authentication header
        if (collection !== 'SubCategoria') {
            axios
                .get(apiUrl, {
                    headers: {
                        authentication: `${authToken}`,
                        ContentType: 'application/json',
                    },
                    params: {
                        parentValue, // Pass the parentValue as a query parameter
                    },
                })
                .then((response) => {
                    // Set the fetched data to the options state
                    setOptions(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } else {
            setOptions([]);
        }
    }, [parentValue]); // Include parentValue in the dependency array
    // Empty dependency array ensures the effect runs once after initial render

    const choices = options.map(option => ({
        id: option._id,
        name: option.name,
    }));
    return (
        <SelectInput
            label={collection}
            source="subcategoria"
            choices={[...choices]}
            optionText="name"
            optionValue="id"
        />
    );
};


export default CascadeDropDown;
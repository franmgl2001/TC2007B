import React, { useState, useEffect } from 'react';
import { SelectInput } from 'react-admin';
import axios from 'axios';

const CascadeDropDown = ({ collection, parentValue }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Get the authentication token from localStorage
        const authToken = localStorage.getItem('auth');

        const apiUrl = `https://localhost:3011/dropdown/${collection}`;

        // Fetch data from the API using Axios with the authentication header
        if (collection !== 'SubCategoría') {
            axios
                .get(apiUrl, {
                    headers: {
                        authentication: `${authToken}`,
                        ContentType: 'application/json',
                    },
                })
                .then((response) => {
                    // Set the fetched data to the options state
                    setOptions(response.data.map(option => ({
                        id: option.name,
                        name: option.name,
                    })));
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } else {
            setOptions([]);
        }
    }, [parentValue, collection]); // Include parentValue in the dependency array
    // Empty dependency array ensures the effect runs once after initial render


    return (
        <SelectInput
            label={"SubCategoría"}
            source={"SubCategoría"}
            choices={[...options]}
            optionText="name"
            optionValue="id"
        />
    );
};


export default CascadeDropDown;
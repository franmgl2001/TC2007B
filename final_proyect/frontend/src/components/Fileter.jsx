import * as React from 'react';
import { Filter, TextInput, SelectInput } from 'react-admin';

const CustomFilter = ({ columns, ...props }) => (
    <Filter {...props}>
        <SelectInput label="Search by Column" source="columnName" choices={columns} alwaysOn />
        <TextInput label="Search Value" source="searchValue" alwaysOn />
    </Filter>
);

export default CustomFilter;
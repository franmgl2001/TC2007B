import { Datagrid, List, TextField, Edit, SimpleForm, TextInput, Create } from 'react-admin';
import DropDown from '../components/DropDown';
import CascadeDropDown from '../components/CascadeDropDown';
import React, { useState } from 'react';

export const TicketList = () => (
    < List >
        <Datagrid rowClick="edit">
            <TextField source="Categoría" />
            <TextField source="SubCategoría" />
            <TextField source="Prioridad" />
            <TextField source="Proceso" />
            <TextField source="Status" />
            <TextField source="Comentario" />
            <TextField source="Resolución" />
        </Datagrid>
    </List >
);

export const TicketEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="Categoría" disabled />
        </SimpleForm>
    </Edit>
);

export const TicketCreate = () => {
    const [selectedClasificacion, setSelectedClasificacion] = useState('SubCategoría');
    return (
        <Create>
            <SimpleForm>
                <DropDown collection={"Categoría"} setValue={setSelectedClasificacion} Cascade={true} />
                <CascadeDropDown collection={selectedClasificacion} parentValue={selectedClasificacion} />
                <DropDown collection={"Prioridad"} setValue={null} Cascade={false} />
                <TextInput source="Proceso" multiline rows={2} />
                <DropDown collection={"Status"} setValue={null} Cascade={false} />
                <TextInput source="Comentario" multiline rows={5} />
                <TextInput source="Resolución" multiline rows={5} />
            </SimpleForm>
        </Create>
    );
};

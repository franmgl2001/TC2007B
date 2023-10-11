import { Datagrid, List, TextField, Edit, SimpleForm, TextInput, Create, DateInput } from 'react-admin';
import DropDown from '../components/DropDown';
import CascadeDropDown from '../components/CascadeDropDown';
import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { EditButton } from 'react-admin';

export const TicketList = () => (
    <List>
        <Datagrid rowClick="show">
            <TextField source="user" label="Coordinador" />
            <TextField source="Categoría" />
            <TextField source="SubCategoría" />
            <TextField source="Status" />
            <TextField source="Fecha de Incidente" />
            <EditButton basePath="TicketEdit" />
        </Datagrid>
    </List>
);

export const TicketEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="coordinador" disabled />
            <TextInput source="categoria" />
            <TextInput source="subcategoria" />
            <TextInput source="status" />
            <TextInput source="descripcion" />
            <TextInput source="comentario" multiline rows={5} />
        </SimpleForm>
    </Edit>
);

export const TicketCreate = () => {
    const [selectedClasificacion, setSelectedClasificacion] = useState('SubCategoria');
    const isSmallScreen = useMediaQuery('(max-width: 1300px)');

    return (
        <Create>
            <SimpleForm>
                <div style={{width: '100%', gap: 80, display: isSmallScreen ? 'block' : 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                    <DropDown collection={"Categoría"} setValue={setSelectedClasificacion} Cascade={true} sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                    <CascadeDropDown collection={selectedClasificacion} parentValue={selectedClasificacion} sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                    <DropDown collection={"Prioridad"} setValue={null} Cascade={false} sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                    <DropDown collection={"Status"} setValue={null} Cascade={false} sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                    <DateInput source="Fecha de Incidente" />
                </div>
                <div style={{width: '100%', gap: 80, display: isSmallScreen ? 'block' : 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                    <TextInput source="Aula" sx={{ width: '100%', marginBottom: isSmallScreen ? '10px' : '0' }} />
                    <TextInput source="NumeroOficio" sx={{ width: '100%', marginBottom: isSmallScreen ? '10px' : '0' }} />
                </div>

                <TextInput source="Proceso" multiline rows={1} sx={{ width: '100%', marginBottom: '10px', marginRight: '1em', '& .MuiFilledInput-input': { paddingTop: '10px' } }} />
                <TextInput source="Comentario" multiline rows={5} sx={{ width: '100%', marginBottom: '10px', marginRight: '1em', '& .MuiFilledInput-input': { paddingTop: '10px' } }} />
                <TextInput source="Resolución" multiline rows={5} sx={{ width: '100%', marginRight: '1em', '& .MuiFilledInput-input': { paddingTop: '10px' } }} />
            </SimpleForm>
        </Create>
    );
};
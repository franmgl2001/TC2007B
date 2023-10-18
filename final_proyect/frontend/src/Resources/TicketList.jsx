import { Datagrid, List, TextField, Edit, SimpleForm, TextInput, Create, DateInput, usePermissions } from 'react-admin';
import DropDown from '../components/DropDown';
import CascadeDropDown from '../components/CascadeDropDown';
import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { Show, EditButton, RichTextField, DateField, PrevNextButtons, TopToolbar, TabbedShowLayout, ReferenceInput } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    headerCell: {
        backgroundColor: 'MistyRose',
        fontWeight: 'bold',
    }
});

const postFilters = [
    <TextInput source="search" label="Search" alwaysOn />,
    <ReferenceInput source="Categoría" label="Categoría" reference="Categoría" />,
    <ReferenceInput source="SubCategoría" label="Sub Categoría" reference="SubCategoría" />,
    <ReferenceInput source="Prioridad" label="Prioridad" reference="Prioridad" />,
    <ReferenceInput source="Aula" label="Aula" reference="Aula" />,
    <ReferenceInput source="Status" label="Estado" reference="Status" />,
];

export const TicketList = props => {
    const classes = useStyles();
    const { permissions } = usePermissions();
    return (
        <List filters={postFilters} {...props} >
            <Datagrid rowClick="show" classes={classes} {...props}>
                {permissions === 'Admin' &&
                    <TextField source="user" label="Coordinador" />}
                <TextField source="Categoría" />
                <TextField source="SubCategoría" />
                <TextField source="Prioridad" />
                <TextField source="Aula" />
                <TextField source="Status" label="Estado" />
                <DateField source="Fecha de Incidente" />
                <DateField source="Fecha de Resolución" />
                {permissions !== 'Ejecutivo' && <EditButton />}
            </Datagrid>
        </List>
    )
};

export const TicketEdit = () => {
    const [selectedClasificacion, setSelectedClasificacion] = useState("SubCategoría");
    const { permissions } = usePermissions();
    return (
        <div>

            {permissions !== 'Ejecutivo' &&
                <Edit>
                    <SimpleForm>
                        <div style={{ gap: 80, display: 'flex' }}>
                            <TextInput source="user" disabled />
                            <TextInput source="NumeroOficio" />
                            <DropDown collection={"Categoría"} setValue={setSelectedClasificacion} Cascade={true} />
                            <CascadeDropDown collection={selectedClasificacion} parentValue={selectedClasificacion} />
                            <DropDown collection={"Status"} label="Estado" setValue={null} Cascade={false} />
                        </div>
                        <div style={{ gap: 20, display: 'flex' }}>
                            <TextInput source="Comentario" multiline rows={5} sx={{ width: 560 }} />
                            <TextInput source="Resolución" multiline rows={5} sx={{ width: 560 }} />
                        </div>
                        <div style={{ gap: 20, display: 'flex' }}>
                            <DateInput source="Fecha de Incidente" />
                            <DateInput source="Fecha de Resolución" />
                        </div>
                    </SimpleForm>

                </Edit>
            }

        </div >

    );

};

export const TicketCreate = () => {
    const [selectedClasificacion, setSelectedClasificacion] = useState("SubCategoría");
    const isSmallScreen = useMediaQuery('(max-width: 1300px)');
    const { permissions } = usePermissions();

    return (
        <Create>
            {permissions !== 'Ejecutivo' &&
                <SimpleForm>
                    <div style={{ width: '100%', gap: 80, display: isSmallScreen ? 'block' : 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                        <DropDown collection={"Categoría"} setValue={setSelectedClasificacion} Cascade={true} sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                        <CascadeDropDown collection={selectedClasificacion} parentValue={selectedClasificacion} sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                        <DropDown collection={"Prioridad"} setValue={null} Cascade={false} sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                        <DropDown collection={"Status"} label="Estado" setValue={null} Cascade={false} sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                        <DropDown collection="Aula" sx={{ width: '100%', marginBottom: isSmallScreen ? '10px' : '0' }} />
                    </div>
                    <div style={{ width: '100%', gap: 50, display: isSmallScreen ? 'block' : 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                        <DateInput source="Fecha de Incidente" />
                        <DateInput source="Fecha de Resolución" />
                        <TextInput source="NumeroOficio" sx={{ width: '70%', marginBottom: isSmallScreen ? '10px' : '0' }} />
                    </div>

                    <TextInput source="Proceso" multiline rows={1} sx={{ width: '100%', marginBottom: '10px', marginRight: '1em', '& .MuiFilledInput-input': { paddingTop: '10px' } }} />
                    <TextInput source="Comentario" multiline rows={4} sx={{ width: '100%', marginBottom: '10px', marginRight: '1em', '& .MuiFilledInput-input': { paddingTop: '10px' } }} />
                    <TextInput source="Resolución" multiline rows={5} sx={{ width: '100%', marginRight: '1em', '& .MuiFilledInput-input': { paddingTop: '10px' } }} />
                </SimpleForm>
            }
        </Create>
    );
};

export const TicketShow = () => {
    return (
        <Show title="Detalles del Ticket"
            actions={
                <TopToolbar>
                    <PrevNextButtons linkType="show" />
                </TopToolbar>
            }>
            <TabbedShowLayout>
                <TabbedShowLayout.Tab label="Ticket">
                    <TextField source="user" label="Coordinador" />
                    <TextField source="Categoría" />
                    <TextField source="SubCategoría" />
                    <DateField source="Fecha de Incidente" />
                    <DateField source="Fecha de Resolución" />
                    <TextField source="Prioridad" />
                    <TextField source="Status" label="Estado" />
                    <TextField source="Aula" />
                    <TextField source="NumeroOficio" />
                </TabbedShowLayout.Tab>
                <TabbedShowLayout.Tab label="Descripción">
                    <RichTextField source="Proceso" />
                    <RichTextField source="Comentario" />
                    <RichTextField source="Resolución" />
                    <TopToolbar>
                        <EditButton />
                    </TopToolbar >
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show>
    );
};
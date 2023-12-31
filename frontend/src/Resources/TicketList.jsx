import { Datagrid, List, TextField, Edit, SimpleForm, TextInput, Create, DateInput, usePermissions, useNotify, useRefresh, useRedirect } from 'react-admin';
import DropDown from '../components/DropDown';
import CascadeDropDown from '../components/CascadeDropDown';
import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { Show, EditButton, RichTextField, DateField, PrevNextButtons, TopToolbar, TabbedShowLayout, SimpleList } from 'react-admin';


const postFilters = [
    <TextInput source="search" label="Buscar" alwaysOn />,
];

export const TicketList = props => {

    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const { permissions } = usePermissions();
    return (
        <List filters={postFilters} {...props} rowClick="show">
            {isSmall ? (
                < SimpleList
                    primaryText={(record) => record.Categoría}
                    secondaryText={(record) => record.SubCategoría}
                    tertiaryText={(record) => record.Prioridad}
                />) : (
                <Datagrid rowClick="show" {...props}>
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
            )}
        </List>
    );
};

export const TicketEdit = () => {
    const [selectedClasificacion, setSelectedClasificacion] = useState("SubCategoría");
    const { permissions } = usePermissions();
    const isSmallScreen = useMediaQuery('(max-width: 1300px)');


    return (
        <div>
            {permissions !== 'Ejecutivo' &&
                <Edit >
                    <SimpleForm>
                        <div style={{ width: '100%', gap: 80, display: isSmallScreen ? 'block' : 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                            <TextInput source="user" disabled sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                            <TextInput source="NumeroOficio" sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                            <DropDown collection={"Categoría"} setValue={setSelectedClasificacion} Cascade={true} sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                            <CascadeDropDown collection={selectedClasificacion} parentValue={selectedClasificacion} sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                            <DropDown collection={"Status"} label="Estado" setValue={null} Cascade={false} sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
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
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
    const [selectedClasificacion, setSelectedClasificacion] = useState("SubCategoría");
    const isSmallScreen = useMediaQuery('(max-width: 1300px)');
    const { permissions } = usePermissions();
    const onSuccess = () => {
        notify(`Ticket Creado`);
        refresh();
        redirect('/tickets');
    }

    return (
        <Create mutationMode="undoable" mutationOptions={{ onSuccess }}>
            {permissions !== 'Ejecutivo' &&
                <SimpleForm>
                    <div style={{ width: '100%', gap: 80, display: isSmallScreen ? 'block' : 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                        <DropDown collection={"Categoría"} setValue={setSelectedClasificacion} Cascade={true} sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                        <CascadeDropDown collection={selectedClasificacion} parentValue={selectedClasificacion} sx={{ marginBottom: isSmallScreen ? '10px' : '0' }} />
                        <DropDown collection={"Prioridad"} setValue={null} Cascade={false} sx={{ marginBottom: isSmallScreen ? '10px' : '0', gap: 80 }} />
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
                    <TextField source="Prioridad" />
                    <TextField source="Status" label="Estado" />
                    <TextField source="NumeroOficio" />
                </TabbedShowLayout.Tab>
                <TabbedShowLayout.Tab label="Lugar y Fecha">
                    <TextField source="Aula" />
                    <DateField source="Fecha de Incidente" />
                    <DateField source="Fecha de Resolución" />

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
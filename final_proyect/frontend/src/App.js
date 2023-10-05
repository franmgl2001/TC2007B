import React, {useState} from 'react';
import { Route } from 'react-router-dom';
import { Admin, Resource, CustomRoutes, LoginClasses } from 'react-admin';
import { TicketList, TicketEdit, TicketCreate } from './pages/TicketList';
import { dataProvider } from "./dataProvider";
import Registrarse from "./registrarse";
import authProvider from './authProvider';
import LoginPage from './pages/loginpage';


const App = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage = {LoginPage}>
      <Resource name="tickets" list={TicketList} edit={TicketEdit} create={TicketCreate} />
      <CustomRoutes>
        <Route path="/registrarse" element={<Registrarse />} />
      </CustomRoutes>
      <CustomRoutes>
        <Route path="/login" element={<LoginPage />} />
      </CustomRoutes>
    </Admin>

  );
};

export default App;

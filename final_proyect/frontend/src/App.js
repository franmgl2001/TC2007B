import React from 'react';
import { Route } from 'react-router-dom';
import { Admin, Resource, CustomRoutes } from 'react-admin';
import { TicketList, TicketEdit, TicketCreate } from './pages/TicketList';
import { dataProvider } from "./dataProvider";
import Registrarse from "./registrarse";
import authProvider from './authProvider';
import LoginPage from './pages/loginpage';
import { UserList, UserCreate } from './pages/UserList';


const App = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="tickets" list={TicketList} edit={TicketEdit} create={TicketCreate} />
      <Resource name="users" list={UserList} create={UserCreate} />

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

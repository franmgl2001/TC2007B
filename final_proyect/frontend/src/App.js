import React from 'react';
import { Route } from 'react-router-dom';
import { Admin, Resource, CustomRoutes, Layout } from 'react-admin';
import { TicketList, TicketEdit, TicketCreate } from './pages/TicketList';
import { dataProvider } from "./dataProvider";
import Registrarse from "./registrarse";
import authProvider from './authProvider';

import LoginPage from './loginpage';

import { MyAppBar } from './components/MyAppBar.js';
import { UserList, UserCreate } from './pages/UserList';




const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

const App = () => {
  return (

    <Admin dataProvider={dataProvider} authProvider={authProvider} layout={MyLayout} darkTheme={{ palette: { mode: 'dark' } }}>>
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

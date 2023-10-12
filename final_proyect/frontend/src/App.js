import React from 'react';
import { Route } from 'react-router-dom';
import { Admin, Resource, CustomRoutes, Layout, ShowGuesser, EditGuesser } from 'react-admin';
import { TicketList, TicketEdit, TicketCreate } from './Resources/TicketList';
import { dataProvider } from "./dataProvider";
import Registrarse from "./registrarse";
import authProvider from './authProvider';
import LoginPage from './loginpage';

import { i18nProvider } from './i18nProvider';

import { MyAppBar } from './components/MyAppBar.js';
import { UserList, UserCreate } from './Resources/UserList';
import { ReportList } from './Resources/ReportList';
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";






const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

const App = () => {
  return (


    <Admin dataProvider={dataProvider} authProvider={authProvider} layout={MyLayout} i18nProvider={i18nProvider} darkTheme={{ palette: { mode: 'dark' } }}>


      <Resource name="tickets" list={TicketList} create={TicketCreate} show={ShowGuesser} recordRepresentation="Coordinador" edit={EditGuesser} icon={PostIcon} />
      {permissions => permissions === 'Admin' && (
        <Resource name="users" list={UserList} create={UserCreate} icon={UserIcon} />
      )}
      <Resource name="reports" list={ReportList} />
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

import React from 'react';
import { Admin, Resource, Layout, } from 'react-admin';
import { TicketList, TicketCreate, TicketEdit, TicketShow } from './Resources/TicketList';
import { dataProvider } from "./dataProvider";
import authProvider from './authProvider';
import LoginPage from './loginpage';
import { i18nProvider } from './i18nProvider';
import { MyAppBar } from './components/MyAppBar.js';
import { UserList, UserCreate, UserEdit } from './Resources/UserList';
import { ReportList } from './Resources/ReportList';
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import './custom.css';



const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;



const App = () => {
  return (

    <Admin dataProvider={dataProvider} authProvider={authProvider} i18nProvider={i18nProvider} darkTheme={{ palette: { mode: 'dark' } }} loginPage={LoginPage} >
      {permissions => (
        <>
          <Resource name="tickets" list={TicketList} create={permissions !== 'Ejecutivo' ? TicketCreate : null} show={TicketShow} recordRepresentation="Coordinador" edit={permissions !== 'Ejecutivo' ? TicketEdit : null} icon={PostIcon} options={{ label: "Tickets" }} />
          {permissions === 'Admin' &&
            <Resource name="users" list={UserList} create={UserCreate} icon={UserIcon} edit={UserEdit} />
          }
          <Resource name="reports" list={ReportList} icon={BarChartOutlinedIcon} />

        </>
      )}
    </Admin>
  );
};

export default App;

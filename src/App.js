import { useEffect, useState } from 'react';
import * as cstConstants from './utils/constants/constants.js';
import * as cstFunctions from './components/API/helpers.js';
import * as React from 'react';
import './App.css';
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function App(props) {

  const [value, setTabValue] = React.useState(0);
  const [currentUser, setCurrentUser] = useState([]);
  const [allEmployee, setAllEmployee] = useState([]);
  const [tableData, setTableData] = useState([]);
  // const navigate = useNavigate();
  const [columnDefs] = useState([
    { field: 'HRID' },
    { field: 'FirstName' },
    { field: 'LastName' },
    { field: 'Name' },
    { field: 'Status' },
    { field: 'PrimaryOrganization' },
    { field: 'eMail' },
  ])

  useEffect(() => {
    cstFunctions.getApiCall(cstConstants.DS_CURRENT_USER).then((data) => {
      console.log(data.data);
      setCurrentUser(data.data);
    });
  }, []);

  useEffect(() => {
    cstFunctions.getApiCall(cstConstants.DS_ALL_EMPLOYEE).then((data) => {
      console.log(data.data);
      setAllEmployee(data.data);
      setTableData(data.data)
    });
  }, []);

  const navigateToDetail = (e) => {
    console.log("e", e);
    // navigate(`/detail/${e.data.id}`, { state: { data: e.data } });
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    console.log(newValue)
    {
      switch (newValue) {
        case 1:
          console.log("Hi i am from case 2.")
          break;
        case 2:
          console.log(newValue);
          break;
        case 3:
          console.log("Hi i am from case 2.")
          break;
        case 4:
          console.log(newValue);
          break;
        case 5:
          console.log("Hi i am from case 2.")
          setTableData(allEmployee.filter((item) => item.Status === "Retired"))
          break;
        default:
          setTableData(allEmployee)
      }
    }
  };

  return (
    <>
      <div>
        <Header currentUser={currentUser} />
      </div>
      <div>
        <Tabs id="tabId" value={value} style={{ margin: "0 20px 0 20px", borderBottom: '1px solid #797979' }} sx={{
          "& button:hover": { backgroundColor: "#065baa21", color: '#1976d2', borderBottom: '2px solid #1976d2' }
        }} onChange={handleTabChange}>
          <Tab key={0} label="All" title="All" />
          <Tab key={1} label="Draft" title="Draft" />
          <Tab key={2} label="Active" title="Active" />
          <Tab key={3} label="Active User" title="Active User" />
          <Tab key={4} label="In Progress" title="In Progress" />
          <Tab key={5} label="Retired" title="Retired" />
        </Tabs>

      </div>
      <div style={{ height: '400px', width: '100%' }} className="ag-theme-alpine">
        <AgGridReact
          style={{ padding: '1rem' }}
          rowData={tableData}
          onRowClicked={(e) => navigateToDetail(e)}
          columnDefs={columnDefs} >
        </AgGridReact>
      </div>
    </>
  );
}

export default App;

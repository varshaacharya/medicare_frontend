
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import axios from '../../../../api/axios';
const URL="./student";

function ViewStudent ()  {    
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "student_name", headerName: "Student Name", width: 130 },
        { field: "student_email", headerName: "email", width: 130 },
        { field: "student_address", headerName: "Address", width: 130 },
        { field: "student_contact", headerName: "Contact", width: 130 },
        { field: "balance", headerName: "Balance", width: 130 },
        { field: "student_status", headerName: "Status", width: 130 },
        { field: "student_date", headerName: "Date", width: 130 },
      ];

      const [dataList, setDataList] = useState([]); 

      useEffect(() => {
        loadData();        
    },[]);

    const loadData = async () => {
      try {
          const response = await axios.get(URL);
  
          if (response.data.status === 401) {
              setDataList([]);
          } else {
              const responseData = response.data.data;
              for (let i = 0; i < responseData.length; i++) {
                  responseData[i].id = i + 1;
              }
              setDataList(responseData);
          }
      } catch (err) {
          if (!err?.response) {
              console.log("No server response");
          } else {
              console.log(err?.response.data);
          }
      }
  };
    
      
    
    return (
        <div style={{ marginTop: '10px', padding: '50px' }}>
          <Box sx={{ flexGrow: 1, height: 400, width: '100%' }}>
            <DataGrid
              rows={dataList}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />    
          </Box>
        </div>
      );
};
export default ViewStudent;
      
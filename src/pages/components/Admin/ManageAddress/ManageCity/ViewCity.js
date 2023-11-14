
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import axios from '../../../../../api/axios';
const URL="./city/";

function ViewCity ()  {    
    const columns = [
        { field: "id", headerName: "ID", width: 230 },
        { field: "state_id", headerName: "state_id", width: 300 },
        { field: "district_id", headerName: "district_id", width: 300 },
        { field: "city_name", headerName: "city_name", width: 300 },
        { field: "status", headerName: "Status", width: 300 },
        { field: "date", headerName: "Date", width: 300 },

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
            <Box sx={{ position: 'relative', top: '10px', left: '180px', height: 400, width: '80%' }}>
            <DataGrid
              rows={dataList}
              columns={columns}
            />    
          </Box>
        </div>
      );
};
export default ViewCity;
      
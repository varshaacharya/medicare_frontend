
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

function ViewItem ()  {    
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "item_image", headerName: "Image", width: 130 },
        { field: "category_id", headerName: "Category", width: 130 },
        { field: "item_name", headerName: "Item Name", width: 130 },
        { field: "item_price", headerName: "Price", width: 130 },
        { field: "item_status", headerName: "Status", width: 130 },
        { field: "item_date", headerName: "Date", width: 130 },

       
        
      ];
    
      const rows = [
        { id: 1, firstName: "John" },
        { id: 2, firstName: "Jane" },
        { id: 2, firstName: "Jane" },
        { id: 2, firstName: "Jane" },
        { id: 10, firstName: "Jane" },
     
      ];
    
    return (
        <div style={{ marginTop: '10px', padding: '50px' }}>
          <Box sx={{ flexGrow: 1, height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />    
          </Box>
        </div>
      );
};
export default ViewItem;
      
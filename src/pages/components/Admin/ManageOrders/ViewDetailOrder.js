// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import { Button, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from '../../../../api/axios';
// import { useState,useEffect } from 'react';
// const URL="./order";

// function ViewDetailOrder({rowData,open,setOpen}) {
//   const columns = [
//     { field: "id", headerName: "SL.NO", width: 200 },
//     { field: "item_name", headerName: "Item", width: 200 },
//     { field: "quantity", headerName: "Quantity", width: 200 },
//     // { field: "firstName", headerName: "Price", width: 200 },
//     // { field: "firstName", headerName: "Total", width: 200 },
//   ];
//   const [dataList, setDataList] = useState([]); 
//   const [id,setId]=useState('');
//   const [barcode_number,setBarcode_number]=useState('');

//       useEffect(() => {
//         loadData();        
//     },[rowData]);

//     const loadData = async () => {
//       setId(rowData.id );
//         setBarcode_number(rowData.barcode_number );
//       try {
        
//           const response = await axios.get(URL);
  
//           if (response.data.status === 401) {
//               setDataList([]);
//           } else {
//               setDataList(response.data.data);
//           }
//       } catch (err) {
//           if (!err?.response) {
//               console.log("No server response");
//           } else {
//               console.log(err?.response.data);
//           }
//       }
//   };

  

  


//   const handleBack = () => {
//     setOpen(false);
//   }

//   return (
//     <>
//     {open && (
//       <Box sx={{ marginTop: '20px', padding: '20px', position: 'relative', left: '160px' }}>
//         <Typography variant="h4" sx={{ position: 'absolute', top: 0, left: 0 }}>
//           Manage Order
//         </Typography>
//         <Box sx={{ position: 'absolute', top: '60px', left: 0 }}>
//           <Typography variant="body1">Invoice</Typography>
//           <Typography variant="body1">Shreya</Typography>
//           <Typography variant="body1">7745671727</Typography>
//           <Typography variant="body1">surathkall</Typography>
//         </Box>
//         <Box sx={{ flexGrow: 1, height: 400, width: '80%', position: 'absolute', top: '170px', left: '0' }}>
//           <DataGrid
//             rows={dataList}
//             columns={columns}
//           />
//         </Box>
//         <Button size="small" variant="contained" sx={{ position: 'absolute', top: 0, right: '310px' }} onClick={handleBack}>
//           Back
//         </Button>
//         <Typography variant="body1" sx={{ position: 'absolute', top: '130px', right: '310px' }}>
//           Grand Total: Rs. 65.00
//         </Typography>
//       </Box>
//        )}
//     </>
//   );
// }

// export default ViewDetailOrder;
import React, { useState, useEffect } from 'react';
import {
  Button, Box, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid,
} from '@mui/material';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../../../api/axios';
import { Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import { useAuthContext } from '../../../../context/AuthContext';

// import SalAdd from './SalAdd';

const URL = './order/getBarcodeItems';

const ViewDetailOrder = () => {
  const [id, setId] = useState('');
  const [product_id, setProd_id] = useState('');
  const [dataList, setDataList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [name,setName] = useState(""); 
  const [address,setAddress] = useState("");
  const [contact,setContact] = useState("");
  const [open, setOpen] = useState(false);
  const [trackno, setTrackno] = useState('');
  const [subTotal, setSubTotal] = useState(0);
  const {state} = useLocation();

  const barcode_number = state ? state.barcode_number : null;

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'pname', headerName: 'Item', width: 150 },
    { field: 'quantity', headerName: 'quantity', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'Total', headerName: 'Total', width: 150, renderCell: (params) => <div>{params.row.quantity * params.row.price}</div> },
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   headerName: 'Actions',
    //   width: 150,
    //   cellClassName: 'actions',
    //   getActions: (params) => {
    //     return [
    //       <DeleteData selectedRow={params.row} />
    //     ];
    //   }
    // },
  ];

  useEffect(() => {
    loadData();
    console.log("barcode"+barcode_number);

  }, [barcode_number]);

  const loadData = async () => {
        const method = 'POST';
        try {
        const data = { barcode_number: barcode_number };
        const mainURL = URL;
        serviceMethod(mainURL, method, data, handleSuccess, handleException);
        } catch (e) {
        console.error(e);
        }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };
  const serviceMethodUpdate = async (mainURL, data, handleSuccess, handleException) => {
    try {

      const response = await axios.delete(mainURL, data);
      return handleSuccess(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        return handleException(err?.response.data);
      }
    }
  };

  const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {
    try {
      const response = await axios.post(mainURL, data);
      return handleSuccess(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log('No server response');
      } else {
        return handleException(err?.response.data);
      }
    }
  };

  const handleSuccess = (data) => {
    setDataList(data.data.barCodeItems);
    calculateSubTotal(data.data.barCodeItems);
    setPaymentStatus(data.data.stuData[0].booking_status);
    setName(data.data.stuData[0].student_name);
    setAddress(data.data.stuData[0].student_address);
    setContact(data.data.stuData[0].student_contact);    
  };

  const calculateSubTotal = (cart) => {
    let total = 0;
    if (cart.length > 0) {
      cart.forEach(item => {
        total += parseInt(item.price) * parseInt(item.quantity);
      });
    }
    setSubTotal(total);
  }

  const CustomFooterStatusComponent = (props) => {
    return (
      <Box sx={{ p: 1, display: 'flex' }}>
        <Grid item xs={2}>          
            <b>Grand Total:</b> &nbsp;{subTotal} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         
        </Grid>       
        <Grid item xs={2}>           
              <b>PaymentStatus:</b> {paymentStatus}            
          </Grid>
      </Box>
    );
  }

  const DeleteData = (props) => {
    return (
      <DeleteIcon
        onClick={() => {
          console.log(props.selectedRow.id);
          const data = { id: props.selectedRow.id };
          const mainURL = URL + '/' + data.id + '/delete';
          serviceMethodUpdate(mainURL, data, handleSuccess, handleException);
        }}
      />
    );
  };
  const handleException = (data) => {
    console.log(data);
    setDataList([]);
    setPaymentStatus('');
    setSubTotal('');
  };


  return (
    <>
    <Box sx={{ p: 1, display: 'flex' }}>
        <Grid item xs={2}>          
            <b>BarCode Number:</b> &nbsp;{barcode_number} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br></br> 
            <b>Name:</b> {name}    <br></br> 
            <b>Address:</b> {address}   <br></br>     
            <b>Mobile no:</b> {contact}   <br></br>                      
        </Grid>       
       
        
      </Box>
    <div style={{ display: 'flex', gap: '16px' }}>
      <form onSubmit={handleSubmit} style={{ flex: 1, display:"none" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={trackno}
              margin="dense"
              id="outlined-basic"
              label="Trackno"
              onChange={(e) => {
                setTrackno(e.target.value);
              }}
              variant="outlined"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>

          </Grid>
          <Grid item xs={12}>

          </Grid>
          <Grid item xs={6}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              fullWidth
            >
              Search
            </Button>
          </Grid>

        </Grid>
      </form>
      
      <div style={{ flex: 2 }}>
        <Box sx={{ flexGrow: 3, padding: '0px', height: 400, width: '90%' }}>
          <DataGrid rows={dataList} columns={columns}
            slots={{
              footer: CustomFooterStatusComponent,
            }} />
        </Box>
      </div>
    </div>
    </>
  );
};

export default ViewDetailOrder;

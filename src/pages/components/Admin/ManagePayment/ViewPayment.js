// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import { Button, Typography, TextField, Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// function ViewPayment() {
//   const [open, setOpen] = useState(false); 
  
//   const columns = [
//     { field: "id", headerName: "SL.NO", width: 200 },
//     { field: "firstName", headerName: "Item", width: 200 },
//     { field: "firstName", headerName: "Quantity", width: 200 },
//     { field: "firstName", headerName: "Price", width: 200 },
//     { field: "firstName", headerName: "Total", width: 200 },
//   ];

//   const rows = [
//     { id: 1, firstName: "John" },
//     { id: 2, firstName: "Jane" },
//     { id: 3, firstName: "Jane" },
//     { id: 4, firstName: "Jane" },
//     { id: 5, firstName: "Jane" },
//   ];

//   const navigate = useNavigate();
//   const handleBack = () => {
//     navigate("/ViewOrders");
//   }

//   return (
//     <>
//       <Box sx={{ marginTop: '20px', position: 'relative', left: '160px' }}>
//         <Grid container spacing={1} sx={{ marginTop: '10px', left: "10px" }}>
//           <Grid item xs={6}>
//             <Typography variant="h4" sx={{ position: 'absolute', top: '10px', left: '10px' }}>
//               Manage Payment
//             </Typography>
//           </Grid>

//           <Grid item xs={2}>
//             <TextField id="outlined-basic" label="Token Number" variant="outlined" />
//           </Grid>

//           <Grid item xs={2}>
//             <Button size="small" variant="contained" onClick={() => setOpen(true)}>
//               Search
//             </Button>
//           </Grid>
//         </Grid>

//         {open && ( // Render the following elements only when 'open' is true
//           <>
//             <Typography variant="body1" sx={{ position: 'absolute', top: '130px', left: '10px' }}>
//               Grand Total: Rs. 65.00
//             </Typography>
//             <Typography variant="body1" sx={{ position: 'absolute', top: '130px', right: '320px' }}>
//               Payment Status: PAID
//             </Typography>
//             <Box sx={{ flexGrow: 1, height: 400, width: '80%', position: 'absolute', top: '170px', left: '0' }}>
//               <DataGrid
//                 rows={rows}
//                 columns={columns}
//               />
//             </Box>
//           </>
//         )}
//       </Box>
//     </>
//   );
// }

// export default ViewPayment;
import React, { useState, useEffect } from 'react';
import {
  Button, Box, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid,
} from '@mui/material';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../../../api/axios';
import { useAuthContext } from '../../../../context/AuthContext';

// import SalAdd from './SalAdd';

const URL = './order/getBarcodeItems';

const ViewPayment = () => {
  const [id, setId] = useState('');
  const [product_id, setProd_id] = useState('');
  const [dataList, setDataList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [trackno, setTrackno] = useState('');
  const [subTotal, setSubTotal] = useState(0);

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
    //loadData();

  }, [refreshData]);

  const loadData = async () => {
    try {
      const response = await axios.get(URL);
      if (response.data.status === 401) {
        setDataList('');
      } else {
        setDataList(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log('No server response');
      } else {
        console.log(err?.response.data);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = 'POST';
    try {
      const data = { barcode_number: trackno };
      const mainURL = URL;
      serviceMethod(mainURL, method, data, handleSuccess, handleException);
    } catch (e) {
      console.error(e);
    }
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
    setPaymentStatus(data.data.stuData[0].booking_status);//  bookingStatusUpdate

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

  const updatePayment = () => {
     console.log("hello clocike", trackno);
     const method = 'POST';
      try {
        const data = { barcode_number: trackno };
        const mainURL = "booking/bookingStatusUpdate";
        serviceMethod(mainURL, method, data, handleSuccess, handleException);
      } catch (e) {
        console.error(e);
      }
  }


  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <form onSubmit={handleSubmit} style={{ flex: 1 }}>
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
          <Grid item xs={6}>

            <Button
              size="large"
              variant="contained"
              type="submit"
              fullWidth
              onClick = {updatePayment}
            >
              Pay Now
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
  );
};

export default ViewPayment;

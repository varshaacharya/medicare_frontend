
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import { Button,  } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useState,useEffect } from 'react';
// import axios from '../../../../api/axios';
// import ViewDetailOrder from './ViewDetailOrder';
// const URL="./order";

// function ViewOrders ()  {    
//     const columns = [
//         { field: "id", headerName: "SL.NO", width: 190 },
//         { field: "barcode_number", headerName: "Token Number", width: 190 },
//         { field: "serving_time", headerName: "Serving Time", width: 190 },
//         { field: "student_email", headerName: "Student Email", width: 190 },
//         { field: "booking_date", headerName: "Ordered On", width: 190 },
//         { field: "booking_status", headerName: "status", width: 190 },
//         {
//             field: 'actions',
//             type: 'actions',
//             headerName: 'Actions',
//             width:150,
//             cellClassName:'actions',
//             getActions : (params) => {
//                 return [
//                         <EditData selectedRow={params.row}/>,
                       
//                 ];            
//             }            
//         },
//       ];
//       const [dataList, setDataList] = useState([]); 
//       const [id,setId]=useState('');
//       const [barcode_number,setBarcode_number]=useState('');
//       const [open,setOpen]=useState(false);

//       useEffect(() => {
//         loadData();        
//     },[]);

//     const loadData = async () => {
       
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
    
      

//       const navigate=useNavigate();
    
//       const EditData = (props) => {
//         return (
//             <Button 
//                 size="small" 
//                 variant="contained"
//                 style={{ cursor: "pointer" }} onClick={(e) => {
//                 e.stopPropagation();
//                 console.log(props.selectedRow.id);
//                 console.log(props.selectedRow.barcode_number);
//                 setId(props.selectedRow.id);
//                 setBarcode_number(props.selectedRow.barcode_number);
//                 setOpen(true);
//                 // navigate("/ViewDetailOrder");                
//             }}>View</Button>
//         );
//     }
    
//     return (
//         <>
       
//         <div className="GridContent">
//             <Box sx={{ position: 'relative', top: '10px', left: '180px', height: 400, width: '85%' }}>
//                 <DataGrid
//                 rows={dataList}
//                 columns={columns}
//                 pageSize={5}
//                 rowsPerPageOptions={[5]}
//                 /> 
//                 <ViewDetailOrder
//                 rowData={barcode_number} 
//                 setOpen ={setOpen} 
//                 />   
//             </Box>
//         </div>


//         </>
//       );
// };
// export default ViewOrders;
      
import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../../../api/axios';
import { useNavigate } from 'react-router-dom';

const URL = './order/getBookings';

const ViewOrder = () => {    

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "barcode_number", headerName: "Token Number", width: 130 },
        { field: "serving_time", headerName: "Serving Time", width: 130 },
        { field: "student_id", headerName: "Student Reg No", width: 130 },
        { field: "booking_date", headerName: "Ordered On", width: 130 },
        { field: "booking_status", headerName: "Status", width: 130 },      
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 250,
            cellClassName: 'actions',
            getActions: (params) => {
                return [
                    <EditData selectedRow={params.row} />
                ];            
            }            
        },
    ];

    const [editData, setEditData] = useState([]);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();
    const serviceUpdateMethod = async (mainURL, data, handleSuccess, handleException) => {
        try {
            const response = await axios.post(mainURL, data);
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
                console.log("No server response");                
            } else {                
                return handleException(err?.response.data);
            }
        }                  
    };
    const EditData = (props) => {
        return (
            <EditIcon style={{ cursor: "pointer" }} onClick={(e) => {
                e.stopPropagation();
                console.log(props.selectedRow.barcode_number);
                navigate('/ViewDetailOrder', { state: { barcode_number:props.selectedRow.barcode_number }});
                // setEditData(props.selectedRow);
                // setId(props.selectedRow.id);
                // setOpen(true);                
            }}/>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = "POST";
        const data = { id, amount };
        const mainURL = URL + '/' + data.id + '/update';
        console.log("URL:", URL + '/' + id + '/update');
        serviceMethod(mainURL, method, data, handleSuccess, handleException);
        setOpen(false);
    } 
    
    
  
    const [dataList, setDataList] = useState([]);        
    const [refreshData, setRefreshData] = useState(false);
    
    useEffect(() => {
        loadData();        
    }, [refreshData]);

    const loadData = async () => {
        try {
            const response = await axios.post(URL); 
            if (response.data.status == 401) {
                setDataList('');      
            } else {
                setDataList(response.data.data);
            }
        } catch (err) {
            if (!err?.response) {
                console.log("No server response");
            } else {
                console.log(err?.response.data);
            }
        } 
    };
    
    const handleSuccess = (data) => {         
             
    }

    const handleException = (data) => {
        console.log(data);
    }

    return  (
        <>
            <Dialog
                fullWidth={true}
                maxWidth="lg"
                sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '100%' } }}
                open={open}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{"Service Charge"}</DialogTitle>        
                    <DialogContent>
                        <Grid item xs={12}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={3}>
                                    <FormControl fullWidth>                      
                                        <TextField 
                                            value={amount}
                                            margin="dense"
                                            id="outlined-basic"
                                            label="amount"
                                            variant="outlined"
                                            required
                                            onChange={(e) => { setAmount(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>                  
                    </DialogContent>
                    <DialogActions sx={{ margin: '10px' }}>
                        <Button 
                            size="large"
                            variant="outlined"
                            autoFocus 
                            onClick={(e) => {
                                setOpen(false);
                            }}
                        >
                            Cancel 
                        </Button> 
                        <Button                 
                            size="large"
                            variant="contained"
                            type="submit"
                        >
                            {"Update"}
                        </Button> 
                    </DialogActions> 
                </form>            
            </Dialog>
            
            <div style={{ marginTop: '10px', padding: '2px' }}>
    <div className="GridContent">
        <Box sx={{ flexGrow: 1, padding: '0px', height: 400, width: '100%' }} >  {/* Adjust the width here */}
            <DataGrid
                rows={dataList}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    </div>
</div>
        </>
    );
}

export default ViewOrder;

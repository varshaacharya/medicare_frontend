
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { useState,useEffect } from 'react';
import axios from '../../../../api/axios';
const URL="./student";

function ViewRecharge ()  {    
    const columns = [
        { field: "id", headerName: "SL.NO", width: 150 },
        { field: "student_name", headerName: "Name", width: 150 },
        { field: "student_email", headerName: "Email", width: 150 },
        { field: "balance", headerName: "Balance", width: 150 },
        { field: "student_status", headerName: "status", width: 150 },
        { field: "student_date", headerName: "date", width: 150 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width:150,
            cellClassName:'actions',
            getActions : (params) => {
                return [
                        <EditData selectedRow={params.row}/>,
                       
                ];            
            }            
        },
      ];
    
      const [dataList, setDataList] = useState([]); 
      const [newbalance, setNewbalance] = useState(''); 
      const [id, setId] = useState(''); 


      useEffect(() => {
        loadData();        
    },[]);

    const loadData = async () => {
      try {
          const response = await axios.get(URL);
  
          if (response.data.status === 401) {
              setDataList([]);
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

      const [open,setOpen] =useState(false);
      const EditData = (props) => {
        return (
            <Button 
                size="small" 
                variant="outlined"
                style={{ cursor: "pointer" }} onClick={(e) => {
                e.stopPropagation();
                console.log(props.selectedRow.id);
                setId(props.selectedRow.id);
                setOpen(true);                
            }}>Recharge</Button>
        );
    }
    const serviceMethod = async (mainURL,method,data,handleSuccess,handleException) => {
        try{
            const response = await axios.post(mainURL,data);
            return handleSuccess(response.data);  
        }catch(err){
            if(!err?.response){
                console.log("No server response");
            }else{                
                return handleException(err?.response.data);
            }
        }                  
      };
      
        const handleSave = async (e) => {
          e.preventDefault(); 
          const method = "POST";
          const data = {id,newbalance};
          const mainURL = URL +'/'+data.id+ '/added';
          serviceMethod(mainURL,method,data, handleSuccess, handleException);
     
        }
    
        const handleSuccess = (data) => {  
          console.log(data);
          alert("category name added successfully");
          setOpen(false);
        }
    
        const handleException = (data) => {
          alert("error adding category name");
          console.log(data);
        }

    
    return (
        <>
        <Dialog
            
            maxWidth = "lg"
            sx = {{'& .MuiDialog-paper':{width: '25%' }}}
            open={open}
        >
            <form >
            <DialogTitle>
                {"RECHARGE"}
            </DialogTitle>        
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        fullWidth
                                        value={newbalance}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Amount"
                                        variant = "outlined"
                                        required
                                        
                                        onChange={(e) => { setNewbalance(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                      
                    </Grid>
                </Grid>                  
                                  
          </DialogContent>
          <DialogActions sx = {{ margin: '10px' }} >
                <Button 
                   size = "small"
                   variant = "outlined"
                   autoFocus 
                   onClick={(e)=>{
                          setOpen(false);
                         
                    }} >
                   Cancel 
               </Button> 
               <Button 
                    onClick={handleSave}                
                   size="small"
                   variant ="contained"
                   type = "submit">  {"Recharge"}
                   
               </Button> 
            </DialogActions> 
            </form>   
        </Dialog>
        <div className="GridContent">
            <Box sx={{ position: 'relative', top: '10px', left: '270px', height: 400, width: '70%' }}>
                <DataGrid
                rows={dataList}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                />    
            </Box>
        </div>


        </>
      );
};
export default ViewRecharge;
      
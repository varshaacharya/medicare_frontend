import  React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from '../../../../../api/axios';
import { FormControl,InputLabel ,Select,MenuItem} from '@mui/material';
import { useEffect } from 'react';
const URL="./city";

function AddCity() {
    const [state_id,setState_id] = useState('');
    const [district_id,setDistrict_id] = useState('');
    const [city_name,setCity_name] = useState('');
    const [district_name,setDistrict_name]=useState('');
    const [state_name,setState_name]=useState('');
    const [districtlist,setDistrictlist]=useState([]);
    const [statelist,setStatelist]=useState([]);



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
            const data = {state_id:state_name,district_id:district_name,city_name};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
      }

      const handleSuccess = (data) => {  
        console.log(data);
        alert("category name added successfully");
        setState_id('');
        setDistrict_id('');
        setCity_name('');
      }

      const handleException = (data) => {
        alert("error adding category name");
        console.log(data);
      }
      useEffect(() => {
        loadData();
        loadData2();
    },[]);
  
    const loadData = async() => {
        try{
            let URL='./district/';
            const response = await axios.get( URL );              
            if(response.data.status == 401){
              setDistrictlist('');      
            }else{
              setDistrictlist(response.data.data);
            }
        }catch(err){
            if(!err?.response){
                console.log("No server response");
            }else{
                 console.log(err?.response.data);
            }
        } 

       
    };
    const loadData2 = async() => {
      try{
          let URL='./state/';
          const response = await axios.get( URL );              
          if(response.data.status == 401){
            setStatelist('');      
          }else{
            setStatelist(response.data.data);
          }
      }catch(err){
          if(!err?.response){
              console.log("No server response");
          }else{
               console.log(err?.response.data);
          }
      } 
      
     
  };

  return (
   
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            ADD CATEGORY
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State Name</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state_name}
                  label="Category name"
                  onChange={(e) => setState_name(e.target.value)}
                  style={{ textAlign: 'left' }}
                >
                  {statelist.map((state) => (
                    <MenuItem value={state.id}>{state.state_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">District Name</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={district_name}
                  label="Category name"
                  onChange={(e) => setDistrict_name(e.target.value)}
                  style={{ textAlign: 'left' }}
                >
                  {districtlist.map((district) => (
                    <MenuItem value={district.id}>{district.district_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="city_name"
              label="city_name"
              name="city_name"
              value={city_name}
              onChange={(e)=> 
                setCity_name(e.target.value)}
                 
              
            />
            
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSave}
              
            >
              SUBMIT
            </Button>
           
          </Box>
        </Box>
        
      </Container>
   
  );
}
export default AddCity;
import  React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from '../../../../api/axios';
import { FormControl,InputLabel ,Select,MenuItem} from '@mui/material';
import { useEffect } from 'react';
const URL="./medicine";

function AddMedicine() {
    const [company_id,setCompany_id] = useState('');
    const [medicine_name,setMedicine_name] = useState('');
    const [description,setDescription] = useState('');
    const [company_name,setCompany_name]=useState('');
    const [companylist,setCompanylist] = useState([]);


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
            const data = {company_id:company_name,medicine_name,description};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
      }

      const handleSuccess = (data) => {  
        console.log(data);
        alert("category name added successfully");
        setCompany_id('');
        setMedicine_name('');
        setDescription('');
      }

      const handleException = (data) => {
        alert("error adding category name");
        console.log(data);
      }
      useEffect(() => {
        loadData();
    },[]);
  
    const loadData = async() => {
        try{
            let URL='./company/';
            const response = await axios.get( URL );              
            if(response.data.status == 401){
              setCompanylist('');      
            }else{
              setCompanylist(response.data.data);
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
                <InputLabel id="demo-simple-select-label">Company Name</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={company_name}
                  label="Category name"
                  onChange={(e) => setCompany_name(e.target.value)}
                  style={{ textAlign: 'left' }}
                >
                  {companylist.map((company) => (
                    <MenuItem value={company.id}>{company.company_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="category"
              label="Category Name"
              name="category"
              value={medicine_name}
              onChange={(e)=> 
                setMedicine_name(e.target.value)}
                 
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="category"
              label="Category Name"
              name="category"
              value={description}
              onChange={(e)=> 
                setDescription(e.target.value)}
                 
              
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
export default AddMedicine;
import  React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from '../../../../api/axios';
const URL="./company";

function AddCompany() {
    const [company_name,setCompany_name] = useState('');
    const [company_contact,setCompany_contact] = useState('');
    const [company_address,setCompany_address] = useState('');
  

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
            const data = {company_name,company_contact,company_address};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
      }

      const handleSuccess = (data) => {  
        console.log(data);
        alert("category name added successfully");
        setCompany_name('');
        setCompany_contact('');
        setCompany_address('');
      }

      const handleException = (data) => {
        alert("error adding category name");
        console.log(data);
      }

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
            <TextField
              margin="normal"
              required
              fullWidth
              id="company_name"
              label="company_name "
              name="company_name"
              value={company_name}
              onChange={(e)=> 
                setCompany_name(e.target.value)}
                 
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="company_contact"
              label="company_contact "
              name="company_contact"
              value={company_contact}
              onChange={(e)=> 
                setCompany_contact(e.target.value)}
                 
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="company_address"
              label="company_address "
              name="company_address"
              value={company_address}
              onChange={(e)=> 
                setCompany_address(e.target.value)}
                 
              autoFocus
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
export default AddCompany;
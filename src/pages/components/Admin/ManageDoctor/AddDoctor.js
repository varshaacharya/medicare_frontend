import  React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from '../../../../api/axios';
const URL="./doctor";

function AddDoctor() {
    const [first_name,setFirst_name] = useState('');
    const [last_name,setLast_name] = useState('');
    const [email,setEmail] = useState('');
    const [contact,setContact] = useState('');
    const [specialization,setSpecialization] = useState('');


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
            const data = {first_name,last_name,specialization,email,contact};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
      }

      const handleSuccess = (data) => {  
        console.log(data);
        alert("category name added successfully");
        setFirst_name('');
        setLast_name('');
        setEmail('');
        setContact('');
        setSpecialization('');
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
              id="first_name"
              label="first_name"
              name="first_name"
              value={first_name}
              onChange={(e)=> 
                setFirst_name(e.target.value)}
                 
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="last_name"
              name="last_name"
              value={last_name}
              onChange={(e)=> 
                setLast_name(e.target.value)}
                 
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="specialization"
              label="specialization"
              name="specialization"
              value={specialization}
              onChange={(e)=> 
                setSpecialization(e.target.value)}
                 
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              value={email}
              onChange={(e)=> 
                setEmail(e.target.value)}
                 
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="contact"
              label="contact"
              name="contact"
              value={contact}
              onChange={(e)=> 
                setContact(e.target.value)}
                 
              
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
export default AddDoctor;
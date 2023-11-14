import  React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from '../../../../api/axios';
const URL="./student";


function AddStudent() {
    const [student_name, setStudent_name] = useState('');
    const [student_email,setStudent_email] = useState('');
    const [student_address, setStudent_address] = useState('');
    const [student_contact,setStudent_contact]=useState('');
    const [balance,setBalance]=useState('');
    
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
            const data = {student_name,student_email,student_address,student_contact,balance};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
      }

      const handleSuccess = (data) => {  
        console.log(data);
        alert("Data added successfully");
        // setCategory_name('');
      }

      const handleException = (data) => {
        alert("Something went wrong");
        console.log(data);
      }

  return (
   
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            ADD STUDENT
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="student_name"
              label="Student Name"
              name="student_name"
              value={student_name}
              onChange={(e)=> 
                setStudent_name(e.target.value)}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="student_email"
              label="Student Email"
              name="student_email"
              value={student_email}
              onChange={(e)=> 
                setStudent_email(e.target.value)}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="student_address"
              label="Student Address"
              name="student_address"
              value={student_address}
              onChange={(e)=> 
                setStudent_address(e.target.value)}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="student_contact"
              label="Student Contact Number"
              name="student_contact"
              value={student_contact}
              onChange={(e)=> 
                setStudent_contact(e.target.value)}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="balance"
              label="balance"
              name="balance"
              value={balance}
              onChange={(e)=> 
                setBalance(e.target.value)}
              
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
export default AddStudent;
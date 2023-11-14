import  React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useAuthContext } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import ApplicationStore from '../../../utils/localStorageUtil';

const LOGIN_URL = './auth/changePassword';

function ChangePassword() {

    
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword,setConfirmNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const { email} = useAuthContext();

    
  
  
    const handleSave = async (e) => {
      e.preventDefault();         
      try{
        const data = {email,newPassword,oldPassword,confirmPassword};  
        

        const response = await axios.post( LOGIN_URL,data,
          {
             headers: {'Content-Type':'application/json' }                    
          }
       );       
       const dataResponse = response.data;     
       if(dataResponse.success === 1){           
           alert(dataResponse.message);
       }      
     
    }catch(err){
        if(!err?.response){
          console.log("No server response");
        }else{
           console.log(err?.response.data);
        }      
      }     
    }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }} >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Old Password"
              name="oldPassword"
              autoComplete="password"
              type="password"
              autoFocus
              value={oldPassword}
              onChange={(e)=> { 
                setOldPassword(e.target.value); 
              }}
              required
            />
            <TextField
              margin="normal"
              fullWidth
             
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              required
            />
            <TextField
              margin="normal"
              fullWidth
             
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(e)=>setConfirmNewPassword(e.target.value)}
              required
            />

           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSave}
            >
              Update
            </Button>          
          </Box>
        </Box>
      </Container>
  );
};
export default ChangePassword;
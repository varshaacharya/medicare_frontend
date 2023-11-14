import  React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import {useAuthContext} from '../../../context/AuthContext';
import axios from '../../../api/axios';
import ApplicationStore from '../../../utils/localStorageUtil';

const LOGIN_URL = './auth/login';

function Login() {
    const [user,setUser] = useState('');
    const [user_email, setUser_email] = useState('');
    const [user_password, setUser_password] = useState('');
    const { Login } = useAuthContext();
    const navigate = useNavigate();
    
  
      const handleSave = async (e) => {
        e.preventDefault();         
        try{
          const data = {user_email,user_password};  
          
  
          const response = await axios.post( LOGIN_URL,data,
            {
               headers: {'Content-Type':'application/json' }                    
            }
         );       
         const dataResponse = response.data;     
         if(dataResponse.success === 1){
             const userData = {
                 userName: user,
                 userToken: dataResponse.data.userToken,
                 user_type: dataResponse.data.user_type,
                 user_email:dataResponse.data.user_email
                 
             };
             Login(userData);
             if(dataResponse.data.user_type == "admin"){
              navigate('/AddCompany');         
             }else if(dataResponse.data.user_type == "medical"){
              navigate('/CustHome');         
              } else if(dataResponse.data.user_type == "doctor"){
                navigate('/CustHome');         
                } if(dataResponse.data.user_type == "user"){
                  navigate('/CustHome');         
                  }          
              setUser_email('');
              setUser_password('');
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={user_email}
              onChange={(e)=> { 
                setUser_email(e.target.value); 
                setUser(e.target.value)} }
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user_password}
              onChange={(e)=>setUser_password(e.target.value)}
              
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSave}
              
            >
              Sign In
            </Button>
            <Grid container>
              
              <Grid item>
                <Link href="Registration" variant="body2">
                  {"Create new Account?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
   
  );
}
export default Login;
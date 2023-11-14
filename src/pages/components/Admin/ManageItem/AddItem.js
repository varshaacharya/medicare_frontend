import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import axios from '../../../../api/axios';

const URL = './item';

function AddItem() {
  const [image, setItem_image] = useState('');
  const [item_name, setItem_name] = useState('');
  const [item_price, setItem_price] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [item_status, setItem_status] = useState('');
  const [item_description, setItem_description] = useState('');
  const [category_name, setCategory_name] = useState('');
  const [categorylist, setCategorylist] = useState([]);

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
          const data = {image,item_name,item_price,category_id:category_name,item_status,item_description};
          const mainURL = URL+'/add';
          serviceMethod(mainURL,method,data, handleSuccess, handleException);
    }

    const handleSuccess = (data) => {  
      console.log(data);
      alert("category name added successfully");
      // setCategory_name('');
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
          let URL='./category/';
          const response = await axios.get( URL );              
          if(response.data.status == 401){
              setCategorylist('');      
          }else{
              setCategorylist(response.data.data);
          }
      }catch(err){
          if(!err?.response){
              console.log("No server response");
          }else{
               console.log(err?.response.data);
          }
      } 
     
  };



const handleitem_status=(event)=>{
  setItem_status(event.target.value);
};

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
          ADD PRODUCT
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="item_image"
                label="Item Image"
                name="item_image"
                value={image}
                onChange={(e) => setItem_image(e.target.value)}
                autoFocus
              /> */}
              <FormControl fullWidth>                      
                                
                                <TextField
                                    fullWidth
                                    label="Product Image"
                                    
                                    onBlur={() => {
                                    }}
                                    onChange={(e) => {
                                    if(e.target.files && e.target.files.length > 0){
                                        setItem_image(e.target.files[0]);
                                        const reader = new FileReader();
                                        reader.onload = () =>{
                                            if(reader.readyState === 2){
                                              setItem_image(reader.result);
                                            }
                                        }
                                        reader.readAsDataURL(e.target.files[0]);
                                    }
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    type="file"
                                    
                                />
                            </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="item_name"
                label="Product Name"
                name="item_name"
                value={item_name}
                onChange={(e) => setItem_name(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="item_price"
                label="Product Price"
                name="item_price"
                value={item_price}
                onChange={(e) => setItem_price(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="item_description"
                label="Product Description"
                name="item_description"
                value={item_description}
                onChange={(e) => setItem_description(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category_name}
                  label="Category name"
                  onChange={(e) => setCategory_name(e.target.value)}
                  style={{ textAlign: 'left' }}
                >
                  {categorylist.map((category) => (
                    <MenuItem value={category.id}>{category.category_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Product Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={item_status}
                  label="Product status"
                  onChange={handleitem_status}
                  style={{ textAlign: 'left' }}
                >
                  <MenuItem value={"active"}>Active</MenuItem>
                  <MenuItem value={"inactive"}>In-Active</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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

export default AddItem;


import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ApplicationStore from '../../../../utils/localStorageUtil';
import axios from '../../../../api/axios';

const Container = styled.div`
  height: 90px;
  background-color: #C3D2AA;`
  ;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  display: none; // Adjust for responsiveness
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
`;

const Input = styled(TextField)`
  && {
    border: none;
    width: 200px; // Adjust as needed
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 24px; // Adjust for responsiveness
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  background-color: #F7FFEC;
  padding: 8px; /* Add padding for spacing */
  border: 2px solid #F7FFEC; /* Add outer line color */
  border-radius: 5px; /* Add rounded corners for a neat appearance */
  &:hover {
    background-color: #567848; /* Change background color on hover */
    color: white; /* Change text color on hover */
  }
`;

const CartButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 25px;
`;




const Navbar = () => {
  const { user, Logout } = useAuthContext();
  const user_type = ApplicationStore().getStorage('user_type');

  const navigate = useNavigate();
  const [searchedData, setSearchedData] = useState('');

  const handleSearch = async () => {
    // ... (existing code)
  };

  return (
    <Container>
      <Wrapper>
        <Left>
        <Logo>MEDICARE</Logo>
          
        </Left>
       
        <Right>
          { user_type === "medical" ? 
            <>
              <MenuItem onClick={() => navigate('/ProductList')}>
                Products List
              </MenuItem>
              <MenuItem onClick={() => navigate('/Cart')}>Cart</MenuItem>
              <MenuItem onClick={() => navigate('/Service')}>Service</MenuItem>
              <MenuItem onClick={() => navigate('/Feedback')}>Feedback</MenuItem>
            </>:user_type === "user" ?
          
          
            <>
              <MenuItem onClick={() => navigate('/ProductList')}>
                Products List
              </MenuItem>
              <MenuItem onClick={() => navigate('/Cart')}>User</MenuItem>
              <MenuItem onClick={() => navigate('/Service')}>Service</MenuItem>
              <MenuItem onClick={() => navigate('/Feedback')}>Feedback</MenuItem>
            </>:user_type === "doctor" ?
            <>
              <MenuItem onClick={() => navigate('/CustHome')}>Home</MenuItem>
              <MenuItem onClick={() => navigate('/ProductList')}>
                ProductsList
              </MenuItem>
              <MenuItem onClick={() => navigate('/Feedback')}>View_Patient</MenuItem>
              <MenuItem onClick={() => navigate('/Service')}>Prescription</MenuItem>
              <MenuItem onClick={() => navigate('/Feedback')}>Setting</MenuItem>
              <MenuItem onClick={() => navigate('/Feedback')}>About_Us</MenuItem>
              <MenuItem onClick={() => navigate('/Feedback')}>Contact_Us</MenuItem>

            </>:user_type === " "
          }
          <MenuItem onClick={Logout}>Logout</MenuItem>
          <CartButton onClick={() => navigate('/Cart')}>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </CartButton>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;


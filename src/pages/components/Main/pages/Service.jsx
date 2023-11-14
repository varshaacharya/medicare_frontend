import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Navbar from "../components/Navbar";
import axios from "../../../../api/axios";
import ApplicationStore from "../../../../utils/localStorageUtil";
import { DataGrid } from "@mui/x-data-grid";
const URL = "./service/serviceData";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://img.freepik.com/premium-photo/solar-panels-with-sunny-sky-blue-solar-panels-background-photovoltaic-modules-renewable_661495-341.jpg?w=2000")
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 20px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;


const FormControlWrapper = styled(FormControl)`
  width: 100%;
  margin: 10px 0;
`;

const InputLabelWrapper = styled(InputLabel)`
  margin-bottom: 10px;
`;

const SelectWrapper = styled(Select)`
  width: 100%;
`;

const TextFieldWrapper = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled(Button)`
  width: 10%;
  background-color: teal;
  color: white;
  
  margin-top: -100px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const DataGridWrapper = styled.div`
  width: 100%;
  height: 400px;
`;



const Service = () => {
  
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = (e) => {
      e.preventDefault();
      // Add your search functionality here using the searchQuery state
      console.log(`Search for: ${searchQuery}`);
    };
  
  return (
    <>
    <Navbar />
      
     <div className="container" >
      <div className="row clearfix">
        <div className="col-lg-12 card shadow p-3" style={{ padding: '260px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 20px 24px' }}>

          <div className="section-title text-left">
            <div className="row">
              <div className="col-3">
                <h3><span>Search</span> Patient</h3>
              </div>
              <div className="col-6">
                <div className="search-box" >
                  <form onSubmit={handleSearch}>
                    <input
                      className="form-control main"
                      placeholder="Search Here..."
                      type="search"
                      id="search"
                      name="unid"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                      style={{ width: '80%', float: 'left', marginRight: '15px' }}
                    />
                      <ButtonWrapper className="btn-style-one" type="submit" value="" name="submit_search">
                      Search
                      </ButtonWrapper>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Service;

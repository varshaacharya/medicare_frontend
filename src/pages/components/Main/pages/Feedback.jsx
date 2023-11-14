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

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://wallpapercave.com/wp/wp4041839.jpg")
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
  width: 100%;
  background-color: teal;
  color: white;
  margin-top: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const DataGridWrapper = styled.div`
  width: 100%;
  height: 400px;
`;

const URL = "./user";

const Feedback = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 230 },
    { field: "first_name", headerName: "first Name", width: 300 },
    { field: "last_name", headerName: "last_name", width: 300 },
    { field: "email", headerName: "email", width: 300 },
    { field: "contact", headerName: "contact", width: 300 },
    { field: "status", headerName: "status", width: 300 },

  ];

  const [dataList, setDataList] = useState([]); 

  useEffect(() => {
    loadData();        
},[]);

const loadData = async () => {
  try {
      const response = await axios.get(URL);

      if (response.data.status === 401) {
          setDataList([]);
      } else {
          const responseData = response.data.data;
          for (let i = 0; i < responseData.length; i++) {
              responseData[i].id = i + 1;
          }
          setDataList(responseData);
      }
  } catch (err) {
      if (!err?.response) {
          console.log("No server response");
      } else {
          console.log(err?.response.data);
      }
  }
};

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
        <DataGridWrapper>
        <h3>Manage User</h3>
        <DataGrid
              rows={dataList}
              columns={columns}
            />
        </DataGridWrapper>
        </Wrapper>
      </Container>
    </>
  );
};



export default Feedback;

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
  url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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

const URL = "checkout/updatePayment";

const Payment = () => {
  const empid = ApplicationStore().getStorage("empid");
  const [pname, setPname] = useState('');
  const [productlist, setProductlist] = useState([]);
  const [product_id, setProduct_id] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showDataGridForm, setShowDataGridForm] = useState(false);
  const [feedbacklist, setFeedbacklist] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [year,setYear]=useState('');
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
 

  const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {
    try {
      const response = await axios.post(mainURL, data);
      return handleSuccess(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        return handleException(err?.response.data);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = "POST";
    const data = { userid:empid };
    const mainURL = URL;
    serviceMethod(mainURL, method, data, handleSuccess, handleException);
    //setShowDataGridForm(true);
  };

  useEffect(() => {
    loadData();
    loadData2();
  }, []);

  const loadData = async () => {
    try {
      let URL = './products/';
      const response = await axios.get(URL);
      if (response.data.status == 401) {
        setProductlist([]);
      } else {
        setProductlist(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
  };
  const loadData2 = async () => {
    try {
      const response = await axios.get(URL);
      if (response.data.status == 401) {
        setFeedbacklist([]);
      } else {
        setFeedbacklist(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
  };
  const handleSuccess = (data) => {
   alert("submitted");
   console.log(data);
  };

  const handleException = (data) => {
    console.log(data);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "first_name", headerName: "first name", width: 130 },
    { field: "last_name", headerName: "last name", width: 130 },
    { field: "contact", headerName: "contact", width: 130 },
    { field: "pname", headerName: "product name", width: 130 },
    { field: "feedback", headerName: "feedback", width: 130 },
    { field: "date", headerName: "date", width: 130 },
    { field: "status", headerName: "status", width: 130 },
  ];

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          {showDataGridForm ? (
            <DataGridForm feedbacklist={feedbacklist} columns={columns} />
          ) : (
            <>
              <Title>Payment </Title>
              <Form>
                <TextFieldWrapper
                  id="outlined-multiline-static"
                  label="Name On Card"
                  //   multiline
                  rows={4}
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                  }}
                />
                <TextFieldWrapper
                  id="outlined-multiline-static2"
                  label="Card No"
                //   multiline
                  rows={4}
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                  }}
                />
                <TextFieldWrapper
                  id="outlined-multiline-static"
                  label="CVV"
                //   multiline
                  rows={4}
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                  }}
                />
                <FormControlWrapper>
                  <InputLabelWrapper id="demo-simple-select-label">Month</InputLabelWrapper>
                  <Select
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <MenuItem value="">
          <em>Select</em>
          </MenuItem>
          <MenuItem value="Mangalore">January</MenuItem>
          <MenuItem value="Bangalore">february</MenuItem>
          <MenuItem value="Mysore">march</MenuItem>
          <MenuItem value="Mangalore">april</MenuItem>
          <MenuItem value="Bangalore">may</MenuItem>
          <MenuItem value="Mysore">june</MenuItem>
          <MenuItem value="Mangalore">july</MenuItem>
          <MenuItem value="Bangalore">august</MenuItem>
          <MenuItem value="Mysore">september</MenuItem>
          <MenuItem value="Mangalore">october</MenuItem>
          <MenuItem value="Bangalore">november</MenuItem>
          <MenuItem value="Mysore">december</MenuItem>
        </Select>
                </FormControlWrapper>
                <TextFieldWrapper
                  id="outlined-multiline-static"
                  label="Year"
                //   multiline
                  rows={4}
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
                
                <TextFieldWrapper
                  id="outlined-multiline-static"
                  label="CVV"
                //   multiline
                  rows={4}
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                  }}
                />
                <Agreement>
                  <b></b>
                </Agreement>
                <ButtonWrapper type="button" onClick={handleSubmit}>
                  SUBMIT
                </ButtonWrapper>
              </Form>
            </>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

const DataGridForm = ({ feedbacklist, columns }) => {
//   if (!feedbacklist || !columns) {
//     return (
//       <DataGridWrapper>
//         <p>Loading...</p>
//       </DataGridWrapper>
//     );
//   }

  return (
    <DataGridWrapper>
      <h3>Your Feedback</h3>
      <DataGrid rows={feedbacklist} columns={columns} pageSize={5} />
    </DataGridWrapper>
  );
};

export default Payment;

import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../../../../responsive";
import React , {useState, useEffect} from "react";
import { Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import { useAuthContext } from '../../../../context/AuthContext';
import ApplicationStore from "../../../../utils/localStorageUtil";
import axios from "../../../../api/axios";
const URL = './checkout';
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const ProductInfo = () => {

  const {state} = useLocation();
  const {item} = state;
  const empid=ApplicationStore().getStorage("empid");
  const [quantity, setQuantity] = useState(1);
  const { AddToCart, getCart, removeToCart,url } = useAuthContext();

  const updateQuatity = (type) => {
      // console.log(type);
      if(type == "desc"){
        if(quantity == 0){
          alert("quantity cannot be less than 1");
        }else{
          setQuantity(quantity-1);
        }       
      }

      if(type == "inc"){
        setQuantity(quantity+1);
      }
}

const serviceMethod = async(mainURL,method,data,handleSuccess,handleException)=>{
    
  try{
    const response = await axios.post(mainURL,data);
        return handleSuccess(response.data);
  }
  catch(err){
    if(!err?.response){
        console.log("No server response");                
    }else{                
        return handleException(err?.response.data);
    }
  }           
};

const cartData = () => {
   
      const productData = {
         id:item.id,
         name:item.name,
         img:item.img,
         price:item.price,
         quantity:quantity,
         total:item.price*quantity
      };

      AddToCart(productData);

      
      
      const method = "POST";  
      try {        
         console.log(productData);
          const data = {userid:empid,cartList:productData};
          console.log(data);
          const mainURL = URL+'/add';
          serviceMethod(mainURL,method,data, handleSuccess, handleException);
      }
      catch(e){
          console.error(e);
      }


     
     console.log(item);
}
const navigate=useNavigate();
const handleSuccess = (data) => {    
  alert("product added to cart successfully") ;
  navigate("/Cart");
}

const handleException = (data) => {
  console.log(data);
}


const removeData = () => {
    const productData = {
      id:item.id,
      name:item.name,
      img:item.img,
      price:item.price,
      quantity:quantity,
      total:item.price*quantity
    };

    removeToCart(productData);

    console.log("remove to cart");
    alert("successfully removed from cart");
}

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={url+item.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{item.name}</Title>
          <Desc>
           {item.desc}
          </Desc>
          <Price>RS.{item.price}</Price>
          <FilterContainer>
            {/* <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter> */}
            {/* <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter> */}
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove  onClick={(e) => {updateQuatity("desc")}} />
              <Amount>{quantity}</Amount>
              <Add onClick={(e) => {updateQuatity("inc")}} />
            </AmountContainer>
            {/* <Button onClick={getCart}>get cart</Button> */}
            <Button onClick={cartData}>ADD CART</Button>
            <Button onClick={removeData}>REMOVE</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductInfo;

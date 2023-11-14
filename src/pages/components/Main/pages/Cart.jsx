import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../../../../responsive";
import React, {useEffect,useState} from "react";
import { useNavigate } from 'react-router-dom';
import Newsletter from "../components/Newsletter";
import ApplicationStore from "../../../../utils/localStorageUtil";
import { useAuthContext } from "../../../../context/AuthContext";
import axios from "../../../../api/axios";

const URL = './checkout';
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 0px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 10px;
  height: 20vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const empid=ApplicationStore().getStorage("empid");
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const applicationStore = ApplicationStore();
  const [subTotal,setSubTotal] = useState(0);
  
  const { url } = useAuthContext();
 
  useEffect(() => {   
    console.log("helo");
    loadData();  
  }, []);

  const loadData = async () => {
      const cart = await applicationStore.getStorage('cart');
      console.log(cart);
      setCartData(cart);
      calculateSubTotal(cart);
  }

  const calculateSubTotal = (cart) => {
    let total = 0;
    if(cart.length>0){
      cart.forEach(item => {
        total += item.total;
      });

    }
    setSubTotal(total);
  }

  // const removeProduct = (index) => {
  //   const updatedProduct = [...cartData];
  //   updatedProduct.splice(index, 1);
  //   setCartData(updatedProduct);
  //   applicationStore.setStorage('cart', updatedProduct);
  // };

  const updateProduct = (index,type) => {
    if(type == "add"){
      console.log(index+" add");
      const updatedCart = [...cartData];
      updatedCart[index].quantity = updatedCart[index].quantity+1;
      updatedCart[index].total = updatedCart[index].quantity*updatedCart[index].price;
      setCartData(updatedCart);
      applicationStore.setStorage('cart', updatedCart);
      calculateSubTotal(updatedCart);

    }else{
      console.log(index+" sub");
      const updatedCart = [...cartData];
      updatedCart[index].quantity = updatedCart[index].quantity == 0 ? 0 : updatedCart[index].quantity-1;
      updatedCart[index].total = updatedCart[index].quantity*updatedCart[index].price;
      setCartData(updatedCart);
      applicationStore.setStorage('cart', updatedCart);
      calculateSubTotal(updatedCart);
    }
    

  };

 
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
  const handleSubmit = async(e) => {
    e.preventDefault();
    const cart = applicationStore.getStorage('cart');
    const method = "POST";  
    try {        
        const data = {userid:empid,cartList:cart};
        console.log(data);
        const mainURL = URL+'/add';
        serviceMethod(mainURL,method,data, handleSuccess, handleException);
    }
    catch(e){
        console.error(e);
        
    } 
};   
    

const handleSuccess = (data) => {       
  
  console.log("data");
}

const handleException = (data) => {
  console.log(data);
  
}

const navigateTo = () => {
    navigate("/payment")
}

 
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          {/* <TopButton type="filled">CHECKOUT NOW {cartData.length}</TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {
               cartData.length>0?cartData.map((item,index) => (                    
                
                  
                <Product key={item.id}>
                  <ProductDetail>
                    <Image src={url+item.img} style={{  height:100, width:100 }}/>
                    <Details>
                      <ProductName>
                        <b>Product:</b> {item.name}
                      </ProductName>
                      {/* <ProductId>
                        <b>ID:</b> {item.id}
                      </ProductId> */}
                      {/* <ProductColor color="black" /> */}
                      {/* <ProductSize>
                        <b>Size:</b> 37.5
                      </ProductSize> */}
                    </Details>
                  </ProductDetail>
                  {/* <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{item.quantity}</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>Price : $ {item.price}</ProductPrice>
                    <ProductPrice>Total : $ {item.total}</ProductPrice>
                  </PriceDetail> */}
                   <Summary>
                    {/* <SummaryTitle>Product SUMMARY</SummaryTitle> */}
                    <SummaryItem>
                      <SummaryItemText>Quanity</SummaryItemText>
                      <SummaryItemPrice><ProductAmountContainer>
                        <Add onClick={() => {updateProduct(index,"add")}}/>
                        <ProductAmount>{item.quantity}</ProductAmount>
                        <Remove onClick={() => {updateProduct(index,"sub")}}/>
                    </ProductAmountContainer></SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryItemText>Price</SummaryItemText>
                      <SummaryItemPrice>$  {item.price}</SummaryItemPrice> 
                    </SummaryItem>
                    {/* <SummaryItem>
                      <SummaryItemText>Shipping Discount</SummaryItemText>
                      <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                    </SummaryItem> */}
                    <SummaryItem type="total">
                      <SummaryItemText>Total</SummaryItemText>
                      <SummaryItemPrice>$ {item.total}</SummaryItemPrice>
                      
                    </SummaryItem>
                    
                  </Summary>
                </Product>

               )):""
            }
            {/* <Product>
              <ProductDetail>
                <Image src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" />
                <Details>
                  <ProductName>
                    <b>Product:</b> JESSIE THUNDER SHOES
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Size:</b> 37.5
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>2</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$ 30</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />

            <Product>
              <ProductDetail>
                <Image src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" />
                <Details>
                  <ProductName>
                    <b>Product:</b> HAKURA T-SHIRT
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                  <ProductColor color="gray" />
                  <ProductSize>
                    <b>Size:</b> M
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>1</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$ 20</ProductPrice>
              </PriceDetail>
            </Product> */}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {subTotal}</SummaryItemPrice>
            </SummaryItem>
            {/* <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem> */}
            <Button onClick={navigateTo}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Cart;

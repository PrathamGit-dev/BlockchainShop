import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useState, useEffect} from 'react'
import { ABI } from './components/abi';
import Web3 from 'web3'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  const [error, setError]  = useState('')
  const [vmContract, setVmContract] = useState(null)
  const [web3, setWeb3] = useState(null)
  const [winner, setWinner] = useState(null)
  const [address, setAddress] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')
  const [proposals_length, setproposals_length] = useState('')
  const [proposals, setProposals] = useState([])
  const [addressDetails, setAddressDetails] = useState('')
  const [voted, setVoted] = useState(1)
  const [weight, setWeight] = useState(0)
  const [shopOwner, setShopOwner] = useState(null)
  const [items, setItems] = useState([])
  const [customer, setCustomer] = useState([])
  const [cart_ether, setCart_ether] = useState([])
  const [cart_local, setCartLocal] = useState([])
  const [cart_amount, setCartAmount] = useState(0)
  const [total_items, setTotalItems] = useState(0)
  const [item_update, setItem_update] = useState([])
  const [first, setfirst] = useState(true)
  useEffect(() => {
    if (vmContract){
        // winnerHandler()
          items_quantity()
          ItemsHandler()
        
       
          ShopOwnerHandler()
          
    if(address) {
      CustomerHandler()
    }
    else{
      ConnectWalletHandler()
    }
        
    }
    else{
        vmContractHandler()
    }
})

const vmContractHandler = async () => {
  if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
    console.log("in VmCotractHandler")
      try {
        const _web3 = await new Web3(window.ethereum);
        setWeb3(_web3)
          console.log("Web3 set")
          const abi2 = ABI;
          // console.log("Type of abi2 is", typeof(abi2))
          // const vm = await new web3.eth.Contract(abi2, "0x20ae8f53a89b20e2897fe15cb3503b722f57706c");
          
          const vm = await new web3.eth.Contract(abi2, "0x83E7916a736e73C7b00be1DdB06a4F8DD0f643dc");
          // const vm = await contract(web3);
          setVmContract(vm)
          // console.log("Vm Contract set")
          // console.log(vmContract)
      }
      catch (err) {
          setError(err.message)
      }
  }
}
  // ConnectWalletHandler();


const ConnectWalletHandler = async() => {
  console.log("Connect wallet fired")
  if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
      try {
          const accounts = await web3.eth.getAccounts();
          console.log("Accounts accessed")
          const account = accounts[0];
          setAddress(account)
          console.log("Address is ", address)
          setError('')
          setSuccessMsg("WalletConnected")
          // CustomerHandler()
      }
      catch (err) {
          setError("Unable to connect wallet")
          console.log(err)
      }
}
// const ConnectWalletHandler = async() => {
  // console.log("Connect wallet fired")
  // if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
      // try {
      //     const accounts = await web3.ethereum.request({ method: 'eth_requestAccounts' });
      //     // console.log("Accounts accessed")
      //     const account = accounts[0];
      //     setAddress(account)
      //     console.log("Address is ", address)
      //     setError('')
      //     // setSuccessMsg(WalletConnected)
      // }
      // catch (err) {
      //     setError("Unable to connect wallet")
      // }
}


const ShopOwnerHandler = async() => {
  const shop_owner = await vmContract.methods.shopowner().call();
  setShopOwner(shop_owner);
  
}

const AddNewItemHandler = async(item_code_, item_price_, item_quantity_) => {
  // const transact = await vmContract.methods.addnewItem(item_code_, item_price_, item_quantity_);
  try{
    await vmContract.methods.addnewItem(item_code_, item_price_, item_quantity_).send({
        from: address
        // ,
        // value: web3.utils.toWei('0.001', "ether") * buyCount
    })
    // setPurchases(purchases++);
    setSuccessMsg(`Congratulations, Item added Successfully`)
    // getValueHandler()
    }
    catch(err){
        setError(err.message)
    }
}

const updateQuantity = async(item_code_, item_price_, item_quantity_) => {
  try{
    await vmContract.methods.updatequantity(item_code_, item_price_, item_quantity_).send({
        from: address
        // ,
        // value: web3.utils.toWei('0.001', "ether") * buyCount
    })
    // setPurchases(purchases++);
    setSuccessMsg(`Congratulations, Item updated Successfully`)
    // getValueHandler()
    }
    catch(err){
        setError(err.message)
    }
}

const items_quantity = async() => {
  const total = await vmContract.methods.itemNos().call();
  // console.log("total items are")
  setTotalItems(total)
}

const ItemsHandler = async() => {
  // items_quantity()
  const element_local_array = []
  // const length_items = await vmContract.methods.items_array().call();
  // console.log("In items handler checking total items")
  // console.log(total_items)
  for (let index = 0; index < total_items; index++) {
    const element = await vmContract.methods.view_Shop(index).call();

//WRITE A CONDITION IF ELEMENT QUANTITY IS 0 DO NOT PUSH IT


    element_local_array.push(element);
  }
  setItems(element_local_array);
  }

const CustomerHandler = async() => {
  const customer = await vmContract.methods.customers(address).call();
  setCustomer(customer)
  // setCart(customer['cart'])
  EtherCartHandler()
}

const EtherCartHandler = async() => {
  // console.log("Entered ether cart handler")
  let cart_local_ = [];
  // console.log("customer")
  // console.log(customer)
  if(customer['cart']['0'].length != 0){
  for (let index = 0; index < customer['cart']['0'].length; index++) {
    cart_local_.push([customer['cart']['0'][index], customer['cart']['1'][index],  customer['cart']['2'][index] * 1]);  
  }
}
  // console.log("Ether cart")
  // console.log(cart_local_);
  setCart_ether(cart_local_);
  CartAmountHandler()

}

const CartAmountHandler = () => {
  // console.log("Entered cart amount handler")
  // console.log("Local cart has")
  // console.log(cart_local)
  let total_cart_val = 0;
  if(cart_local.length == 0){
    let items_present = customer['cart']['items_bought'];
    let price_present = customer['cart']['price'];
    let quantity_present = customer['cart']['quantity'];
    for (let index = 0; index < items_present.length; index++) {
      total_cart_val = total_cart_val + price_present[index] * quantity_present[index];   
    }
  }
  else{
  for (let index = 0; index < cart_local.length; index++) {
    total_cart_val = total_cart_val + cart_local[index][1] * cart_local[index][2];   
  }
  }
  // console.log("Amount set")
  // console.log(total_cart_val)
  setCartAmount(total_cart_val);
  if(cart_ether.length != 0 && cart_local.length == 0 && total_cart_val != 0)
  // LocalCartHandler()
  setCartLocal(cart_ether)
  setfirst(false)
}

const LocalCartHandler = () => {
  // console.log("Entered local cart handler")
  // console.log(cart_local.length);

  if(cart_local.length == 0){
  setCartLocal(cart_ether)
  }
  else {
    let local_cart_ = [];
    for (let i = 0; i < cart_local.length; i++) {
      if(cart_local[i][2] != 0) local_cart_.push(cart_local[i]) 
      
    }
    setCartLocal(local_cart_)
  }
}

const RemoveFromCartHandler = (item_code) => {
  let local_cart_ = cart_local;
  let local_cart_updated = [];
  let local_cart_amount = cart_amount;
  for (let i = 0; i < local_cart_.length; i++) {
    if(local_cart_[i][0] == item_code){
      local_cart_[i][2] = local_cart_[i][2] * 1 - 1;  //convert to int multiply by 1
      // break;
      local_cart_amount = local_cart_amount - local_cart_[i][2];
    }
      console.log("in remove")
      console.log(local_cart_updated)
      if(local_cart_[i][2] != 0){
        local_cart_updated.push([local_cart_[i][0], local_cart_[i][1], local_cart_[i][2]]);
      }
    
  }
  console.log("Local cart updated")
  console.log(local_cart_updated)
  setCartLocal(local_cart_updated)
  console.log("local cart set")
  console.log(cart_local);
  console.log("entering cart amount handler")
  setCartAmount(local_cart_amount)


}


const AddItemHandler = (item_code, item_price) => {
  let local_cart_ = cart_local;
  // console.log(local_cart_)

  if(cart_local.length == 0){
    console.log("Entered this")
    local_cart_.push([item_code, item_price, 1]);
    setCartLocal(local_cart_)
    LocalCartHandler();
    // CartAmountHandler();
  }
  else{

  let found = false;
  for (let i = 0; i < local_cart_.length; i++) {
    if(local_cart_[i][0] == item_code){
      local_cart_[i][2] = local_cart_[i][2] * 1 + 1;  //convert to int multiply by 1
      // break;
      found = true;
    }
  }
  if(!found)
  local_cart_.push([item_code, item_price, 1]);
  setCartLocal(local_cart_)
  console.log(cart_local);
  CartAmountHandler()
}
}

const FinaliseCart = async() => {
  console.log("Entered finalise cart");
  
  let length_of_ether_cart = cart_ether.length;
  let length_of_local_cart = cart_local.length;
  let items_ = [];
  let quantity_ = [];
  for (let index = 0; index < length_of_local_cart; index++) {
    items_.push(cart_local[index][0]);
    quantity_.push(cart_local[index][2]);
  }
  // console.log(items_)
  // console.log(quantity_)

  //FUNCTION TO CHECK IF CART HAS BEEN MODIFIED OR NOT

  try{
    await vmContract.methods.updateCart(items_, quantity_).send({
        from: address
        // ,
        // value: web3.utils.toWei('0.001', "ether") * buyCount
    })
    // setPurchases(purchases++);
    setSuccessMsg(`Congratulations, Cart Updated Successfully`)
    // getValueHandler()
    }
    catch(err){
        setError(err.message)
    }
}

const createBill = async() => {

//CART should not be empty

  try{
    await vmContract.methods.billing().send({
        from: address
        // ,
        // value: web3.utils.toWei('0.001', "ether") * buyCount
    })
    // setPurchases(purchases++);
    setSuccessMsg(`Congratulations, Billed Successfully`)
    // getValueHandler()
    }
    catch(err){
        setError(err.message)
    }
    // console.log("Calling ethercarthandler");
    window.location.reload(false);
    // CustomerHandler();


}


  return (
    <BrowserRouter>
    
   <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="" />
  <meta
    name="author"
    content="Mark Otto, Jacob Thornton, and Bootstrap contributors"
  />
  <meta name="generator" content="Hugo 0.104.2" />
  <title>Album example · Bootstrap v5.2</title>
  <body>
    <header>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home"><Button variant="primary" onClick={ConnectWalletHandler}>Connect(Rinkeby testnet)</Button></Navbar.Brand>
        {/* <Navbar.Brand href="#home"><Button variant="primary" onClick={ () => updateQuanstity('A', 10, 20)}>Increase quantity of A</Button></Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/about">About</Nav.Link> */}


            {/* <NavDropdown title="Update your shop" id="basic-nav-dropdown">
              {items.map(item => (  
                <Dropdown.Item>{item[0]}  - {item[2]} no.s  - &#x20b9;{item[1]}/-<Button variant="primary" onClick={ () => updateQuantity(item[0], item[1], 10)}>Add 10 more</Button>
                </Dropdown.Item>
              ))}    
              <Dropdown.Item>Add new Item<Button variant="primary" onClick={ () => AddNewItemHandler('E', 25, 50)}>Add {'E'}</Button>
                </Dropdown.Item>
            </NavDropdown> */}


            <NavDropdown title="Your Details" id="basic-nav-dropdown">
              <NavDropdown.Item href="">{customer[0]}</NavDropdown.Item>
              <NavDropdown.Item href="">
                {customer[1]}
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">{address}</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item >
                {/* <button className="btn btn-secondary my-2" onClick={updateQuantity("A",10,10)}>
                Update A
                </button> */}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Blockchain Shop</h1>
            <p className="lead text-muted">
              Welcome to the futuristic shopping.
              We are glad to have you back <b>{customer['name']}</b>!!!
              
            </p>
            <p className="lead text-muted">
              ShopOwner is <b>{shopOwner}</b>!!!
              
            </p>
            <div>
              <button className="btn btn-secondary my-2" onClick={createBill}>
                Create Bill
              </button>
              <button className="btn btn-secondary my-2" onClick={FinaliseCart}>
                Update Cart
              </button>
              
              <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        View Cart &#x20b9;{cart_amount}/-
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {cart_local.map(item => (  
        <Dropdown.Item href="">{item[0]}  - {item[2]} no.s  - &#x20b9;{item[1] * item[2]}/-<button type="button" className="btn btn-sm btn-outline-secondary" onClick={ () => RemoveFromCartHandler(item[0])}>
          Remove
        </button></Dropdown.Item>
     ))}  
      </Dropdown.Menu>
    </Dropdown>
            </div>
          </div>
        </div>
      </section>
      


      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-6 g-3">
          {
          items.map(item => (  
          <div>  
              <div><div className="col">
               <div className="card shadow-sm">
                <svg
                    className="bd-placeholder-img card-img-top"
                    width={60}
                    height={100}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      {item[0]}
                      
                    </text>
                  </svg>
                  <div className="card-body">
                    <p className="card-text"> This is item {item[0]}</p>
                    <p className="card-text">&#x20b9; {item[1]}/-</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        {item[2] != 0 ? <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary" 
                          onClick={
                            () => AddItemHandler(item[0], item[1])

                          }
                        >
                          Add
                        </button> : <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary" 
                        >
                          Can't add
                        </button>}
                        {/* <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary" 
                          onClick={
                            () => AddItemHandler(item[0], item[1])

                          }
                        >
                          Add
                        </button> */}
                        
                      </div>
                      <small className="text-muted">{item[2]}</small>
                    </div>
                  </div>
                </div>
              </div></div>
          </div>  
        ))}  

            
                   
          </div>
        </div>
      </div>
    </main>
    <footer className="text-muted py-5">
      <div className="container">
        <p className="float-end mb-1">
          <a href="#">Back to top</a>
        </p>
        <p className="mb-1">
          © Pratham Chaurasia 2022
        </p>
        <p className="mb-0">
          Connect with me <a href="/https://www.linkedin.com/in/pratham-chaurasia-94a786227/">LinkedIn</a> 
            
          
          .
        </p>
      </div>
    </footer>
  </body>
    </BrowserRouter>
  );
}


export default App

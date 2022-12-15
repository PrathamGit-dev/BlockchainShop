import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import Dropdown from 'react-bootstrap/Dropdown';

import { useState, useEffect} from 'react'
import { ABI } from './components/abi';
import Web3 from 'web3'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ethers } from 'ethers';
import { NavBar } from './components/Navbar';
import { ItemsSection } from "./components/ItemsSection"; 
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { Transactions } from './components/Transactions';
import { AddItem } from './components/AddItem';

function App() {

  const [error, setError]  = useState('')
  const [vmContract, setVmContract] = useState(null)
  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')
  const [shopOwner, setShopOwner] = useState(null)
  const [items, setItems] = useState([])
  const [customer, setCustomer] = useState([])
  const [cart_ether, setCart_ether] = useState([])
  const [cart_local, setCartLocal] = useState([])
  const [cart_amount, setCartAmount] = useState(0)
  const [total_items, setTotalItems] = useState(0)
  const [item_update, setItem_update] = useState([])
  const [msg_main, setMsg_main] = useState("Connect your wallet")
  const [connect_wallet_msg, set_connect_wallet_msg] = useState("Connect")

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
        // const _provider = new ethers.providers.Web3Provider(window.Ethereum);
        // setProvider(_provider)
          console.log("Web3 set")
          const abi2 = ABI;
          // console.log("Type of abi2 is", typeof(abi2))
          // const vm = await new web3.eth.Contract(abi2, "0x20ae8f53a89b20e2897fe15cb3503b722f57706c");
          
          const vm = await new web3.eth.Contract(abi2, "0x4243B09895c6EA5Fc46Aa2bA5CF024f91bB5E9d4");
          // const vm = await new ethers.
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

const ConnectWalletHandler = async() => {
  console.log("Connect wallet fired")
  if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
      try {
         
          const provider = await new ethers.providers.Web3Provider(window.ethereum);
          // console.log("Provider resolved")
          await provider.send("eth_requestAccounts", []);
          const signers = provider.getSigner();
          const address = await signers.getAddress();
          setAddress(address);
          try{
            const a= await vmContract.methods.customers(address).call();
            // console.log(a[0])
            if(a[0] == '') {
              setMsg_main("Add yourself as customer")
            }
            else{
              setMsg_main("Continue to shop")
              set_connect_wallet_msg("..." + address.slice(-5,-1))
            }
          }
          catch(err){
            console.log("Not a cusotme")
          }
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

const AddCustomer = async() => {
  const added_customer = await vmContract.methods.addCustomer().send({from: address});
  console.log("Added customer")
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
  const element_local_array = []
  for (let index = 0; index < total_items; index++) {
    const element = await vmContract.methods.view_Shop(index).call();
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
  if(customer['cart']['0'].length != 0){
  for (let index = 0; index < customer['cart']['0'].length; index++) {
    cart_local_.push([customer['cart']['0'][index], customer['cart']['1'][index],  customer['cart']['2'][index] * 1]);  
  }
}
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
  if(cart_local.length == 0){
    console.log("Entered this")
    local_cart_.push([item_code, item_price, 1]);
    setCartLocal(local_cart_)
    LocalCartHandler();
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
      <body>
        <NavBar ConnectWalletHandler = {ConnectWalletHandler} AddCustomer = {AddCustomer} address = {address} shopOwner = {shopOwner} connect_wallet_msg = {connect_wallet_msg}/>
        
        <main>
          <Routes>
            <Route exact path="/" element={<>
              <Dashboard msg_main = {msg_main} createBill = {createBill} FinaliseCart = {FinaliseCart} cart_amount = {cart_amount} cart_local = {cart_local} RemoveFromCartHandler = {RemoveFromCartHandler}/>
              <ItemsSection items = {items} AddItemHandler = {AddItemHandler} />
              </>}>
            </Route>
            <Route exact path="/about" element={<>
                <About/>
              </>}>
            </Route>
            <Route exact path="/transactions" element={<>
                <Transactions vmContract = {vmContract} address = {address}/>
              </>}>
            </Route>
            
              
            
            <Route exact path="/AddItem" element={<>
                <AddItem total_items = {total_items} items = {items} updateQuantity = {updateQuantity} AddNewItemHandler = {AddNewItemHandler}/>
              </>}>
            </Route>
          </Routes>
        </main>
        <Footer/>
      </body>
    </BrowserRouter>
  );
}


export default App

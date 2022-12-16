import React from 'react'
import { useState } from 'react'

import { useEffect } from 'react'

import { TransactionElement } from './TransactionElement'


export const Transactions = (props) => {
  
  const [itemcode, set_itemcode] = useState([]);
  const [itemquant, set_itemquant] = useState([]);
  const [itemprice, set_itemprice] = useState([]);
  const [itemcount, setItemCount] = useState([]);
  const [total_amount, setTotalAmount] = useState([]);
  const [timeStamp, setTimeStamp] = useState([]);
  // const [blankarr, = [];

  const vmContract = props.vmContract;
  const address = props.address;
  const customer = props.customer;
  let visit_count  = customer[2];


  


  const dataHandler = async() => {
    console.log("In data handler")
    visit_count  = customer[2] - 1;
    const itemcode_ = [];
    const itemquant_ = [];
    const itemprice_ = [];
    const itemcount_ = [];
    let totalAmount_ = [];
    const timeStamp_ = [];

    for (let index = 0; index < visit_count; index++) {
      const itemcount = await vmContract.methods.customer_bill_itemcount(address, index).call();
      itemcount_.push(itemcount);
      const time = await vmContract.methods.customer_bill_timestamp(address, index).call();
      timeStamp_.push(time);
      let total = 0;
      console.log("itemcount", itemcount)
      const item_code = [];
      const item_quant = [];
      const item_price = [];
      for (let index2 = 0; index2 < itemcount; index2++) {
        const element_itemcode = await vmContract.methods.customer_bill_itemcode(address, index, index2).call();
        item_code.push(element_itemcode);
        const element_quant = await vmContract.methods.customer_bill_itemquantity(address, index, index2).call();
        item_quant.push(element_quant);
        const element_price = await vmContract.methods.customer_bill_itemprice(address, index, index2).call();
        item_price.push(element_price);
        total = total + element_price * element_quant;
      }
      itemcode_.push(item_code);
      itemquant_.push(item_quant);
      itemprice_.push(item_price);
      totalAmount_.push(total);


    }
    set_itemcode(itemcode_);
    set_itemprice(itemprice_);
    set_itemquant(itemquant_);
    setItemCount(itemcount_);
    setTotalAmount(totalAmount_);
    setTimeStamp(timeStamp_);

    console.log(itemcode);
    console.log(itemquant);
    console.log(itemprice);
    console.log(timeStamp);
    // console.log("blank arr", blankarr)
  }



  if(visit_count > 1)
  dataHandler();
  else{
    console.log("Skipped dataHandler")
  }
  

  

  return (
    <>
    <div class = "container">Check later</div>
    {itemcode.map((item,i) => (
      <TransactionElement itemcode = {item} itemprice = {itemprice[i]} itemquantity = {itemquant[i]} timestamp = {timeStamp[i]} total_amount = {total_amount[i]}/>
    ))}
    
    {/* {blankarr.map(function(elem, i){
        console.log("From return")
        return <TransactionElement itemcode={itemcode[i]} itemprice = {itemprice[i]} />;
    })} */}
   
    </>

  )
}

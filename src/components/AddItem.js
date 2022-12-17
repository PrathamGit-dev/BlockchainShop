import React from 'react'
import { useState } from 'react'

export const AddItem = (props) => {

    const [item_code, setItemCode] = useState()
    const [item_price, setItemPrice] = useState(0)
    const [item_quantity, setItemQuantity] = useState(0)

    const submit=(e)=>{
        e.preventDefault();
        console.log("Submiting")
        console.log(item_code)
        if(!item_code || !item_price || !item_quantity) alert("Title or description can't be empty")
        else{
            let found = false;
            for (let index = 0; index < props.items.length; index++) {
                if(props.items[index][0] == item_code) found = true;
                
            }
            if(found){
                console.log("Updating")
                props.updateQuantity(item_code, item_price, item_quantity);
            }
            else {
                console.log("Adding")
                props.AddNewItemHandler(item_code, item_price, item_quantity);
            }
        }
        setItemCode("");
        setItemPrice(0);
        setItemQuantity(0);
    }


    return (
        <>
        {props.shopowner == null && 
      <>
      <div class = "container text-center my-5">
      <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p><h6>Fetching contract details...Make sure to have </h6><h6 style={{ color: " #8B4000" }}>Metamask </h6><h6>extension installed</h6></p>
    </div>
  </>}
        {props.isShopOwner && props.shopowner != null &&
            <div>
            <link href="form-validation.css" rel="stylesheet" />
            <div className="container">
                <main>
                    <div className="py-5 text-center">
                        <h2>Add/Update Item</h2>
                        <p className="lead">
                            Enter the folowing details
                        </p>
                    </div>
                    <div className="row g-5">
                        <div className="col-md-5 col-lg-4 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary">Your Shop</span>
                                <span className="badge bg-primary rounded-pill">{props.total_items}</span>
                            </h4>

                            <ul className="list-group mb-3">
                                {
                                   props.items.map(item => (
                                    <li className="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 className="my-0">{item[0]}</h6>
                                        <small className="text-muted">{item[2]}</small>
                                    </div>
                                    <span className="text-muted">&#x20b9; {item[1]}/-</span>
                                </li>
                                   ))
                                }
                            </ul>
                        </div>


                        <div className="col-md-7 col-lg-8">
                            <h4 className="mb-3">Item details</h4>
                            <form onSubmit={submit} className="needs-validation" noValidate="">
                                <div className="row g-3">
                                    <div className="sm-6">
                                        <label htmlFor="firstName" className="form-label">
                                            Item Code
                                        </label>
                                        <input
                                            type="text"
                                            value={item_code} onChange={(e)=> {setItemCode(e.target.value)}}
                                            className="form-control"
                                            id="firstName"
                                            placeholder=""
                                            defaultValue=""
                                            required=""
                                        />
                                        <div className="invalid-feedback">
                                            Valid item code is required.
                                        </div>
                                    </div>
                                    <div className="md-6">
                                        <label htmlFor="price" className="form-label">
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            value={item_price}  onChange={(e)=> {setItemPrice(e.target.value)}}
                                            className="form-control"
                                            id="cc-number"
                                            placeholder=""
                                            required=""
                                        />
                                        <div className="invalid-feedback">
                                            Price is required
                                        </div>
                                    </div>
                                    <div className="md-6">
                                        <label htmlFor="quantity" className="form-label">
                                            Quantity
                                        </label>
                                        <input
                                            type="text"
                                            value={item_quantity}  onChange={(e)=> {setItemQuantity(e.target.value)}}
                                            className="form-control"
                                            id="cc-number"
                                            placeholder=""
                                            required=""
                                        />
                                        <div className="invalid-feedback">
                                            Quantity of Item is required
                                        </div>
                                    </div>
                                <hr className="my-4" />

                                <button type="submit" className=" container btn btn-success text-center">
                                    Add the Item
                                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>

               
            </div>
            </div>
            }

            {!props.isShopOwner && 
                <div className='container text-center my-5'>
                    <h3><b style={{ color: "red" }}>You are not the shopkeeper &#9888;</b></h3>

                </div>
            }

        </>
    )
}

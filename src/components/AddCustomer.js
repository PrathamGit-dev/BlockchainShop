import React from 'react'

import { useState } from 'react'

export const AddCustomeR = (props) => {

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    const submit=(e)=>{
        e.preventDefault();
        console.log("Submiting")
        if(!name || !phone) alert("Title or description can't be empty")
        else{
            props.AddCustomer(name, phone);
        }
        setName("");
        setPhone("");
    }
  return (
    <>
    {props.customer[2] == 0 && 
    <div>
    <div className="col-md-7 col-lg-8 container my-5">
                            <h4 className="mb-3 text-center">Enter your details</h4>
                            <form onSubmit={submit} className="needs-validation" noValidate="">
                                <div className="row g-3">
                                    <div className="sm-6">
                                        <label htmlFor="firstName" className="form-label">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={name} onChange={(e)=> {setName(e.target.value)}}
                                            className="form-control"
                                            id="firstName"
                                            placeholder=""
                                            defaultValue=""
                                            required=""
                                        />
                                        <div className="invalid-feedback">
                                            Valid name is required.
                                        </div>
                                    </div>
                                    <div className="md-6">
                                        <label htmlFor="price" className="form-label">
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            value={phone}  onChange={(e)=> {setPhone(e.target.value)}}
                                            className="form-control"
                                            id="cc-number"
                                            placeholder=""
                                            required=""
                                        />
                                        <div className="invalid-feedback">
                                            Phone is required
                                        </div>
                                    </div>
                                    
                                <hr className="my-4" />

                                <button type="submit" className="btn btn-success text-center">
                                    Add
                                </button>
                                </div>
                            </form>
                        </div>
    </div>
}
{props.customer[2] != 0 && 
    <div className='container text-center'>
        <b>Already a customer</b>
        <table class = "container text-center">
            <tr>
                <th>Name</th>
                <td>{props.customer[0]}</td>
            </tr>
            <tr>
                <th>Phone</th>
                <td>{props.customer[1]}</td>
            </tr>
            <tr>
                <th>Bill count</th>
                {props.customer[2] == 1 && <a href="/">Continue to Shop</a>}
                <td>{props.customer[2]-1}</td>
            </tr>
        </table>
    </div>}
    </>
  )
}

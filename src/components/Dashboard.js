import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

export const Dashboard = (props) => {
  return (
    <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Blockchain Shop</h1>
            <p className="lead text-muted">
              
              We are glad to have you back 
              {/* <b>{customer['name']}</b> */}
              !!!
              
             
              
            </p>
            <p className="lead text-muted">
              {/* ShopOwner is <b>{shopOwner}</b>!!! */}
              <b>{props.msg_main}</b>
              
            </p>
            <div>
              <button className="btn btn-secondary my-2" onClick={props.createBill}>
                Create Bill
              </button>
              <button className="btn btn-secondary my-2" onClick={props.FinaliseCart}>
                Update Cart
              </button>
              
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            View Cart &#x20b9;{props.cart_amount}/-
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {props.cart_local.map(item => (  
                                <Dropdown.Item href="">{item[0]}  - {item[2]} no.s  - &#x20b9;{item[1] * item[2]}/-<button type="button" className="btn btn-sm btn-outline-secondary" onClick={ () => props.RemoveFromCartHandler(item[0])}>
                                    Remove </button>
                                </Dropdown.Item>
                                    )   
                                )
                            }  
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    </section>
  )
}


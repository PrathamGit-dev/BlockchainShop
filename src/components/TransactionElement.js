import React from 'react'
import { useEffect } from 'react'

export const TransactionElement = (props) => {
   

    const item_price = props.itemprice;
    const item_code = props.itemcode;
    const item_quantity = props.itemquantity;
    const total_amount = props.total_amount;
    let timeStamp = props.timestamp;

    const date = new Date(timeStamp * 1000);
    const string_date = date.toString();
    console.log("current date",string_date)


//     let unix_timestamp = timeStamp;
// // Create a new JavaScript Date object based on the timestamp
// // multiplied by 1000 so that the argument is in milliseconds, not seconds.
//     var date = new Date(unix_timestamp * 1000);
//     // Hours part from the timestamp
//     var hours = date.getHours();
//     // Minutes part from the timestamp
//     var minutes = "0" + date.getMinutes();
//     // Seconds part from the timestamp
//     var seconds = "0" + date.getSeconds();

//     // Will display time in 10:30:23 format
//     var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return (
     
    <div class="accordion accordion-flush text-center container" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        <b>{total_amount}</b>  
        <div className='text-align-left'>{string_date}</div>
        
        
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
            <table class = "container">
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Qunatity</th>
                </tr>
                {
                    item_code.map((item, i)=> (
                        <tr>
                            <td>{item_code[i]}</td>
                            <td>{item_price[i]}</td>
                            <td>{item_quantity[i]}</td>
                        </tr>
                    ))
                }
                
        </table>
      </div>
    </div>
  </div>
  </div>
  )
}


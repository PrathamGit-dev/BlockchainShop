import React from 'react'

// import BlockMarket from "../../smart_contract/build/contracts/BlockMarket.json"

export const About = (props) => {
  const link = "https://mumbai.polygonscan.com/address/".concat(props.contractAddress);

  return (
    <div class = "container my-5 text-center">
        <p>
            <h5>This is Defi application developed to imitate the behaviour of a online shop powered by blockchain on <b>Polygon Matic Mumbai Tetsnet</b>.</h5>
            <br></br>
            <h6>Checkout the repository : <a href="https://github.com/PrathamGit-dev/BlockchainShop" target="_blank">Click here</a></h6>
            <br></br>
            <h6>Contract details : <a href={link} target = "_blank">Click here</a></h6> 
        </p>
    </div>
  )
}

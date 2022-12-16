import React from 'react'

export const Footer = (props) => {
  return (
    <footer className="text-muted py-5">
      
      <div className="d-flex container flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
  <p>© 2022 Pratham Chaurasia, All rights reserved.
    <a href="https://github.com/PrathamGit-dev" className='container my-5 text-center'><h6 style={{ color: "grey" }}><b>Github</b></h6></a>
    </p>



  <ul className="list-unstyled d-flex">
    <li className="ms-3">
      <a className="link-dark" href="#">
        <svg className="bi" width={24} height={24}>
          <use xlinkHref="#twitter" />
        </svg>
      </a>
    </li>
    <li className="ms-3">
      <a className="link-dark" href="#">
        <svg className="bi" width={24} height={24}>
          <use xlinkHref="#instagram" />
        </svg>
      </a>
    </li>
    <li className="ms-3">
      <a className="link-dark" href="#">
        <svg className="bi" width={24} height={24}>
          <use xlinkHref="#facebook" />
        </svg>
      </a>
    </li>
  </ul>
</div>

    </footer>
  )
}


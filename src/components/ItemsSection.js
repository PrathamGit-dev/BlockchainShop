import React from 'react'

export const ItemsSection = (props) => {
  return (
    <div className="album py-5 bg-light container align-items-center">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-6 g-3">
          {
            props.items.map(item => (
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
                              () => props.AddItemHandler(item[0], item[1])

                            }
                          >
                            Add
                          </button> : <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Can't add
                          </button>}
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
  )
}


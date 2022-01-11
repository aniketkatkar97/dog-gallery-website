import React from "react";

function DogImages({ breeds, filter }) {
  return (
    <div className="row">
      {breeds.map((breed) => {
        return (
          <div
            className="col-md-3 my-3"
            key={breed.name}
            data-bs-toggle="modal"
            data-bs-target={`#${breed.name}`}
          >
            <div className="card" style={{ width: "16rem" }}>
              <img src={`${breed.img[0]}`} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">{breed.name}</p>
              </div>
            </div>

            <div
              className="modal fade"
              id={breed.name}
              tabIndex="-1"
              aria-labelledby={`${breed.name}label`}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id={`${breed.name}label`}>
                      {breed.name}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body d-flex flex-column align-items-center">
                    <h4>Sub Breeds</h4>
                    <div className="container row">
                      {breed.subbreeds ? (
                        breed.subbreeds.map((subbreed) => {
                          return (
                            <div
                              className="card col-md-4 mx-1 my-2"
                              style={{ width: "16rem" }}
                              key={subbreed.name}
                            >
                              <img
                                src={subbreed.img}
                                className="card-img-top"
                                alt="..."
                              />
                              <div className="card-body">
                                <p className="card-text">{subbreed.name}</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p>There are no Sub-breeds of this breed</p>
                      )}
                    </div>
                  </div>
                  <div className="modal-body">
                    <h5>More images</h5>
                    <div className="container row">
                      {breed.img.map((image) => {
                        return (
                          <div
                            className="card col-md-4 mx-1 my-2"
                            style={{ width: "16rem" }}
                            key={image}
                          >
                            <img
                              src={image}
                              className="card-img-top"
                              alt="..."
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DogImages;

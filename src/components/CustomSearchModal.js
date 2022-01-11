import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomSearchModal({ breeds }) {
  const [breedsList, setBreedsList] = useState([]);
  const [images, setImages] = useState([]);
  const [breedType, setBreedType] = useState("");
  const [nOfImages, setNOfImages] = useState(0);

  useEffect(() => {
    let list = [];
    for (let breed of breeds) {
      list.push(breed.name);
    }
    setBreedsList(list);
  }, [breeds]);

  const getImages = async () => {
    const breed = document.getElementById("breedSelector").value;
    const number = document.getElementById("n_of_images").value;
    if (!breed || !number) {
      window.alert("Please Give valid credentials.");
    }
    try {
      axios
        .get(`https://dog.ceo/api/breed/${breed}/images/random/${number}`)
        .then((data) => {
          if (data) {
            setImages(data.data.message);
            setBreedType(breed);
            setNOfImages(data.data.message.length);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#customSearchModal"
      >
        Custom Search
      </button>

      <div
        className="modal"
        id="customSearchModal"
        tabIndex="-1"
        aria-labelledby="customSearchModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="customSearchModalLabel">
                Custom Search
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex">
              <select
                className="form-select mx-3"
                aria-label="Default select example"
                id="breedSelector"
              >
                <option value="">Select a breed</option>
                {breedsList.map((breed) => {
                  return (
                    <option value={breed} key={breed}>
                      {breed}
                    </option>
                  );
                })}
              </select>
              <input
                className="form-control"
                type="number"
                id="n_of_images"
                placeholder="Number of Images"
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary modal-button"
                onClick={getImages}
              >
                GET IMAGES
              </button>
            </div>
            <div className="modal-body c-search-images">
              <h4>
                Showing {nOfImages} images of {breedType}
              </h4>
              <div className="container row">
                {images.map((image) => {
                  return (
                    <div
                      className="card col-md-4 mx-1 my-2"
                      style={{ width: "16rem" }}
                      key={image}
                    >
                      <img src={image} className="card-img-top" alt="..." />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomSearchModal;

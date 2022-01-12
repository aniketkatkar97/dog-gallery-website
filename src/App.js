import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import DogImages from "./components/DogImages";
import "./App.css";
import axios from "axios";

function App() {
  //Setting states for the app
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [filterResults, setFilterResults] = useState(0);

  //fetching the information about all the dog breeds at the START
  useEffect(() => {
    fetchBreedsInfo();
    // eslint-disable-next-line
  }, []);

  //Function to fetch the information about all the dog breeds
  const fetchBreedsInfo = () => {
    axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then((data) => {
        mapDataForBreeds(data); //Getting details for every breed
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //function to map all the data for each breed
  const mapDataForBreeds = async (data) => {
    let breeds_list = [];
    for (let breed in data.data.message) {
      let breedData = { name: breed };

      //adding images to breed data
      let imageData = await mapImagesForBreeds(breed); //getting image for the breed
      if (imageData.data.message.length !== 0) {
        breedData.img = imageData.data.message;
      }

      //adding sub breeds to breed data
      let subBreeds = await mapSubBreeds(breed); //getting sub breeds for the breed
      breedData["subbreeds"] = subBreeds;

      breeds_list.push(breedData);
    }
    setBreeds(breeds_list); //Saving all the information in "breeds" state
  };

  //function to fetch and map the images for given breeds
  const mapImagesForBreeds = async (breed) => {
    let imageData = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random/4`
    );
    return imageData;
  };

  //function to fetch and map information about sub breeds for a given breed
  const mapSubBreeds = async (breed) => {
    let sub_breed_list = [];
    let list = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
    if (list.data.message.length !== 0) {
      for (let subBreed of list.data.message) {
        let subBreedData = { name: subBreed };
        let imageData = await axios.get(
          `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`
        );
        if (imageData.data.message.length !== 0) {
          subBreedData.img = imageData.data.message;
        }

        sub_breed_list.push(subBreedData);
      }
      return sub_breed_list;
    }
  };

  //onchange handler for filter search input
  const handleChange = (e) => {
    let filter = e.target.value.trim();
    let newList = breeds.filter((breed) => breed.name === filter);
    setFilterResults(newList.length);
    setFilteredBreeds(newList);
  };

  return (
    <div>
      <Navbar breeds={breeds} />
      <div className="container">
        <div className="row g-4 my-3 filter-form">
          <div className="col-auto">
            <input
              type="text"
              className="form-control input"
              id="breedName"
              placeholder="Type here to filter by breed"
              onChange={handleChange}
            />
          </div>
        </div>
        {breeds.length === 0 ? (
          <h1>Please wait while we fetch the data from the server...</h1>
          <h2>This may take 1 to 2 minutes.</h2>
        ) : filterResults === 0 ? (
          <DogImages breeds={breeds} />
        ) : (
          <DogImages breeds={filteredBreeds} />
        )}
      </div>
    </div>
  );
}

export default App;

import React , {useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";


function PlantPage() {
  const [plants, setPlants] = useState([])
  const [newPlant, setNewPlant] = useState({
                                              name: "",
                                              image: "",
                                              price: 0
                                                        })
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then((response) => response.json())
    .then((plantData) => setPlants(plantData))
  },[])

  function handleNewPlant(event) {
    if(event.target.name === "price") {
      const num = parseFloat(event.target.value)

      setNewPlant({
        ...newPlant,
        [event.target.name] : num
      })
    }
    else {
      setNewPlant({
        ...newPlant,
        [event.target.name] : event.target.value
      })
    }
  }

  function handleNewPlantSubmit(event) {
    event.preventDefault()

    fetch('http://localhost:3000/plants', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(newPlant)
    })
    .then((response) => response.json())
    .then((newPlantItem) => {
      setPlants([
        ...plants,
        newPlantItem
      ])
    })

    setNewPlant({
      name: "",
      image: "",
      price: 0
                })
  }

  function handleSearch(event) {
    setSearch(event.target.value)
  }

  const plantsToBeShown = plants.filter((plant) => {
    if(search.length > 0) {
      return plant.name.toLowerCase().includes(search.toLowerCase())
    }
    else {return true}
  })

  return (
    <main>
      <NewPlantForm newPlant = {newPlant} handleNewPlant = {handleNewPlant} handleNewPlantSubmit={handleNewPlantSubmit} />
      <Search search ={search} handleSearch = {handleSearch} />
      <PlantList plants = {plantsToBeShown} />
    </main>
  );
}

export default PlantPage;

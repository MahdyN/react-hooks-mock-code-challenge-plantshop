import React, {useState} from "react";

function PlantCard({plant}) {
  const [inStock, setInStock] = useState(true)

  function handleSoldOut(){
    setInStock(!inStock)
  }

  return (
    <li className="card">
      <img src={ plant.image ? plant.image :"https://via.placeholder.com/400"} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      { inStock ? (
        <button className="primary" onClick = {handleSoldOut}>In Stock</button>
      ) : (
        <button onClick = {handleSoldOut}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;

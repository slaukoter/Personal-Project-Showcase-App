import React from "react";
import { Link } from "react-router-dom";

function SoccerCard({ item }) {
  const { id, name, description, brand, price } = item;

  return (
    <article className="soccer-card">
      <h3>{name}</h3>
      <p>
        <strong>Brand:</strong> {brand}
      </p>
      <p>{description}</p>
      <p>
        <strong>Price:</strong> ${price.toFixed(2)}
      </p>
      <Link to={`/shop/${id}`}>View Details</Link>
    </article>
  );
}

export default SoccerCard;

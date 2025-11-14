import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSoccerProducts } from "../hooks/useSoccerProducts";

function SoccerDetailPage() {
  const { id } = useParams();
  const { soccerItems, loading, error } = useSoccerProducts();

  if (loading) return <p>Loading item...</p>;
  if (error) return <p>Error: {error}</p>;

  const item = soccerItems.find((i) => String(i.id) === String(id));

  if (!item) {
    return (
      <section>
        <p>Item not found.</p>
        <Link to="/shop">Back to shop</Link>
      </section>
    );
  }

  const { name, description, brand, price } = item;

  return (
    <section>
      <h2>{name}</h2>
      <p>
        <strong>Brand:</strong> {brand}
      </p>
      <p>{description}</p>
      <p>
        <strong>Price:</strong> ${price.toFixed(2)}
      </p>
      <Link to="/shop">Back to shop</Link>
    </section>
  );
}

export default SoccerDetailPage;

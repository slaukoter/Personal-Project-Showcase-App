import React, { useState } from "react";
import { useSoccerProducts } from "../hooks/useSoccerProducts";
import SoccerCard from "../components/SoccerCard";

function ShopPage() {
  const { soccerItems, loading, error } = useSoccerProducts();
  const [brandFilter, setBrandFilter] = useState("All");

  if (loading) return <p>Loading soccer gear...</p>;
  if (error) return <p>Error: {error}</p>;

  const brands = ["All", ...new Set(soccerItems.map((item) => item.brand))];

  const visibleItems =
    brandFilter === "All"
      ? soccerItems
      : soccerItems.filter((item) => item.brand === brandFilter);

  return (
    <section>
      <h2>Shop Soccer Gear</h2>

      <label>
        Filter by Brand:{" "}
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >
          {brands.map((brand) => (
            <option key={brand}>{brand}</option>
          ))}
        </select>
      </label>

      {visibleItems.length === 0 ? (
        <p>No items match this brand.</p>
      ) : (
        <div className="soccer-grid">
          {visibleItems.map((item) => (
            <SoccerCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ShopPage;

import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section>
      <h2>Welcome to The Soccer Corner</h2>
      <p>Find balls, cleats, jerseys, and more for your next match.</p>
      <Link to="/shop">Shop Now</Link>
    </section>
  );
}

export default HomePage;

import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {" | "}
      <NavLink to="/shop">Shop</NavLink>
      {" | "}
      <NavLink to="/admin">Admin</NavLink>
    </nav>
  );
}

export default NavBar;

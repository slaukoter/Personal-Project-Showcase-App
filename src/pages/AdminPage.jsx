import React, { useState } from "react";
import { useSoccerProducts } from "../hooks/useSoccerProducts";

function AdminPage() {
  const {
    soccerItems,
    loading,
    error,
    addSoccerItem,
    updateSoccerItem,
    deleteSoccerItem,
  } = useSoccerProducts();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
  });

  const [editId, setEditId] = useState(null);

  if (loading) return <p>Loading admin data...</p>;
  if (error) return <p>Error: {error}</p>;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
      brand: formData.brand,
      price: Number(formData.price),
    };

    if (editId) {
      updateSoccerItem(editId, payload).then(() => {
        setEditId(null);
        setFormData({ name: "", description: "", brand: "", price: "" });
      });
    } else {
      addSoccerItem(payload).then(() => {
        setFormData({ name: "", description: "", brand: "", price: "" });
      });
    }
  }

  function handleEdit(item) {
    setEditId(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      brand: item.brand,
      price: String(item.price),
    });
  }

  function handleDelete(id) {
    deleteSoccerItem(id);
  }

  return (
    <section>
      <h2>Admin Panel</h2>

      <form onSubmit={handleSubmit}>
        <h3>{editId ? "Edit Item" : "Add New Item"}</h3>

        <label>
          Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Brand:
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price:
          <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">{editId ? "Save Changes" : "Add Item"}</button>
      </form>

      <h3>Existing Items</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {soccerItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <button type="button" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default AdminPage;

import { useEffect, useState } from "react";

const API_URL = "http://localhost:4000";

export function useSoccerProducts() {
  const [soccerItems, setSoccerItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/soccer`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch soccer products");
        return r.json();
      })
      .then((data) => {
        setSoccerItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  function addSoccerItem(newItem) {
    return fetch(`${API_URL}/soccer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to add item");
        return r.json();
      })
      .then((created) => {
        setSoccerItems((prev) => [...prev, created]);
        return created;
      });
  }

  function updateSoccerItem(id, updates) {
    return fetch(`${API_URL}/soccer/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to update item");
        return r.json();
      })
      .then((updated) => {
        setSoccerItems((prev) =>
          prev.map((item) => (item.id === id ? updated : item))
        );
        return updated;
      });
  }

  function deleteSoccerItem(id) {
    return fetch(`${API_URL}/soccer/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (!r.ok) throw new Error("Failed to delete item");
      setSoccerItems((prev) => prev.filter((item) => item.id !== id));
    });
  }

  return {
    soccerItems,
    loading,
    error,
    addSoccerItem,
    updateSoccerItem,
    deleteSoccerItem,
  };
}

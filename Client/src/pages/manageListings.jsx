import { useEffect, useState } from "react"; 
import "./manageListings.css";

function ManageListings({user, onBack }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    product_name: "",
    description: "",
    quantity: "",
    price: "",
    location: "",
  });
const [message, setMessage] = useState("");
  
  useEffect(() => {
  fetch(`http://127.0.0.1:5000/products/${user.id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load produce listings.");
      }
      return response.json();
    })
    .then((data) => {
      setProducts(data.products);
    })
    .catch((err) => {
      setError(err.message);
    });
}, [user?.id]);


function startEditing(product) {
  setEditingProduct(product.id);
  setEditForm({
    product_name: product.product_name,
    description: product.description,
    quantity: product.quantity,
    price: product.price,
    location: product.location,
  });
  setMessage("");
  setError("");
}

async function saveProductChanges() {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/products/${editingProduct}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editForm,
          quantity: Number(editForm.quantity),
          price: Number(editForm.price),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update listing.");
    }

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === editingProduct
          ? { ...product, ...data.product }
          : product
      )
    );

    setMessage(data.message);
    setError("");
    setEditingProduct(null);
  } catch (err) {
    setError(err.message);
  }
}

async function removeProduct(productId) {
  const confirmed = window.confirm(
    "Are you sure you want to remove this produce listing?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `http://127.0.0.1:5000/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to remove listing.");
    }

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId)
    );

    setMessage(data.message);
    setError("");
  } catch (err) {
    setError(err.message);
  }
}

  return (
    <div className="manage-listings-page">
      <div className="manage-listings-container">
        <div className="page-navigation">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              onBack();
            }}
          >
            ← Back
          </a>
        </div>

        <h1>Manage Listings</h1>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <p className="page-description">
          View and manage your produce listings.
        </p>

        <div className="listings-table">
          <div className="listing-row listing-header">
            <span>Produce</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Location</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {error && <p className="error-message">{error}</p>}
          {products.length === 0 && !error && (
            <p>Loading produce listings...</p>
          )}

          {editingProduct !== null && (
            <div className="edit-product-form">
              <h2>Edit Produce Listing</h2>
              
              <label>Produce Name</label>
              <input
                type="text"
                value={editForm.product_name}
                onChange={(e) =>
                  setEditForm({ ...editForm, product_name: e.target.value })
                }
              />
              
              <label>Description</label>
              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
              />
              
              <label>Quantity (kg)</label>
              <input
                type="number"
                value={editForm.quantity}
                onChange={(e) =>
                  setEditForm({ ...editForm, quantity: e.target.value })
                }
              />

              <label>Price (KSh)</label>
              <input
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: e.target.value })
                }
              />
              
              <label>Location</label>
              <input
                type="text"
                value={editForm.location}
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
              />
              <div className="edit-form-actions">
                <button onClick={saveProductChanges}>Save Changes</button>
                <button onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            </div>
)}

          {products.map((product) => (
            <div className="listing-row" key={product.id}>
              <span className="listing-product">
                {product.image ? (
                  <img
                    src={`http://127.0.0.1:5000/uploads/${product.image}`}
                    alt={product.product_name}
                    className="listing-image"
                  />
                  ) : (
                    <span>No Image</span>
                  )
                }
                <span>{product.product_name}</span>
              </span>

              <span>{product.quantity} kg</span>
              <span>KSh {product.price}</span>
              <span>{product.location}</span>
              <span>{product.status}</span>
              <span>
                <button onClick={() => startEditing(product)}>Edit</button>
                <button onClick={() => removeProduct(product.id)}>Remove</button>
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default ManageListings;
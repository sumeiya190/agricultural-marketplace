
import { useState } from "react";
import "./listProduce.css";

function ListProduce({user, onBack }) {
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    quantity: "",
    price: "",
    location: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const data = new FormData();

      data.append("product_name", formData.product_name);
      data.append("description", formData.description);
      data.append("quantity", formData.quantity);
      data.append("price", formData.price);
      data.append("location", formData.location);
      data.append("farmer_id", String(user.id));

      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await fetch(
        "http://127.0.0.1:5000/products",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to list produce."
        );
      }

      setMessage(result.message || "Produce listed successfully!");

      setFormData({
        product_name: "",
        description: "",
        quantity: "",
        price: "",
        location: "",
        image: null,
      });

      event.target.reset();
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="list-produce-page">
      <div className="list-produce-card">
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

        <div className="page-header">
          <h1>List Your Produce</h1>
          <p>Add your farm produce for buyers to discover.</p>
        </div>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form className="produce-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Produce Name</label>
            <input
              type="text"
              placeholder="e.g. Maize"
              value={formData.product_name}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  product_name: event.target.value,
                })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Describe your produce..."
              rows="4"
              value={formData.description}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  description: event.target.value,
                })
              }
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quantity (kg)</label>
              <input
                type="number"
                className="number-input"
                placeholder="e.g. 50"
                min="1"
                step="1"
                value={formData.quantity}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    quantity: event.target.value,
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Price (KSh)</label>
              <input
                type="number"
                className="number-input"
                placeholder="e.g. 80"
                min="1"
                step="1"
                value={formData.price}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    price: event.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="e.g. Eastleigh"
              value={formData.location}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  location: event.target.value,
                })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Produce Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  image: event.target.files[0] || null,
                })
              }
            />
            <small>Upload a clear photo of your produce.</small>
          </div>

          <button
            type="submit"
            className="list-produce-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Uploading..." : "List Produce"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ListProduce;

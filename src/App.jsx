import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    stories: "",
    mainroad: "yes",
    guestroom: "no",
    basement: "no",
    hotwaterheating: "no",
    airconditioning: "no",
    parking: "",
    prefarea: "no",
    furnishingstatus: "unfurnished",
  });

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    const requiredFields = ["area", "bedrooms", "bathrooms", "stories", "parking"];
    const missingFields = requiredFields.filter(field => !form[field] || form[field] === "");
    
    if (missingFields.length > 0) {
      setError(`Please fill in: ${missingFields.join(", ")}`);
      return false;
    }

    // Validate numeric fields
    const numericFields = ["area", "bedrooms", "bathrooms", "stories", "parking"];
    for (let field of numericFields) {
      const value = parseFloat(form[field]);
      if (isNaN(value) || value < 0) {
        setError(`${field} must be a positive number`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrice(data.predicted_price.toFixed(2));
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Failed to predict price. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      area: "",
      bedrooms: "",
      bathrooms: "",
      stories: "",
      mainroad: "yes",
      guestroom: "no",
      basement: "no",
      hotwaterheating: "no",
      airconditioning: "no",
      parking: "",
      prefarea: "no",
      furnishingstatus: "unfurnished",
    });
    setPrice(null);
    setError("");
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="app-title">
          <span className="icon">🏡</span>
          House Price Predictor
        </h1>
        <p className="app-subtitle">Get instant price predictions for your property</p>
      </div>

      <div className="main-content">
        <div className="prediction-form">
          <div className="form-section">
            <h3 className="section-title">📐 Property Details</h3>
            <div className="form-group">
              <label htmlFor="area">Area (sq ft)</label>
              <input
                id="area"
                name="area"
                type="number"
                placeholder="Enter area in square feet"
                value={form.area}
                onChange={handleChange}
                className="form-input"
                min="0"
                step="1"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bedrooms">Bedrooms</label>
                <input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  placeholder="Number of bedrooms"
                  value={form.bedrooms}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  step="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bathrooms">Bathrooms</label>
                <input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  placeholder="Number of bathrooms"
                  value={form.bathrooms}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  step="1"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="stories">Stories</label>
                <input
                  id="stories"
                  name="stories"
                  type="number"
                  placeholder="Number of stories"
                  value={form.stories}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  step="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="parking">Parking Spots</label>
                <input
                  id="parking"
                  name="parking"
                  type="number"
                  placeholder="Number of parking spots"
                  value={form.parking}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  step="1"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">🏠 Property Features</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mainroad">Main Road Access</label>
                <select
                  id="mainroad"
                  name="mainroad"
                  value={form.mainroad}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="yes">Yes - On Main Road</option>
                  <option value="no">No - Not on Main Road</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="guestroom">Guest Room</label>
                <select
                  id="guestroom"
                  name="guestroom"
                  value={form.guestroom}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="no">No Guest Room</option>
                  <option value="yes">Has Guest Room</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="basement">Basement</label>
                <select
                  id="basement"
                  name="basement"
                  value={form.basement}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="no">No Basement</option>
                  <option value="yes">Has Basement</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="hotwaterheating">Hot Water Heating</label>
                <select
                  id="hotwaterheating"
                  name="hotwaterheating"
                  value={form.hotwaterheating}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="no">No Hot Water Heating</option>
                  <option value="yes">Has Hot Water Heating</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="airconditioning">Air Conditioning</label>
                <select
                  id="airconditioning"
                  name="airconditioning"
                  value={form.airconditioning}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="no">No Air Conditioning</option>
                  <option value="yes">Has Air Conditioning</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="prefarea">Preferred Area</label>
                <select
                  id="prefarea"
                  name="prefarea"
                  value={form.prefarea}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="no">Not in Preferred Area</option>
                  <option value="yes">In Preferred Area</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="furnishingstatus">Furnishing Status</label>
              <select
                id="furnishingstatus"
                name="furnishingstatus"
                value={form.furnishingstatus}
                onChange={handleChange}
                className="form-select"
              >
                <option value="unfurnished">Unfurnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="furnished">Fully Furnished</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-secondary"
              disabled={loading}
            >
              Reset Form
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="loading">
                  <span className="spinner"></span>
                  Predicting...
                </span>
              ) : (
                <>
                  <span className="btn-icon">🔮</span>
                  Predict Price
                </>
              )}
            </button>
          </div>
        </div>

        {price && (
          <div className="result-container">
            <div className="result-card">
              <h2 className="result-title">
                <span className="result-icon">💰</span>
                Predicted Price
              </h2>
              <div className="price-display">
                <span className="currency">₹</span>
                <span className="price-amount">{price}</span>
              </div>
              <p className="result-disclaimer">
                *This is an estimated price based on the provided property details
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
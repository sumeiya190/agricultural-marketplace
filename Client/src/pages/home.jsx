import "./home.css";

function Home({ onLogin, onRegister }) {
  return (
    <div className="home-page">

      <nav className="home-navbar">
        <div className="home-logo">
          Agricultural Marketplace
        </div>

        <div className="home-nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#how-it-works">How It Works</a>
          <a
            href="#login"
            onClick={(event) => {
              event.preventDefault();
              onLogin();
            }}
          >
            Login
          </a>
          <a
            href="#register"
            onClick={(event) => {
              event.preventDefault();
              onRegister();
            }}
          >
            Register
          </a>
        </div>
      </nav>

      <section className="home-hero" id="home">
        <div className="hero-content">
          <h1>Connect. Sell. Buy Locally.</h1>

          <p>
            Agricultural Marketplace connects small-scale farmers
            with buyers looking for fresh produce within their local area.
          </p>

          <div className="hero-buttons">
            <button onClick={onRegister}>
              Get Started
            </button>

            <button onClick={onLogin}>
              Login
            </button>
          </div>
        </div>
      </section>

      <section className="home-section" id="about">
        <h2>About Agricultural Marketplace</h2>

        <p>
          Agricultural Marketplace is a web-based platform designed
          to help small-scale farmers in Kenya connect directly with
          potential buyers. Farmers can list their produce, while buyers
          can search for specific produce and discover farmers located
          within a selected distance.
        </p>
      </section>

      <section className="home-section" id="how-it-works">
        <h2>How It Works</h2>

        <div className="how-it-works-grid">
          <div className="info-card">
            <h3>1. Farmers List Produce</h3>
            <p>
              Farmers create listings with information such as
              produce name, quantity, price, location, and image.
            </p>
          </div>

          <div className="info-card">
            <h3>2. Buyers Search</h3>
            <p>
              Buyers search for the produce they need and provide
              their location and preferred search radius.
            </p>
          </div>

          <div className="info-card">
            <h3>3. Find Nearby Farmers</h3>
            <p>
              The system identifies farmers offering the requested
              produce within the selected distance.
            </p>
          </div>

          <div className="info-card">
            <h3>4. Place an Order</h3>
            <p>
              Buyers can view produce details and place orders
              directly through the marketplace.
            </p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2>Key Features</h2>

        <div className="features-grid">
          <div className="info-card">
            <h3>Produce Listings</h3>
            <p>
              Farmers can create and manage listings for their produce.
            </p>
          </div>

          <div className="info-card">
            <h3>Location-Based Search</h3>
            <p>
              Buyers can search for produce based on their location
              and selected radius.
            </p>
          </div>

          <div className="info-card">
            <h3>Nearby Farmers</h3>
            <p>
              Discover farmers offering the produce you need nearby.
            </p>
          </div>

          <div className="info-card">
            <h3>Order Management</h3>
            <p>
              Buyers and farmers can manage their marketplace orders.
            </p>
          </div>

          <div className="info-card">
            <h3>Farmer Analytics</h3>
            <p>
              Farmers can view useful information about their
              listings, orders, popular produce, and prices.
            </p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <h3>Agricultural Marketplace</h3>
        <p>
          Connecting small-scale farmers with local buyers.
        </p>
        <p>© 2026 Agricultural Marketplace</p>
      </footer>

    </div>
  );
}

export default Home;
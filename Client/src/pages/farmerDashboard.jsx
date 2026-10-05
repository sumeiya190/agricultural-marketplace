import "./farmerDashboard.css";

function FarmerDashboard({onListProduce, onLogout }) {
  return (
    <div className="farmer-dashboard-page">
      <div className="farmer-dashboard-container">
        <div className="dashboard-header">
            <h1>Farmer Dashboard</h1>
            
            <a href="#" className="logout-link" onClick={(event) => 
            { event.preventDefault(); onLogout();}}>
                Logout
            </a>
        </div>

        <p>Manage your produce and orders.</p>

        <div className="dashboard-actions">
          <button onClick={onListProduce}>
            List Produce
          </button>

          <button>
            Manage Listings
          </button>

          <button>
            View Orders
          </button>

          <button>
            Update Orders
          </button>

          <button>
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;
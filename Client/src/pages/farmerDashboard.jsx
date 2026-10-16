import "./farmerDashboard.css";

function FarmerDashboard({user,onListProduce, onManageListings, onViewOrders, onUpdateProfile, onLogout }) {
  return (
    <div className="farmer-dashboard-page">
      <div className="farmer-dashboard-container">
        <div className="dashboard-header">
            <h1>Farmer Dashboard</h1>
            {user && (<p>Welcome, {user.first_name}!</p>)}
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

          <button onClick={onManageListings}>
            Manage Listings
          </button>

          <button onClick={onViewOrders}>
            View Orders
          </button>

          <button onClick={onUpdateProfile}>
            My Profile
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
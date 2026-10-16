import { useState } from "react";
import Register from "./pages/register";
import Login from "./pages/login";
import ListProduce from "./pages/listProduce";
import FarmerDashboard from "./pages/farmerDashboard";
import Profile from "./pages/profile";
import Home from "./pages/home";
import ManageListings from "./pages/manageListings"; 
import ViewOrders from "./pages/viewOrders";



function App() {
  const [page, setPage] = useState("home");
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <>
      {page === "home" ? (
        <Home
          onLogin={() => setPage("login")}
          onRegister={() => setPage("register")}
        />
      ) : page === "register" ? (
        <Register 
        onHome={() => setPage("home")}
        onLogin={() => setPage("login")} 
        />
      ) : page === "login" ? (
        <Login
          onHome={() => setPage("home")}
          onRegister={() => setPage("register")}
          onLoginSuccess={(user) =>{ 
            setLoggedInUser(user);
            setPage("dashboard");
          }}
        />
      ) : page === "dashboard" ? (
        <FarmerDashboard
          user={loggedInUser}
          onListProduce={() => setPage("list")}
          onManageListings={() => setPage("manageListings")}
          onViewOrders={() => setPage("viewOrders")}
          onUpdateProfile={() => setPage("updateProfile")}
          onLogout={() => {
            setLoggedInUser(null);
            setPage("home");
          }}
        />
      ): page === "updateProfile" ? (
        <Profile
          user={loggedInUser}
          onBack={() => setPage("dashboard")}
        />
      ) : page === "manageListings" ? (
        <ManageListings
          user={loggedInUser}
          onBack={() => setPage("dashboard")}
        />
      ) : page === "viewOrders" ? (
        <ViewOrders
          user={loggedInUser}
          onBack={() => setPage("dashboard")}
        />
      ) : (
        <ListProduce
          user={loggedInUser}
          onBack={() => setPage("dashboard")}
        />
      )}
    </>
  );
}

export default App;
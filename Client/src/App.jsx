import { useState } from "react";
import Register from "./pages/register";
import Login from "./pages/login";
import ListProduce from "./pages/listProduce";
import FarmerDashboard from "./pages/farmerDashboard";
import Home from "./pages/home";

function App() {
  const [page, setPage] = useState("home");

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
          onLoginSuccess={() => setPage("dashboard")}
        />
      ) : page === "dashboard" ? (
        <FarmerDashboard
          onListProduce={() => setPage("list")}
          onLogout={() => setPage("home")}
        />
      ) : (
        <ListProduce
          onBack={() => setPage("dashboard")}
        />
      )}
    </>
  );
}

export default App;
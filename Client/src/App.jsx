import { useState } from "react";
import "./App.css";
import Register from "./pages/register";
import Login from "./pages/login";

function App() {
  const [page, setPage] = useState("register");

  return (
    <>
      {page === "register" ? (
        <Register onLogin={() => setPage("login")} />
      ) : (
        <Login onRegister={() => setPage("register")} />
      )}
    </>
  );
}

export default App;
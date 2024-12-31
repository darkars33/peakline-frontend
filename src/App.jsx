import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import ProductDetails from "./page/ProductDetails";
import Navbar from "./component/Navbar";
import UpdateProduct from "./page/UpdateProduct";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.user.token);

  return (
    <>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/register" />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
        <Route path="/product/:id" element={token ? <ProductDetails /> : <Navigate to="/register" />} />
        <Route path="/update/:id" element={token ? <UpdateProduct /> : <Navigate to="/register" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

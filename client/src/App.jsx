import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import AddProduct from "./pages/AddProduct";
import AdminProducts from "./pages/AdminProducts";


// Components
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {

  return (

    <div
      data-theme="forest"
      className="min-h-screen"
    >

      <BrowserRouter>

        <Routes>


          {/* Default Route → Login */}
          <Route
            path="/"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />


          {/* Public Routes */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />


          {/* User Routes */}
          <Route
            path="/home"
            element={

              <ProtectedRoute>

                <Home />

              </ProtectedRoute>

            }
          />

          <Route
            path="/cart"
            element={

              <ProtectedRoute>

                <Cart />

              </ProtectedRoute>

            }
          />

          <Route
            path="/checkout"
            element={

              <ProtectedRoute>

                <Checkout />

              </ProtectedRoute>

            }
          />


          {/* Admin Routes */}
          <Route
            path="/admin/add-product"
            element={

              <ProtectedRoute>

                <AddProduct />

              </ProtectedRoute>

            }
          />

          <Route
            path="/admin/edit-product/:id"
            element={

              <ProtectedRoute>

                <AddProduct />

              </ProtectedRoute>

            }
          />

          <Route
            path="/admin/products"
            element={

              <ProtectedRoute>

                <AdminProducts />

              </ProtectedRoute>

            }
          />


          {/* Invalid Routes */}
          <Route
            path="*"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

        </Routes>

      </BrowserRouter>

    </div>

  );

}
import NotFound from "./Pages/NotFound";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";

import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Customers from "./Pages/Customers";
import Analytics from "./Pages/Analytics";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import ProductDetails from "./Pages/ProductDetails";


function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {

    const savedProducts = localStorage.getItem("products");

    if (savedProducts) {

      setProducts(JSON.parse(savedProducts));
      setLoading(false);

    } else {

      fetch("https://dummyjson.com/products")

        .then((response) => response.json())

        .then((data) => {

          const apiProducts = data.products.map((product) => ({
            id: product.id,
            name: product.title,
            price: product.price,
            stock: product.stock,
            image: product.thumbnail,
          }));

          setProducts(apiProducts);
          setLoading(false);

        })

        .catch((error) => {

          console.log(error);
          setLoading(false);

        });

    }

  }, []);



  useEffect(() => {

    if(products.length > 0){
      localStorage.setItem(
        "products",
        JSON.stringify(products)
      );
    }

  }, [products]);



  return (

    <Routes>

      {/* Login Page */}

      <Route 
        path="/login" 
        element={<Login />} 
      />


      {/* Protected Pages */}

      <Route
         path="/"
         element={
       <ProtectedRoute>
        <Layout
          darkMode={darkMode}
          setDarkMode={setDarkMode}
      />
       </ProtectedRoute>
    }
      >

        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard
                products={products}
                loading={loading}
              />
            </ProtectedRoute>
          }
        />



        <Route
          path="products"
          element={
            <ProtectedRoute>
              <Products
                products={products}
                setProducts={setProducts}
                loading={loading}
              />
            </ProtectedRoute>
          }
        />



        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />



        <Route
          path="customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />



        <Route
          path="analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />



        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />



        <Route
          path="product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />


      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>

  );

}


export default App;
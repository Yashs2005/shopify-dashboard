import Cart from "./Pages/Cart";
import NotFound from "./Pages/NotFound";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";

import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import CustomerView from "./Pages/CustomerView";
import Orders from "./Pages/Orders";
import Customers from "./Pages/Customers";
import Analytics from "./Pages/Analytics";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // FINAL 30 PRODUCTS DATA
  const productData = [
    {
      id: 1,
      name: "Essence Mascara Lash Princess",
      price: 4999,
      unit: "1 Piece",
    },
    {
      id: 2,
      name: "Eyeshadow Palette with Mirror",
      price: 1445,
      unit: "1 Piece",
    },
    {
      id: 3,
      name: "Powder Canister",
      price: 5995,
      unit: "1 Piece",
    },
    {
      id: 4,
      name: "Red Lipstick",
      price: 2950,
      unit: "1 Piece",
    },
    {
      id: 5,
      name: "Red Nail Polish",
      price: 589,
      unit: "1 Piece",
    },
    {
      id: 6,
      name: "Calvin Klein CK One",
      price: 2960,
      unit: "1 Piece",
    },
    {
      id: 7,
      name: "Chanel Coco Noir Eau De",
      price: 1959,
      unit: "1 Piece",
    },
    {
      id: 8,
      name: "Dior J'adore",
      price: 478,
      unit: "1 Piece",
    },
    {
      id: 9,
      name: "Dolce Shine Eau de",
      price: 999,
      unit: "1 Piece",
    },
    {
      id: 10,
      name: "Gucci Bloom Eau de",
      price: 5989,
      unit: "1 Piece",
    },
    {
      id: 11,
      name: "Annibale Colombo Bed",
      price: 20999,
      unit: "1 Piece",
    },
    {
      id: 12,
      name: "Annibale Colombo Sofa",
      price: 15899,
      unit: "1 Piece",
    },
    {
      id: 13,
      name: "Bedside Table African Cherry",
      price: 4556,
      unit: "1 Piece",
    },
    {
      id: 14,
      name: "Knoll Saarinen Executive Conference Chair",
      price: 5679,
      unit: "1 Piece",
    },
    {
      id: 15,
      name: "Wooden Bathroom Sink With Mirror",
      price: 17688,
      unit: "1 Piece",
    },
    {
      id: 16,
      name: "Apple",
      price: 250,
      unit: "1 kg",
    },
    {
      id: 17,
      name: "Beef Steak",
      price: 750,
      unit: "1 kg",
    },
    {
      id: 18,
      name: "Cat Food",
      price: 499,
      unit: "1 kg",
    },
    {
      id: 19,
      name: "Chicken Meat",
      price: 360,
      unit: "1 kg",
    },
    {
      id: 20,
      name: "Cooking Oil",
      price: 279,
      unit: "1 Litre",
    },
    {
      id: 21,
      name: "Cucumber",
      price: 40,
      unit: "1 kg",
    },
    {
      id: 22,
      name: "Dog Food",
      price: 459,
      unit: "1 kg",
    },
    {
      id: 23,
      name: "Eggs",
      price: 310,
      unit: "12 Pieces",
    },
    {
      id: 24,
      name: "Fish Steak",
      price: 280,
      unit: "500 gram",
    },
    {
      id: 25,
      name: "Green Bell Pepper",
      price: 80,
      unit: "500 gram",
    },
    {
      id: 26,
      name: "Green Chili Pepper",
      price: 50,
      unit: "250 gram",
    },
    {
      id: 27,
      name: "Honey Jar",
      price: 679,
      unit: "500 gram",
    },
    {
      id: 28,
      name: "Ice Cream",
      price: 578,
      unit: "500 g",
    },
    {
      id: 29,
      name: "Juice",
      price: 89,
      unit: "1 Litre",
    },
    {
      id: 30,
      name: "Kiwi",
      price: 200,
      unit: "1 kg",
    },
  ];

  useEffect(() => {
    const savedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    // Agar purane products already saved hain,
    // unki images + stock rakhenge aur
    // naye names, prices aur units update karenge.

    if (savedProducts.length > 0) {
      const updatedProducts = productData.map((newProduct) => {
        const oldProduct = savedProducts.find(
          (product) => product.id === newProduct.id
        );

        return {
          ...newProduct,

          // Purani image rakho
          image: oldProduct?.image || "",

          // Purana stock rakho
          stock:
            oldProduct?.stock !== undefined
              ? oldProduct.stock
              : 50,
        };
      });

      setProducts(updatedProducts);

      localStorage.setItem(
        "products",
        JSON.stringify(updatedProducts)
      );

      setLoading(false);
    } else {
      // First time API se images lene ke liye
      fetch("https://dummyjson.com/products?limit=30")
        .then((response) => response.json())
        .then((data) => {
          const updatedProducts = productData.map(
            (newProduct) => {
              const apiProduct = data.products.find(
                (product) =>
                  product.id === newProduct.id
              );

              return {
                ...newProduct,
                image: apiProduct?.thumbnail || "",
                stock: apiProduct?.stock || 50,
              };
            }
          );

          setProducts(updatedProducts);

          localStorage.setItem(
            "products",
            JSON.stringify(updatedProducts)
          );

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);

          // Agar internet/API problem ho,
          // products images ke bina bhi show honge.
          setProducts(productData);

          localStorage.setItem(
            "products",
            JSON.stringify(productData)
          );

          setLoading(false);
        });
    }
  }, []);

  // Products localStorage me save karna
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(
        "products",
        JSON.stringify(products)
      );
    }
  }, [products]);

  return (
    <Routes>
      {/* LOGIN */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* PROTECTED PAGES */}

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
        {/* DASHBOARD */}

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

        {/* PRODUCTS */}

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

        {/* CART */}

        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* ORDERS */}

        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* CUSTOMERS */}

        <Route
          path="customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        {/* CUSTOMER VIEW */}

        <Route
          path="customer-view"
          element={
            <ProtectedRoute>
              <CustomerView
                products={products}
              />
            </ProtectedRoute>
          }
        />

        {/* ANALYTICS */}

        <Route
          path="analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        {/* SETTINGS */}

        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Settings
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </ProtectedRoute>
          }
        />

        {/* PRODUCT DETAILS */}

        <Route
          path="product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        {/* CHECKOUT */}

        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 */}

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;
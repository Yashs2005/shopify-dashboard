import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";

import iphone16Image from "../assets/Iphone16.jpg";
import samsungS25Image from "../assets/Samsungs25.webp";

function Products({ products, setProducts, loading }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Product ke naam ke according image
  function getProductImage(product) {
    const productName = product.name?.toLowerCase() || "";

    if (productName.includes("iphone 16")) {
      return iphone16Image;
    }

    if (productName.includes("samsung s25")) {
      return samsungS25Image;
    }

    return product.image || product.thumbnail || "";
  }

  // CSV Export
  function exportCSV() {
    const headers = ["ID", "Name", "Price", "Stock"];

    const rows = products.map((product) => [
      product.id,
      product.name,
      product.price,
      product.stock,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "products.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast("📄 Products exported successfully!");
  }

  // Add Product
  function addProduct() {
    if (name.trim() === "" || price === "" || stock === "") {
      toast("⚠️ Please enter Product Name, Price and Stock");
      return;
    }

    const newProduct = {
      id:
        products.length > 0
          ? Math.max(...products.map((p) => Number(p.id))) + 1
          : 1,

      name: name.trim(),
      price: Number(price),
      stock: Number(stock),

      image: "",
    };

    setProducts([...products, newProduct]);

    setName("");
    setPrice("");
    setStock("");

    toast("✅ Product Added Successfully!");
  }

  // Search
  let filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  if (sortOrder === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Pagination
  const productsPerPage = 5;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Loading
  if (loading) {
    return <h2>Loading Products...</h2>;
  }

  return (
    <div>
      <h1>Products Page</h1>

      {/* Edit Product */}
      {editId && (
        <div>
          <h3>Edit Product</h3>

          <input
            type="text"
            placeholder="Product Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
          />

          <button
            onClick={() => {
              if (editName.trim() === "" || editPrice === "") {
                toast("⚠️ Please enter Product Name and Price");
                return;
              }

              setProducts(
                products.map((product) =>
                  product.id === editId
                    ? {
                        ...product,
                        name: editName.trim(),
                        price: Number(editPrice),
                      }
                    : product
                )
              );

              setEditId(null);
              setEditName("");
              setEditPrice("");

              toast("✏️ Product Updated Successfully!");
            }}
          >
            Update
          </button>

          <button
            onClick={() => {
              setEditId(null);
              setEditName("");
              setEditPrice("");
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <br />

      {/* Add Product */}
      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button onClick={addProduct}>Add Product</button>

      <button
        onClick={exportCSV}
        style={{ marginLeft: "10px" }}
      >
        Export CSV
      </button>

      <br />
      <br />

      {/* Search */}
      <input
        type="text"
        placeholder="Search Product"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* Sort */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="">Sort By</option>

        <option value="lowToHigh">
          Price: Low to High
        </option>

        <option value="highToLow">
          Price: High to Low
        </option>
      </select>

      <br />
      <br />

      {/* Products Table */}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>

              {/* Product Image */}
              <td>
                {getProductImage(product) ? (
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    width="60"
                    height="60"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>

              {/* Product Name */}
              <td>
                <Link to={`/product/${product.id}`}>
                  {product.name}
                </Link>
              </td>

              {/* Price */}
              <td
                onClick={() =>
                  toast("💰 Product Price: ₹" + product.price)
                }
                style={{ cursor: "pointer" }}
              >
                ₹{product.price}
              </td>

              {/* Stock */}
              <td
                style={{
                  color: product.stock <= 10 ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {product.stock}

                {product.stock <= 10 && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    Low Stock
                  </div>
                )}
              </td>

              {/* Actions */}
              <td>
                <button
                  onClick={() => {
                    setEditId(product.id);
                    setEditName(product.name);
                    setEditPrice(product.price);
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this product?"
                      )
                    ) {
                      setProducts(
                        products.filter(
                          (p) => p.id !== product.id
                        )
                      );

                      toast("🗑️ Product Deleted Successfully!");
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* No Products */}
      {currentProducts.length === 0 && (
        <h3>No Products Found</h3>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {currentPage}
        </span>

        <button
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          disabled={
            indexOfLastProduct >= filteredProducts.length
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;  
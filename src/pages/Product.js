// src/pages/ProductPage.js
import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Product.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    skuId: "",
    name: "",
    description: "",
    lastModifiedBy: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/products`, editingProduct);
        setEditingProduct(null);
      } else {
        await api.post("/products", newProduct);
        setNewProduct({ skuId: "", name: "", description: "", lastModifiedBy: "" });
      }
      setShowDialog(false);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Delete product
  const deleteProduct = async (skuId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${skuId}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Open dialog for add/edit
  const openDialogFor = (product = null) => {
    if (product) setEditingProduct(product);
    else setEditingProduct(null);
    setShowDialog(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-page">
      <h1>📦 Product Management</h1>

      <button className="btn" onClick={() => openDialogFor()}>
        Add Product
      </button>

      {/* Modal Dialog */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                className="input"
                type="text"
                placeholder="SKU ID"
                value={editingProduct ? editingProduct.skuId : newProduct.skuId}
                disabled={!!editingProduct}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, skuId: e.target.value })
                    : setNewProduct({ ...newProduct, skuId: e.target.value })
                }
                required
              />
              <input
                className="input"
                type="text"
                placeholder="Name"
                value={editingProduct ? editingProduct.name : newProduct.name}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, name: e.target.value })
                    : setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />
              <input
                className="input"
                type="text"
                placeholder="Description"
                value={editingProduct ? editingProduct.description : newProduct.description}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, description: e.target.value })
                    : setNewProduct({ ...newProduct, description: e.target.value })
                }
                required
              />
              <input
                className="input"
                type="text"
                placeholder="Last Modified By"
                value={editingProduct ? editingProduct.lastModifiedBy : newProduct.lastModifiedBy}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, lastModifiedBy: e.target.value })
                    : setNewProduct({ ...newProduct, lastModifiedBy: e.target.value })
                }
                required
              />
              <div className="dialog-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDialog(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn">
                  {editingProduct ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Table */}
      <div className="table-container">
        <h2>All Products</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>SKU ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Last Modified By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
                  No products available.
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.skuId}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.lastModifiedBy}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => openDialogFor(p)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteProduct(p.skuId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPage;

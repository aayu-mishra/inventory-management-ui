// src/pages/ProductPage.js
import React, { useEffect, useState } from "react";
import api from "../services/api";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    skuId: "",
    name: "",
    description: "",
    lastModifiedBy: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Add product
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products", newProduct);
      setNewProduct({ skuId: "", name: "", description: "", lastModifiedBy: "" });
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Update product
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${editingProduct.id}`, editingProduct);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // Delete product
  const deleteProduct = async (skuId) => {
    try {
      await api.delete(`/products/${skuId}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📦 Product Management</h1>

      {/* Add / Edit Form */}
      <form
        onSubmit={editingProduct ? updateProduct : addProduct}
        className="bg-white p-4 rounded-xl shadow-md mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="SKU ID"
            value={editingProduct ? editingProduct.skuId : newProduct.skuId}
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({ ...editingProduct, skuId: e.target.value })
                : setNewProduct({ ...newProduct, skuId: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={editingProduct ? editingProduct.name : newProduct.name}
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({ ...editingProduct, name: e.target.value })
                : setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={editingProduct ? editingProduct.description : newProduct.description}
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({ ...editingProduct, description: e.target.value })
                : setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Last Modified By"
            value={editingProduct ? editingProduct.lastModifiedBy : newProduct.lastModifiedBy}
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({ ...editingProduct, lastModifiedBy: e.target.value })
                : setNewProduct({ ...newProduct, lastModifiedBy: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
        {editingProduct && (
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="mt-4 ml-4 px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Product List */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">ID</th>
              <th className="border p-2">SKU ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Last Modified By</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border p-2">{p.id}</td>
                <td className="border p-2">{p.skuId}</td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.description}</td>
                <td className="border p-2">{p.lastModifiedBy}</td>
                <td className="border p-2 flex space-x-2">
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p.skuId)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPage;

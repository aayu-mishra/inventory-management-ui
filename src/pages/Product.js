import React, { useEffect, useState } from "react";
import "./Product.css";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const pageSize = 20;

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (pageNumber) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      console.log("Token:", token); // Debugging line
      const res = await fetch(
        `http://localhost:8080/v1/api/products?page=${pageNumber}&size=${pageSize}`,
        {
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        }
        
      );
      const data = await res.json();

      setProducts(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="product-page">
      <div className="branding">Cisele</div>
<h1>📦 Product Management</h1>
      <h1>Product List</h1>
      <p>Total Products: {totalElements}</p>
      

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button className="btn btn-secondary">Edit</button>
                    <button className="btn btn-danger btn-gap">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className="btn"
          onClick={handlePrevPage}
          disabled={page === 0}
        >
          Previous
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          className="btn"
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

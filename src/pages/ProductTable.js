import React, { useEffect, useState } from "react";

const ProductTable = () => {
  const [products, setProducts] = useState([]);  // All prefetched data
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // 1. Fetch first page immediately
  useEffect(() => {
    const fetchInitial = async () => {
      const res = await fetch(`/api/products?page=1&size=${itemsPerPage}`);
      const data = await res.json();
      setProducts(data);

      // Start background prefetch
      prefetchPages(2, 10); // fetch pages 2–10 in background
    };

    fetchInitial();
  }, []);

  // 2. Background prefetching
  const prefetchPages = async (startPage, endPage) => {
    for (let page = startPage; page <= endPage; page++) {
      const res = await fetch(`/api/products?page=${page}&size=${itemsPerPage}`);
      const data = await res.json();
      setProducts((prev) => [...prev, ...data]); // append
    }
  };

  // 3. Pagination slicing (no API calls after first load)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>SKU ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Last Modified By</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product, index) => (
            <tr key={index}>
              <td>{product.skuId}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.lastModifiedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 20 }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            style={{
              fontWeight: currentPage === index + 1 ? "bold" : "normal",
              margin: "0 4px",
            }}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
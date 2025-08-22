import { useState } from "react";
import api from "../services/api";

export default function TransferStock() {
  const [sku, setSku] = useState("");
  const [fromWh, setFromWh] = useState("");
  const [toWh, setToWh] = useState("");
  const [qty, setQty] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (!sku || !fromWh || !toWh || !qty) {
      setMsg({ type: "error", text: "All fields are required." });
      return;
    }
    if (fromWh === toWh) {
      setMsg({ type: "error", text: "Source and destination cannot be the same." });
      return;
    }
    if (Number(qty) <= 0) {
      setMsg({ type: "error", text: "Quantity must be greater than 0." });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        skuId: sku,
        sourceWarehouseCode: fromWh,
        destinationWarehouseCode: toWh,
        quantity: Number(qty),
      };
      const res = await api.post("/warehouses/transfer", payload);
      const text = res?.data?.message || "Transfer successful";
      setMsg({ type: "success", text });
      setSku(""); setFromWh(""); setToWh(""); setQty("");
    } catch (err) {
      const text =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Transfer failed";
      setMsg({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Transfer Stock</h2>

      <form
        onSubmit={submit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
          maxWidth: 720,
          marginTop: 12,
        }}
      >
        <input
          placeholder="SKU ID"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <input
          placeholder="From Warehouse Code"
          value={fromWh}
          onChange={(e) => setFromWh(e.target.value)}
        />
        <input
          placeholder="To Warehouse Code"
          value={toWh}
          onChange={(e) => setToWh(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <div style={{ gridColumn: "1 / -1" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Transferring..." : "Transfer"}
          </button>
        </div>
      </form>

      {msg && (
        <div style={{ marginTop: 12, color: msg.type === "error" ? "red" : "green" }}>
          {msg.text}
        </div>
      )}
    </div>
  );
}

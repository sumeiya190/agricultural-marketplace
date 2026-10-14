
import { useEffect, useState } from "react";
import "./viewOrders.css";

function ViewOrders({ user, onBack }) {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
    if (!user?.id) return;

    fetch(`http://127.0.0.1:5000/farmer/${user.id}/orders`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to load orders.");
        }
        return response.json();
    })
    .then((data) => {
        setOrders(data.orders);
        setError("");
    })
    .catch((err) => {
        setError(err.message);
    });
}, [user?.id]);

    const updateStatus = async (orderId, status) => {
    try {
        const response = await fetch(
            `http://127.0.0.1:5000/orders/${orderId}/status`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    farmer_id: user.id,
                    status: status,
                }),
            }
        );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update order status.");
    }

    setOrders((currentOrders) =>
        currentOrders.map((order) =>
            order.id === orderId
            ? { ...order, status: data.status }
            : order
        )
    );

    setMessage(data.message);
        setError("");
    } catch (err) {
        setError(err.message);
        setMessage("");
    }
};

return (
    <div className="view-orders-page">
        <div className="page-navigation">
            <a
                href="#"
                onClick={(event) => {
                    event.preventDefault();
                    onBack();
                }}>
                    ← Back
                </a>
        </div>
    <h1>View Orders</h1>

    {error && (
        <p className="orders-message orders-error">{error}</p>
    )}

    {message && (
        <p className="orders-message orders-success">{message}</p>
    )}

    {!error && orders.length === 0 ? (
        <p className="orders-message">No orders found.</p>
    ) : (
        <div className="orders-table-container">
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Buyer ID</th>
                        <th>Quantity (kg)</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.product_name}</td>
                            <td>{order.buyer_id}</td>
                            <td>{order.quantity}</td>
                            <td>KSh {order.total_amount}</td>
                            <td>{order.status}</td>
                            <td>
                                {order.status === "Pending" ? (
                                    <>
                                    <button onClick={() => updateStatus(order.id, "Confirmed")}>Confirm</button>
                                    <button onClick={() => updateStatus(order.id, "Rejected")}>Reject</button>
                                    </>
                                ) : (
                                    "No actions"
                                    )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )}
    </div>
);
}

export default ViewOrders;

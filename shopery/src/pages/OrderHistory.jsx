import React from "react";
import "../styles/OrderHistory.css";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "../axios/axiosInstance";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.post("oreder/getuserorders", {
          email: auth.email,
        });

        if (response.status === 201) {
          setOrders(response.data.ordersData);
          console.log("orders");
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);
  console.log("orders:", orders);

  return (
    <div className="orderhistory">
      <div className="orderhtitl">Order History</div>
      <div>
      {orders ? <Table orders={orders} /> : <p>No Orders</p>}
      </div>
    </div>
  );
}


export default OrderHistory;

function Table({ orders }) {
  return (
    <table  cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Total</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order, i) => (
          <TableRow i={i} order={order} />
        ))}
      </tbody>
    </table>
  );
}

function TableRow({ order, i }) {
  const totalItems = order.items.reduce((sum, item) => sum + item.qnt, 0);
  const totalCost = order.items.reduce(
    (sum, item) => sum + item.qnt * item.price,
    0
  );

  return (
    <tr key={i}>
      <td>#{order.orderId.slice(-4)}</td>
      <td>
        {new Date(order.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </td>
      <td>
       <span>${totalCost}</span>  ({totalItems} Products)
      </td>
      <td>{order.status}</td>
      <td>
        <button>View Details</button>
      </td>
    </tr>
  );
}

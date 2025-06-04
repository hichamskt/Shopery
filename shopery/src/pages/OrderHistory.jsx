import React from "react";
import "../styles/OrderHistory.css";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "../axios/axiosInstance";
import Pagination from "../UI/Pagination/Pagination";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();
  
  const [totalPage, setTotalPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousButtonClick = (event, currentPageGroup) => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleNextButtonClick = (event, currentPageGroup) => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const handlePreviousPageGroupButtonClick = (event, currentPageGroup) => {
    setCurrentPage(currentPageGroup[0] - 1);
  };
  const handleNextPageGroupButtonClick = (event, currentPageGroup) => {
    setCurrentPage(currentPageGroup[currentPageGroup.length - 1] + 1);
  };

  const handlePageChangeButtonClick = (event, currentPageGroup) => {
    setCurrentPage(Number(event.target.id));
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.post("oreder/getuserorders", {
          email: auth.email,
        });

        if (response.status === 201) {
          const fetchedOrders = response.data.ordersData;
        setOrders(fetchedOrders);
        setTotalPage(Math.ceil(fetchedOrders.length / 3));
          
          console.log("orders");
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    
    fetchData();
    setTotalPage(Math.ceil(orders.length/3))
  }, []);
  

  const indexOfLast = currentPage * 3;
const indexOfFirst = indexOfLast - 3;
const currentData = orders?.slice(indexOfFirst, indexOfLast);

  return (
    <div className="orderhistory">
      <div className="orderhtitl">Order History</div>
      <div>
      {orders ? <Table orders={currentData} /> : <p>No Orders</p>}
      {totalPage >1 && <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        pagesPerPageGroup={5}
        handlePreviousButtonClick={handlePreviousButtonClick}
        handleNextButtonClick={handleNextButtonClick}
        handlePageChangeButtonClick={handlePageChangeButtonClick}
        handlePreviousPageGroupButtonClick={handlePreviousPageGroupButtonClick}
        handleNextPageGroupButtonClick={handleNextPageGroupButtonClick}
      />}
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

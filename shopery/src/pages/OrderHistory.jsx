import React from "react";
import "../styles/OrderHistory.css";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "../axios/axiosInstance";
import Pagination from "../UI/Pagination/Pagination";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [showOrderDestails, setShowOrderDetail] = useState(false);
  const [orderId,setOrderId]=useState('');
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

  const handleOrderSelect = (orderId)=>{
    setOrderId(orderId);
    setShowOrderDetail(true);
  }
console.log('orders:',orders)
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
    setTotalPage(Math.ceil(orders.length / 3));
  }, []);

  const indexOfLast = currentPage * 3;
  const indexOfFirst = indexOfLast - 3;
  const currentData = orders?.slice(indexOfFirst, indexOfLast);

  return (
    <div className="orderhistory">
      {showOrderDestails?
      <OrderDetails orderId={orderId} />
      :
        <div>

      <div className="orderhtitl">Order History</div>
      <div>
        {orders?.length>0 ? <Table orders={currentData} handleOrderSelect={handleOrderSelect} /> : <p>No Orders</p>}
        {totalPage > 1 && (
          <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          pagesPerPageGroup={5}
          handlePreviousButtonClick={handlePreviousButtonClick}
          handleNextButtonClick={handleNextButtonClick}
          handlePageChangeButtonClick={handlePageChangeButtonClick}
          handlePreviousPageGroupButtonClick={
            handlePreviousPageGroupButtonClick
          }
          handleNextPageGroupButtonClick={handleNextPageGroupButtonClick}
          />
        )}
      </div>
        </div>}
    </div>
  );
}

export default OrderHistory;

function Table({ orders , handleOrderSelect }) {
  return (
    <table cellPadding="10" cellSpacing="0">
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
          <TableRow i={i} order={order} handleOrderSelect={handleOrderSelect}/>
        ))}
      </tbody>
    </table>
  );
}

function TableRow({ order, i , handleOrderSelect}) {
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
        <span>${totalCost}</span> ({totalItems} Products)
      </td>
      <td>{order.status}</td>
      <td>
        <button onClick={()=>handleOrderSelect(order.orderId)}>View Details</button>
      </td>
    </tr>
  );
}


function OrderDetails({ orderId }){

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(`oreder/getOrderById/${orderId}`);
        setOrder(response.data);

       
      } catch (err) {
        console.log("Error fetching data:", err);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
    
  }, [orderId]);

  console.log('order',order);
 if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found</p>;
  return(
    <div>
      <div className="orderhtitl ordheader">
        <span>

        Order Details
        <p> · {new Date(order.createdAt).toLocaleDateString("en-GB", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}</p>
        <p> · {order.items.length} Products</p>
        </span>
        <div>
          <button>Back to List</button>
        </div>
      </div>
      <div className="shipingandtotalbox">
        <BillingShipping billingInfos={order.billingInfos}  shippingInfo={order.shippingInfos}/>
        <Total />
      </div>
    </div>
  )
}


function BillingShipping ({billingInfos,shippingInfo}){



  return(
    <div className="billingshippingbox">
      <div >
      <div className="orderhtitl bsttl">
        Billing Address
        </div>  
        <div className="billingshopingtb">
          <h3>{billingInfos.billingFirstName} {billingInfos.billingLastName}</h3>
          <p>{billingInfos.billingRegion}-{billingInfos.city}-{billingInfos.billingAdresse}</p>
          <p>{billingInfos.zipCode}</p>
          <br/>
          <p>EMAIL</p>
          <p>{billingInfos.billingEmail}</p>
          <p>PHONE</p>
          <p>{billingInfos.billingphoneNumber}</p>
        </div>
      </div>
       <div >
      <div className="orderhtitl bsttl">
        Shipping Address
        </div>  
        <div className="billingshopingtb">
          <h3>{shippingInfo.shippingFirstName } {shippingInfo.shippingLastName}</h3>
          <p>{shippingInfo.shippingRegion}-{shippingInfo.shippingCity}-{shippingInfo.shippingAdresse}</p>
          <p>-{shippingInfo.shippingzipCode}</p>
          <br/>
          <p>EMAIL</p>
          <p>{shippingInfo.shippingEmail}</p>
          <p>PHONE</p>
          <p>{shippingInfo.billingphoneNumber}</p>
        </div>
      </div>
     
    </div>
  )
}
function Total (){



  return(
    <div>
total
    </div>
  )
}
import React, { useEffect, useState } from "react";
import "../styles/UserDashboard.css";

import noProfil from "../assets/no_profile.png";
import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "../axios/axiosInstance";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";



function UserDashboard() {
  const [userInfo, setUserInfo] = useState([]);
  const [orders,setOrders] =useState([]);
  const { auth } = useAuth();

  const navigate = useNavigate();
  
    const handleNav = () => {
      navigate("/account/settings"); 
    };
    const handleNavToOrders = () => {
      navigate("/account/orderhistory"); 
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.post("user/getUserInfo", {
          email: auth.email,
        });

        if (response.status === 201) {
          setUserInfo(response.data.user);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);


   useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosPrivate.post("oreder/getuserorders", {
            email: auth.email,
          });
  
          if (response.status === 201) {
            const fetchedOrders = response.data.ordersData;
            setOrders(fetchedOrders.slice(0, 5));
           
          }
        } catch (err) {
          console.log("Error fetching data:", err);
        }
      };
  
      fetchData();
      
    }, []);

   

  return (
    <div>
      <Suspense fallback={<h1>Loading ...</h1>}>
        <div className="prf-box">
          <ProfileBox user={userInfo} handleNav={handleNav} />
          <UserInfoBox user={userInfo} handleNav={handleNav}/>
        </div>
        <div className="dashOrderstbl">
          <div className="dashOrderstblheader">
            <p>Recet Order History</p>
            <button onClick={()=>handleNavToOrders()}>View All</button>
          </div>
          <Table orders={orders}/>
        </div>

      </Suspense>
    </div>
  );
}

export default UserDashboard;

function ProfileBox({ user , handleNav}) {

  console.log("user",user)
  return (
    <div className="prflbox">
      <div>
        {user.images ? (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${user.images}`}
            alt="profile"
          />
        ) : (
          <img src={noProfil} alt="profile" />
        )}
      </div>
      {user.firstName ? <p>{user.firstName} {user.lastName}</p> : <p>UserName</p>}
      <p>Customer</p>
      <p onClick={()=>handleNav()}>Edit Profile</p>
    </div>
  );
}

function UserInfoBox({user,handleNav}) {
  return <div className="usebox">
    <p className="userbxp">Billing Address</p>
    {/*user.billingAdresse &&*/ <UserAdresses user={user} />}
    { user.billingAdresse? <p className="ed" onClick={()=>handleNav()}>Edit Adresses</p>: <p className="ed">add billing adresse</p>}
  </div>;
}


function UserAdresses({user}){

  return<div className="useradres">
    <p>{user.firstName} {user.lastName}</p>
    <p>{user.billingAdresse || "user adresse"}</p>
    <p>{user.billingEmail || "example@gmail.com"}</p>
    <p>{user.billingphoneNumber || "add a phone number"}</p>
  </div>
}



function Table({ orders , handleOrderSelect }) {
  return (
    <table cellPadding="10" cellSpacing="0" className="tb2">
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

function TableRow({ order, i }) {
  const totalItems = order.items.reduce((sum, item) => sum + item.qnt, 0);
  const totalCost = order.items.reduce(
    (sum, item) => sum + item.qnt * item.price,
    0
  );


  const navigate = useNavigate();

  const handleNav = () => {
    navigate('/account/orderhistory', {
      state: {
        dashOrderId: order.orderId,
        showDetail: true,
      },
    });
  };

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
        <button onClick={()=>handleNav()}>View Details</button>
      </td>
    </tr>
  );
}

import React, { useEffect, useState } from "react";
import "../styles/UserDashboard.css";
import noProfil from "../assets/no_profile.png";
import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "../axios/axiosInstance";
import { Suspense } from "react";

function UserDashboard() {
  const [userInfo, setUserInfo] = useState([]);
  const { auth } = useAuth();

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

  console.log("userInfo:", userInfo);

  return (
    <div>
      <Suspense fallback={<h1>Loading ...</h1>}>
        <div className="prf-box">
          <ProfileBox user={userInfo} />
          <UserInfoBox user={userInfo} />
        </div>
      </Suspense>
    </div>
  );
}

export default UserDashboard;

function ProfileBox({ user }) {
  return (
    <div className="prflbox">
      <div>
        {user.image ? (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${user.image}`}
            alt="profile"
          />
        ) : (
          <img src={noProfil} alt="profile" />
        )}
      </div>
      {user.firstName ? <p>{user.firstName} {user.lastName}</p> : <p>UserName</p>}
      <p>Customer</p>
      <p>Edit Profile</p>
    </div>
  );
}

function UserInfoBox({user}) {
  return <div className="usebox">
    <p className="userbxp">Billing Address</p>
    {/*user.billingAdresse &&*/ <UserAdresses user={user} />}
    { user.billingAdresse? <p className="ed">Edit Adresses</p>: <p className="ed">add billing adresse</p>}
  </div>;
}


function UserAdresses({user}){
console.log("name",user.firstName)
  return<div className="useradres">
    <p>{user.firstName} {user.lastName}</p>
    <p>{user.billingAdresse || "user adresse"}</p>
    <p>{user.billingEmail || "example@gmail.com"}</p>
    <p>{user.billingphoneNumber || "add a phone number"}</p>
  </div>
}
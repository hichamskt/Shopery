import React, { useEffect, useState } from 'react'
import '../styles/UserDashboard.css'
import noProfil from "../assets/no_profile.png"
import useAuth from '../hooks/useAuth'
import { axiosPrivate } from '../axios/axiosInstance';


function UserDashboard() {
  const [userInfo,setUserInfo]=useState([]);
    const { auth } = useAuth();
  


  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosPrivate.post("user/getUserInfo", { email: auth.email });
  
          if (response.status === 201) {
            setUserInfo(response.data.user);
          }
        } catch (err) {
          console.log("Error fetching data:", err);
        }
      };
  
      fetchData(); 
    }, []); 

    console.log("userInfo:",userInfo)



  return (
    <div>
      <div>
        <ProfileBox />
        <UserInfoBox />
      </div>

    </div>
  )
}

export default UserDashboard





function ProfileBox (){


  return(
    <div>

    </div>
  )
}


function UserInfoBox(){

  return(
    <div>

    </div>
  )
}
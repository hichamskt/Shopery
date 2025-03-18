import React, { useEffect, useState } from 'react'
import '../styles/Settings.css'
import useAuth from '../hooks/useAuth';
import { axiosPrivate } from '../axios/axiosInstance';



function Settings() {

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

console.log('settingdata:',userInfo)

  return (
    <div>
        <AccountSettings userInfo={userInfo} />

    </div>
  )
}

export default Settings



function AccountSettings (){

    return<div>
        <div>
        Account Settings
        </div>
        <div>
            <div></div>
            <div></div>
        </div>

    </div>
}
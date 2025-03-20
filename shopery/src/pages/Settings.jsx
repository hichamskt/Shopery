import React, { useEffect, useState } from 'react'
import '../styles/Settings.css'
import useAuth from '../hooks/useAuth';
import { axiosPrivate } from '../axios/axiosInstance';
import BillingInput from '../UI/BillingInput/BillingInput';



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
        <AccountSettings userInfo={userInfo} setUserInfo={setUserInfo} />

    </div>
  )
}

export default Settings



function AccountSettings ({userInfo,setUserInfo}){

const [errors,setErrors]=useState({});
    const inputs1 = [
        {
            id: 1,
            name: "firstName",
            type: "text",
            placeholder: "Your first name",
            errorMessage:
              "First name  must only contain letters and be between 2 and 15 characters long",
            label: "First name",
            pattern: "^[A-Za-z]{2,15}$",
            required: true,
          },
          {
            id: 2,
            name: "lastName",
            type: "text",
            placeholder: "Your Last Name",
            errorMessage:
              "The Last name must only contain letters and be between 2 and 15 characters long",
            label: "Last Name",
            pattern: "^[A-Za-z]{2,15}$",
            required: true,
          },
        {
            
          id: 3,
          name: "email",
          type: "email",
          placeholder: "Email",
          errorMessage: "It should be a valid email address!",
          label: "Email",
          required: true,
        },
        {
          id: 4,
          name: "phoneNumber",
          type: "text",
          placeholder: "Phone Number",
          errorMessage: "It should be a valid Phone Number!",
          label: "Phone Number",
          pattern: "[0-9]{9,11}",
          required: true,
        },
      ];


      const handleValueError = () => {
        const newErrors = {};
        if (!userInfo.Email.trim()) {
          newErrors.Email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(userInfo.Email)) {
          newErrors.billingEmail = "Enter a valid email address.";
        }
       
    
        if (!userInfo.phoneNumber.trim()) {
          newErrors.phoneNumber = "Phone Number is required.";
        } else if (!/^[0-9]{9,11}$/.test(userInfo.phoneNumber)) {
          newErrors.phoneNumber = "It should be a valid Phone Number!";
        }
    
    
        if (!userInfo.FirstName.trim()) {
          newErrors.FirstName = "First Name Is required";
        } else if (!/^[A-Za-z]{2,15}$/.test(userInfo.FirstName)) {
          newErrors.FirstName =
            "First name  must only contain letters and be between 2 and 15 characters long";
        }
        if (!userInfo.LastName.trim()) {
          newErrors.LastName = "Last Name Is required";
        } else if (!/^[A-Za-z]{2,15}$/.test(userInfo.LastName)) {
          newErrors.LastName =
            "Last name  must only contain letters and be between 2 and 15 characters long";
        }
        return newErrors;
      };



      const onChange = (e) => {
        
        const { name, value,  } = e.target;
        setUserInfo({
            ...userInfo,
            [name] : value,
          });
       
        if (errors[name]) {
          const updatedErrors = { ...errors };
    
          delete updatedErrors[name];
          setErrors(updatedErrors);
        }
      };





    return<div className='acsetting'>
        <div className='acsetheader'>
        Account Settings
        </div>
        <div className='acsetbox'>
            <div>
            {inputs1.map((input) => (
          <BillingInput
            key={input.id}
            {...input}
            value={userInfo[input.name]}
            onChange={onChange}
            err={errors[input.name]}
          />
        ))}
        
        <button className='savesett'>Save Changes</button>
            </div>
            <div></div>
        </div>

    </div>
}
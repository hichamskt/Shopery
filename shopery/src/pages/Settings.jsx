import React, { useEffect, useRef, useState } from "react";
import "../styles/Settings.css";
import useAuth from "../hooks/useAuth";
import axiosInstance, { axiosPrivate } from "../axios/axiosInstance";
import BillingInput from "../UI/BillingInput/BillingInput";
import profile from "../assets/no_profile.png"
import BillingSelectInput from "../UI/BillingSelectInput/BillingSelectInput";

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

 

  return (
    <div>
      <AccountSettings userInfo={userInfo} setUserInfo={setUserInfo} auth={auth} />
      <BilingAdress userInfo={userInfo} setUserInfo={setUserInfo} ></BilingAdress>
    </div>
  );
}

export default Settings;

function AccountSettings({ userInfo, setUserInfo , auth}) {
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  
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
    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(userInfo.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!userInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^[0-9]{9,11}$/.test(userInfo.phoneNumber)) {
      newErrors.phoneNumber = "It should be a valid Phone Number!";
    }

    if (!userInfo.firstName.trim()) {
      newErrors.firstName = "First Name Is required";
    } else if (!/^[A-Za-z]{2,15}$/.test(userInfo.firstName)) {
      newErrors.firstName =
        "First name  must only contain letters and be between 2 and 15 characters long";
    }
    if (!userInfo.lastName.trim()) {
      newErrors.lastName = "Last Name Is required";
    } else if (!/^[A-Za-z]{2,15}$/.test(userInfo.lastName)) {
      newErrors.lastName =
        "Last name  must only contain letters and be between 2 and 15 characters long";
    }
    return newErrors;
  };


  console.log(userInfo.images)
  const submitForm = async()=>{

    const formData = new FormData();
    formData.append("email", auth.email);
    formData.append("updatedemail", userInfo.email);
    formData.append("lastName", userInfo.lastName);
    formData.append("firstName", userInfo.firstName);
    formData.append("phoneNumber", userInfo.phoneNumber);
    formData.append("images", userInfo.images.file);


    
    try {
      const response = await axiosInstance.post("user/updateAcountSettings", formData,
       {
        headers: { "Content-Type": "multipart/form-data" },
      }
      );

      if (response.status === 201) {
        console.log("updated")

      }
    } catch (err) {
      console.log("Error fetching data:", err);
    }

  }

  const handleSubmitOrderForm = () => {
    const newErrors = handleValueError();
    setErrors(newErrors);
    console.log("clicked")
    
    if (Object.keys(newErrors).length === 0) {
      submitForm();
      console.log("submitted")
    }
  };



  const onChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    if (errors[name]) {
      const updatedErrors = { ...errors };

      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };

  function onFileSelect(event) {
    const file = event.target.files[0];

    if (file.length === 0) return;

    
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      images: {
        file: file,
        name: file.name,
        url: URL.createObjectURL(file),
      },
    }));

    
  }
  function selectFile() {
    fileInputRef.current.click();
  }

 
  

  return (
    <div className="acsetting">
      <div className="acsetheader">Account Settings</div>
      <div className="acsetbox">
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

          <button className="savesett" onClick={()=>handleSubmitOrderForm()}>Save Changes</button>
        </div>
        <div className="profilesetting">
          <img 
           src={
            userInfo.images?
            typeof userInfo.images === "object"
            ? userInfo.images.url:
          `${process.env.REACT_APP_BACKEND_URL}${userInfo.images}`
          : profile
          }
          
          
          alt="profile"/>
          <input type="file" style={{display:"none"}} name="images"  onChange={onFileSelect} ref={fileInputRef}/>
          <button onClick={selectFile}>Chose image</button>
        </div>
      </div>
    </div>
  );
}


function BilingAdress({userInfo,setUserInfo}){

const [errors, setErrors] = useState({});

    const inputs2 = [
    {
      id: 1,
      name: "billingFirstName",
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
      name: "billingLastName",
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
      name: "companyName",
      type: "text",
      placeholder: "Company name",
      errorMessage: "It should be a valid Last Name",
      label: "Company Name (optional)",
      required: false,
    },
  ];


 const streeadinput = {
    id: 4,
    name: "streetAdresse",
    type: "text",
    placeholder: "Your Street Adresse",
    errorMessage:
      "Enter a valid street address (letters, numbers, and common symbols only).",
    label: "Street Adresse",
    pattern: "^[A-Za-z0-9 ,.#'\\-]{3,100}$",
    required: true,
  };

    const selectinputs = [
    {
      id: 1,
      name: "billingRegion",
      errorMessage: "",
      label: "Region",
      options: [
        "Tanger-Tétouan-Al Hoceïma",
        "Souss-Massa",
        "Guelmim-Oued Noun[A]",
        "Laâyoune-Sakia El Hamra[A]",
      ],
    },
    {
      id: 1,
      name: "city",
      errorMessage: "",
      label: "City",
      options: ["Tanger", "Agidir", "Guelmim", "Laâyoune"],
    },
  ];

  const zipCodeinput = {
    
      id: 2,
      name: "zipCode",
      type: "text",
      placeholder: "Zip Code",
      errorMessage: "It should be a valid ZipCode!",
      label: "Zip Code",
      pattern: "[0-9]{5}",
      required: true,
    
  }
   const inputs1 = [
    {
      id: 1,
      name: "billingEmail",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
   
    {
      id: 2,
      name: "billingphoneNumber",
      type: "text",
      placeholder: "Phone Number",
      errorMessage: "It should be a valid Phone Number!",
      label: "Phone",
      pattern: "[0-9]{9,11}",
      required: true,
    },
  ];

 const onChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    if (errors[name]) {
      const updatedErrors = { ...errors };

      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };


  return(
    <div className="acsetting">
      <div className="acsetheader">Billing Address</div>
      <div className="billingadressetBtingbox">
        <div className="b-ling1">

           {inputs2.map((input) => (
            <BillingInput
              key={input.id}
              {...input}
              value={userInfo[input.name]}
              onChange={onChange}
              err={errors[input.name]}
            />
          ))}

        </div>
       <BillingInput
        {...streeadinput}
        value={userInfo[streeadinput.name]}
        onChange={onChange}
        err={errors[streeadinput.name]}
      />
  <div className="b-ling1">
 {selectinputs.map((input, i) => (
          <BillingSelectInput
            key={input.id + i}
            {...input}
            onChange={onChange}
            value={userInfo[input.name]}
            errorMessage={errors[input.name]}
          />
        ))}
        
     
       <BillingInput
        {...zipCodeinput}
        value={userInfo[zipCodeinput.name]}
        onChange={onChange}
        err={errors[zipCodeinput.name]}
      />    

  </div>

<div className="b-ling1">
   {inputs1.map((input) => (
            <BillingInput
              key={input.id}
              {...input}
              value={userInfo[input.name]}
              onChange={onChange}
              err={errors[input.name]}
            />
          ))}

</div>
<div>
 <button className="savesett" >Save Changes</button>
</div>
      </div>

    </div>
  )
}
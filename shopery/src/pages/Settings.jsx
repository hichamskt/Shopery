import React, { useEffect, useRef, useState } from "react";
import "../styles/Settings.css";
import useAuth from "../hooks/useAuth";
import axiosInstance, { axiosPrivate } from "../axios/axiosInstance";
import BillingInput from "../UI/BillingInput/BillingInput";
import profile from "../assets/no_profile.png";
import BillingSelectInput from "../UI/BillingSelectInput/BillingSelectInput";

function Settings({ setMessage, setShowToast }) {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <AccountSettings
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        auth={auth}
        setMessage={setMessage}
        setShowToast={setShowToast}
      />
      <BilingAdress
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        auth={auth}
        setMessage={setMessage}
        setShowToast={setShowToast}
      />
      <ChangePassword
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        auth={auth}
        setMessage={setMessage}
        setShowToast={setShowToast}
      />
    </div>
  );
}

export default Settings;

function AccountSettings({
  userInfo,
  setUserInfo,
  auth,
  setMessage,
  setShowToast,
}) {
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const inputs1 = [
    {
      id: 101,
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
      id: 102,
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
      id: 103,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 104,
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

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("email", auth.email);
    formData.append("updatedemail", userInfo.email);
    formData.append("lastName", userInfo.lastName);
    formData.append("firstName", userInfo.firstName);
    formData.append("phoneNumber", userInfo.phoneNumber);
    formData.append("images", userInfo.images.file);

    try {
      const response = await axiosInstance.post(
        "user/updateAcountSettings",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        console.log("updated");
        setMessage("Account Settings updated successfully");
        setShowToast(true);
      }
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  const handleSubmitOrderForm = () => {
    const newErrors = handleValueError();
    setErrors(newErrors);
    console.log("clicked");

    if (Object.keys(newErrors).length === 0) {
      submitForm();
      console.log("submitted");
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {inputs1.map((input) => (
            <BillingInput
              key={input.id}
              {...input}
              value={userInfo[input.name]}
              onChange={onChange}
              err={errors[input.name]}
            />
          ))}
          <div>
            <button
              className="savesett"
              onClick={() => handleSubmitOrderForm()}
            >
              Save Changes
            </button>
          </div>
        </div>
        <div className="profilesetting">
          <img
            src={
              userInfo.images
                ? typeof userInfo.images === "object"
                  ? userInfo.images.url
                  : `${process.env.REACT_APP_BACKEND_URL}${userInfo.images}`
                : profile
            }
            alt="profile"
          />
          <input
            type="file"
            style={{ display: "none" }}
            name="images"
            onChange={onFileSelect}
            ref={fileInputRef}
          />
          <button onClick={selectFile}>Chose image</button>
        </div>
      </div>
    </div>
  );
}

function BilingAdress({
  userInfo,
  setUserInfo,
  auth,
  setMessage,
  setShowToast,
}) {
  const [errors, setErrors] = useState({});

  const handleValueError = () => {
    const newErrors = {};

    if (!userInfo.billingEmail?.trim()) {
      newErrors.billingEmail = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(userInfo.billingEmail)) {
      newErrors.billingEmail = "Enter a valid email address.";
    }

    if (!userInfo.zipCode?.trim()) {
      newErrors.zipCode = "Zip Code is required.";
    } else if (!/^[0-9]{5}$/.test(userInfo.zipCode)) {
      newErrors.zipCode = "It should be a valid Zip Code!";
    }

    if (!userInfo.billingphoneNumber?.trim()) {
      newErrors.billingphoneNumber = "Phone Number is required.";
    } else if (!/^[0-9]{9,11}$/.test(userInfo.billingphoneNumber)) {
      newErrors.billingphoneNumber = "It should be a valid Phone Number!";
    }

    if (!userInfo.billingRegion?.trim()) {
      newErrors.billingRegion = "This field is required.";
    }
    if (!userInfo.city?.trim()) {
      newErrors.city = "This field is required.";
    }

    if (!userInfo.billingFirstName?.trim()) {
      newErrors.billingFirstName = "First Name is required.";
    } else if (!/^[A-Za-z]{2,15}$/.test(userInfo.billingFirstName)) {
      newErrors.billingFirstName =
        "First name must only contain letters and be between 2 and 15 characters long.";
    }

    if (!userInfo.billingLastName?.trim()) {
      newErrors.billingLastName = "Last Name is required.";
    } else if (!/^[A-Za-z]{2,15}$/.test(userInfo.billingLastName)) {
      newErrors.billingLastName =
        "Last name must only contain letters and be between 2 and 15 characters long.";
    }

    if (!userInfo.billingAdresse?.trim()) {
      newErrors.billingAdresse = "Street Address is required.";
    } else if (!/^[A-Za-z0-9 ,.#'\\-]{3,100}$/.test(userInfo.billingAdresse)) {
      newErrors.billingAdresse =
        "Street Address must be between 3 and 100 characters and contain only valid characters.";
    }

    return newErrors;
  };

  console.log(errors);

  const submitForm = async () => {
    try {
      const response = await axiosInstance.post(
        "user/updateBillingAddress",
        {
          email: auth.email,
          ...userInfo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Updated successfully");
        setMessage("Updated successfully");
        setShowToast(true);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleSubmitOrderForm = () => {
    const newErrors = handleValueError();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      submitForm();
      console.log("submitted");
    }
  };

  const inputs2 = [
    {
      id: 10,
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
      id: 20,
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
      id: 30,
      name: "companyName",
      type: "text",
      placeholder: "Company name",
      errorMessage: "It should be a valid Last Name",
      label: "Company Name (optional)",
      required: false,
    },
  ];

  const streeadinput = {
    id: 40,
    name: "billingAdresse",
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
      id: 11,
      name: "city",
      errorMessage: "",
      label: "City",
      options: ["Tanger", "Agadir", "Guelmim", "Laâyoune"],
    },
  ];

  const zipCodeinput = {
    id: 12,
    name: "zipCode",
    type: "text",
    placeholder: "Zip Code",
    errorMessage: "It should be a valid ZipCode!",
    label: "Zip Code",
    pattern: "[0-9]{5}",
    required: true,
  };
  const inputs1 = [
    {
      id: 111,
      name: "billingEmail",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 112,
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
    const { name, value, type, checked } = e.target;
    setUserInfo({ ...userInfo, [name]: type === "checkbox" ? checked : value });

    if (errors[name]) {
      const updatedErrors = { ...errors };

      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };

  return (
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
          <button className="savesett" onClick={() => handleSubmitOrderForm()}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function ChangePassword({
  auth,
  setMessage,
  setShowToast,
}) {
  const [errors, setErrors] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleValueError = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (
      !/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Password must be 8–20 characters and include at least one letter, one number, and one special character.";
    }
    if (!newPassword) {
      newErrors.newPassword = "Password is required.";
    } else if (
      !/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
        newPassword
      )
    ) {
      newErrors.newPassword =
        "Password must be 8–20 characters and include at least one letter, one number, and one special character.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "This field is required.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmitOrderForm = () => {
    const newErrors = handleValueError();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      submitForm();
    }
  };

  const submitForm = async () => {
    try {
      const response = await axiosInstance.post("/user/changePassword", {
        email: auth.email,
        password,
        newPassword,
      });
      if (response?.status === 200) {
         setMessage(response.data.message);
        setShowToast(true);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        const newErrors = {};
        newErrors.password = err.response.data.message;

        setErrors(newErrors);
      } 
      else {
        console.error("An unexpected error occurred:", err.message);
      }

      console.error(err.response?.data || err.message);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setPassword(value);

    if (errors[name]) {
      const updatedErrors = { ...errors };

      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };
  const onChangeNewPassword = (e) => {
    const { name, value } = e.target;
    setNewPassword(value);

    if (errors[name]) {
      const updatedErrors = { ...errors };

      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };
  const onConfirmPassword = (e) => {
    const { name, value } = e.target;
    setConfirmPassword(value);

    if (errors[name]) {
      const updatedErrors = { ...errors };

      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };

  const pswrd = {
    id: 10,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    label: "Password",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  };

  return (
    <div className="acsetting">
      <div className="acsetheader">Change Password</div>
      <div className="billingadressetBtingbox">
        <BillingInput
          {...pswrd}
          value={password}
          onChange={onChange}
          err={errors[pswrd.name]}
        />

        <div className="b-ling1">
          <BillingInput
            {...pswrd}
            label="New Password"
            name="newPassword"
            value={newPassword}
            onChange={onChangeNewPassword}
            err={errors["newPassword"]}
          />
          <BillingInput
            {...pswrd}
            label="Confirm Password"
            name="confirmPassword"
            errorMessage=""
            value={confirmPassword}
            onChange={onConfirmPassword}
            err={errors["confirmPassword"]}
          />
        </div>
        <div>
          <button className="savesett" onClick={() => handleSubmitOrderForm()}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

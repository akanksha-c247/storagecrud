import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
  });
  const navigate= useNavigate()
  const handleAdd = () => {
    const storedData = JSON.parse(localStorage.getItem("dataKey")) || [];
    const highestId = storedData.reduce((maxId, user) => {
      return user.id > maxId ? user.id : maxId;
    }, 0);
    formData.id=parseInt(highestId)+1
    const newData = [...storedData, formData];
    localStorage.setItem("dataKey", JSON.stringify(newData));
    console.log('newData: ', newData);
    navigate("/");
  };
  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  return (
    <div className="container mt-5">
      <form>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">Id</label>
          <input
            type="text"
            className="form-control"
            id="id"
            value={formData.id}
            onChange={(e) => handleInputChange("id", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAdd}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;

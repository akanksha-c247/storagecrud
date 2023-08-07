import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
  });
  const navigate= useNavigate()

  const handleAdd = () => {
    const storedData = JSON.parse(localStorage.getItem("dataKey")) || [];
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
    <div>
      <FormControl isRequired>
        <FormLabel>Id</FormLabel>
        <Input
          placeholder="id"
          value={formData.id}
            onChange={(e) => handleInputChange("id", e.target.value)}
        />
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="name"
          value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="username"
          value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
        />
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="email"
          value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
        />
      </FormControl>
      <Button
        loadingText="Submitting"
        colorScheme="teal"
        variant="outline"
        onClick={handleAdd}
      >
        Submit
      </Button>
    </div>
  );
};

export default AddUser;

import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useNavigate,useParams, Link } from "react-router-dom";

const EditUser = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    username:"",
    email: "",
  });
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dataKey")) || [];
    const userToEdit = storedData.find((user) => user.id === parseInt(id));
    if (userToEdit) {
      setFormData(userToEdit);
    }
  }, [id]);

  const handleEdit = () => {
    debugger;
    const storedData = JSON.parse(localStorage.getItem("dataKey")) || [];
    const updatedData = storedData.map((user) =>
      user.id === parseInt(id) ? formData : user
    );
    localStorage.setItem("dataKey", JSON.stringify(updatedData));
    console.log('updatedData: ', updatedData);
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
        onClick={handleEdit}
      >
        Submit
      </Button>
      <Link to="/">Back to Users</Link>
    </div>
  );
};

export default EditUser;

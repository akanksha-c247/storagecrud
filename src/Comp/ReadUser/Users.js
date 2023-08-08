import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Button,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useNavigate,Link } from "react-router-dom";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dataKey")) || [];
    if(storedData.length != 0)
    {
      setAllUsers(storedData);
    }else{
      axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setAllUsers(res.data);
        localStorage.setItem("dataKey", JSON.stringify(res.data));
        console.log(res);
      })
      .catch((err) => console.log(err));
    }
  }, []);

  const openForm = () => {
    navigate("/adduser");
  };
  const handleDelete = (uId) => {
    const deletedUser = allUsers.filter((user) => user.id !== uId);
    setAllUsers(deletedUser);
    localStorage.setItem("dataKey", JSON.stringify(deletedUser));
  };

  return (
    <div>
      <img src="../assets/crud.png" alt="" width="100px" height="202px"/>
      <Button colorScheme="green" className="addBtn" onClick={openForm}>
        Add User
      </Button>
      <TableContainer>
        <Table variant="simple" className="users-table">
          <TableCaption>All Users Data</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Username</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allUsers.map((user, index) => {
              return (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td >
                  <Link to={`/edituser/${user.id}`} className="edit-button">Edit</Link>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        handleDelete(user.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;

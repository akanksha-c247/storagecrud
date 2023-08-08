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
  Icon,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate, Link } from "react-router-dom";
import crud from "../../assets/crud.png";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dataKey")) || [];
    if (storedData.length != 0) {
      setAllUsers(storedData);
    } else {
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
    <>
      <div style={{ width : "100vw" , height : "100vh" , display : "flex" , flexDirection : "column"}}>
        <div style={{width : "100vw"  , height : "10vh" , display : "flex" , justifyContent : "center" , alignItems : "center" , padding :"2rem"}}>
          <img src={crud} alt="" height={"100px"} width={"100px"}/>
        </div>
        <div>        
        <TableContainer>
          <Table variant="simple" className="users-table">
            <TableCaption>All Users Data</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>btn</Th>
                <Th>
                  <button onClick={openForm} className="btn">
                    Add Users
                  </button>
                </Th>
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
                    <Td>
                      <Link to={`/edituser/${user.id}`} className="edit-button">
                        <EditIcon />
                      </Link>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          handleDelete(user.id);
                        }}
                      >
                        <Icon as={DeleteIcon} />
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Users;

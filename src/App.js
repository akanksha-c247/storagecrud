import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Users from './Comp/ReadUser/Users';
import AddUser from './Comp/CreateUser/AddUser';
import EditUser from './Comp/EditUser/EditUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users/>}/>
        <Route path='/adduser' element={<AddUser/>}/>
        <Route path="/edituser/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

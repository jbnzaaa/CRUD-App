// react library and hooks
// useEffect - used to perform API
// useState - when requesting data, we must prepare a state in which the data will be stored when it is returned
import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink as Link } from 'react-router-dom';
import AddUser from '../components/AddUser';

function Users() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async() => {
    // const url = ['https://reqres.in/api/users?page=1', 'https://reqres.in/api/users?page=2'];

    await fetch('https://reqres.in/api/users?page=1')
    .then((response) => response.json())
    .then((data) => {
      setUserData(data.data);
    })
    .catch((err) => console.log(err.message));
  }

  const handleEdit = (id) => {
    fetch(`https://reqres.in/api/users/${id}`)
    .then((response) => response.json())
    .then((data) => {
      navigate(`/users/${data.data.id}/edit`);
    })
    .catch((err) => console.log(err.message));
  }

  const handleDelete = (id) => {
    fetch(`https://reqres.in/api/users/${id}`)
    .then((response) => response.json())
    .then((data) => {
      navigate(`/users/${data.data.id}/delete`);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  return (
    <div className='userList'>
      <Link className='addUserBtn' to='/users/create'>
        Add User
      </Link>
      <table className='userListTable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td><img src={user.avatar} /></td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <input type="button" value="Edit" id='editBtn' onClick={() => handleEdit(user.id)}/>
                  <input type="button" value="Delete" id='deleteBtn' onClick={() => handleDelete(user.id)}/>
                </td>
              </tr>   
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users